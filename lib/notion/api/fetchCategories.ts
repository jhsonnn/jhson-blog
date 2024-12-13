// // src/lib/notion/fetchCategories.ts
// import { isSelectProperty, NotionPage } from '@/types/notionDataType';
// import { Client } from '@notionhq/client';
// import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

// import { PageObjectResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
// import { notion } from "../client";


// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export async function fetchCategories(): Promise<string[]> {
//   const databaseId = process.env.NOTION_DATABASE_ID;

//   if (!databaseId) {
//     throw new Error('Database ID is missing in environment variables.');
//   }

//   try {
//     const response: QueryDatabaseResponse = await notion.databases.query({
//       database_id: databaseId,
//     });

//     // 카테고리 목록을 중복 없이 추출
//     const categories = Array.from(
//       new Set(
//         response.results
//           .map((page) => {
//             const notionPage = page as NotionPage;
//             // category가 select 타입인지 확인 후 이름을 추출
//             return isSelectProperty(notionPage.properties.category)
//               ? notionPage.properties.category.select?.name
//               : undefined;
//           })
//           .filter((category): category is string => !!category) // null이나 undefined는 제외
//       )
//     );

//     return categories;
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     throw new Error('Failed to fetch categories');
//   }
// }


// src/lib/notion/fetchCategories.ts
// export async function fetchCategories(): Promise<string[]> {
//   const databaseId = process.env.NOTION_DATABASE_ID;

//   if (!databaseId) {
//     throw new Error('Database ID is missing in environment variables.');
//   }

//   try {
//     const response: QueryDatabaseResponse = await notion.databases.query({
//       database_id: databaseId,
//     });

//     // 카테고리 목록을 중복 없이 추출
//     const categories = Array.from(
//       new Set(
//         response.results
//           .map((page) => {
//             const notionPage = page as NotionPage;
//             // category가 select 타입인지 확인 후 이름을 추출
//             return isSelectProperty(notionPage.properties.category)
//               ? notionPage.properties.category.select?.name
//               : undefined;
//           })
//           .filter((category): category is string => !!category) // null이나 undefined는 제외
//       )
//     );

//     console.log('[Debug] Categories fetched from Notion:', categories);  // 여기에 추가된 로그
//     return categories;
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     throw new Error('Failed to fetch categories');
//   }
// }


// import { Client } from '@notionhq/client';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export async function fetchCategories(): Promise<string[]> {
//   const databaseId = process.env.NOTION_DATABASE_ID;

//   if (!databaseId) {
//     throw new Error('Database ID is missing in environment variables.');
//   }

//   try {
//     const response: QueryDatabaseResponse = await notion.databases.query({
//       database_id: databaseId,
//     });
//     console.log('Notion API response:', response);
    
   

//     // 카테고리 목록을 중복 없이 추출
//     const categories = Array.from(
//       new Set(
//         response.results
//           .map((page) => {
//             const notionPage = page as NotionPage;
//             // category가 select 타입인지 확인 후 이름을 추출
//             return isSelectProperty(notionPage.properties.category)
//               ? notionPage.properties.category.select?.name
//               : undefined;
//           })
//           .filter((category): category is string => !!category) // null이나 undefined는 제외
//       )
//     );

//     return categories;
//   } catch (error) {
//     console.error('Error querying Notion database:', error);
//     throw new Error('Failed to fetch categories');
//   }
// }


// // lib/notion/api/fetchCategories.ts
// import { Client } from '@notionhq/client';
// import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
// import { isTextRichTextItemResponse } from '@/lib/notion/types/notionDataType';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export async function fetchCategories(): Promise<string[]> {
//   const databaseId = process.env.NOTION_DATABASE_ID;

//   if (!databaseId) {
//     console.error('[fetchCategories] Missing database ID in environment variables');
//     throw new Error('Environment variable "NOTION_DATABASE_ID" is not defined');
//   }

//   try {
//     // Notion API 호출
//     console.log('[fetchCategories] Querying Notion database...');
//     const response = await notion.databases.query({
//       database_id: databaseId,
//     });

