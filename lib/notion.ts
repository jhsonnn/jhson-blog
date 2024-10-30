// import { Client } from '@notionhq/client';

// // Notion 클라이언트 초기화
// export const notion = new Client({
//   auth: process.env.NOTION_API_KEY,  // API 키 설정
// });

// // 슬러그를 기반으로 페이지 ID 가져오는 함수
// export const getPageIdBySlug = async (slug: string): Promise<string | null> => {
//   try {
//     console.log(`Querying Notion database for slug: ${slug}`);  // 로그 추가

//     const response = await notion.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID!,  // 데이터베이스 ID
//       filter: {
//         property: 'Slug',  // Slug 필드로 필터링
//         rich_text: {
//           equals: slug,  // 슬러그 필터 설정
//         },
//       },
//     });

//     console.log('Query result:', JSON.stringify(response, null, 2));  // 쿼리 결과 로그 추가

//     if (!response.results.length) {
//       console.error(`Page not found for slug: ${slug}`);
//       return null;  // 슬러그에 해당하는 데이터가 없을 경우 null 반환
//     }

//     return response.results[0].id;  // 페이지 ID 반환
//   } catch (error) {
//     console.error('Error fetching page ID by slug:', error);  // 에러 로그 추가
//     return null;
//   }
// };


import { Client } from '@notionhq/client';

/**
 * Notion 클라이언트 생성
 * 환경 변수에서 API 키를 가져와 초기화합니다.
 */
export const notion = new Client({
  auth: process.env.NOTION_API_KEY, // 환경 변수에서 API 키를 가져옴
});
