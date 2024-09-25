import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// Notion 클라이언트 설정
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Exponential Backoff 적용 함수
async function fetchWithExponentialBackoff(
  fetchFunction: () => Promise<any>,
  retries = 5,
  delay = 1000
) {
  try {
    return await fetchFunction();
  } catch (error: any) {
    if (retries === 0 || error.status !== 429) {
      throw error; // 429 에러 외 다른 에러는 재시도하지 않음
    }
    console.log(`Rate limit hit. Retrying in ${delay}ms...`);

    // 지정된 시간만큼 대기 후 재시도
    await new Promise((resolve) => setTimeout(resolve, delay));

    // 재시도 시, 대기 시간을 2배로 증가
    return fetchWithExponentialBackoff(fetchFunction, retries - 1, delay * 2);
  }
}

export const fetchNotionDatabase = async (
  category: string
): Promise<PageObjectResponse[]> => {
  // Notion API를 호출하는 실제 함수 정의
  const fetchFunction = async () => {
    console.log("Notion API Key:", process.env.NOTION_API_KEY);
    console.log("Notion Database ID:", process.env.NOTION_DATABASE_ID);

    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "category",
        select: { equals: category },
      },
    });

    console.log(`Fetched items for ${category}:`, response.results);
    return response.results as PageObjectResponse[];
  };

  // Exponential Backoff 적용하여 API 호출
  return await fetchWithExponentialBackoff(fetchFunction);
};