//     console.log('[fetchCategories] Notion API Response:', response);

//     // 데이터 변환 로직
//     return response.results
//       .filter((item): item is PageObjectResponse => 'properties' in item)
//       .map((item) => {
//         const nameProperty = item.properties.name;

//         // nameProperty가 없거나 title 타입이 아닐 경우 처리
//         if (!nameProperty || nameProperty.type !== 'title') {
//           console.warn(`[fetchCategories] Invalid name property in item: ${JSON.stringify(item)}`);
//           return 'No Title';
//         }

//         // RichTextItemResponse 검사 및 title 추출
//         const firstTitle = nameProperty.title[0];
//         if (firstTitle && isTextRichTextItemResponse(firstTitle)) {
//           return firstTitle.text.content;
//         } else {
//           console.warn(`[fetchCategories] Title is missing or invalid: ${JSON.stringify(nameProperty)}`);
//           return 'No Title';
//         }
//       });
//   } catch (error) {
//     console.error('[fetchCategories] Error fetching categories from Notion:', error);
//     throw error;
//   }
// }
// /lib/notion/api/fetchCategories.ts
// import { Client } from '@notionhq/client';
// import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export async function fetchCategories(): Promise<string[]> {
//   const databaseId = process.env.NOTION_DATABASE_ID;
//   if (!databaseId) {
//     throw new Error('NOTION_DATABASE_ID is missing in environment variables');
//   }

//   try {
//     console.log('[fetchCategories] Querying Notion database...');
//     const response = await notion.databases.query({ database_id: databaseId });
//     console.log('[fetchCategories] Notion API response:', JSON.stringify(response, null, 2));

//     return response.results
//       .filter((item): item is PageObjectResponse => 'properties' in item)
//       .map((item) => {
//         const categoryProperty = item.properties.category;
//         if (categoryProperty?.type === 'select' && categoryProperty.select?.name) {
//           return categoryProperty.select.name;
//         }
//         return null;
//       })
//       .filter((category): category is string => category !== null);
//   } catch (error: unknown) {
//     // error 객체가 Error 타입인지 확인
//     if (error instanceof Error) {
//       console.error(
//         '[fetchCategories] Error during Notion API query:',
//         error.message,
//         error.stack
//       );
//     } else {
//       console.error(
//         '[fetchCategories] An unknown error occurred:',
//         JSON.stringify(error)
//       );
//     }
//     throw new Error('Failed to fetch categories from Notion API');
//   }
// }


// import { Client } from '@notionhq/client';
// import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export async function fetchCategories(): Promise<string[]> {
//   const databaseId = process.env.NOTION_DATABASE_ID;

//   if (!databaseId) {
//     throw new Error('Missing NOTION_DATABASE_ID in environment variables');
//   }

//   try {
//     console.log('[fetchCategories] Querying Notion database...');
//     const response = await notion.databases.query({ database_id: databaseId });

//     console.log('[fetchCategories] Response:', JSON.stringify(response, null, 2));

//     return response.results
//       .filter((item): item is PageObjectResponse => 'properties' in item)
//       .map((item) => {
//         const categoryProperty = item.properties.Category; // 정확한 필드 이름 확인 필요
//         if (
//           categoryProperty?.type === 'select' &&
//           categoryProperty.select?.name
//         ) {
//           return categoryProperty.select.name;
//         }
//         return 'Unknown Category';
//       });
//   } catch (error) {
//     console.error('[fetchCategories] Error during Notion API query:', error);
//     throw error;
//   }
// }


///진행중
// import { Client } from '@notionhq/client';
// import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export async function fetchCategories(): Promise<string[]> {
//   const databaseId = process.env.NOTION_DATABASE_ID;

//   if (!databaseId) {
//     console.error('[fetchCategories] Missing NOTION_DATABASE_ID');
//     throw new Error('Missing NOTION_DATABASE_ID in environment variables');
//   }

//   try {
//     console.log('[fetchCategories] Fetching data from Notion database...');
//     const response = await notion.databases.query({ database_id: databaseId });

