// ///block 타입 test
// import { Client } from "@notionhq/client";
// import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export async function fetchPageBlocksWithChildren(pageId: string): Promise<BlockObjectResponse[]> {
//   const blocks = await notion.blocks.children.list({ block_id: pageId });
  
//   // Fetch children recursively
//   const enrichedBlocks = await Promise.all(
//     blocks.results.map(async (block: any) => {
//       if (block.has_children) {
//         const children = await fetchPageBlocksWithChildren(block.id);
//         return { ...block, children };
//       }
//       return block;
//     })
//   );

//   return enrichedBlocks as BlockObjectResponse[];
// }
// import { Client } from "@notionhq/client";
// import { 
//   BlockObjectResponse, 
//   PartialBlockObjectResponse 
// } from "@notionhq/client/build/src/api-endpoints";

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// // 타입 가드 함수: 블록이 완전한 BlockObjectResponse인지 확인합니다.
// function isBlockObjectResponse(
//   block: PartialBlockObjectResponse | BlockObjectResponse
// ): block is BlockObjectResponse {
//   return 'type' in block && block.type !== 'unsupported';
// }

// // 페이지 블록을 재귀적으로 가져오는 함수
// export async function fetchPageBlocksWithChildren(
//   pageId: string
// ): Promise<BlockObjectResponse[]> {
//   const { results } = await notion.blocks.children.list({ block_id: pageId });

//   const blocksWithChildren = await Promise.all(
//     results.map(async (block) => {
//       if (isBlockObjectResponse(block) && block.has_children) {
//         const children = await fetchPageBlocksWithChildren(block.id);
//         return { ...block, children };
//       }
//       if (isBlockObjectResponse(block)) {
//         return block;
//       }
//       throw new Error(`Unsupported block type: ${JSON.stringify(block)}`);
//     })
//   );

//   return blocksWithChildren;
// }


import { isFullBlockResponse } from "@/types/notionDataType";
import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function fetchPageBlocksWithChildren(pageId: string): Promise<BlockObjectResponse[]> {
  const { results } = await notion.blocks.children.list({ block_id: pageId });

  const blocksWithChildren: BlockObjectResponse[] = await Promise.all(
    results.map(async (block) => {
      if (isFullBlockResponse(block) && block.has_children) {
        const children = await fetchPageBlocksWithChildren(block.id);
        return { ...block, children };
      }
      if (isFullBlockResponse(block)) {
        return block;
      }
      throw new Error("Unexpected block type");
    })
  );

  return blocksWithChildren;
}
