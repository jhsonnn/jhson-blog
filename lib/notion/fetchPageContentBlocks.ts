
import { BlockObjectResponse, PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { notion } from "./client";

const pageBlocksCache = new Map<string, (BlockObjectResponse | PartialBlockObjectResponse)[]>();


// /**
//  * 특정 페이지의 모든 블록을 가져오는 함수 (페이징 처리 포함)
//  * @param pageId - 페이지 ID
//  * @returns 블록의 배열
//  */

// export async function fetchPageContentBlocks(pageId: string): Promise<(BlockObjectResponse | PartialBlockObjectResponse)[]> {
//   if (pageBlocksCache.has(pageId)) {
//     console.log(`Returning cached blocks for page: ${pageId}`);
//     return pageBlocksCache.get(pageId)!;
//   }

//   const blocks: (BlockObjectResponse | PartialBlockObjectResponse)[] = [];
//   let cursor: string | undefined;

//   try {
//     while (true) {
//       const { results, next_cursor } = await notion.blocks.children.list({
//         block_id: pageId,
//         start_cursor: cursor,
//       });

//       blocks.push(...results);

//       if (!next_cursor) break; // 더 이상 가져올 블록이 없으면 종료
//       cursor = next_cursor;
//     }

//     pageBlocksCache.set(pageId, blocks); // 캐시에 저장
//     console.log("Fetched and cached Blocks:", blocks);
//     return blocks;
//   } catch (error) {
//     console.error("Error fetching page blocks:", error);
//     throw new Error("Failed to fetch page blocks");
//   }
// }

export async function fetchPageContentBlocks(pageId: string): Promise<(BlockObjectResponse | PartialBlockObjectResponse)[]> {
  if (pageBlocksCache.has(pageId)) {
    console.log(`Returning cached blocks for page: ${pageId}`);
    return pageBlocksCache.get(pageId)!;
  }

  const blocks: (BlockObjectResponse | PartialBlockObjectResponse)[] = [];
  let cursor: string | undefined;

  try {
    do {
      const { results, next_cursor } = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
      });

      blocks.push(...results);
      cursor = next_cursor || undefined; // null 값을 undefined로 변환
    } while (cursor); // cursor가 undefined가 되면 루프 종료

    pageBlocksCache.set(pageId, blocks); // 캐시에 저장
    console.log("Fetched and cached Blocks:", blocks);
    return blocks;
  } catch (error) {
    console.error("Error fetching page blocks:", error);
    throw new Error("Failed to fetch page blocks");
  }
}
