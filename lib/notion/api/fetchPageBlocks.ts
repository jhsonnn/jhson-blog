//Notion API에서 특정 페이지의 블록 데이터를 가져오고 -> 가져온 데이터를 변환

import { notion } from '@/lib/notion/client';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { BlockWithChildren } from '@/lib/notion/types';
import transformBlocks from '@/lib/notion/utils/transformBlocks';

export async function fetchPageBlocks(pageId: string): Promise<BlockWithChildren[]> {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
    });
    console.log('Raw API Response:', response);

    const blocks = response.results as BlockObjectResponse[];

    //변환,필터링된 블록 반환
    const transformedBlocks = await transformBlocks(blocks);
    return transformedBlocks;
  } catch (error) {
    console.error(`Failed to fetch blocks for pageId: ${pageId}`, error);
    throw error;
  }
}

export default fetchPageBlocks;
