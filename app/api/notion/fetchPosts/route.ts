//인피니트 포스트
// app/api/notion/fetchPosts/route.ts
import { NextResponse } from 'next/server';
import { notionClient } from '@/lib/notion/client';
import { isPageObjectResponse } from '@/lib/notion/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = 11;

  try {
    const response = await notionClient.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      page_size: pageSize,
      start_cursor: searchParams.get('cursor') || undefined,
      filter: {
        property: 'status',
        status: { equals: 'public' },
      },
    });

    const posts = response.results.filter(isPageObjectResponse).map((post) => {
      const properties = post.properties;

      const thumbnailFile =
        properties.thumbnailUrl?.type === 'files' && properties.thumbnailUrl.files.length > 0
          ? properties.thumbnailUrl.files[0]
          : null;

      const thumbnailUrl =
        thumbnailFile?.type === 'file'
          ? thumbnailFile.file.url
          : thumbnailFile?.type === 'external'
            ? thumbnailFile.external.url
            : '/default_image.png';

      const date =
        properties.date?.type === 'date' && properties.date.date?.start
          ? properties.date.date.start
          : null;

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
          post.properties.category?.type === 'select'
            ? post.properties.category.select?.name || ''
            : '',
        tags:
          post.properties.tags?.type === 'multi_select'
            ? post.properties.tags.multi_select.map((tag) => tag.name)
            : [],
        thumbnailUrl,
        date,
      };
    });

    return NextResponse.json({
      posts,
      nextCursor: response.next_cursor || null,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
