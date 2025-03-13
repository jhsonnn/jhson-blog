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

  // console.log('Posts fetched:', posts.length);
  // console.log("Fetched Posts:", posts);
  return posts;
}
