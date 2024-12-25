import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { isPageObjectResponse } from '@/lib/notion/types';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET() {
  try {
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
            ? (() => {
                const file = properties.thumbnailUrl.files[0];
                if (file.type === 'file' && file.file) return file.file.url;
                if (file.type === 'external' && file.external)
                  return file.external.url;
                return '/default-thumbnail.png';
              })()
            : '/default-thumbnail.png';

        return {
          id: post.id,
          title:
            properties.title?.type === 'title' &&
            properties.title.title.length > 0
              ? properties.title.title[0].plain_text
              : 'Untitled',
          slug:
            properties.slug?.type === 'rich_text' &&
            properties.slug.rich_text.length > 0
              ? properties.slug.rich_text[0].plain_text
              : 'no-slug',
          category:
            properties.category?.type === 'select' &&
            properties.category.select?.name
              ? properties.category.select.name
              : 'none',
          tags:
            properties.tags?.type === 'multi_select'
              ? properties.tags.multi_select.map((tag) => tag.name)
              : [],
          created_time: post.created_time,
          thumbnailUrl,
        };
      })
      .filter((post) => post.category !== 'none');

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts from Notion:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
