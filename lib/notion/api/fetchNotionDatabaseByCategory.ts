// // src/lib/notion/fetchNotionDatabaseByCategory.ts
// import { fetchNotionDatabase } from './fetchNotionDatabase';
// import { isPageObjectResponse } from '@/types/notionDataType';
// import { NotionPageItem } from '@/types/notionDataType';


// export async function fetchNotionDatabaseByCategory(category: string): Promise<NotionPageItem[]> {
//   console.log(`[Debug] Fetching database for category: ${category}`);
//   try {
//     const results = await fetchNotionDatabase();
//     console.log('[Debug] Results from Notion Database:', results);

//     // 필터링 및 데이터 매핑
//     const filteredResults = results.filter(isPageObjectResponse).filter((page) => {
//       const isMatch =
//         page.properties.category?.type === 'select' &&
//         page.properties.category.select?.name === category;

//       console.log(`[Debug] Page ID: ${page.id}, Matches category "${category}": ${isMatch}`);
//       return isMatch;
//     });

//     const mappedResults = filteredResults.map((page) => {
//       const slugProperty = page.properties.slug;
//       const slug =
//         slugProperty.type === 'rich_text' && slugProperty.rich_text.length > 0
//           ? slugProperty.rich_text[0].plain_text
//           : `no-slug-${page.id}`;
//       return { slug, post: page };
//     });

//     console.log(`[Debug] Filtered and mapped results for category "${category}":`, mappedResults);
//     return mappedResults;
//   } catch (error) {
//     console.error('[fetchNotionDatabaseByCategory] Error:', error);
//     throw new Error('Failed to fetch or process data from Notion database');
//   }
// }


// src/lib/notion/fetchNotionDatabaseByCategory.ts
// import { notion } from '../client'; // Notion 클라이언트 import
// import {
//   PageObjectResponse,
//   RichTextItemResponse,
//   PartialPageObjectResponse,
//   DatabaseObjectResponse,
//   PartialDatabaseObjectResponse,
// } from '@notionhq/client/build/src/api-endpoints';

// // 타입 가드 함수: PageObjectResponse인지 확인
// function isFullPageObjectResponse(
//   value: PageObjectResponse | PartialPageObjectResponse | PartialDatabaseObjectResponse | DatabaseObjectResponse
// ): value is PageObjectResponse {
//   return 'properties' in value; // properties가 있는지 체크
// }

// // 타입 가드 함수: title 속성 검사
// function isTitleProperty(property: PageObjectResponse['properties'][string] | undefined): property is { type: 'title'; title: RichTextItemResponse[]; id: string } {
//   return property?.type === 'title';
// }

// // 파일 속성 타입 가드
// export function isFilesProperty(property: PageObjectResponse['properties'][string] | undefined): property is {
//   id: string;
//   type: 'files';
//   files: Array<{
//     type: 'file';
//     file: { url: string; expiry_time: string };
//     name: string;
//   } | {
//     type: 'external';
//     external: { url: string };
//     name: string;
//   }>;
// } {
//   return property?.type === 'files';
// }

// // Notion 데이터에서 특정 카테고리의 포스트 정보를 가져오는 함수
// export const fetchNotionDatabaseByCategory = async (category: string) => {
//   try {
//     // Notion 데이터베이스에서 category에 해당하는 데이터를 쿼리
//     const response = await notion.databases.query({
//       database_id: 'DATABASE_ID', // 실제 Notion DB ID로 바꿔주세요
//       filter: {
//         property: 'category',
//         select: {
//           equals: category,
//         },
//       },
//     });

//     // 받아온 데이터를 NotionPageItem 타입에 맞게 변환
//     const notionPageItems = response.results.map((page) => {
//       // 페이지가 PageObjectResponse인지 확인
//       if (!isFullPageObjectResponse(page)) {
//         throw new Error('Invalid page object');
//       }

//       // title 속성 검사
//       const titleProperty = page.properties.title;
//       if (!isTitleProperty(titleProperty)) {
//         throw new Error('Invalid title property');
//       }

