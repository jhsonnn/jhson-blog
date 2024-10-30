// import { Client } from "@notionhq/client";
// import {
//   PageObjectResponse,
//   PartialPageObjectResponse,
// } from "@notionhq/client/build/src/api-endpoints";

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// // Exponential Backoff 적용 함수
// async function fetchWithExponentialBackoff(
//   fetchFunction: () => Promise<any>,
//   retries = 5,
//   delay = 1000
// ) {
//   try {
//     return await fetchFunction();
//   } catch (error: any) {
//     if (retries === 0 || error.status !== 429) {
//       console.error("최대 재시도 횟수에 도달했거나 다른 오류 발생:", error);
//       throw error;
//     }
//     // console.log(`Rate limit hit. Retrying in ${delay}ms...`);

//     // 지정된 시간만큼 대기 후 재시도
//     await new Promise((resolve) => setTimeout(resolve, delay));

//     // 재시도 시, 대기 시간을 2배로 증가
//     return fetchWithExponentialBackoff(fetchFunction, retries - 1, delay * 2);
//   }
// }

// // 타입 가드: PageObjectResponse 타입인지 확인하는 함수
// function isPageObjectResponse(page: any): page is PageObjectResponse {
//   return page.object === "page" && "properties" in page;
// }

// // export const fetchNotionDatabase = async (
// //   category: string
// // ): Promise<{ slug: string; post: PageObjectResponse }[]> => {
// //   const fetchFunction = async () => {
// //     const response = await notion.databases.query({
// //       database_id: process.env.NOTION_DATABASE_ID!,
// //       filter: {
// //         property: "category",
// //         select: { equals: category },
// //       },
// //     });

// //     //  console.log(
// //     //   `Fetched items for ${category}:`,
// //     //   JSON.stringify(response, null, 2)
// //     // );

// //     return response.results
// //       .filter(isPageObjectResponse)
// //       .map((page: PageObjectResponse) => {
// //         const slugProperty = page.properties.slug;
// //         const slug =
// //           slugProperty?.type === "rich_text"
// //             ? slugProperty.rich_text[0]?.plain_text || "default-slug"
// //             : "default-slug";

// //         return {
// //           slug,
// //           post: page,
// //         };
// //       });
// //   };

// //   // Exponential Backoff 적용하여 API 호출
// //   return await fetchWithExponentialBackoff(fetchFunction);
// // };


// export const fetchNotionDatabase = async (
//   category: string
// ): Promise<{ slug: string; post: PageObjectResponse }[]> => {
//   const fetchFunction = async () => {
//     const response = await notion.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID!,
//       filter: {
//         property: "category", // Notion의 'category' 필드
//         select: { equals: category }, // 주어진 카테고리로 필터링
//       },
//     });
//      // 응답 데이터를 로그로 출력해 디버깅
//     console.log(' response:?????????????', JSON.stringify(response, null, 2));
//     // console.log(`Fetched items for category "${category}":`, response);

//     return response.results
//       .filter(isPageObjectResponse)
//       .map((page: PageObjectResponse) => {
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

//   // Apply Exponential Backoff for rate limits
//   return await fetchWithExponentialBackoff(fetchFunction);
// };


import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import fetchWithExponentialBackoff from "@/utils/fetchWithExponentialBackoff";
import { isPageObjectResponse } from "@/types/notionDataType";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const fetchNotionDatabaseByCategory = async (
  category: string
): Promise<{ slug: string; post: PageObjectResponse }[]> => {
  const fetchFunction = async () => {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "category",
        select: { equals: category },
      },
    });

    //  console.log(`Fetched items for category "${category}":`, JSON.stringify(response, null, 2));

    // PageObjectResponse 타입만 남기도록 필터링
    return response.results
      .filter(isPageObjectResponse)
      .map((page) => {
        const slugProperty = page.properties.slug;
        const slug =
          slugProperty?.type === "rich_text" && slugProperty.rich_text.length > 0
            ? slugProperty.rich_text[0].plain_text
            : `no-slug-${page.id}`;

        return {
          slug,
          post: page,
        };
      });
  };

  return await fetchWithExponentialBackoff(fetchFunction);
};
