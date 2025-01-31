import { isPageObjectResponse } from '@/lib/notion/types';
import { notionClient } from '../client';


export async function fetchNotionAllPosts() {
  const response = await notionClient.databases.query({
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
            ? properties.thumbnailUrl.files[0].file.url
            : properties.thumbnailUrl.files[0].type === 'external'
            ? properties.thumbnailUrl.files[0].external.url
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
    .filter((post) => post.category !== 'none'); //none제외

  return posts;
}
