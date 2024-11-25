import { isFullBlockResponse } from '@/types/notionDataType';
import { notion } from './client';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// BlockWithChildren 타입 정의
export type BlockWithChildren = BlockObjectResponse & {
  children?: BlockWithChildren[];
};

export async function fetchPageContentBlocks(
  pageId: string,
  depth = 1,
  maxDepth = 3
): Promise<BlockWithChildren[]> {
  if (depth > maxDepth) {
    console.debug(`Max depth of ${maxDepth} reached for page ${pageId}`);
    return [];
  }

  const blocks: BlockWithChildren[] = [];
  let cursor: string | undefined;

     try {
    do {
      const { results, next_cursor } = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
      });

      for (const block of results) {
        if (isFullBlockResponse(block)) {
          const blockWithChildren: BlockWithChildren = { ...block };

          if (block.has_children) {
            blockWithChildren.children = await fetchPageContentBlocks(
              block.id,
              depth + 1,
              maxDepth
            );
          }

          blocks.push(blockWithChildren);
        }
      }

      cursor = next_cursor || undefined;
    } while (cursor);

    return blocks;
  } catch (error) {
    console.error('Error fetching page content blocks:', error);
    throw new Error('Failed to fetch page content blocks');
  }
}
