import { Client } from '@notionhq/client';
import {
  BlockObjectResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

import { BlockWithChildren, NotionBlockType } from '../types';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// // 타입 가드: BlockObjectResponse인지 확인
// function isBlockObjectResponse(
//   block: PartialBlockObjectResponse | BlockObjectResponse
// ): block is BlockObjectResponse {
//   return block.object === 'block';
// }

export async function fetchNotionPageBySlug(slug: string) {
  try {
    // Slug 기반 페이지 조회
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: 'slug',
        rich_text: { equals: slug },
      },
    });

    if (!response || response.results.length === 0) return null;

    const page = response.results[0] as PageObjectResponse;

    // 블록 데이터 조회
    const blocksResponse = await notion.blocks.children.list({
      block_id: page.id,
    });

const blocks: BlockWithChildren[] = blocksResponse.results
  .filter((block): block is BlockObjectResponse => block.object === 'block') // 타입 가드
  .map((block) => {
    return {
      id: block.id,
      type: block.type as NotionBlockType,
      has_children: block.has_children,
      children: [], // 초기화된 자식 블록
      paragraph: block.type === 'paragraph' ? block.paragraph : undefined,
      heading_1: block.type === 'heading_1' ? block.heading_1 : undefined,
      heading_2: block.type === 'heading_2' ? block.heading_2 : undefined,
      heading_3: block.type === 'heading_3' ? block.heading_3 : undefined,
      bulleted_list_item:
        block.type === 'bulleted_list_item' ? block.bulleted_list_item : undefined,
      image: block.type === 'image' ? block.image : undefined,
      video: block.type === 'video' ? block.video : undefined,
    };
  });


    return {
      id: page.id,
      title:
        page.properties.title?.type === 'title'
          ? page.properties.title.title[0]?.plain_text || 'Untitled'
          : 'Untitled',
      created_time: page.created_time,
      blocks,
    };
  } catch (error) {
    console.error('Error fetching page by slug:', error);
    return null;
  }
}
