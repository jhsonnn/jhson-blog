import { notionClient } from '@/lib/notion/client';
import { isPageObjectResponse, Post } from '@/lib/notion/types';

export async function fetchNotionAllPosts() {
  let posts: Post[] = [];
  let cursor: string | null | undefined = undefined;

  do {
    const response = await notionClient.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      start_cursor: cursor,
      page_size: 10,
    });

    const newPosts = response.results.filter(isPageObjectResponse).map((post) => {
      const notionDate =
        post.properties.date?.type === 'date' && post.properties.date.date?.start
          ? new Date(post.properties.date.date.start).toISOString().split('T')[0]
          : '';

      
      let originalThumbnailUrl = `${process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '')}/default_image.png`;
      
       if (post.properties.thumbnailUrl?.type === 'files' && post.properties.thumbnailUrl.files.length > 0) {
        const file = post.properties.thumbnailUrl.files[0];
        if (file.type === 'file' && file.file?.url) {
          originalThumbnailUrl = file.file.url;
        } else if (file.type === 'external' && file.external?.url) {
          originalThumbnailUrl = file.external.url;
        }
       }
      
      const proxiedThumbnailUrl = `/api/image-proxy?url=${encodeURIComponent(originalThumbnailUrl)}&slug=${encodeURIComponent(
        post.properties.slug?.type === 'rich_text' && post.properties.slug.rich_text.length > 0
          ? post.properties.slug.rich_text[0].plain_text
          : 'no-slug'
      )}`;

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
                .filter((tag) => tag.name !== 'none') //'none' 태그 제외
                .map((tag) => ({
                  name: tag.name,
                  color: tag.color || 'default',
                }))
            : [],
        thumbnailUrl: proxiedThumbnailUrl,
        originalThumbnailUrl: originalThumbnailUrl,
        date: notionDate,
        status: {
          name:
            post.properties.status?.type === 'status' && post.properties.status.status?.name
              ? post.properties.status.status.name
              : 'private',
        },
        summary:
          post.properties.summary?.type === 'rich_text' &&
          post.properties.summary.rich_text.length > 0
            ? post.properties.summary.rich_text[0].plain_text
            : '',
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