//       // thumbnailUrl 속성 검사 (기존 isFilesProperty 사용)
//       const thumbnailProperty = page.properties.thumbnailUrl;
//       if (thumbnailProperty && !isFilesProperty(thumbnailProperty)) {
//         throw new Error('Invalid thumbnailUrl property');
//       }

//       return {
//         slug: page.properties.slug, // 페이지의 slug 정보
//         post: {
//           id: page.id, // 페이지의 고유 ID
//           properties: {
//             title: titleProperty.title, // title 설정
//             thumbnailUrl: thumbnailProperty ? thumbnailProperty.files : undefined, // thumbnailUrl 설정 (없으면 undefined)
//           },
//           created_time: page.created_time, // 페이지 생성 시간
//         },
//       };
//     });

//     // NotionPageItem 배열 반환
//     return notionPageItems;

//   } catch (error) {
//     console.error('Error fetching notion database:', error);
//     throw new Error('Failed to fetch database');
//   }
// };


//진행중
//lib/notion/api/fetchNotionDatabaseByCategory.ts
// import { Client } from '@notionhq/client';
// import { PageObjectResponse, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
// import { NotionPageItem } from '@/lib/notion/types/notionDataType';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });


// function isFileType(
//   file: { type?: string; file?: { url: string; expiry_time: string }; external?: { url: string }; name: string }
// ): file is { type: "file"; file: { url: string; expiry_time: string }; name: string } {
//   return file.type === "file" && file.file !== undefined;
// }

// function isExternalType(
//   file: { type?: string; file?: { url: string; expiry_time: string }; external?: { url: string }; name: string }
// ): file is { type: "external"; external: { url: string }; name: string } {
//   return file.type === "external" && file.external !== undefined;
// }



// export async function fetchNotionDatabaseByCategory(category?: string): Promise<NotionPageItem[]> {
//   const databaseId = process.env.NOTION_DATABASE_ID;
//   if (!databaseId) {
//     throw new Error('Database ID is missing in environment variables.');
//   }

//   // 필터 적용
//   const filters = category
//     ? {
//         property: 'Category',
//         select: {
//           equals: category,
//         },
//       }
//     : undefined;

//   // Notion API 호출
//   const response: QueryDatabaseResponse = await notion.databases.query({
//     database_id: databaseId,
//     filter: filters,
//   });

//   // 결과 매핑
//  const items: NotionPageItem[] = response.results
//   .filter((page): page is PageObjectResponse => 'properties' in page)
//   .map((page) => {
//     const slugProperty = page.properties.slug;
//     const slug =
//       slugProperty?.type === 'rich_text' && slugProperty.rich_text.length > 0
//         ? slugProperty.rich_text[0].plain_text
//         : `no-slug-${page.id}`;

//     const thumbnailProperty = page.properties.thumbnailUrl;
//     let thumbnailUrl: NotionPageItem['post']['properties']['thumbnailUrl'] = undefined;

//     // Thumbnail 처리
//    if (thumbnailProperty?.type === 'files' && thumbnailProperty.files.length > 0) {
//   thumbnailUrl = {
//     type: 'files',
//     id: thumbnailProperty.id,
//     files: thumbnailProperty.files.map((file) => {
//       if (isFileType(file)) {
//         return {
//           type: 'file',
//           file: file.file, // 명시적으로 file 속성 사용
//           name: file.name,
//         };
//       } else if (isExternalType(file)) {
//         return {
//           type: 'external',
//           external: file.external, // 명시적으로 external 속성 사용
//           name: file.name,
//         };
//       } else {
//         throw new Error(`Unexpected file type: ${JSON.stringify(file)}`);
//       }
//     }),
//   };
// }


//     return {
//       slug,
//       post: {
//         id: page.id,
//         properties: {
//           title:
//             page.properties.title?.type === 'title'
//               ? page.properties.title
//               : undefined,
//           thumbnailUrl, // 명시적으로 타입을 맞춤
//         },
//         created_time: page.created_time,
//       },
//     };
//   });

// return items;

// }


//진행중2
// // lib/notion/api/fetchNotionDatabaseByCategory.ts
// import { Client } from '@notionhq/client';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// // 유효한 category 값을 동적으로 가져오는 함수
// const fetchCategoryOptions = async () => {
//   try {
//     // 데이터베이스 메타 정보 가져오기
//     const databaseInfo = await notion.databases.retrieve({
//       database_id: process.env.NOTION_DATABASE_ID!,
//     });

