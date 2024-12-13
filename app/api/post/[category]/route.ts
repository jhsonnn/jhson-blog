//특정 카테고리의 게시글 조회
// //app/api/post/[category]/route.ts
// import { NextResponse } from "next/server";
// import { notion } from "@/lib/notion/client";
// import {
//   PageObjectResponse,
// } from "@notionhq/client/build/src/api-endpoints";
// import { isTitleProperty, isRichTextProperty } from "@/lib/notion/types/notionDataType";

// export async function GET(
//    { params }: { params: { category: string } }
// ) {
//   const { category } = params;

//   try {
//     // Notion 데이터베이스 쿼리
//     const response = await notion.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID!,
//       filter: {
//         property: "category",
//         select: {
//           equals: category,
//         },
//       },
//     });

//     // 결과 매핑
//     const posts = response.results
//       .filter((post): post is PageObjectResponse => "properties" in post)
//       .map((post) => {
//         // title 프로퍼티 처리
//         const titleProperty = post.properties.title;
//         const title =
//           isTitleProperty(titleProperty) &&
//           titleProperty.title?.[0]?.plain_text
//             ? titleProperty.title[0].plain_text
//             : "Untitled";

//         // slug 프로퍼티 처리
//         const slugProperty = post.properties.slug;
//         const slug =
//           isRichTextProperty(slugProperty) &&
//           slugProperty.rich_text?.[0]?.plain_text
//             ? slugProperty.rich_text[0].plain_text
//             : "no-slug";

//         // 날짜 처리
//         const created_time = post.created_time;

//         return { id: post.id, slug, title, created_time };
//       });

//     return NextResponse.json(posts);
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch posts" },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { Client } from "@notionhq/client";
// import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
// import { isRichTextProperty, isTitleProperty } from "@/lib/notion/types/notionDataType";

// // Notion API 클라이언트 초기화
// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// // `Property` 타입 추출
// // type Property = PageObjectResponse['properties'][keyof PageObjectResponse['properties']];


// export async function GET(req: Request, { params }: { params: { category: string } }) {
//   const { category } = params;

//   try {
//     const response = await notion.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID!,
//       filter: {
//         property: "category",
//         select: { equals: category },
//       },
//     });

//     const posts = response.results
//       .filter((post): post is PageObjectResponse => "properties" in post)
//       .map((post) => {
//         const titleProperty = post.properties.title;
//         const slugProperty = post.properties.slug;

//         const title = isTitleProperty(titleProperty)
//           ? titleProperty.title?.[0]?.plain_text || "Untitled"
//           : "Untitled";

//         const slug = isRichTextProperty(slugProperty)
//           ? slugProperty.rich_text?.[0]?.plain_text || "no-slug"
//           : "no-slug";

//         return {
//           id: post.id,
//           title,
//           slug,
//           created_time: post.created_time,
//         };
//       });

//     return NextResponse.json(posts);
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch posts" },
//       { status: 500 }
//     );
//   }
// }

