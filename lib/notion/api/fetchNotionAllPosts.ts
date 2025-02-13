// import { isPageObjectResponse } from '@/lib/notion/types';
// import { notionClient } from '../client';


// export async function fetchNotionAllPosts() {
//   const response = await notionClient.databases.query({
//     database_id: process.env.NOTION_DATABASE_ID!,
//   });

//   const posts = response.results
//     .filter(isPageObjectResponse)
//     .map((post) => {
//       const properties = post.properties;

//       const thumbnailUrl =
//         properties.thumbnailUrl?.type === 'files' &&
//         properties.thumbnailUrl.files.length > 0
//           ? properties.thumbnailUrl.files[0].type === 'file'
//             ? properties.thumbnailUrl.files[0].file.url
//             : properties.thumbnailUrl.files[0].type === 'external'
//             ? properties.thumbnailUrl.files[0].external.url
//             : '/default_image.png'
//           : '/default_image.png';

//       return {
//         id: post.id,
//         title: properties.title?.type === 'title' && properties.title.title.length > 0
//           ? properties.title.title[0].plain_text
//           : 'Untitled',
//         slug: properties.slug?.type === 'rich_text' && properties.slug.rich_text.length > 0
//           ? properties.slug.rich_text[0].plain_text
//           : 'no-slug',
//         category: properties.category?.type === 'select' && properties.category.select?.name
//           ? properties.category.select.name
//           : 'none',
//         tags: properties.tags?.type === 'multi_select'
//           ? properties.tags.multi_select.map((tag) => tag.name)
//           : [],
//         created_time: post.created_time,
//         thumbnailUrl,
//       };
//     })
//     .filter((post) => post.category !== 'none'); //none제외

//   return posts;
// }

// //최적화 테스트
// import { notionClient } from "@/lib/notion/client";
// import { isPageObjectResponse } from "@/lib/notion/types";

// export async function fetchNotionAllPosts() {
//   const response = await notionClient.databases.query({
//     database_id: process.env.NOTION_DATABASE_ID!,
//   });

//   return response.results
//     .filter(isPageObjectResponse)
//     .map((post) => {
//       const properties = post.properties;

//       const title =
//         properties.title?.type === "title" && properties.title.title.length > 0
//           ? properties.title.title[0].plain_text
//           : "Untitled";

//       const slug =
//         properties.slug?.type === "rich_text" && properties.slug.rich_text.length > 0
//           ? properties.slug.rich_text[0].plain_text
//           : "no-slug";

//       const category =
//         properties.category?.type === "select" && properties.category.select?.name
//           ? properties.category.select.name
//           : "none";

//       const tags =
//         properties.tags?.type === "multi_select"
//           ? properties.tags.multi_select.map((tag) => tag.name)
//           : [];

//       const thumbnailUrl =
//         properties.thumbnailUrl?.type === "files" &&
//         properties.thumbnailUrl.files.length > 0
//           ? properties.thumbnailUrl.files[0].type === "file"
//             ? properties.thumbnailUrl.files[0].file.url
//             : properties.thumbnailUrl.files[0].type === "external"
//             ? properties.thumbnailUrl.files[0].external.url
//             : "/default_image.png"
//           : "/default_image.png";

//       return {
//         id: post.id,
//         title,
//         slug,
//         category,
//         tags,
//         created_time: post.created_time,
//         thumbnailUrl,
//       };
//     })
//     .filter((post) => post.category !== "none");
// }



// //ISR 테스트
// // lib/notion/api/fetchNotionAllPosts.ts

// import { notionClient } from "@/lib/notion/client";
// import { isPageObjectResponse } from "@/lib/notion/types";

// export async function fetchNotionAllPosts() {
//   const response = await notionClient.databases.query({
//     database_id: process.env.NOTION_DATABASE_ID!,
//   });

//   return response.results
//     .filter(isPageObjectResponse)
//     .map((post) => {
//       const { properties, id, created_time } = post;

//       const title =
//         properties.title?.type === "title" &&
//         properties.title.title.length > 0
//           ? properties.title.title[0].plain_text
//           : "Untitled";

//       const slug =
//         properties.slug?.type === "rich_text" &&
//         properties.slug.rich_text.length > 0
//           ? properties.slug.rich_text[0].plain_text
//           : "no-slug";

//       const category =
//         properties.category?.type === "select" &&
//         properties.category.select?.name
//           ? properties.category.select.name
//           : "none";

//       const tags =
//         properties.tags?.type === "multi_select"
//           ? properties.tags.multi_select.map((tag) => tag.name)
//           : [];

//     const thumbnailUrl =
//   properties.thumbnailUrl?.type === "files" && properties.thumbnailUrl.files.length > 0
//     ? properties.thumbnailUrl.files[0].type === "file"
//       ? properties.thumbnailUrl.files[0].file.url
//       : properties.thumbnailUrl.files[0].type === "external"
//       ? properties.thumbnailUrl.files[0].external.url
//       : "/default_image.png"
//     : "/default_image.png";


//       return {
//         id,
//         title,
//         slug,
//         category,
//         tags,
//         created_time,
//         thumbnailUrl,
//       };
//     })
//     .filter((post) => post.category !== "none");
// }


// //ISR테스트0211
// import { notionClient } from "@/lib/notion/client";
// import { isPageObjectResponse } from "@/lib/notion/types";
// import { Post } from "@/lib/notion/types";

// interface FetchOptions {
//   limit?: number;
// }

// export async function fetchNotionAllPosts(options?: FetchOptions): Promise<Post[]> {
//   const { limit = 10 } = options || {};

//   const response = await notionClient.databases.query({
//     database_id: process.env.NOTION_DATABASE_ID!,
//     page_size: limit,
//   });

