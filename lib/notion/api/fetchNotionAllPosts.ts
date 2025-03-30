import { notionClient } from '@/lib/notion/client';
import { isPageObjectResponse, Post } from '@/lib/notion/types';

export async function fetchNotionAllPosts() {
  let posts: Post[] = [];
  let cursor: string | null | undefined = undefined;

  do {
    const response = await notionClient.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      start_cursor: cursor,
      page_size: 15,
    });

    const newPosts = response.results.filter(isPageObjectResponse).map((post) => {
      const notionDate =
        post.properties.date?.type === 'date' && post.properties.date.date?.start
          ? new Date(post.properties.date.date.start).toISOString().split('T')[0]
          : '';

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
                color: post.properties.category.select.color || 'default',
              }
            : { name: 'none', color: 'default' },
        tags:
          post.properties.tags?.type === 'multi_select'
            ? post.properties.tags.multi_select
                .filter((tag) => tag.name !== 'none') // 'none' 태그 제외
                .map((tag) => ({
                  name: tag.name,
                  color: tag.color || 'default',
                }))
            : [],
        thumbnailUrl:
          post.properties.thumbnailUrl?.type === 'files' &&
          post.properties.thumbnailUrl.files.length > 0
            ? post.properties.thumbnailUrl.files[0].type === 'file'
              ? post.properties.thumbnailUrl.files[0].file.url
              : post.properties.thumbnailUrl.files[0].type === 'external'
                ? post.properties.thumbnailUrl.files[0].external.url
                : '/default_image.png'
            : '/default_image.png',
        date: notionDate,
        status: {
          name:
            post.properties.status?.type === 'status' && post.properties.status.status?.name
              ? post.properties.status.status.name
              : 'private',
        },
      };
    });

    posts = [...posts, ...newPosts];
    cursor = response.next_cursor ?? undefined;
  } while (cursor);

  //status가 public 인인 포스트만 유지
  posts = posts.filter((post) => post.status.name === 'public');

  //category 및 tags에서 none 제거
  const allCategories = Array.from(new Set(posts.map((post) => post.category.name))).filter(
    (category) => category !== 'none'
  );
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags.map((tag) => tag.name))));

  return { posts, allCategories, allTags };
}