// /////
// import { NextResponse } from "next/server";
// import { Client } from "@notionhq/client";
// import {
//   QueryDatabaseResponse,
//   PageObjectResponse,
// } from "@notionhq/client/build/src/api-endpoints";

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export async function GET(
//   req: Request,
//   { params }: { params: { category: string } }
// ) {
//   const { category } = params;

//   try {
//     // Notion 데이터베이스 쿼리
//     const response: QueryDatabaseResponse = await notion.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID!,
//       filter: {
//         property: "category",
//         select: { equals: category },
//       },
//     });

//     if (!response.results.length) {
//       return NextResponse.json(
//         { error: "No posts found" },
//         { status: 404 }
//       );
//     }

//     const posts = response.results
//       .filter((post): post is PageObjectResponse => "properties" in post)
//       .map((post) => ({
//         id: post.id,
//         title:
//           post.properties.title?.type === "title" &&
//           post.properties.title.title[0]?.plain_text
//             ? post.properties.title.title[0].plain_text
//             : "Untitled",
//         slug:
//           post.properties.slug?.type === "rich_text" &&
//           post.properties.slug.rich_text[0]?.plain_text
//             ? post.properties.slug.rich_text[0].plain_text
//             : "no-slug",
//         created_time: post.created_time,
//       }));

//     return NextResponse.json(posts);
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch posts" },
//       { status: 500 }
//     );
//   }
// }





//진행중
//app/api/post/[category]/route.ts
// import { NextResponse } from "next/server";
// import { Client } from "@notionhq/client";
// import {
//   QueryDatabaseResponse,
//   PageObjectResponse,
// } from "@notionhq/client/build/src/api-endpoints";

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// function isFileProperty(
//   item: { file?: { url: string; expiry_time: string }; external?: { url: string } }
// ): item is { file: { url: string; expiry_time: string } } {
//   return item.file !== undefined;
// }

// function isExternalProperty(
//   item: { file?: { url: string; expiry_time: string }; external?: { url: string } }
// ): item is { external: { url: string } } {
//   return item.external !== undefined;
// }

// export async function GET(
//   req: Request,
//   { params }: { params: { category: string } }
// ) {
//   const { category } = params;

//   try {
//     // Notion 데이터베이스 쿼리
//     const response: QueryDatabaseResponse = await notion.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID!,
//       filter: {
//         property: "category",
//         select: { equals: category },
//       },
//     });

//     if (!response.results.length) {
//       return NextResponse.json({ error: "No posts found" }, { status: 404 });
//     }

//     const posts = response.results
//       .filter((post): post is PageObjectResponse => "properties" in post)
//       .map((post) => ({
//         id: post.id,
//         title:
//           post.properties.title?.type === "title" &&
//           post.properties.title.title[0]?.plain_text
//             ? post.properties.title.title[0].plain_text
//             : "Untitled",
//         slug:
//           post.properties.slug?.type === "rich_text" &&
//           post.properties.slug.rich_text[0]?.plain_text
//             ? post.properties.slug.rich_text[0].plain_text
//             : "no-slug",
//         created_time: post.created_time,
//         thumbnailUrl:
//           post.properties.thumbnail?.type === "files" &&
//           post.properties.thumbnail.files.length > 0
//             ? isFileProperty(post.properties.thumbnail.files[0])
//               ? post.properties.thumbnail.files[0].file.url
//               : isExternalProperty(post.properties.thumbnail.files[0])
//               ? post.properties.thumbnail.files[0].external.url
//               : "/default-thumbnail.png"
//             : "/default-thumbnail.png",
//       }));

//     return NextResponse.json(posts);
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch posts" },
//       { status: 500 }
//     );
//   }
// }




// import { NextResponse } from "next/server";
// import { Client } from "@notionhq/client";
// import {
//   QueryDatabaseResponse,
//   PageObjectResponse,
// } from "@notionhq/client/build/src/api-endpoints";

// // Notion 클라이언트 초기화
// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export async function GET(
//   req: Request,
//   { params }: { params: { category: string } }
// ) {
//   const { category } = params;

//   try {
//     // Notion 데이터베이스 쿼리
//     const response: QueryDatabaseResponse = await notion.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID!,
//       filter: {
//         property: "category",
//         select: { equals: category },
//       },
//     });

//     console.log("Query response:", response.results);

//     // 데이터가 없을 경우 처리
//     if (!response.results.length) {
//       return NextResponse.json({ error: "No posts found" }, { status: 404 });
//     }

//     // Post 데이터 변환
//     const posts = response.results
//       .filter((result): result is PageObjectResponse => "properties" in result)
//       .map((post) => {
//         const properties = post.properties as PageObjectResponse["properties"];

//         const title =
//           properties.title?.type === "title" &&
//           properties.title.title.length > 0
//             ? properties.title.title[0].plain_text
//             : "Untitled";

//         const slug =
//           properties.slug?.type === "rich_text" &&
//           properties.slug.rich_text.length > 0
//             ? properties.slug.rich_text[0].plain_text
//             : "no-slug";

//         const thumbnailUrl =
//           properties.thumbnail?.type === "files" &&
//           properties.thumbnail.files.length > 0
//             ? properties.thumbnail.files[0].type === "file"
//               ? properties.thumbnail.files[0].file.url
//               : properties.thumbnail.files[0].type === "external"
//               ? properties.thumbnail.files[0].external.url
//               : "/default-thumbnail.png"
//             : "/default-thumbnail.png";

//         return {
//           id: post.id,
//           title,
//           slug,
//           created_time: post.created_time,
//           thumbnailUrl,
//         };
//       });

//     return NextResponse.json(posts);
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch posts" },
//       { status: 500 }
//     );
//   }
// }

// app/api/post/[category]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

type FileProperty = {
  type: "file";
  file: {
    url: string;
    expiry_time: string;
  };
};

type ExternalProperty = {
  type: "external";
  external: {
    url: string;
  };
};

type ThumbnailFile = FileProperty | ExternalProperty;

function isFileProperty(file: ThumbnailFile): file is FileProperty {
  return file.type === "file";
}

function isExternalProperty(file: ThumbnailFile): file is ExternalProperty {
  return file.type === "external";
}

function isPageObjectResponse(result: unknown): result is PageObjectResponse {
  return (
    typeof result === "object" &&
    result !== null &&
    "properties" in result &&
    "created_time" in result
  );
}

export async function GET(_req: NextRequest, { params }: { params: { category?: string } }) {
  const { category } = params;

  //console.log('Received Params:', params);

  if (!params || !params.category) {
    return new Response(JSON.stringify({ error: 'Category is required' }), { 
      status: 400, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  try {
    if (!category) {
      return NextResponse.json(
        { error: 'Category parameter is missing or undefined.' },
        { status: 400 }
      );
    }

    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: 'category',
        select: { equals: category },
      },
    });

    console.log('Fetched Database Query Response:', response);
    
    const posts = response.results
      .filter(isPageObjectResponse)
      .map((post) => {
        const properties = post.properties;

        let thumbnailUrl = '/default-thumbnail.png';
        if (
          properties.thumbnailUrl?.type === 'files' &&
          properties.thumbnailUrl.files.length > 0
        ) {
          const file = properties.thumbnailUrl.files[0] as ThumbnailFile;
          thumbnailUrl = isFileProperty(file)
            ? file.file.url
            : isExternalProperty(file)
            ? file.external.url
            : thumbnailUrl;
        }

        return {
          id: post.id,
          slug:
            properties.slug?.type === 'rich_text'
              ? properties.slug.rich_text[0]?.plain_text || 'no-slug'
              : 'no-slug',
          title:
            properties.title?.type === 'title'
              ? properties.title.title[0]?.plain_text || 'Untitled'
              : 'Untitled',
          created_time: post.created_time,
          thumbnailUrl,
        };
      });

    //console.log('Processed Posts:', posts);
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
