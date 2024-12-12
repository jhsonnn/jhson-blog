// lib/notion/utils/transformBlocks.ts
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import {
  BlockWithChildren,
  isBulletedListItemBlock,
  isHeading1Block,
  isHeading2Block,
  isHeading3Block,
  isParagraphBlock,
  NotionBlockType,
  NotionRichTextItemResponse,
} from '@/lib/notion/types';
import transformRichText from './transformRichText';

async function fetchChildren(blockId: string): Promise<BlockObjectResponse[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const response = await fetch(`${apiUrl}/api/block/${blockId}`, { cache: 'no-store' });

  if (!response.ok) {
    console.error(`Failed to fetch children for blockId: ${blockId}`);
    return [];
  }

  const children = await response.json();
  console.log(`Fetched children for block ${blockId}:`, children);
  return children;
}

async function transformBlocks(blocks: BlockObjectResponse[]): Promise<BlockWithChildren[]> {
  return Promise.all(
    
    blocks.map(async (block) => {
      const transformedBlock: BlockWithChildren = {
        id: block.id,
        type: block.type as NotionBlockType,
        has_children: block.has_children,
        children: [],
      };

      if (isParagraphBlock(block)) {
        transformedBlock.paragraph = {
          rich_text: block.paragraph.rich_text.map(transformRichText) as NotionRichTextItemResponse[],
        };
      } else if (isHeading1Block(block)) {
        transformedBlock.heading_1 = {
          rich_text: block.heading_1.rich_text.map(transformRichText) as NotionRichTextItemResponse[],
        };
      } else if (isHeading2Block(block)) {
        transformedBlock.heading_2 = {
          rich_text: block.heading_2.rich_text.map(transformRichText) as NotionRichTextItemResponse[],
        };
      } else if (isHeading3Block(block)) {
        transformedBlock.heading_3 = {
          rich_text: block.heading_3.rich_text.map(transformRichText) as NotionRichTextItemResponse[],
        };
      } else if (isBulletedListItemBlock(block)) {
        transformedBlock.bulleted_list_item = {
          rich_text: block.bulleted_list_item.rich_text.map(transformRichText) as NotionRichTextItemResponse[],
        };
      } else if (block.type === 'image' && block.image) {
        transformedBlock.image = {
          type: block.image.type,
          file: block.image.type === 'file' ? { url: block.image.file?.url || '' } : undefined,
          external: block.image.type === 'external' ? { url: block.image.external?.url || '' } : undefined,
          caption: block.image.caption ? block.image.caption.map((item) => ({ ...item })) : [],
        };
      } else if (block.type === 'video' && block.video) {
          console.log('Processing video block:', JSON.stringify(block, null, 2)); // 비디오 블록 전체 디버깅
          transformedBlock.video = {
           type: block.video.type,
            file: block.video.type === 'file' ? { url: block.video.file?.url || '' } : undefined,
            external: block.video.type === 'external' ? { url: block.video.external?.url || '' } : undefined,
        };
      console.log('Transformed video block:', JSON.stringify(transformedBlock.video, null, 2)); // 변환된 비디오 블록 확인
}

      if (block.has_children) {
        const children = await fetchChildren(block.id);
        transformedBlock.children = await transformBlocks(children);
      }

      return transformedBlock;
    })
  );
}

export default transformBlocks;
