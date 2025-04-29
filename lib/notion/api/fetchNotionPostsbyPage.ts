import { notionClient } from '../client';
import { isPageObjectResponse } from '../types';

export async function fetchNotionPostsByPage(page: number, pageSize: number) {
  const response = await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    page_size: pageSize,
    start_cursor: page > 1 ? `cursor-for-page-${page}` : undefined,
    filter: {
      property: 'status',
      status: { equals: 'public' },
    },
  });

//   const posts = response.results.filter(isPageObjectResponse).map((post) => ({
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
//       post.properties.category?.type === 'select'
//         ? post.properties.category.select?.name || ''
//         : '',
//     tags:
//       post.properties.tags?.type === 'multi_select'
//         ? post.properties.tags.multi_select.map((tag) => tag.name)
//         : [],
//     thumbnailUrl:
//       post.properties.thumbnailUrl?.type === 'files' &&
//       Array.isArray(post.properties.thumbnailUrl.files) &&
//       post.properties.thumbnailUrl.files.length > 0
//         ? post.properties.thumbnailUrl.files[0]?.type === 'file'
//           ? post.properties.thumbnailUrl.files[0]?.file?.url || '/default_image.png'
//           : post.properties.thumbnailUrl.files[0]?.type === 'external'
//             ? post.properties.thumbnailUrl.files[0]?.external?.url || '/default_image.png'
//             : '/default_image.png'
//         : '/default_image.png',
//     date:
//       post.properties.date?.type === 'date' && post.properties.date.date?.start
//         ? post.properties.date.date.start
//         : '',
//     status:
//       post.properties.status?.type === 'status'
//         ? { name: post.properties.status.status?.name }
//         : { name: 'private' },
//   }));

//   return { posts };
// }

const posts = response.results.filter(isPageObjectResponse).map((post) => {
    const properties = post.properties;

    let originalThumbnailUrl = `${process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '')}/default_image.png`;

    if (properties.thumbnailUrl?.type === 'files' && properties.thumbnailUrl.files.length > 0) {
      const file = properties.thumbnailUrl.files[0];
      if (file.type === 'file' && file.file?.url) {
        originalThumbnailUrl = file.file.url;
      } else if (file.type === 'external' && file.external?.url) {
        originalThumbnailUrl = file.external.url;
      }
    }

    const proxiedThumbnailUrl = `/api/image-proxy?url=${encodeURIComponent(originalThumbnailUrl)}&slug=${encodeURIComponent(
      properties.slug?.type === 'rich_text' && properties.slug.rich_text.length > 0
        ? properties.slug.rich_text[0].plain_text
        : 'no-slug'
    )}`;

    return {
      id: post.id,
      title:
        properties.title?.type === 'title'
          ? properties.title.title[0]?.plain_text || ''
          : '',
      slug:
        properties.slug?.type === 'rich_text'
          ? properties.slug.rich_text[0]?.plain_text || ''
          : '',
      category:
        properties.category?.type === 'select'
          ? properties.category.select?.name || ''
          : '',
      tags:
        properties.tags?.type === 'multi_select'
          ? properties.tags.multi_select.map((tag) => tag.name)
          : [],
      thumbnailUrl: proxiedThumbnailUrl,
      originalThumbnailUrl: originalThumbnailUrl,
      date:
        properties.date?.type === 'date' && properties.date.date?.start
          ? properties.date.date.start
          : '',
      status:
        properties.status?.type === 'status'
          ? { name: properties.status.status?.name }
          : { name: 'private' },
    };
  });

  return { posts };
}