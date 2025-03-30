import { NextResponse } from 'next/server';
import { notionClient } from '@/lib/notion/client';

export async function POST() {
  try {
    const response = await notionClient.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
    });

    const tags = response.results
      .filter((item) => 'properties' in item)
      .flatMap((page) => {
        const tagProperty = page.properties.tags;
        if (tagProperty?.type === 'multi_select' && Array.isArray(tagProperty.multi_select)) {
          return tagProperty.multi_select.map((tag) => tag.name);
        }
        return [];
      })
      .filter((tag) => tag.toLowerCase() !== 'none');

    return NextResponse.json([...new Set(tags)]);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({ message: 'Failed to fetch tags' }, { status: 500 });
  }
}
