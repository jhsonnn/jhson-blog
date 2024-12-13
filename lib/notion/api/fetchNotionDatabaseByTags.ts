// import { notion } from "@/lib/notion/client";
// import {
//   PageObjectResponse,
//   QueryDatabaseResponse,
//   QueryDatabaseParameters,
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

// export async function fetchNotionDatabaseByTags(tag: string) {
//   const queryOptions: QueryDatabaseParameters = {
//     database_id: process.env.NOTION_DATABASE_ID!,
//     filter: {
//       property: "tags",
//       multi_select: { contains: tag }, // 🔥 다중 선택 필터
//     },
//   };

//   const response: QueryDatabaseResponse = await notion.databases.query(queryOptions);

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
//             ? properties.slug.rich_text[0]?.plain_text || "no-slug"
//             : "no-slug",
//         title:
//           properties.title?.type === "title"
//             ? properties.title.title[0]?.plain_text || "Untitled"
//             : "Untitled",
//         created_time: post.created_time,
//         thumbnailUrl,
//         tags: properties.tags?.type === 'multi_select' ? properties.tags.multi_select.map(tag => tag.name) : []
//       };
//     });
// }

//test
// lib/notion/api/fetchNotionDatabaseByCategory.ts
import { notion } from "@/lib/notion/client";
import {
  PageObjectResponse,
  QueryDatabaseResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";
import { FileValue, isExternalProperty, isFileProperty, Post} from "@/lib/notion/types";

export async function fetchNotionDatabaseByCategory(category: string): Promise<Post[]> { // 🔥 반환 타입 지정
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

      const category = properties.category?.type === "select" ? properties.category.select?.name || "Uncategorized" : "Uncategorized";

      const tags =
        properties.tags?.type === "multi_select"
          ? properties.tags.multi_select.map((tag) => tag.name)
          : [];

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
        category,
        tags,
      };
    });
}
