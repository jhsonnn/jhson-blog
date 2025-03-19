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

  return {
    id: post.id,
    title: post.properties.title?.type === 'title' ? post.properties.title.title[0]?.plain_text || '' : '',
    slug: post.properties.slug?.type === 'rich_text' ? post.properties.slug.rich_text[0]?.plain_text || '' : '',
   category: post.properties.category?.type === 'select' && post.properties.category.select
      ? { name: post.properties.category.select.name, color: post.properties.category.select.color }
      : { name: 'none', color: 'default' }, 
    tags: post.properties.tags?.type === 'multi_select'
      ? post.properties.tags.multi_select.map((tag) => ({
          name: tag.name,
          color: tag.color,
        }))
      : [],
    //Notion 이미지 URL을 Next.js API 프록시로 변환
    thumbnailUrl:
      post.properties.thumbnailUrl?.type === 'files' && post.properties.thumbnailUrl.files.length > 0
        ? post.properties.thumbnailUrl.files[0].type === 'file'
          ? post.properties.thumbnailUrl.files[0].file.url
          : post.properties.thumbnailUrl.files[0].type === 'external'
          ? post.properties.thumbnailUrl.files[0].external.url
          : '/default_image.png'
        : '/default_image.png',
    date: post.properties.date?.type === 'date' ? post.properties.date.date?.start || '' : '',
    status: {
      name: post.properties.status?.type === 'select' && post.properties.status.select?.name
        ? post.properties.status.select.name
        : 'private',
    },
  };
}