//   return response.results
//     .filter(isPageObjectResponse)
//     .map((post) => {
//       const { properties, id, created_time } = post;

//       const title =
//         properties.title?.type === "title" && properties.title.title.length > 0
//           ? properties.title.title[0].plain_text
//           : "Untitled";

//       const slug =
//         properties.slug?.type === "rich_text" && properties.slug.rich_text.length > 0
//           ? properties.slug.rich_text[0].plain_text
//           : "no-slug";

//       const category =
//         properties.category?.type === "select" && properties.category.select?.name
//           ? properties.category.select.name
//           : "none";

//       const tags =
//         properties.tags?.type === "multi_select"
//           ? properties.tags.multi_select.map((tag) => tag.name)
//           : [];

//       const thumbnailUrl =
//         properties.thumbnailUrl?.type === "files" && properties.thumbnailUrl.files.length > 0
//           ? properties.thumbnailUrl.files[0].type === "file"
//             ? properties.thumbnailUrl.files[0].file.url
//             : properties.thumbnailUrl.files[0].type === "external"
//             ? properties.thumbnailUrl.files[0].external.url
//             : "/default_image.png"
//           : "/default_image.png";

//       return {
//         id,
//         title,
//         slug,
//         category,
//         tags,
//         created_time,
//         thumbnailUrl,
//       };
//     })
//     .filter((post) => post.category !== "none");
// }
// import { notionClient } from '@/lib/notion/client';
// import { isPageObjectResponse, Post } from '@/lib/notion/types';

// export async function fetchNotionAllPosts() {
//   console.log('Fetching all posts from Notion...');

//   let posts: Post[] = [];
//   let cursor: string | null | undefined = undefined;

//   do {
//     const response = await notionClient.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID!,
//       start_cursor: cursor,
//       page_size: 15,
//     });

//     const newPosts = response.results
//       .filter(isPageObjectResponse)
//       .map((post) => {
//         const notionDate =
//           post.properties.date?.type === 'date' &&
//           post.properties.date.date?.start
//             ? post.properties.date.date.start
//             : undefined; // `null`을 허용하지 않음

//         return {
//           id: post.id,
//           title:
//             post.properties.title?.type === 'title'
//               ? post.properties.title.title[0]?.plain_text || ''
//               : '',
//           slug:
//             post.properties.slug?.type === 'rich_text'
//               ? post.properties.slug.rich_text[0]?.plain_text || ''
//               : '',
//           category:
//             post.properties.category?.type === 'select'
//               ? post.properties.category.select?.name || ''
//               : '',
//           tags:
//             post.properties.tags?.type === 'multi_select'
//               ? post.properties.tags.multi_select.map((tag) => tag.name)
//               : [],
//           thumbnailUrl:
//             post.properties.thumbnailUrl?.type === 'files' &&
//             post.properties.thumbnailUrl.files.length > 0
//               ? post.properties.thumbnailUrl.files[0].type === 'file'
//                 ? post.properties.thumbnailUrl.files[0].file.url
//                 : post.properties.thumbnailUrl.files[0].type === 'external'
//                 ? post.properties.thumbnailUrl.files[0].external.url
//                 : '/default_image.png'
//               : '/default_image.png',
//           date: notionDate || 'Unknown Date',
//         };
//       });

//     posts = [...posts, ...newPosts];
//     cursor = response.next_cursor ?? undefined;
//   } while (cursor);

//   // 최신 날짜순 정렬
//   posts.sort((a, b) => {
//     const dateA = a.date ? new Date(a.date).getTime() : 0;
//     const dateB = b.date ? new Date(b.date).getTime() : 0;
//     return dateB - dateA;
//   });

//   console.log('Posts fetched:', posts.length);
//   console.log(posts);
//   return posts;
// }



import { notionClient } from '@/lib/notion/client';
import { isPageObjectResponse, Post } from '@/lib/notion/types';

export async function fetchNotionAllPosts() {
  console.log('Fetching all posts from Notion...');

  let posts: Post[] = [];
  let cursor: string | null | undefined = undefined;

  do {
    const response = await notionClient.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      start_cursor: cursor,
      page_size: 15,
    });

    const newPosts = response.results
      .filter(isPageObjectResponse)
      .map((post) => {
        const notionDate =
          post.properties.date?.type === 'date' && post.properties.date.date?.start
            ? new Date(post.properties.date.date.start).toISOString().split('T')[0]
            : null;

        return {
          id: post.id,
          title: post.properties.title?.type === 'title'
              ? post.properties.title.title[0]?.plain_text || ''
              : '',
          slug: post.properties.slug?.type === 'rich_text'
              ? post.properties.slug.rich_text[0]?.plain_text || ''
              : '',
          category: post.properties.category?.type === 'select'
              ? post.properties.category.select?.name || ''
              : '',
          tags: post.properties.tags?.type === 'multi_select'
              ? post.properties.tags.multi_select.map((tag) => tag.name)
              : [],
          thumbnailUrl: post.properties.thumbnailUrl?.type === 'files' &&
            post.properties.thumbnailUrl.files.length > 0
              ? post.properties.thumbnailUrl.files[0].type === 'file'
                ? post.properties.thumbnailUrl.files[0].file.url
                : post.properties.thumbnailUrl.files[0].type === 'external'
                ? post.properties.thumbnailUrl.files[0].external.url
                : '/default_image.png'
              : '/default_image.png',
          date: notionDate!,
        };
      });

    posts = [...posts, ...newPosts];
    cursor = response.next_cursor ?? undefined;
  } while (cursor);

  //none 카테고리, tags 가 없는 포스트 제거
  posts = posts.filter((post) => post.category !== 'none' && post.tags.length > 0);

  console.log('Posts fetched:', posts.length);
  console.log("Fetched Posts:", posts);
  return posts;
}
