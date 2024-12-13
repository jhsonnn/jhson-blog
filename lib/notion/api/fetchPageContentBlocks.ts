////////
// import { notion } from '@/lib/notion/client';
// import {
//   BlockObjectResponse,
  
// } from '@notionhq/client/build/src/api-endpoints';

// // 하위 블록을 추가한 커스텀 타입 정의
// type BlockWithChildren = BlockObjectResponse & {
//   children?: BlockWithChildren[];
// };

// // 하위 블록 데이터를 가져오는 재귀 함수
// async function fetchBlockChildren(blockId: string): Promise<BlockWithChildren[]> {
//   const children: BlockWithChildren[] = [];
//   let hasMore = true;
//   let nextCursor: string | undefined;

//   while (hasMore) {
//     const response = await notion.blocks.children.list({
//       block_id: blockId,
//       start_cursor: nextCursor,
//     });

//     const results = response.results as BlockWithChildren[];
//     children.push(...results);

//     hasMore = response.has_more;
//     nextCursor = response.next_cursor || undefined;

//     // 하위 블록 처리
//     for (const block of results) {
//       if (block.has_children) {
//         const childBlocks = await fetchBlockChildren(block.id);
//         block.children = childBlocks; // 하위 블록 추가
//       }
//     }
//   }

//   return children;
// }

// // 페이지 블록 데이터를 가져오는 함수
// export async function fetchPageContentBlocks(pageId: string): Promise<BlockWithChildren[]> {
//   const blocks: BlockWithChildren[] = [];
//   let hasMore = true;
//   let nextCursor: string | undefined;

//   while (hasMore) {
//     const response = await notion.blocks.children.list({
//       block_id: pageId,
//       start_cursor: nextCursor,
//     });

//     const results = response.results as BlockWithChildren[];
//     blocks.push(...results);

//     hasMore = response.has_more;
//     nextCursor = response.next_cursor || undefined;

//     // 하위 블록 처리
//     for (const block of results) {
//       if (block.has_children) {
//         const childBlocks = await fetchBlockChildren(block.id);
//         block.children = childBlocks; // 하위 블록 추가
//       }
//     }
//   }

//   return blocks;
// }

// /lib/notion/api/fetchPageContentBlocks.ts
import { notion } from '@/lib/notion/client';
import { fetchBlockChildren } from '@/lib/notion/api/fetchBlockChildren';
import { BlockWithChildren } from '../types';

/**
 * 특정 Notion 페이지의 모든 최상위 블록과 하위 블록을 가져오는 함수
 * @param pageId - 블록을 가져올 페이지의 ID
 * @param maxDepth - 하위 블록을 가져올 최대 깊이 (기본값: 3)
 * @returns 하위 블록까지 포함된 모든 블록의 배열
 */
export async function fetchPageContentBlocks(pageId: string, maxDepth = 3): Promise<BlockWithChildren[]> {
  const blocks: BlockWithChildren[] = [];
  let hasMore = true;
  let nextCursor: string | undefined;

  while (hasMore) {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: nextCursor,
    });

    const results = response.results as BlockWithChildren[];
    blocks.push(...results);

    hasMore = response.has_more;
    nextCursor = response.next_cursor || undefined;

    for (const block of results) {
      if (block.has_children) {
        block.children = [];
        const childBlocks = await fetchBlockChildren(block.id, 2, maxDepth);
        block.children.push(...childBlocks);
      } else {
        block.children = [];
      }
    }
  }

  return blocks;
}
