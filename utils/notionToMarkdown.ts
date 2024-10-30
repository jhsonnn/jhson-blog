// utils/notionToMarkdown.ts
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

// Notion 클라이언트 초기화
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Notion to Markdown 변환기 초기화
const n2m = new NotionToMarkdown({ notionClient: notion });

// Notion 페이지를 Markdown 문자열로 변환하는 함수
export async function fetchPageMarkdown(pageId: string): Promise<string> {
  if (!pageId) {
    throw new Error("Invalid Notion Page ID");
  }

  try {
    // 페이지를 Markdown 블록으로 변환
    const mdBlocks = await n2m.pageToMarkdown(pageId);
    
    // 블록들을 하나의 Markdown 문자열로 변환
    const markdownContent = n2m.toMarkdownString(mdBlocks);
    
    return markdownContent.parent; // 문자열 반환
  } catch (error) {
    console.error("페이지 변환 중 오류:", error);
    throw error;
  }
}
