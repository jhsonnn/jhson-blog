// import { notionClient } from '@/lib/notion/client';
// import { isPageObjectResponse } from '@/lib/notion/types';
// import { Post } from '@/lib/notion/types';

// export async function fetchNotionPageBySlug(slug: string): Promise<Post | null> {
//   const response = await notionClient.databases.query({
//     database_id: process.env.NOTION_DATABASE_ID!,
//     filter: {
//       property: 'slug',
//       rich_text: { equals: slug },
//     },
//   });

//   const post = response.results.find(isPageObjectResponse);
//   if (!post) return null;

//   //기본 이미지 절대 경로 설정
//   const defaultImageUrl = `${process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '')}/default_image.png`;

//   let originalImageUrl = defaultImageUrl;

//   const thumbnailProp = post.properties.thumbnailUrl;

//   if (thumbnailProp?.type === 'files' && thumbnailProp.files.length > 0) {
//     const file = thumbnailProp.files[0];
//     if (file.type === 'file') {
//       originalImageUrl = file.file.url;
//     } else if (file.type === 'external') {
//       originalImageUrl = file.external.url;
//     }
//   }

//   //프록시로 이미지 요청(URL이 만료되지 않게 됨)
//   const proxiedUrl = `/api/image-proxy?url=${encodeURIComponent(originalImageUrl)}&slug=${encodeURIComponent(slug)}`;

//   return {
//     id: post.id,
//     title:
//       post.properties.title?.type === 'title'
//         ? post.properties.title.title[0]?.plain_text || ''
//         : '',
//     slug:
//       post.properties.slug?.type === 'rich_text'
//         ? post.properties.slug.rich_text[0]?.plain_text || ''
//         : '',
//     category:
//       post.properties.category?.type === 'select' && post.properties.category.select
//         ? {
//             name: post.properties.category.select.name,
//             color: post.properties.category.select.color,
//           }
//         : { name: 'none', color: 'default' },
//     tags:
//       post.properties.tags?.type === 'multi_select'
//         ? post.properties.tags.multi_select.map((tag) => ({
//             name: tag.name,
//             color: tag.color,
//           }))
//         : [],
//     thumbnailUrl: proxiedUrl,
//     originalThumbnailUrl: originalImageUrl,
//     date: post.properties.date?.type === 'date' ? post.properties.date.date?.start || '' : '',
//     status: {
//       name:
//         post.properties.status?.type === 'select' && post.properties.status.select?.name
//           ? post.properties.status.select.name
//           : 'private',
//     },
//   };
// }

// /lib/notion/api/fetchNotionPageBySlug.ts

import { notionClient } from '@/lib/notion/client';
import { isPageObjectResponse } from '@/lib/notion/types';
import { Post } from '@/lib/notion/types';

export async function fetchNotionPageBySlug(slug: string): Promise<Post | null> {
  const response = await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'slug',
      rich_text: { equals: slug },
    },
  });

  const post = response.results.find(isPageObjectResponse);
  if (!post) return null;

  const defaultImageUrl = `${process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '')}/default_image.png`;

  let originalImageUrl = defaultImageUrl;
  let fallbackImageUrl = defaultImageUrl;

  const thumbnailProp = post.properties.thumbnailUrl;

  if (thumbnailProp?.type === 'files' && thumbnailProp.files.length > 0) {
    const file = thumbnailProp.files[0];
    if (file.type === 'file') {
      originalImageUrl = file.file.url;
    } else if (file.type === 'external') {
      originalImageUrl = file.external.url;
    }

    // notion 프록시 URL은 presigned URL일 때만 제공
    if (originalImageUrl.startsWith('https://prod-files-secure.s3.')) {
      fallbackImageUrl = `https://www.notion.so/image/${encodeURIComponent(originalImageUrl)}`;
    }
  }

  const proxiedUrl = `/api/image-proxy?url=${encodeURIComponent(originalImageUrl)}&slug=${encodeURIComponent(slug)}${
    fallbackImageUrl !== defaultImageUrl ? `&fallback=${encodeURIComponent(fallbackImageUrl)}` : ''
  }`;

  return {
    id: post.id,
    title:
      post.properties.title?.type === 'title'
        ? post.properties.title.title[0]?.plain_text || ''
        : '',
    slug:
      post.properties.slug?.type === 'rich_text'
        ? post.properties.slug.rich_text[0]?.plain_text || ''
        : '',
    category:
      post.properties.category?.type === 'select' && post.properties.category.select
        ? {
            name: post.properties.category.select.name,
            color: post.properties.category.select.color,
          }
        : { name: 'none', color: 'default' },
    tags:
      post.properties.tags?.type === 'multi_select'
        ? post.properties.tags.multi_select.map((tag) => ({
            name: tag.name,
            color: tag.color,
          }))
        : [],
    date: post.properties.date?.type === 'date' ? post.properties.date.date?.start || '' : '',
    thumbnailUrl: proxiedUrl,
    originalThumbnailUrl: originalImageUrl,
    fallbackThumbnailUrl: fallbackImageUrl,
    status: {
      name:
        post.properties.status?.type === 'select' && post.properties.status.select?.name
          ? post.properties.status.select.name
          : 'private',
    },
  };
}
