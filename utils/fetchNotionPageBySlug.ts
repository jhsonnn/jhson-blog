// utils/fetchNotionPageBySlug.ts

import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// Notion 클라이언트 초기화
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// PageObjectResponse 타입인지 확인하는 타입 가드
function isPageObjectResponse(page: any): page is PageObjectResponse {
  return page.object === "page" && "properties" in page;
}

export const fetchNotionPageBySlug = async (slug: string) => {
  try {
    const normalizedSlug = slug.toLowerCase().trim(); // 소문자 변환 및 공백 제거

    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID || "",
      filter: {
        property: "slug",
        rich_text: {
          equals: normalizedSlug,
        },
      },
    });

    console.log(
      "Notion API 응답 데이터:",
      JSON.stringify(response.results, null, 2)
    ); // 응답 데이터 전체 로깅

    if (response.results.length === 0) {
      console.warn(
        `슬러그: ${normalizedSlug}에 해당하는 페이지를 찾을 수 없습니다.`
      );
      return null;
    }

    const page = response.results[0];
    if (isPageObjectResponse(page)) {
      console.log("페이지 데이터가 정상적으로 반환되었습니다:", page);
      return page;
    } else {
      console.warn(`잘못된 페이지 데이터 형식:`, page);
      return null;
    }
  } catch (error) {
    console.error("Notion 페이지를 가져오는 중 오류 발생:", error);
    return null;
  }
};
