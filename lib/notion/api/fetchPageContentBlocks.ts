
// //lib/api/fetchPageContentBlocks.ts
// import { BlockObjectResponse, PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
// import { notion } from "../client";

// const pageBlocksCache = new Map<string, (BlockObjectResponse | PartialBlockObjectResponse)[]>();


// // /**
// //  * 특정 페이지의 모든 블록을 가져오는 함수 (페이징 처리 포함)
// //  * @param pageId - 페이지 ID
// //  * @returns 블록의 배열
// //  */

// export async function fetchPageContentBlocks(pageId: string): Promise<(BlockObjectResponse | PartialBlockObjectResponse)[]> {
//   if (pageBlocksCache.has(pageId)) {
//     console.log(`Returning cached blocks for page: ${pageId}`);
//     return pageBlocksCache.get(pageId)!;
//   }

//   const blocks: (BlockObjectResponse | PartialBlockObjectResponse)[] = [];
//   let cursor: string | undefined;

//   try {
//     do {
//       const { results, next_cursor } = await notion.blocks.children.list({
//         block_id: pageId,
//         start_cursor: cursor,
//         page_size: 20,
//       });

//       blocks.push(...results);
//       cursor = next_cursor || undefined; // null 값을 undefined로 변환
//     } while (cursor); // cursor가 undefined가 되면 루프 종료

//     pageBlocksCache.set(pageId, blocks); // 캐시에 저장
//     console.log("Fetched and cached Blocks:", blocks);
//     return blocks;
//   } catch (error) {
//     console.error("Error fetching page blocks:", error);
//     throw new Error("Failed to fetch page blocks");
//   }
// }

// export async function fetchPageContentBlocks(pageId: string) {
//   try {
//     const blocks = [];
//     let cursor;

//     do {
//       const { results, next_cursor } = await notion.blocks.children.list({
//         block_id: pageId,
//         start_cursor: cursor,
//       });

//       blocks.push(...results);
//       cursor = next_cursor;
//     } while (cursor);

//     if (!blocks.length) {
//       console.warn(`⚠️ No blocks found for page ID: ${pageId}`);
//     }

//     return blocks;
//   } catch (error) {
//     console.error('Error fetching page content blocks:', error);
//     throw new Error('Failed to fetch page blocks');
//   }
// }
// //

// export async function fetchPageContentBlocks(pageId: string) {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/block/${pageId}`);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch page content blocks: ${response.statusText}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching page content blocks:', error);
//     throw error;
//   }
// }
//////////////////////
// import {
//   BlockObjectResponse,
//   PartialBlockObjectResponse,
// } from '@notionhq/client/build/src/api-endpoints';
// import { notion } from '../client';

// const pageBlocksCache = new Map<string, (BlockObjectResponse | PartialBlockObjectResponse)[]>();

// /**
//  * 특정 페이지의 모든 블록을 가져오는 함수 (페이징 처리 포함)
//  * @param pageId - 페이지 ID
//  * @returns 블록 배열
//  */
// export async function fetchPageContentBlocks(
//   pageId: string
// ): Promise<(BlockObjectResponse | PartialBlockObjectResponse)[]> {
//   // 캐시 확인
//   if (pageBlocksCache.has(pageId)) {
//     console.log(`[CACHE] Returning cached blocks for pageId: ${pageId}`);
//     return pageBlocksCache.get(pageId)!;
//   }

//   const blocks: (BlockObjectResponse | PartialBlockObjectResponse)[] = [];
//   let cursor: string | undefined;

//   try {
//     do {
//       const { results, next_cursor } = await notion.blocks.children.list({
//         block_id: pageId,
//         start_cursor: cursor,
//         page_size: 50, // 한 번에 최대 50개 가져오기
//       });

//       blocks.push(...results);
//       cursor = next_cursor || undefined; // 다음 커서를 설정
//     } while (cursor);

//     if (!blocks.length) {
//       console.warn(`[WARN] No blocks found for pageId: ${pageId}`);
//     }

//     // 캐시에 저장
//     pageBlocksCache.set(pageId, blocks);
//     return blocks;
//   } catch (error) {
//     console.error(`[ERROR] Failed to fetch blocks for pageId: ${pageId}`, error);
//     throw new Error('Failed to fetch page blocks');
//   }
// }



// ///진행중
// import { fetchBlockChildren } from './fetchBlockChildren';
// import {
//   BlockObjectResponse,
//   PartialBlockObjectResponse,
// } from '@notionhq/client/build/src/api-endpoints';

// export async function fetchPageContentBlocks(pageId: string): Promise<BlockObjectResponse[]> {
//   const response = await fetch(`/api/block/${pageId}`);
//   const data = await response.json();

//   // 명확한 타입으로 필터링
//   const blocks: BlockObjectResponse[] = data.results.filter(
//     (block: BlockObjectResponse | PartialBlockObjectResponse) =>
//       block.object === 'block'
//   ) as BlockObjectResponse[];

//   // 모든 블록과 하위 블록 처리
//   const fetchAllBlocks = async (blockList: BlockObjectResponse[]): Promise<BlockObjectResponse[]> => {
//     const expandedBlocks: BlockObjectResponse[] = [];
//     for (const block of blockList) {
//       expandedBlocks.push(block);

//       if (block.has_children) {
//         const children = await fetchBlockChildren(block.id); // 하위 블록 호출
//         expandedBlocks.push(...(await fetchAllBlocks(children))); // 재귀 호출
//       }
//     }
//     return expandedBlocks;
//   };

//   return fetchAllBlocks(blocks);
// }

// import { notion } from '@/lib/notion/client';
// import {
  
//   BlockObjectResponse,
// } from '@notionhq/client/build/src/api-endpoints';

// // 하위 블록 데이터를 가져오는 재귀 함수
// async function fetchBlockChildren(blockId: string): Promise<BlockObjectResponse[]> {
//   const children: BlockObjectResponse[] = [];
//   let hasMore = true;
//   let nextCursor: string | undefined;

//   while (hasMore) {
//     const response = await notion.blocks.children.list({
//       block_id: blockId,
//       start_cursor: nextCursor,
//     });

//     const results = response.results as BlockObjectResponse[];
//     children.push(...results);

//     hasMore = response.has_more;
//     nextCursor = response.next_cursor || undefined;

//     // 재귀적으로 하위 블록 처리
//     for (const block of results) {
//       if (block.has_children) {
//         const childBlocks = await fetchBlockChildren(block.id);
//         children.push(...childBlocks);
//       }
//     }
//   }

//   return children;
// }

// // 페이지 블록 데이터를 가져오는 함수
// export async function fetchPageContentBlocks(pageId: string): Promise<BlockObjectResponse[]> {
//   const blocks: BlockObjectResponse[] = [];
//   let hasMore = true;
//   let nextCursor: string | undefined;

//   while (hasMore) {
//     const response = await notion.blocks.children.list({
//       block_id: pageId,
//       start_cursor: nextCursor,
//     });

//     const results = response.results as BlockObjectResponse[];
//     blocks.push(...results);

//     hasMore = response.has_more;
//     nextCursor = response.next_cursor || undefined;

//     // has_children인 블록 처리
//     for (const block of results) {
//       if (block.has_children) {
//         const childBlocks = await fetchBlockChildren(block.id);
//         blocks.push(...childBlocks);
//       }
//     }
//   }

//   return blocks;
// }



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
