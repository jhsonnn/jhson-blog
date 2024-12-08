// // import { isPageObjectResponse, NotionPageItem } from "@/types/notionDataType";
// // import { notion } from "./client";
// // import {
// //   QueryDatabaseResponse,
// // } from "@notionhq/client/build/src/api-endpoints";
// // import fetchWithExponentialBackoff from "./fetchWithExponentialBackoff";


// // const CACHE_DURATION_MS = 60 * 60 * 1000; // 1시간 (60000 ms = 1분)

// // interface CachedData<T> {
// //   data: T;
// //   expiry: number;
// // }

// // function setCache<T>(cache: Map<string, CachedData<T>>, key: string, data: T) {
// //   cache.set(key, { data, expiry: Date.now() + CACHE_DURATION_MS });
// // }

// // function getCache<T>(cache: Map<string, CachedData<T>>, key: string): T | null {
// //   const cached = cache.get(key);
// //   if (!cached) return null;
// //   if (Date.now() > cached.expiry) {
// //     cache.delete(key); // 만료된 캐시 삭제
// //     return null;
// //   }
// //   return cached.data;
// // }

// // const categoryCache = new Map<string, CachedData<NotionPageItem[]>>();

// // export async function fetchNotionDatabaseByCategory(category: string) {
// //   const cachedData = getCache(categoryCache, category);
// //   if (cachedData) {
// //     console.debug(`Returning cached data for category: ${category}`);
// //     return cachedData;
// //   }

// //   try {
// //     const response: QueryDatabaseResponse = await fetchWithExponentialBackoff(() => notion.databases.query({
// //       database_id: process.env.NOTION_DATABASE_ID!,
// //       filter: {
// //         property: "category",
// //         select: { equals: category },
// //       },
// //     }));

// //     const data = response.results
// //       .filter(isPageObjectResponse)
// //       .map((page) => {
// //         const slugProperty = page.properties.slug;
// //         const slug = slugProperty.type === "rich_text" && slugProperty.rich_text.length > 0
// //           ? slugProperty.rich_text[0].plain_text
// //           : `no-slug-${page.id}`;
// //         return { slug, post: page };
// //       });

// //     setCache(categoryCache, category, data); // 캐시에 저장
// //     return data;
// //   } catch (error) {
// //     console.error("Failed to fetch database by category:", error);
// //     return [];
// //   }
// // }


// import { isPageObjectResponse, NotionPageItem } from "@/types/notionDataType";
// import { notion } from "./client";
// import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
// import fetchWithExponentialBackoff from "./fetchWithExponentialBackoff";

// const CACHE_DURATION_MS = 60 * 60 * 1000; // 1시간 (60000 ms = 1분)
// const categoryCache = new Map<string, { data: NotionPageItem[]; expiry: number }>();

// function getCache<T>(cache: Map<string, { data: T; expiry: number }>, key: string): T | null {
//   const cached = cache.get(key);
//   if (cached && Date.now() <= cached.expiry) return cached.data;
//   cache.delete(key); // 만료된 캐시 삭제
//   return null;
// }

// function setCache<T>(cache: Map<string, { data: T; expiry: number }>, key: string, data: T) {
//   cache.set(key, { data, expiry: Date.now() + CACHE_DURATION_MS });
// }

// export async function fetchNotionDatabaseByCategory(category: string): Promise<NotionPageItem[]> {
//   const cachedData = getCache(categoryCache, category);
//   if (cachedData) {
//     console.debug(`[CACHE] Category: ${category}`);
//     return cachedData;
//   }

//   if (!process.env.NOTION_DATABASE_ID) {
//     throw new Error("Missing environment variable: NOTION_DATABASE_ID");
//   }

//   try {
//     const response: QueryDatabaseResponse = await fetchWithExponentialBackoff(() =>
//       notion.databases.query({
//         database_id: process.env.NOTION_DATABASE_ID!,
//         filter: { property: "category", select: { equals: category } },
//       })
//     );
//     console.log("response: ", response); // 응답 확인
//     const data: NotionPageItem[] = response.results
//       .filter(isPageObjectResponse)
//       .map((page) => {
//         const slugProperty = page.properties.slug;
//         const slug =
//           slugProperty.type === "rich_text" && slugProperty.rich_text.length > 0
//             ? slugProperty.rich_text[0].plain_text
//             : `no-slug-${page.id}`;
//         return { slug, post: page };
//       });

//     setCache(categoryCache, category, data); // 캐시에 저장
//     return data;
//   } catch (error) {
//     console.error(`[ERROR] Failed to fetch category: ${category}`, error);
//     return [];
//   }
// }



// /////////////
// // lib/notion/fetchNotionDatabase.ts
// import { notion } from '../client';
// import { PageObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// export async function fetchNotionDatabase(): Promise<(PageObjectResponse | PartialPageObjectResponse)[]> {
//   const databaseId = process.env.NOTION_DATABASE_ID;

//   if (!databaseId) {
//     console.error('[Notion API] Missing NOTION_DATABASE_ID environment variable');
//     throw new Error('Environment variable "NOTION_DATABASE_ID" is not defined');
//   }

//   try {
//     console.log('[Notion API] Querying database...');
//     const response = await notion.databases.query({ database_id: databaseId });
//     console.log('[Notion API] Response:', response);

//     if (!response.results || !Array.isArray(response.results)) {
//       console.error('[Notion API] Invalid response format:', response);
//       throw new Error('Unexpected Notion API response format');
//     }

//     return response.results.filter(
//       (result): result is PageObjectResponse => result.object === 'page'
//     );
//   } catch (error) {
//     console.error('[Notion API] Error during database query:', error);
//     throw error;
//   }
// }

//전체 데이터베이스 조회
// lib/notion/api/fetchNotionDatabase.ts
import { notion, NOTION_DATABASE_ID } from '../database';
import { QueryDatabaseResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const fetchNotionDatabase = async (): Promise<PageObjectResponse[]> => {
  try {
    const response: QueryDatabaseResponse = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
    });

    const results = response.results.filter(
      (item): item is PageObjectResponse => 'properties' in item
    );

    console.log('Fetched Notion database:', results);
    return results;
  } catch (error) {
    console.error('Error fetching Notion database:', error);
    throw error;
  }
};

