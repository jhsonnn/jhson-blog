// import { Client } from "@notionhq/client";

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export async function fetchPageContentBlocks(pageId: string) {
//   const blocks = [];
//   let cursor: string | undefined;

//   while (true) {
//     const { results, next_cursor } = await notion.blocks.children.list({
//       block_id: pageId,
//       start_cursor: cursor,
//     });

//     blocks.push(...results);

//     if (!next_cursor) break;
//     cursor = next_cursor;
//   }

//   console.log("Fetched Blocks:", blocks);
//   return blocks;
// }


import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function fetchPageContentBlocks(pageId: string) {
  if (!pageId) {
    throw new Error("Invalid page ID");
  }

  const blocks = [];
  let cursor: string | undefined;

  try {
    while (true) {
      const { results, next_cursor } = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
      });

      blocks.push(...results);

      if (!next_cursor) break; // 더 이상 가져올 블록이 없으면 종료
      cursor = next_cursor;
    }
  } catch (error) {
    console.error("Error fetching page blocks:", error);
    throw error;
  }

  console.log("Fetched Blocks:", blocks);
  return blocks;
}
