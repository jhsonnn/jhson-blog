// import { notionClient } from "../client";
// import { BlockWithChildren, isBlockObjectResponse } from "../types";
// import { fetchChildren } from "./fetchChildren";

// export const fetchBlockTree = async (blockIds: string | string[]): Promise<BlockWithChildren[]> => {
//   const ids = Array.isArray(blockIds) ? blockIds : [blockIds];

//   try {
//     const allBlocks = await Promise.all(
//       ids.map(async (id) => {
//         const response = await notionClient.blocks.children.list({ block_id: id });
//         const blocks = response.results;

//         const uniqueBlocks = Array.from(new Map(blocks.map((block) => [block.id, block])).values());
//         const children = await Promise.all(
//           uniqueBlocks.map(async (block) => {
//             if (!isBlockObjectResponse(block)) {
//               return {
//                 id: block.id,
//                 type: "unsupported",
//                 has_children: false,
//                 children: [],
//               } as BlockWithChildren;
//             }

//             const blockWithChildren: BlockWithChildren = { ...block, children: [] };
//             if (block.has_children) {
//               blockWithChildren.children = await fetchChildren(block.id); // fetchChildren 호출
//             }
//             return blockWithChildren;
//           })
//         );
//         return children;
//       })
//     );

//     return allBlocks.flat();
//   } catch (error) {
//     console.error(`Error fetching block tree:`, error);
//     return [];
//   }
// };


//최적화 테스트
import { notionClient } from "../client";
import { BlockWithChildren, isBlockObjectResponse } from "../types";
import { fetchChildren } from "./fetchChildren";

export const fetchBlockTree = async (blockIds: string | string[]): Promise<BlockWithChildren[]> => {
  const ids = Array.isArray(blockIds) ? blockIds : [blockIds];

  try {
    // 블록 ID별 데이터 요청
    const allBlocks = await Promise.all(
      ids.map(async (id) => {
        const response = await notionClient.blocks.children.list({ block_id: id });
        const blocks = response.results;

        // 중복 블록 제거
        const uniqueBlocks = Array.from(new Map(blocks.map((block) => [block.id, block])).values());

        // 자식 블록 병렬 처리
        const blocksWithChildren = await Promise.all(
          uniqueBlocks.map(async (block) => {
            if (!isBlockObjectResponse(block)) {
              return {
                id: block.id,
                type: "unsupported",
                has_children: false,
                children: [],
              } as BlockWithChildren;
            }

            // 자식 블록 처리 (병렬로 fetchChildren 호출)
            const children = block.has_children
              ? await fetchChildrenWithCache(block.id) // 캐시를 활용한 fetchChildren
              : [];

            return {
              ...block,
              children,
            } as BlockWithChildren;
          })
        );

        return blocksWithChildren;
      })
    );

    // 모든 블록 평탄화
    return allBlocks.flat();
  } catch (error) {
    console.error(`Error fetching block tree:`, error);
    return [];
  }
};

// fetchChildren 캐싱 적용
const cache = new Map<string, BlockWithChildren[]>();

async function fetchChildrenWithCache(blockId: string): Promise<BlockWithChildren[]> {
  if (cache.has(blockId)) {
    return cache.get(blockId)!;
  }

  const children = await fetchChildren(blockId);
  cache.set(blockId, children);
  return children;
}
