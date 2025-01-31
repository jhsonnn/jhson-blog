import { NextResponse } from 'next/server';
import { isPageObjectResponse } from '@/lib/notion/types';
import { notionClient } from '@/lib/notion/client';


export async function GET() {
  try {
    const response = await notionClient.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
    });

    const tags = response.results
      .filter(isPageObjectResponse)
      .flatMap((page) => {
        const property = page.properties.tags;
        if (property?.type === 'multi_select') {
          return property.multi_select.map((tag) => tag.name);
        }
        return [];
      })
      .filter((tag) => tag.toLowerCase() !== 'none'); //none 제외

    const uniqueTags = Array.from(new Set(tags)); //중복 제거

    return NextResponse.json(uniqueTags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}