//     // category 속성 가져오기
//     const categoryProperty = databaseInfo.properties["category"];
//     if (categoryProperty?.type === "select") {
//       // select 옵션 이름 배열 반환
//       const options = categoryProperty.select.options.map((option) => option.name);
//       console.log("Available categories:", options);
//       return options;
//     }

//     throw new Error("Category property not found or is not a select type");
//   } catch (error) {
//     console.error("Error fetching category options:", error);
//     throw error;
//   }
// };

// export const fetchNotionDatabaseByCategory = async (category: string) => {
//   console.log("Querying database with category:", category);

//   try {
//     // 유효한 category 옵션 가져오기
//     const validCategories = await fetchCategoryOptions();

//     // 유효하지 않은 category 값이면 에러 처리
//     if (!validCategories.includes(category)) {
//       console.warn(`Invalid category: ${category}. Must be one of: ${validCategories.join(", ")}`);
//       return [];
//     }

//     // 유효한 category 값으로 데이터베이스 쿼리
//     const queryResponse = await notion.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID!,
//       filter: {
//         property: "category",
//         select: {
//           equals: category,
//         },
//       },
//     });

//     console.log("Query Response Results:", JSON.stringify(queryResponse.results, null, 2));
//     return queryResponse.results;
//   } catch (error) {
//     console.error("Error querying database:", error);
//     throw error;
//   }
// };



// // lib/notion/api/fetchNotionDatabaseByCategory.ts
// import { Client } from '@notionhq/client';
// import { NotionPageItem } from '@/lib/notion/types/notionDataType';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export const fetchNotionDatabaseByCategory = async (
//   category: string
// ): Promise<NotionPageItem[]> => {
//   try {
//     // 데이터베이스에서 카테고리별로 페이지를 가져옵니다.
//     const queryResponse = await notion.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID!,
//       filter: {
//         property: 'category',
//         select: {
//           equals: category,
//         },
//       },
//     });

//     // 반환된 데이터를 NotionPageItem[]로 매핑
//     const results = queryResponse.results.map((page) => {
//       if (!('properties' in page)) throw new Error('Invalid page structure');
//       return {
//         slug: page.properties.slug?.rich_text[0]?.plain_text || '',
//         post: page,
//       } as NotionPageItem;
//     });

//     return results;
//   } catch (error) {
//     console.error('Error querying database by category:', error);
//     throw error;
//   }
// };


//카테고리별 db
// lib/notion/api/fetchNotionDatabaseByCategory.ts
import { notion } from "@/lib/notion/client";
import {
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";


type FileObject = {
  type: "file";
  file: { url: string; expiry_time: string };
  name: string;
};

type ExternalObject = {
  type: "external";
  external: { url: string };
  name: string;
};

type FileValue = FileObject | ExternalObject;

function isFileProperty(file: FileValue): file is FileObject {
  return file.type === "file";
}

function isExternalProperty(file: FileValue): file is ExternalObject {
  return file.type === "external";
}

export async function fetchNotionDatabaseByCategory(category: string) {
  const response: QueryDatabaseResponse = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "category",
      select: { equals: category },
    },
  });

  return response.results
    .filter((result): result is PageObjectResponse => "properties" in result)
    .map((post) => {
      const properties = post.properties;

      let thumbnailUrl = "/default-thumbnail.png";
      if (
        properties.thumbnailUrl?.type === "files" &&
        properties.thumbnailUrl.files.length > 0
      ) {
        const file = properties.thumbnailUrl.files[0] as FileValue;
        if (isFileProperty(file)) {
          thumbnailUrl = file.file.url;
        } else if (isExternalProperty(file)) {
          thumbnailUrl = file.external.url;
        }
      }

      return {
        id: post.id,
        slug:
          properties.slug?.type === "rich_text"
            ? properties.slug.rich_text[0]?.plain_text
            : "no-slug",
        title:
          properties.title?.type === "title"
            ? properties.title.title[0]?.plain_text
            : "Untitled",
        created_time: post.created_time,
        thumbnailUrl,
      };
    });
}
