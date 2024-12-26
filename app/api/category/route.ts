// 카테고리 API
import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { isPageObjectResponse, SelectPropertyResponse } from '@/lib/notion/types';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(_req: NextRequest) {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
    });

    // 카테고리만 추출하고, none이나 잘못된 값 제거
    const categories = response.results
      .filter(isPageObjectResponse) // Page 객체 필터링
      .map((page) => page.properties.category) // category 속성 추출
      .filter((property): property is SelectPropertyResponse =>
        property && property.type === 'select' && property.select !== null
      )
      .map((property) => property.select!.name) // 타입 확인 후 name 추출
      .filter((name): name is string => !!name && name.toLowerCase() !== 'none'); // none 제거 및 유효성 검사

    // 중복 제거
    const uniqueCategories = Array.from(new Set(categories));

    return NextResponse.json(uniqueCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
