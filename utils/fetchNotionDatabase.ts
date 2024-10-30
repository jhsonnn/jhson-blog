import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
  PartialPageObjectResponse,
  PartialDatabaseObjectResponse,
  DatabaseObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// 타입 가드 함수: PageObjectResponse인지 확인
function isPageObjectResponse(
  value:
    | PageObjectResponse
    | PartialPageObjectResponse
    | PartialDatabaseObjectResponse
    | DatabaseObjectResponse
): value is PageObjectResponse {
  return (
    value.object === "page" && // `object`가 'page'인지 확인
    "properties" in value && // `properties` 필드가 존재하는지 확인
    "parent" in value // `parent` 필드가 존재하는지 확인
  );
}

export async function fetchNotionDatabaseByCategory(category: string) {
  const response: QueryDatabaseResponse = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "category",
      select: { equals: category },
    },
  });

  // PageObjectResponse인 경우에만 처리
  return response.results
    .filter(isPageObjectResponse) // 타입 가드를 이용해 올바른 타입만 필터링
    .map((page) => {
      const slugProperty = page.properties.slug;

      const slug =
        slugProperty.type === "rich_text" &&
        slugProperty.rich_text.length > 0
          ? slugProperty.rich_text[0].plain_text
          : `no-slug-${page.id}`;

      return { slug, post: page };
    });
}
