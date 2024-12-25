// app/api/tags/route.ts

 // 태그 API
// import { NextResponse } from "next/server";
// import { fetchTags } from "@/lib/notion/api/fetchTags";

// export async function GET() {
//   try {
//     const tags = await fetchTags();
//     return NextResponse.json(tags);
//   } catch (error) {
//     console.error("Error fetching tags:", error);
//     return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 });
//   }
// }


// app/api/tags/route.ts

import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { isPageObjectResponse } from '@/lib/notion/types'; // 타입 가드 추가

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
    });

    const tags = response.results
      .filter(isPageObjectResponse) // PageObjectResponse만 필터링
      .flatMap((page) => {
        const property = page.properties.tags;
        if (property?.type === 'multi_select') {
          return property.multi_select.map((tag) => tag.name);
        }
        return [];
      })
      .filter((tag) => tag.toLowerCase() !== 'none'); // 'none' 제외

    const uniqueTags = Array.from(new Set(tags)); // 중복 제거

    return NextResponse.json(uniqueTags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}
