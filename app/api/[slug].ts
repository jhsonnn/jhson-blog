// import { NextApiRequest, NextApiResponse } from 'next';
// import { getPageIdBySlug, notion } from '@/lib/notion';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { slug } = req.query;

//   console.log(`API request received for slug: ${slug}`);  // 로그 추가

//   if (typeof slug !== 'string') {
//     return res.status(400).json({ error: 'Invalid slug' });
//   }

//   try {
//     console.log(`Fetching page ID for slug: ${slug}`);  // 로그 추가

//     // 슬러그로 페이지 ID 가져오기
//     const pageId = await getPageIdBySlug(slug);

//     if (!pageId) {
//       console.log(`No page found for slug: ${slug}`);  // 로그 추가
//       return res.status(404).json({ error: `Page not found for slug: ${slug}` });
//     }

//     console.log(`Fetching page data for page ID: ${pageId}`);  // 로그 추가

//     // 페이지 데이터 가져오기
//     const pageData = await notion.pages.retrieve({ page_id: pageId });

//     console.log('Fetched page data:', JSON.stringify(pageData, null, 2));  // 로그 추가

//     // 데이터 반환
//     return res.status(200).json(pageData);
//   } catch (error) {
//     console.error('Error fetching Notion page data:', error);  // 에러 로그 추가
//     return res.status(500).json({ error: 'Failed to fetch page data' });
//   }
// }
// import { NextApiRequest, NextApiResponse } from 'next';
// import { fetchNotionPageBySlug } from '@/utils/fetchNotionPageBySlug';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { slug } = req.query;

//   if (typeof slug !== 'string') {
//     return res.status(400).json({ message: 'Invalid slug' });
//   }

//   try {
//     const pageData = await fetchNotionPageBySlug(slug);

//     if (!pageData) {
//       return res.status(404).json({ message: `Page not found for slug: ${slug}` });
//     }

//     res.status(200).json(pageData);
//   } catch (error) {
//     res.status(500).json({ message: `Error fetching page for slug: ${slug}` });
//   }
// }
//////////
// import { NextApiRequest, NextApiResponse } from 'next';
// import { fetchNotionPageBySlug } from '@/utils/fetchNotionPageBySlug';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { slug } = req.query;

//   if (typeof slug !== 'string') {
//     return res.status(400).json({ message: 'Invalid slug' });
//   }

//   try {
//     const pageData = await fetchNotionPageBySlug(slug);

//     if (!pageData) {
//       return res.status(404).json({ message: `Page not found for slug: ${slug}` });
//     }

//     res.status(200).json(pageData);
//   } catch (error) {
//     res.status(500).json({ message: `Error fetching page for slug: ${slug}` });
//   }
// }



///////////////
// import { NextApiRequest, NextApiResponse } from 'next';
// import { notion } from '@/lib/notion';

// // 페이지 ID 가져오기 함수
// async function getPageIdBySlug(slug: string): Promise<string | null> {
//   const databaseId = process.env.NOTION_DATABASE_ID!;
  
//   const response = await notion.databases.query({
//     database_id: databaseId,
//     filter: {
//       property: 'slug',
//       rich_text: { equals: slug },
//     },
//   });

//   if (response.results.length === 0) return null;

//   return response.results[0].id;
// }

// // API 핸들러 함수
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { slug } = req.query;

//   if (typeof slug !== 'string') {
//     return res.status(400).json({ error: 'Invalid slug' });
//   }

//   try {
//     const pageId = await getPageIdBySlug(slug);

//     if (!pageId) {
//       return res.status(404).json({ error: `Page not found for slug: ${slug}` });
//     }

//     const pageData = await notion.pages.retrieve({ page_id: pageId });

//     return res.status(200).json(pageData);
//   } catch (error) {
//     console.error('Error fetching page data:', error);
//     return res.status(500).json({ error: 'Failed to fetch page data' });
//   }
// }



import { fetchPageIdBySlug } from '@/utils/fetchPageIdBySlug';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(  req: NextApiRequest, 
  res: NextApiResponse) {
  const { slug } = req.query;

  try {
    const pageId = await fetchPageIdBySlug(slug as string);

    if (!pageId) {
      return res.status(404).json({ message: 'Page not found' });
    }

    res.status(200).json({ pageId });
  } catch (error) {
    console.error('Error fetching page ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