//     console.log('[fetchCategories] Raw Notion response:', JSON.stringify(response, null, 2));

//     return response.results
//       .filter((item): item is PageObjectResponse => 'properties' in item)
//       .map((item) => {
//         const categoryProperty = item.properties.category; // 'category' 필드 확인
//         if (categoryProperty?.type === 'select' && categoryProperty.select?.name) {
//           return categoryProperty.select.name;
//         }
//         console.warn('[fetchCategories] Skipping item without valid category:', item);
//         return 'Unknown';
//       });
//   } catch (error) {
//     console.error('[fetchCategories] Error during Notion API query:', error);
//     throw error;
//   }
// }

// import { Client } from '@notionhq/client';
// import {
//   PageObjectResponse,
//   PartialPageObjectResponse,
//   DatabaseObjectResponse,
//   PartialDatabaseObjectResponse,
// } from '@notionhq/client/build/src/api-endpoints';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// function isPageObjectResponse(
//   item: PageObjectResponse | PartialPageObjectResponse | DatabaseObjectResponse | PartialDatabaseObjectResponse
// ): item is PageObjectResponse {
//   return 'properties' in item;
// }

// export async function fetchCategories(): Promise<string[]> {
//   const databaseId = process.env.NOTION_DATABASE_ID;

//   if (!databaseId) {
//     throw new Error('Environment variable "NOTION_DATABASE_ID" is not defined.');
//   }

//   try {
//     const response = await notion.databases.query({ database_id: databaseId });
//     console.log('[fetchCategories] Response:', JSON.stringify(response, null, 2));

//     return response.results
//       .filter(isPageObjectResponse) // Type guard to ensure 'properties' exists
//       .map((item) => {
//         const categoryProperty = item.properties?.category;
//         if (categoryProperty?.type === 'select' && categoryProperty.select?.name) {
//           return categoryProperty.select.name;
//         }
//         return 'Unknown Category';
//       });
//   } catch (error) {
//     let errorMessage = 'Unknown error occurred';
//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }
//     console.error('[fetchCategories] Error:', errorMessage);
//     throw new Error(errorMessage);
//   }
// }


//진행중2
// lib/notion/api/fetchCategories.ts
// import { Client } from '@notionhq/client';
// import {
//   DatabaseObjectResponse,
//   PageObjectResponse,
//   PartialDatabaseObjectResponse,
//   PartialPageObjectResponse,
// } from '@notionhq/client/build/src/api-endpoints';



// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export async function fetchCategories(): Promise<string[]> {
//   const databaseId = process.env.NOTION_DATABASE_ID;

//   if (!databaseId) {
//     throw new Error('Environment variable "NOTION_DATABASE_ID" is not defined.');
//   }

//   try {
//     const response = await notion.databases.query({ database_id: databaseId });
//     console.log('[fetchCategories] API Full Response:', JSON.stringify(response, null, 2));

//     return response.results
//       .filter((item): item is PageObjectResponse => isPageObjectResponse(item))
//       .map((item) => {
//         const categoryProperty = item.properties?.category; // 필드 이름 확인
//         if (categoryProperty?.type === 'select' && categoryProperty.select?.name) {
//           return categoryProperty.select.name;
//         }
//         return 'Unknown Category';
//       });
//   } catch (error) {
//     console.error('[fetchCategories] Error:', error instanceof Error ? error.message : 'Unknown error');
//     throw new Error(error instanceof Error ? error.message : 'Failed to fetch categories.');
//   }
// }

// function isPageObjectResponse(
//   item:
//     | PageObjectResponse
//     | PartialPageObjectResponse
//     | PartialDatabaseObjectResponse
//     | DatabaseObjectResponse
// ): item is PageObjectResponse {
//   return (
//     'properties' in item &&
//     item.object === 'page'
//   );
// }

// import { Client } from '@notionhq/client';
// import { QueryDatabaseResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export async function fetchCategories() {
//   const databaseId = process.env.NOTION_DATABASE_ID!;
//   console.log("NOTION_DATABASE_ID:", process.env.NOTION_DATABASE_ID);
  
