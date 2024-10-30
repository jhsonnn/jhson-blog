// import { Client } from "@notionhq/client";
// import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
// import fetchWithExponentialBackoff from "@/utils/fetchWithExponentialBackoff";
// import { isPageObjectResponse } from "@/types/notionDataType";

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export const fetchNotionDatabaseByCategory = async (
//   category: string
// ): Promise<{ slug: string; post: PageObjectResponse }[]> => {
//   const fetchFunction = async () => {
//     const response = await notion.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID!,
//       filter: {
//         property: "category",
//         select: { equals: category },
//       },
//     });

//     //  console.log(`Fetched items for category "${category}":`, JSON.stringify(response, null, 2));

//     // PageObjectResponse 타입만 남기도록 필터링
//     return response.results
//       .filter(isPageObjectResponse)
//       .map((page) => {
//         const slugProperty = page.properties.slug;
//         const slug =
//           slugProperty?.type === "rich_text" && slugProperty.rich_text.length > 0
//             ? slugProperty.rich_text[0].plain_text
//             : `no-slug-${page.id}`;

//         return {
//           slug,
//           post: page,
//         };
//       });
//   };

//   return await fetchWithExponentialBackoff(fetchFunction);
// };

// import { Client } from "@notionhq/client";
// import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
// import fetchWithExponentialBackoff from "@/utils/fetchWithExponentialBackoff";
// import { isFullPageObjectResponse } from "@/types/notionDataType";

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export const fetchNotionDatabaseByCategory = async (
//   category: string
// ): Promise<{ slug: string; post: PageObjectResponse; id: string }[]> => {
//   const fetchFunction = async () => {
//     const response = await notion.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID!,
//       filter: {
//         property: "category",
//         select: { equals: category },
//       },
//     });

//     // 타입 가드를 사용하여 전체 페이지 응답만 필터링
//     return response.results
//       .filter(isFullPageObjectResponse)
//       .map((page) => {
//         const slugProperty = page.properties.slug;
//         const slug =
//           slugProperty?.type === "rich_text" &&
//           slugProperty.rich_text.length > 0
//             ? slugProperty.rich_text[0].plain_text
//             : `no-slug-${page.id}`;

//         return { slug, post: page, id: page.id };
//       });
//   };

//   return await fetchWithExponentialBackoff(fetchFunction);
// };


// import { Client } from "@notionhq/client";
// import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
// import fetchWithExponentialBackoff from "@/utils/fetchWithExponentialBackoff";
// import { isFullPageObjectResponse } from "@/types/notionDataType";

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export const fetchNotionDatabaseByCategory = async (
//   category: string
// ): Promise<{ slug: string; post: PageObjectResponse; id: string }[]> => {
//   const fetchFunction = async () => {
//     const response = await notion.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID!,
//       filter: {
//         property: "category",
//         select: { equals: category },
//       },
//     });

//     // 타입 가드를 사용하여 전체 페이지 응답만 필터링
//     return response.results
//       .filter(isFullPageObjectResponse)
//       .map((page) => {
//         const slugProperty = page.properties.slug;
//         const slug =
//           slugProperty?.type === "rich_text" &&
//           slugProperty.rich_text.length > 0
//             ? slugProperty.rich_text[0].plain_text
//             : `no-slug-${page.id}`;

//         return { slug, post: page, id: page.id };
//       });
//   };

//   return await fetchWithExponentialBackoff(fetchFunction);
// };

// utils/fetchNotionDatabaseByCategory.ts

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
