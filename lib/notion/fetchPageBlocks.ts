import { notion } from './client';
import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

// 캐시 맵
const pageBlocksCache = new Map<string, (BlockObjectResponse | PartialBlockObjectResponse)[]>();

/**
 * 특정 페이지의 블록과 모든 자식 블록을 재귀적으로 가져오는 함수
 * @param pageId - 페이지 ID
 * @param depth - 현재 깊이
 * @param maxDepth - 최대 탐색 깊이
 * @returns 블록 배열
 */
export async function fetchPageBlocksWithChildren(
  pageId: string,
  depth = 1,
  maxDepth = 3
): Promise<BlockObjectResponse[]> {
  if (depth > maxDepth) {
    console.debug(`Max depth of ${maxDepth} reached for page ${pageId}`);
    return [];
  }

  try {
    const { results } = await notion.blocks.children.list({ block_id: pageId });
    const blocksWithChildren: BlockObjectResponse[] = await Promise.all(
      results.map(async (block) => {
        if ('type' in block && 'id' in block && block.object === 'block') {
          if (block.has_children) {
            const children = await fetchPageBlocksWithChildren(block.id, depth + 1, maxDepth);
            return { ...block, children };
          }
           return block as BlockObjectResponse;
        }
        return block as BlockObjectResponse;
      })
    );

    return blocksWithChildren

  } catch (error) {
    console.error(`Error fetching page blocks with children for page: ${pageId}`, error);
    return [];
  }
}

/**
 * 특정 페이지의 모든 블록을 가져오는 함수 (페이징 처리 포함)
 * @param pageId - 페이지 ID
 * @returns 블록 배열
 */
export async function fetchPageContentBlocks(
  pageId: string
): Promise<(BlockObjectResponse | PartialBlockObjectResponse)[]> {
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
      cursor = next_cursor || undefined;
    } while (cursor);

    pageBlocksCache.set(pageId, blocks);
    console.log(`Fetched and cached blocks for page: ${pageId}`);
    return blocks;
  } catch (error) {
    console.error(`Error fetching page content blocks for page: ${pageId}`, error);
    throw new Error('Failed to fetch page blocks');
  }
}
