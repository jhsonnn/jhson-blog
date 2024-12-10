// // src/pages/api/category/route.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { fetchNotionDatabaseByCategory } from '@/lib/notion/fetchNotionDatabaseByCategory';


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { category } = req.query;

//   // category 파라미터가 없을 경우 처리
//   if (!category || typeof category !== 'string') {
//     console.error('[API] Invalid category parameter:', category);
//     return res.status(400).json({ error: 'Category is required and should be a string' });
//   }

//   try {
//     console.log(`[API] Fetching data for category: ${category}`);
//     const data = await fetchNotionDatabaseByCategory(category); // 에러 발생 가능 지점
//     console.log(`[API] Data fetched for category "${category}":`, data);

//     return res.status(200).json(data);
//   } catch (error: unknown) {
//     console.error('[API] Error occurred:', error);
//     if (error instanceof Error) {
//       console.error('[API] Error message:', error.message);
//       console.error('[API] Error stack:', error.stack);
//     }
//     return res.status(500).json({ error: 'Failed to fetch data for the given category' });
//   }
// }


// // /app/api/category.ts
// import { NextResponse } from 'next/server';
// import { Client } from '@notionhq/client';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// // category를 동적으로 가져오는 함수
// // const fetchCategoryOptions = async () => {
// //   try {
// //     const databaseInfo = await notion.databases.retrieve({
// //       database_id: process.env.NOTION_DATABASE_ID!,
// //     });

// //     const categoryProperty = databaseInfo.properties['category'];
// //     if (categoryProperty?.type === 'select') {
// //       return categoryProperty.select.options.map((option) => option.name);
// //     }

// //     throw new Error('Category property not found or is not a select type');
// //   } catch (error) {
// //     console.error('Error fetching category options:', error);
// //     throw error;
// //   }
// // };
// import {NOTION_DATABASE_ID} from '@/lib/notion/database'

// export const fetchCategoryOptions = async (): Promise<string[]> => {
//   try {
//     console.log('[API] Fetching database properties...');
//     const databaseInfo = await notion.databases.retrieve({
//       database_id: NOTION_DATABASE_ID,
//     });

//     console.log('[API] Database info fetched:', databaseInfo);

//     const categoryProperty = databaseInfo.properties['category'];
//     if (categoryProperty?.type === 'select') {
//       const options = categoryProperty.select.options.map(
//         (option) => option.name
//       );
//       console.log('[API] Available categories:', options);
//       return options;
//     }

//     throw new Error(
//       '[API] Category property not found or is not a select type'
//     );
//   } catch (error) {
//     console.error('[API] Error fetching category options:', error);
//     throw error;
//   }
// };

// export async function GET() {
//   try {
//     console.log('[API] Fetching category options...');
//     const categories = await fetchCategoryOptions();
//     console.log('[API] Categories fetched:', categories);
//     return NextResponse.json(categories, { status: 200 });
//   } catch (error: unknown) {
//     console.error('[API] Error in /api/category handler:', error);

//     // 오류가 Error 객체인지 확인 후 처리
//     const errorMessage =
//       error instanceof Error ? error.message : 'An unexpected error occurred';

//     return NextResponse.json(
//       {
//         error: 'Failed to fetch categories',
//         details: errorMessage,
//       },
//       { status: 500 }
//     );
//   }
// }





// import { NextApiRequest, NextApiResponse } from 'next';
// import { Client } from '@notionhq/client';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// // 유효한 category 값을 가져오는 함수
// const fetchCategoryOptions = async () => {
//   try {
//     const databaseInfo = await notion.databases.retrieve({
//       database_id: process.env.NOTION_DATABASE_ID!,
//     });

//     const categoryProperty = databaseInfo.properties["category"];
//     if (categoryProperty?.type === "select") {
//       const options = categoryProperty.select.options.map((option) => option.name);
//       return options;
//     }
//     throw new Error('Category property not found or is not a select type');
//   } catch (error) {
//     console.error('Error fetching category options:', error);
//     throw error;
//   }
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const categories = await fetchCategoryOptions();
//     res.status(200).json(categories);
//   } catch (error) {
//     console.error('Error in /api/category:', error);
//     res.status(500).json({ error: 'Failed to fetch categories' });
//   }
// }



// //최종진행중
// app/api/category/route.ts
// import { NextResponse } from 'next/server';
// import { Client } from '@notionhq/client';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export async function GET() {
//   try {
//     const databaseId = process.env.NOTION_DATABASE_ID;

//     if (!databaseId) {
//       throw new Error('NOTION_DATABASE_ID is not defined');
//     }

//     // Notion 데이터 가져오기
//     const response = await notion.databases.query({
//       database_id: databaseId,
//     });

//     // 데이터 반환
//     return NextResponse.json(response.results, { status: 200 });
//   } catch (error) {
//     console.error('API Error:', error);

//     // 에러 응답 반환
//     return NextResponse.json(
//       { error: 'Failed to fetch categories', details: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }



// import { NextResponse } from 'next/server';
// import { Client } from '@notionhq/client';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export async function GET() {
//   try {
//     const databaseId = process.env.NOTION_DATABASE_ID;

//     if (!databaseId) {
//       throw new Error('NOTION_DATABASE_ID is not defined');
//     }

//     // Notion 데이터 가져오기
//     const response = await notion.databases.query({
//       database_id: databaseId,
//     });

//     // 필요한 데이터만 가공
//     const categories = response.results.map((item: any) => ({
//       id: item.id,
//       title: item.properties?.title?.title[0]?.plain_text || 'Untitled',
//     }));