//   try {
//     const response: QueryDatabaseResponse = await notion.databases.query({
//       database_id: databaseId,
//     });

//     console.log('API Response:', JSON.stringify(response, null, 2));

//     // 타입을 명시적으로 지정
//     const categories = response.results
//       .filter((item): item is PageObjectResponse => 'properties' in item) // 타입 가드 추가
//       .map((item) => {
//         const categoryProperty = item.properties?.category;

//         // Select 타입인지 확인 후 값 추출
//         if (categoryProperty?.type === 'select' && categoryProperty.select?.name) {
//           return categoryProperty.select.name;
//         }
//         return 'Unknown Category';
//       });

//     return categories;
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     throw new Error('Failed to fetch categories');
//   }
// }


// lib/notion/api/fetchCategories.ts
// import { notion, NOTION_DATABASE_ID } from '../database';

// export const fetchCategoryOptions = async (): Promise<string[]> => {
//   try {
//     // 데이터베이스의 속성 가져오기
//     const databaseInfo = await notion.databases.retrieve({
//       database_id: NOTION_DATABASE_ID,
//     });

//     // category 속성의 select 옵션 가져오기
//     const categoryProperty = databaseInfo.properties['category'];
//     if (categoryProperty?.type === 'select') {
//       const options = categoryProperty.select.options.map((option) => option.name);
//       console.log('Available categories:', options);
//       return options;
//     }

//     throw new Error('Category property not found or is not a select type');
//   } catch (error) {
//     console.error('Error fetching category options:', error);
//     throw error;
//   }
// };


//카테고리 목록 조회
//lib/notion/api/fetchCategories.ts
// import { Client } from '@notionhq/client';
// import { NextApiRequest, NextApiResponse } from 'next';

// // Notion API 응답 타입 정의
// type NotionResult = {
//   id: string;
//   properties: Record<string, unknown>;
//   [key: string]: unknown;
// };

// type NotionResponse = {
//   object: string;
//   results: NotionResult[];
//   next_cursor: string | null;
//   has_more: boolean;
// };

// // Notion 클라이언트 초기화
// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export default async function fetchCategories(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     console.log('[DEBUG] NOTION_API_KEY:', process.env.NOTION_API_KEY);
//     console.log('[DEBUG] NOTION_DATABASE_ID:', process.env.NOTION_DATABASE_ID);

//     if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
//       throw new Error('Missing Notion API Key or Database ID');
//     }

//     // Notion 데이터베이스 쿼리
//     const response = (await notion.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID!,
//     })) as NotionResponse;

//     console.log('[DEBUG] Notion Response:', response);

//     res.status(200).json(response.results);
//   } catch (error: unknown) {
//     console.error('[ERROR] API Handler Error:', error);

//     res.status(500).json({
//       error: 'Internal Server Error',
//       message: error instanceof Error ? error.message : 'Unknown error occurred',
//     });
//   }
// }
// lib/notion/api/fetchCategories.ts
// import { notion } from '../database';
// import { QueryDatabaseResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// export const fetchCategories = async (): Promise<string[]> => {
//   try {
//     const response: QueryDatabaseResponse = await notion.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID!,
//     });

//     const categories = response.results
//       .filter((item): item is PageObjectResponse => 'properties' in item)
//       .map((page) => page.properties.category?.select?.name)
//       .filter((category): category is string => !!category);

//     return [...new Set(categories)];
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     throw error;
//   }
// };


//카테고리만 필터링
import { PageObjectResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { notion } from "../client";

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response: QueryDatabaseResponse = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
    });

    const categories = response.results
      .filter((item): item is PageObjectResponse => "properties" in item)
      .map((page) => {
        const categoryProperty = page.properties.category;

        if (
          categoryProperty?.type === "select" &&
          categoryProperty.select?.name
        ) {
          return categoryProperty.select.name;
        }

        return null; // 유효하지 않으면 null 반환
      })
      .filter((category): category is string => !!category); // null 제거

    return [...new Set(categories)]; // 중복 제거
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
