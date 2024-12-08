// //lib/notion/api/fetchPageBlocks.ts
// import { isFullBlockResponse } from "@/lib/notion/types/notionDataType";
// import { notion } from "../client";
// import {
//   BlockObjectResponse,
// } from "@notionhq/client/build/src/api-endpoints";

// // /**
// //  * 특정 페이지의 블록과 모든 자식 블록을 가져오는 함수
// //  * @param pageId - 페이지 ID
// //  * @returns 블록과 모든 자식 블록을 포함하는 배열
// //  */

// export async function fetchPageBlocks(pageId: string, depth = 1, maxDepth = 3): Promise<BlockObjectResponse[]> {
//   if (depth > maxDepth) {
//     console.debug(`Max depth of ${maxDepth} reached for page ${pageId}`);
//     return []; // maxDepth를 초과하면 빈 배열 반환
//   }

//   try {
//     const { results } = await notion.blocks.children.list({ block_id: pageId });

//     const blocksWithChildren: BlockObjectResponse[] = await Promise.all(
//       results.map(async (block) => {
//         if (isFullBlockResponse(block)) {
//           if (block.has_children) {
//             const children = await fetchPageBlocks(block.id, depth + 1, maxDepth);
//             return { ...block, children };
//           }
//           return block;
//         } else {
//           throw new Error("Unexpected block type");
//         }
//       })
//     );

//     return blocksWithChildren;
//   } catch (error) {
//     console.error("Error fetching page blocks with children:", error);
//     return [];
//   }
// }

import { notion } from "../client";

export async function fetchPageBlocksWithChildren(pageId: string) {
  try {
    const { results } = await notion.blocks.children.list({ block_id: pageId });
    return results;
  } catch (error) {
    console.error('Error fetching page blocks with children:', error);
    return [];
  }
}
