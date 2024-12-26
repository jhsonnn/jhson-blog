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
