// utils/mapNotionBlockToNotionXBlock.ts

import { Block } from 'notion-types'; // react-notion-x Block 타입
import { NotionBlock } from '@/types/notionDataType'; // Notion API 블록 타입

/**
 * Notion API의 원시 블록을 react-notion-x가 사용하는 Block으로 매핑하는 함수
//  */


export const mapNotionBlockToNotionXBlock = (block: NotionBlock): Block | null => {
  const typeMapping: Record<string, Block['type']> = {
    paragraph: 'text',
    heading_1: 'header',
    heading_2: 'sub_header',
    heading_3: 'sub_sub_header',
    bulleted_list_item: 'bulleted_list',
    numbered_list_item: 'numbered_list',
  };

  const mappedType = typeMapping[block.type];

  if (!mappedType) {
    console.warn(`Unsupported block type: ${block.type}`);
    return null;
  }

  return {
    id: block.id,
    type: mappedType,
    parent_id: block.parent.page_id || '',
    parent_table: 'block',
    alive: true,
    version: 1,
    created_time: new Date(block.created_time).getTime(),
    last_edited_time: new Date(block.last_edited_time).getTime(),
    created_by_table: 'notion_user',
    created_by_id: block.created_by.id || '',
    last_edited_by_table: 'notion_user',
    last_edited_by_id: block.last_edited_by.id || '',
  } as Block;
};
