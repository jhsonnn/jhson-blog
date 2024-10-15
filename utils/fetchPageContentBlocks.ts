import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const fetchPageContentBlocks = async (pageId: string) => {
  try {
    const blocks = [];
    let cursor: string | undefined = undefined;

    // 페이지의 블록 데이터 페이징 처리
    while (true) {
      const { results, next_cursor } = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
      });

      blocks.push(...results);

      if (!next_cursor) {
        break;
      }

      cursor = next_cursor;
    }

    return blocks;
  } catch (error) {
    console.error("Error fetching page blocks:", error);
    throw error;
  }
};
