// // import { Client } from "@notionhq/client";

// // const notion = new Client({ auth: process.env.NOTION_API_KEY });

// // export const getPageBySlug = async (slug: string): Promise<string> => {
// //   const response = await notion.databases.query({
// //     database_id: process.env.NOTION_DATABASE_ID!,
// //     filter: {
// //       property: "slug",
// //       rich_text: {
// //         equals: slug,
// //       },
// //     },
// //   });

// //   const page = response.results[0]; // 첫 번째 결과를 반환

// //   if (!page) {
// //     throw new Error(`Page with slug "${slug}" not found`);
// //   }

// //   return page.id; // 페이지 ID를 반환
// // };

// // 파일 경로: utils/fetchNotionPageBySlug.ts

// // 파일 경로: utils/fetchNotionPageBySlug.ts

// import { Client } from "@notionhq/client";
// import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export const fetchNotionPageBySlug = async (
//   slug: string
// ): Promise<PageObjectResponse | null> => {
//   const response = await notion.databases.query({
//     database_id: process.env.NOTION_DATABASE_ID!,
//     filter: {
//       property: "slug",
//       rich_text: {
//         equals: slug,
//       },
//     },
//   });

//   const page = response.results[0];

//   return page ? (page as PageObjectResponse) : null;
// };
