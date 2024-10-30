// // utils/fetchNotionPageBySlug.ts

// import { Client } from "@notionhq/client";
// import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// // Notion 클라이언트 초기화
// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// // PageObjectResponse 타입인지 확인하는 타입 가드
// function isPageObjectResponse(page: any): page is PageObjectResponse {
//   return page.object === "page" && "properties" in page;
// }

// export const fetchNotionPageBySlug = async (slug: string) => {
//   try {
//     const normalizedSlug = slug.toLowerCase().trim(); // 슬러그를 소문자로 변환 및 공백 제거

//     const response = await notion.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID || "",
//       filter: {
//         property: "slug", // 이 부분이 데이터베이스의 정확한 필드 이름과 일치해야 함
//         rich_text: {
//           equals: normalizedSlug,
//         },
//       },
//     });

//     console.log("Notion API 응답 데이터:", JSON.stringify(response.results, null, 2)); // 응답 데이터 확인

//     if (response.results.length === 0) {
//       console.warn(`슬러그: ${normalizedSlug}에 해당하는 페이지를 찾을 수 없습니다.`);
//       return null;
//     }

//     const page = response.results[0];
//     if (isPageObjectResponse(page)) {
//       console.log("페이지 데이터가 정상적으로 반환되었습니다:", page);
//       return page;
//     } else {
//       console.warn(`잘못된 페이지 데이터 형식:`, page);
//       return null;
//     }
//   } catch (error) {
//     console.error("Notion 페이지를 가져오는 중 오류 발생:", error);
//     return null;
//   }
// };


// import { NotionAPI } from 'notion-client';
// import { ExtendedRecordMap } from 'notion-types';
// import { fetchPageIdBySlug } from '@/utils/fetchPageIdBySlug'; // 페이지 ID 가져오기 함수

// const notionAPI = new NotionAPI();

// /**
//  * 슬러그로 Notion 페이지 데이터를 가져오는 함수
//  */
// export const fetchNotionPageBySlug = async (slug: string): Promise<ExtendedRecordMap | null> => {
//   const pageId = await fetchPageIdBySlug(slug); // 페이지 ID 가져오기

//   if (!pageId) {
//     console.error(`No page ID found for slug: ${slug}`);
//     return null;
//   }

//   const normalizedPageId = pageId.replace(/-/g, ''); // 하이픈 제거

//   try {
//     console.log(`Fetching Notion page for ID: ${normalizedPageId}`);
//     const pageData = await notionAPI.getPage(normalizedPageId); // Notion 페이지 데이터 가져오기
//     console.log(`Successfully fetched page data for slug: ${slug}`);
//     return pageData;
//   } catch (error: any) {
//     console.error(`Error fetching page data for slug "${slug}": ${error.message}`);
//     return null;
//   }
// };

// import { NotionAPI } from 'notion-client';
// import { ExtendedRecordMap } from 'notion-types';
// import { fetchPageIdBySlug } from '@/utils/fetchPageIdBySlug';

// const notionAPI = new NotionAPI();

// /**
//  * 슬러그를 통해 Notion 페이지 데이터를 가져오는 함수
//  */
// export const fetchNotionPageBySlug = async (
//   slug: string
// ): Promise<ExtendedRecordMap | null> => {
//   try {
//     const pageId = await fetchPageIdBySlug(slug);
//     console.log(`Page ID for slug "${slug}": ${pageId}`);

//     if (!pageId) {
//       console.warn(`No page found for slug: ${slug}`);
//       return null; // JSX 대신 null 반환
//     }

    
//     const normalizedPageId = pageId.replace(/-/g, ''); // 하이픈 제거
//     console.log(`Fetching Notion page for ID: ${normalizedPageId}`);

//     const pageData = await notionAPI.getPage(normalizedPageId); // 페이지 데이터 가져오기
//     console.log(`Successfully fetched page data for slug: ${slug}`);

//     return pageData;
//   } catch (error: any) {
//     console.error(`Error fetching page data for slug "${slug}": ${error.message}`);
//     return null;
//   }
// };


// //////
// //사용여부 없는듯?
// import { NotionAPI } from 'notion-client';
// import { fetchPageIdBySlug } from '@/utils/fetchPageIdBySlug';

// const notionAPI = new NotionAPI();

// export const fetchNotionPageBySlug = async (slug: string) => {
//   try {
//     const pageId = await fetchPageIdBySlug(slug);
//     if (!pageId) return null;

//     const normalizedPageId = pageId.replace(/-/g, ''); // 하이픈 제거
//     const pageData = await notionAPI.getPage(normalizedPageId);

//     return pageData;
//   } catch (error) {
//     console.error(`Error fetching page for slug ${slug}:`, error);
//     return null;
//   }
// };