//     // 데이터 반환
//     return NextResponse.json(categories, { status: 200 });
//   } catch (error) {
//     console.error('API Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch categories', details: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

// 나오긴함
// import { NextResponse } from 'next/server';
// import { Client } from '@notionhq/client';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export async function GET() {
//   try {
//     const databaseId = process.env.NOTION_DATABASE_ID;

//     if (!databaseId) {
//       throw new Error('NOTION_DATABASE_ID is not defined');
//     }

//     const response = await notion.databases.query({ database_id: databaseId });

//     const categories = response.results
//       .map((item: any) => {
//         const title =
//           item.properties.title?.title[0]?.plain_text || 'Untitled';
//         return title;
//       })
//       .filter((title: string) => !!title); // Remove empty titles

//     return NextResponse.json(categories, { status: 200 });
//   } catch (error) {
//     console.error('API Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch categories', details: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

//실행은 됨
// import { NextResponse } from 'next/server';
// import { Client } from '@notionhq/client';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export async function GET() {
//   try {
//     const databaseId = process.env.NOTION_DATABASE_ID;

//     if (!databaseId) {
//       throw new Error('NOTION_DATABASE_ID is not defined');
//     }

//     const response = await notion.databases.query({ database_id: databaseId });

//     // 카테고리 데이터 추출
//     const categories = response.results
//       .map((item: any) => item.properties.category?.select?.name)
//       .filter((category: string | null) => !!category); // null 값 제거

//     const uniqueCategories = [...new Set(categories)]; // 중복 제거

//     return NextResponse.json(uniqueCategories, { status: 200 });
//   } catch (error) {
//     console.error('API Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch categories', details: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import { Client } from '@notionhq/client';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export async function GET() {
//   try {
//     const response = await notion.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID!,
//     });

//     // 카테고리 데이터 추출 및 중복 제거
//     const categories = response.results
//       .filter((item: any) => 'properties' in item)
//       .map((page: any) => {
//         const categoryProperty = page.properties.category;

//         if (
//           categoryProperty?.type === 'select' &&
//           categoryProperty.select?.name
//         ) {
//           return categoryProperty.select.name;
//         }

//         return null;
//       })
//       .filter((category: any) => !!category);

//     return NextResponse.json([...new Set(categories)]); // 중복 제거
//   } catch (error) {
//     console.error('[API Error]:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch categories' },
//       { status: 500 }
//     );
//   }
// }





// // app/api/category/route.ts
// import { NextResponse } from "next/server";
// import { notion } from "@/lib/notion/client"; // Notion 클라이언트 초기화된 파일 가져오기

// export async function GET() {
//   try {
//     // Notion 데이터베이스 쿼리
//     const response = await notion.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID!, // 환경변수에서 DB ID 가져오기
//     });

//     // 카테고리 데이터 추출 및 중복 제거
//     const categories = response.results
//       .map((page: any) => page.properties.category?.select?.name)
//       .filter(Boolean);

//     return NextResponse.json([...new Set(categories)]); // 중복 제거 후 반환
//   } catch (error) {
//     console.error("[ERROR] Failed to fetch categories:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch categories" },
//       { status: 500 }
//     );
//   }
// }


// app/api/category/route.ts
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     // `app/api/route.ts`의 데이터를 가져옴
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch data from /api");
//     }

//     const allData = await response.json();

//     // category 속성만 추출
//     const categories = allData
//       .map((page: any) => page.properties.category?.select?.name)
//       .filter(Boolean);

//     // 중복 제거
//     const uniqueCategories = [...new Set(categories)];

//     return NextResponse.json(uniqueCategories);
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch categories" },
//       { status: 500 }
//     );
//   }
// }

// // app/api/category/route.ts
// import { NextResponse } from "next/server";
// import { notion } from "@/lib/notion/client";
// interface PartialSelectResponse {
//   name: string;
//   id: string;
//   color: string;
// }

// function isPartialSelectResponse(
//   select: unknown
// ): select is PartialSelectResponse {
//   return (
//     typeof select === 'object' &&
//     select !== null &&
//     'name' in select &&
//     'id' in select &&
//     'color' in select
//   );
// }

// export async function GET() {
//   try {
//     const response = await notion.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID!,
//     });

//     console.log('API Response:', response.results);

//     if (!response.results || response.results.length === 0) {
//       return NextResponse.json({ error: 'No categories found' }, { status: 404 });
//     }

//     const categories = response.results
//       .map((page) => {
//         if ('properties' in page && page.properties?.category) {
//           const categoryProperty = page.properties.category;
//           if (
//             categoryProperty.type === 'select' &&
//             isPartialSelectResponse(categoryProperty.select)
//           ) {
//             return categoryProperty.select.name;
//           }
//         }
//         return null;
//       })
//       .filter((category): category is string => Boolean(category)); // null 제거

//     if (!categories.length) {
//       return NextResponse.json({ error: 'No valid categories found' }, { status: 404 });
//     }

//     console.log('Categories:', categories);
//     return NextResponse.json([...new Set(categories)]); // 중복 제거
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch categories' },
//       { status: 500 }
//     );
//   }
// }

////
//진행중
import { NextResponse } from "next/server";
import { fetchNotionCategories } from "@/lib/notion/fetchNotionCategories";

export async function GET() {
  try {
    const categories = await fetchNotionCategories();

    if (categories.length === 0) {
      return NextResponse.json({ error: "No categories found" }, { status: 404 });
    }

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
