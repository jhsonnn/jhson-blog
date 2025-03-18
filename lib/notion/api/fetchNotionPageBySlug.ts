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

  // Notion 이미지 URL을 Next.js API 프록시로 변환
  const originalThumbnailUrl =
    post.properties.thumbnailUrl?.type === 'files' &&
    Array.isArray(post.properties.thumbnailUrl.files) &&
    post.properties.thumbnailUrl.files.length > 0
      ? post.properties.thumbnailUrl.files[0]?.type === 'file'
        ? post.properties.thumbnailUrl.files[0]?.file?.url || '/default_image.png'
        : post.properties.thumbnailUrl.files[0]?.type === 'external'
        ? post.properties.thumbnailUrl.files[0]?.external?.url || '/default_image.png'
        : '/default_image.png'
      : '/default_image.png';

  const thumbnailUrl = `/api/notion/image?imageUrl=${encodeURIComponent(originalThumbnailUrl)}`;
  const status =
    post.properties.status?.type === 'select' && post.properties.status.select?.name
      ? { name: post.properties.status.select.name }
      : { name: 'private' };
  
  return {
    id: post.id,
    title: post.properties.title?.type === 'title' ? post.properties.title.title[0]?.plain_text || '' : '',
    slug: post.properties.slug?.type === 'rich_text' ? post.properties.slug.rich_text[0]?.plain_text || '' : '',
    category: post.properties.category?.type === 'select' ? post.properties.category.select?.name || '' : '',
    tags: post.properties.tags?.type === 'multi_select' ? post.properties.tags.multi_select.map((tag) => tag.name) : [],
    thumbnailUrl,
    date: post.properties.date?.type === 'date' ? post.properties.date.date?.start || '' : '',
    status,
  };
}
