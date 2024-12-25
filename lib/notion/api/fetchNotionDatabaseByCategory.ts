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
// import { notion } from "@/lib/notion/client";
// import {
//   PageObjectResponse,
//   QueryDatabaseResponse,
// } from "@notionhq/client/build/src/api-endpoints";


// type FileObject = {
//   type: "file";
//   file: { url: string; expiry_time: string };
//   name: string;
// };

// type ExternalObject = {
//   type: "external";
//   external: { url: string };
//   name: string;
// };

// type FileValue = FileObject | ExternalObject;

// function isFileProperty(file: FileValue): file is FileObject {
//   return file.type === "file";
// }

// function isExternalProperty(file: FileValue): file is ExternalObject {
//   return file.type === "external";
// }

// export async function fetchNotionDatabaseByCategory(category: string) {
//   const response: QueryDatabaseResponse = await notion.databases.query({
//     database_id: process.env.NOTION_DATABASE_ID!,
//     filter: {
//       property: "category",
//       select: { equals: category },
//     },
//   });

//   return response.results
//     .filter((result): result is PageObjectResponse => "properties" in result)
//     .map((post) => {
//       const properties = post.properties;

//       let thumbnailUrl = "/default-thumbnail.png";
//       if (
//         properties.thumbnailUrl?.type === "files" &&
//         properties.thumbnailUrl.files.length > 0
//       ) {
//         const file = properties.thumbnailUrl.files[0] as FileValue;
//         if (isFileProperty(file)) {
//           thumbnailUrl = file.file.url;
//         } else if (isExternalProperty(file)) {
//           thumbnailUrl = file.external.url;
//         }
//       }

//       return {
//         id: post.id,
//         slug:
//           properties.slug?.type === "rich_text"
//             ? properties.slug.rich_text[0]?.plain_text
//             : "no-slug",
//         title:
//           properties.title?.type === "title"
//             ? properties.title.title[0]?.plain_text
//             : "Untitled",
//         created_time: post.created_time,
//         thumbnailUrl,
//       };
//     });
// }



//카테고리별 db
// lib/notion/api/fetchNotionDatabaseByCategory.ts
import { notion } from "@/lib/notion/client";
import {
  PageObjectResponse,
  QueryDatabaseResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";
import { ExternalObject, FileObject, FileValue } from "../types";


function isFileProperty(file: FileValue): file is FileObject {
  return file.type === "file";
}

function isExternalProperty(file: FileValue): file is ExternalObject {
  return file.type === "external";
}

export async function fetchNotionDatabaseByCategory(category: string) {
  const queryOptions: QueryDatabaseParameters = {
    database_id: process.env.NOTION_DATABASE_ID!,
  };

  if (category !== "All") {
    queryOptions.filter = {
      property: "category",
      select: { equals: category },
    };
  }

  const response: QueryDatabaseResponse = await notion.databases.query(queryOptions);

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
            ? properties.slug.rich_text[0]?.plain_text || "no-slug"
            : "no-slug",
        title:
          properties.title?.type === "title"
            ? properties.title.title[0]?.plain_text || "Untitled"
            : "Untitled",
        created_time: post.created_time,
        thumbnailUrl,
        category:
          properties.category?.type === "select"
            ? properties.category.select?.name || "Uncategorized"
            : "Uncategorized",
        tags:
          properties.tags?.type === "multi_select"
            ? properties.tags.multi_select.map(tag => tag.name)
            : [],
      };
    });
}
