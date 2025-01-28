//block 중에서 하위 depth가 있는 데이터 처리

import { notion } from "../client";
import { BlockWithChildren } from "../types";

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

    // console.log(`Fetched children for block ${blockId}:`, response.results);

    const results = response.results as BlockWithChildren[];
    for (const block of results) {
      if (block.has_children) {
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
