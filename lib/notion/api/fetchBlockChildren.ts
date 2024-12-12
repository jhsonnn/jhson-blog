// import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { notion } from "../client";
import { BlockWithChildren } from "../types/notionDataType";

// export async function fetchBlockChildren(blockId: string): Promise<BlockObjectResponse[]> {
//   const response = await fetch(`/api/block/${blockId}/children`);
//   const data = await response.json();

//   // 응답 데이터를 명확히 필터링하여 타입 지정
//   return data.results.filter(
//     (block: BlockObjectResponse) => block.object === 'block'
//   ) as BlockObjectResponse[];
// }

// /lib/notion/api/fetchBlockChildren.ts
// import { notion } from '@/lib/notion/client';
// import { BlockWithChildren } from '@/lib/notion/types/notionDataType';

// /**
//  * 특정 블록의 모든 자식 블록을 가져오는 함수
//  * @param blockId - 블록의 ID
//  * @param depth - 현재 깊이
//  * @param maxDepth - 최대 깊이 제한
//  * @returns 하위 블록을 포함한 블록 배열
//  */
// export async function fetchBlockChildren(
//   blockId: string,
//   depth = 1,
//   maxDepth = 3
// ): Promise<BlockWithChildren[]> {
//   if (depth > maxDepth) return [];

//   const children: BlockWithChildren[] = [];
//   let hasMore = true;
//   let cursor: string | undefined = undefined;

//   while (hasMore) {
//     const response = await notion.blocks.children.list({
//       block_id: blockId,
//       start_cursor: cursor,
//     });

//     const results = response.results as BlockWithChildren[];
//     children.push(...results);

//     hasMore = response.has_more;
//     cursor = response.next_cursor || undefined;

//     for (const block of results) {
//       if (block.has_children) {
//         block.children = await fetchBlockChildren(block.id, depth + 1, maxDepth);
//       } else {
//         block.children = [];
//       }
//     }
//   }

//   return children;
// }



// /lib/notion/api/fetchBlockChildren.ts
// /lib/notion/api/fetchBlockChildren.ts
// import { notion } from '@/lib/notion/client';
// import { BlockWithChildren } from '@/lib/notion/types/notionDataType';

// /**
//  * 특정 블록의 모든 자식 블록을 가져오는 함수
//  * @param blockId - 블록의 ID
//  * @param depth - 현재 깊이
//  * @param maxDepth - 최대 깊이 제한
//  * @returns 하위 블록을 포함한 블록 배열
//  */
// export async function fetchBlockChildren(
//   blockId: string,
//   depth = 1,
//   maxDepth = 3
// ): Promise<BlockWithChildren[]> {
//   if (depth > maxDepth) {
//     return [];
//   }

//   try {
//     const children: BlockWithChildren[] = [];
//     let hasMore = true;
//     let cursor: string | undefined = undefined;

//     while (hasMore) {
//       const response = await notion.blocks.children.list({
//         block_id: blockId,
//         start_cursor: cursor,
//       });

//       const results = response.results as BlockWithChildren[];
//       children.push(...results);

//       hasMore = response.has_more;
//       cursor = response.next_cursor || undefined;

//       for (const block of results) {
//         if (block.has_children) {
//           block.children = await fetchBlockChildren(block.id, depth + 1, maxDepth);
//         } else {
//           block.children = []; // 기본적으로 빈 배열로 초기화
//         }
//       }
//     }

//     return children;
//   } catch (error) {
//     console.error(`Error fetching children for block ${blockId}:`, error);
//     return []; // 에러 발생 시 빈 배열 반환
//   }
// }




////
export async function fetchBlockChildren(
  blockId: string,
  depth = 1,
  maxDepth = 3
): Promise<BlockWithChildren[]> {
  if (depth > maxDepth) {
    return [];
  }

  const children: BlockWithChildren[] = [];
  let hasMore = true;
  let cursor: string | undefined;

  while (hasMore) {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    });

    console.log(`Fetched children for block ${blockId}:`, response.results);

    const results = response.results as BlockWithChildren[];
    for (const block of results) {
      if (block.has_children) {
        console.log(`Fetching children for block ${block.id}`);
        block.children = await fetchBlockChildren(block.id, depth + 1, maxDepth);
      } else {
        block.children = [];
      }
    }

    children.push(...results);
    hasMore = response.has_more;
    cursor = response.next_cursor || undefined;
  }

  return children;
}
