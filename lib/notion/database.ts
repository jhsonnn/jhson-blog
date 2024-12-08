// //데이터 가공과 관련된 함수
// import { fetchNotionDatabase } from './fetchNotionDatabase';
// import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
// import { isCategoryProperty } from '@/types/notionDataType';

// /**
//  * 모든 카테고리 추출
//  */
// export async function extractCategories(): Promise<string[]> {
//   const results = await fetchNotionDatabase();

//   const categories = results
//     .filter((result): result is PageObjectResponse => 'properties' in result) // 타입 좁히기
//     .filter(isCategoryProperty) // 카테고리 속성이 select인지 확인
//     .map((result) => {
//       const categoryProperty = result.properties.category; // category 속성 접근
//       if (categoryProperty.type === 'select' && categoryProperty.select) {
//         return categoryProperty.select.name; // select 값 안전하게 반환
//       }
//       return null;
//     })
//     .filter((category): category is string => category !== null); // null 제거

//   return Array.from(new Set(categories));
// }

// /**
//  * 특정 카테고리로 필터링
//  */
// export async function filterByCategory(category: string): Promise<PageObjectResponse[]> {
//   const results = await fetchNotionDatabase();

//   return results
//     .filter((result): result is PageObjectResponse => 'properties' in result) // PageObjectResponse로 타입 좁히기
//     .filter(
//       (result) =>
//         isCategoryProperty(result) &&
//         result.properties.category.type === 'select' &&
//         result.properties.category.select?.name === category // select 값 확인
//     );
// }


// src/lib/notion/database.ts
// import { isCategoryProperty } from '@/lib/notion/types/notionDataType';
// import { fetchNotionDatabase } from './api/fetchNotionDatabase';
// import { PageObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// /**
//  * Notion에서 모든 카테고리를 추출합니다.
//  */
// export async function extractCategories(): Promise<string[]> {
//   try {
//     console.log('[Database] Fetching Notion database...');
//     const results = await fetchNotionDatabase();
//     console.log('[Database] Raw results:', results);

//     if (!results || results.length === 0) {
//       throw new Error('No results returned from Notion database');
//     }

//     const categories = results
//       .filter((result): result is PageObjectResponse => 'properties' in result)
//       .map((result) => {
//         const categoryProperty = result.properties.category;
//         if (categoryProperty.type === 'select' && categoryProperty.select) {
//           return categoryProperty.select.name;
//         }
//         return null;
//       })
//       .filter((category): category is string => category !== null);

//     console.log('[Database] Extracted categories:', categories);
//     return Array.from(new Set(categories));
//   } catch (error) {
//     console.error('[Database] Error in extractCategories:', error);
//     throw error;
//   }
// }

// /**
//  * 주어진 카테고리 이름에 따라 Notion 결과를 필터링합니다.
//  */
// export function filterByCategory(
//   results: (PageObjectResponse | PartialPageObjectResponse)[],
//   category: string
// ): PageObjectResponse[] {
//   return results
//     .filter((result): result is PageObjectResponse => 'properties' in result)
//     .filter((result) => {
//       if (isCategoryProperty(result)) {
//         const categoryProperty = result.properties.category;
//         return categoryProperty.type === 'select' && categoryProperty.select?.name === category;
//       }
//       return false;
//     });
// }


// lib/notion/database.ts
import { Client } from '@notionhq/client';

export const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID!;
