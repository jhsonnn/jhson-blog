// import { Client } from '@notionhq/client';
// import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export async function fetchNotionAllPosts() {
//   try {
//     const response = await notion.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID!,
//     });

//     const posts = response.results
//       .filter((result): result is PageObjectResponse => result.object === 'page')
//       .map((page) => {
//         const properties = page.properties;

//         const category =
//           properties.category?.type === 'select' && properties.category.select
//             ? properties.category.select.name
//             : 'Uncategorized';

//         const tags =
//           properties.tags?.type === 'multi_select'
//             ? properties.tags.multi_select.map((tag) => tag.name)
//             : [];

//         const title =
//           properties.title?.type === 'title' && properties.title.title[0]
//             ? properties.title.title[0].plain_text
//             : 'Untitled';

//         const thumbnailUrl =
//           properties.thumbnailUrl?.type === 'files' &&
//           properties.thumbnailUrl.files.length > 0
//             ? (() => {
//                 const file = properties.thumbnailUrl.files[0];
//                 if (file.type === 'file' && file.file) {
//                   return file.file.url;
//                 }
//                 if (file.type === 'external' && file.external) {
//                   return file.external.url;
//                 }
//                 return '/default-thumbnail.png';
//               })()
//             : '/default-thumbnail.png';

//         return {
//           id: page.id,
//           title,
//           slug: properties.slug?.type === 'rich_text' ? properties.slug.rich_text[0]?.plain_text : 'no-slug',
//           category,
//           tags,
//           created_time: page.created_time,
//           thumbnailUrl,
//         };
//       });

//     return posts;
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     return [];
//   }
// // }

// import { Client } from '@notionhq/client';
// import { isPageObjectResponse } from '@/lib/notion/types';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export async function fetchNotionAllPosts() {
//   try {
//     // 환경 변수 확인
//     if (!process.env.NOTION_DATABASE_ID) {
//       throw new Error('NOTION_DATABASE_ID is not defined.');
//     }

//     if (!process.env.NOTION_API_KEY) {
//       throw new Error('NOTION_API_KEY is not defined.');
//     }

//     // Notion API 데이터 가져오기
//     const response = await notion.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID,
//     });

//     const posts = response.results
//       .filter(isPageObjectResponse)
//       .map((post) => {
//         const properties = post.properties;

//         // 썸네일 처리
//         const thumbnailUrl =
//           properties.thumbnailUrl?.type === 'files' &&
//           properties.thumbnailUrl.files.length > 0
//             ? (() => {
//                 const file = properties.thumbnailUrl.files[0];
//                 if (file.type === 'file' && file.file) {
//                   return file.file.url;
//                 }
//                 if (file.type === 'external' && file.external) {
//                   return file.external.url;
//                 }
//                 return '/default-thumbnail.png';
//               })()
//             : '/default-thumbnail.png';

//         return {
//           id: post.id,
//           title:
//             properties.title?.type === 'title' &&
//             properties.title.title.length > 0
//               ? properties.title.title[0].plain_text
//               : 'Untitled',
//           slug:
//             properties.slug?.type === 'rich_text' &&
//             properties.slug.rich_text.length > 0
//               ? properties.slug.rich_text[0].plain_text
//               : 'no-slug',
//           category:
//             properties.category?.type === 'select' &&
//             properties.category.select?.name
//               ? properties.category.select.name
//               : 'none',
//           tags:
//             properties.tags?.type === 'multi_select'
//               ? properties.tags.multi_select.map((tag) => tag.name)
//               : [],
//           created_time: post.created_time,
//           date: post.created_time, // date 추가
//           thumbnailUrl,
//         };
//       })
//       .filter((post) => post.category !== 'none'); // 카테고리가 'none'인 것 필터링

//     return posts;
//   } catch (error) {
//     console.error('Error fetching posts from Notion:', error);
//     throw new Error(
//       `Failed to fetch posts. Please check your Notion API credentials. Details: ${
//         error instanceof Error ? error.message : 'Unknown error'
//       }`
//     );
//   }
// }

import { Client } from '@notionhq/client';
import { isPageObjectResponse } from '@/lib/notion/types';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function fetchNotionAllPosts() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  });

  const posts = response.results
    .filter(isPageObjectResponse)
    .map((post) => {
      const properties = post.properties;

      const thumbnailUrl =
        properties.thumbnailUrl?.type === 'files' &&
        properties.thumbnailUrl.files.length > 0
          ? properties.thumbnailUrl.files[0].type === 'file'
            ? properties.thumbnailUrl.files[0].file.url // 'file' 타입의 URL
            : properties.thumbnailUrl.files[0].type === 'external'
            ? properties.thumbnailUrl.files[0].external.url // 'external' 타입의 URL
            : '/default-thumbnail.png'
          : '/default-thumbnail.png';

      return {
        id: post.id,
        title: properties.title?.type === 'title' && properties.title.title.length > 0
          ? properties.title.title[0].plain_text
          : 'Untitled',
        slug: properties.slug?.type === 'rich_text' && properties.slug.rich_text.length > 0
          ? properties.slug.rich_text[0].plain_text
          : 'no-slug',
        category: properties.category?.type === 'select' && properties.category.select?.name
          ? properties.category.select.name
          : 'none',
        tags: properties.tags?.type === 'multi_select'
          ? properties.tags.multi_select.map((tag) => tag.name)
          : [],
        created_time: post.created_time,
        thumbnailUrl,
      };
    })
    .filter((post) => post.category !== 'none'); // 'none' 제외

  return posts;
}
