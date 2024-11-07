import { isPageObjectResponse } from "@/types/notionDataType";
import { notion } from "./client";
import {
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import fetchWithExponentialBackoff from "./fetchWithExponentialBackoff";


const CACHE_DURATION_MS = 60 * 60 * 1000; // 1시간 (60000 ms = 1분)

interface CachedData<T> {
  data: T;
  expiry: number;
}

function setCache<T>(cache: Map<string, CachedData<T>>, key: string, data: T) {
  cache.set(key, { data, expiry: Date.now() + CACHE_DURATION_MS });
}

function getCache<T>(cache: Map<string, CachedData<T>>, key: string): T | null {
  const cached = cache.get(key);
  if (!cached) return null;
  if (Date.now() > cached.expiry) {
    cache.delete(key); // 만료된 캐시 삭제
    return null;
  }
  return cached.data;
}

const categoryCache = new Map<string, CachedData<any>>();

export async function fetchNotionDatabaseByCategory(category: string) {
  const cachedData = getCache(categoryCache, category);
  if (cachedData) {
    console.debug(`Returning cached data for category: ${category}`);
    return cachedData;
  }

  try {
    const response: QueryDatabaseResponse = await fetchWithExponentialBackoff(() => notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "category",
        select: { equals: category },
      },
    }));

    const data = response.results
      .filter(isPageObjectResponse)
      .map((page) => {
        const slugProperty = page.properties.slug;
        const slug = slugProperty.type === "rich_text" && slugProperty.rich_text.length > 0
          ? slugProperty.rich_text[0].plain_text
          : `no-slug-${page.id}`;
        return { slug, post: page };
      });

    setCache(categoryCache, category, data); // 캐시에 저장
    return data;
  } catch (error) {
    console.error("Failed to fetch database by category:", error);
    return [];
  }
}
