// import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
// import {
//   BlockWithChildren,
//   isBulletedListItemBlock,
//   isHeading1Block,
//   isHeading2Block,
//   isHeading3Block,
//   isParagraphBlock,
//   NotionBlockType,
//   NotionRichTextItemResponse,
// } from '@/lib/notion/types';
// import transformRichText from './transformRichText';



// async function transformBlocks(blocks: BlockObjectResponse[]): Promise<BlockWithChildren[]> {
//   return Promise.all(
    
//     blocks.map(async (block) => {
//       const transformedBlock: BlockWithChildren = {
//         id: block.id,
//         type: block.type as NotionBlockType,
//         has_children: block.has_children,
//         children: [],
//       };

//       if (isParagraphBlock(block)) {
//         transformedBlock.paragraph = {
//           rich_text: block.paragraph.rich_text.map(transformRichText) as NotionRichTextItemResponse[],
//         };
//       } else if (isHeading1Block(block)) {
//         transformedBlock.heading_1 = {
//           rich_text: block.heading_1.rich_text.map(transformRichText) as NotionRichTextItemResponse[],
//         };
//       } else if (isHeading2Block(block)) {
//         transformedBlock.heading_2 = {
//           rich_text: block.heading_2.rich_text.map(transformRichText) as NotionRichTextItemResponse[],
//         };
//       } else if (isHeading3Block(block)) {
//         transformedBlock.heading_3 = {
//           rich_text: block.heading_3.rich_text.map(transformRichText) as NotionRichTextItemResponse[],
//         };
//       } else if (isBulletedListItemBlock(block)) {
//         transformedBlock.bulleted_list_item = {
//           rich_text: block.bulleted_list_item.rich_text.map(transformRichText) as NotionRichTextItemResponse[],
//         };
//       } else if (block.type === 'image' && block.image) {
//         transformedBlock.image = {
//           type: block.image.type,
//           file: block.image.type === 'file' ? { url: block.image.file?.url || '' } : undefined,
//           external: block.image.type === 'external' ? { url: block.image.external?.url || '' } : undefined,
//           caption: block.image.caption ? block.image.caption.map((item) => ({ ...item })) : [],
//         };
//       } else if (block.type === 'video' && block.video) {
//           // console.log('Processing video block:', JSON.stringify(block, null, 2)); // 비디오 블록 전체 디버깅
//           transformedBlock.video = {
//            type: block.video.type,
//             file: block.video.type === 'file' ? { url: block.video.file?.url || '' } : undefined,
//             external: block.video.type === 'external' ? { url: block.video.external?.url || '' } : undefined,
//         };
//       //console.log('Transformed video block:', JSON.stringify(transformedBlock.video, null, 2)); // 변환된 비디오 블록 확인
// }

//       if (block.has_children) {
//         const children = await fetchChildren(block.id);
//         transformedBlock.children = await transformBlocks(children);
//       }

//       return transformedBlock;
//     })
//   );
// }

// export default transformBlocks;

// async function fetchChildren(blockId: string): Promise<BlockObjectResponse[]> {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
//   const response = await fetch(`${baseUrl}/api/block/${blockId}`, { cache: 'no-store' });

//   // console.log('NEXT_PUBLIC_BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL);

//   if (!response.ok) {
//     console.error(`Failed to fetch children for blockId: ${blockId}`);
//     return [];
//   }

//   const children = await response.json();
//   // console.log(`Fetched children for block ${blockId}:`, children);
//   return children;
// }

//최적화 테스트
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { BlockWithChildren, NotionBlockType } from "../types";
import { fetchChildren } from "./fetchChildren";


export async function transformBlocks(blocks: BlockObjectResponse[]): Promise<BlockWithChildren[]> {
  const uniqueBlocks = Array.from(new Map(blocks.map((block) => [block.id, block])).values());

  return Promise.all(
    uniqueBlocks.map(async (block) => {
      const transformedBlock: BlockWithChildren = {
        id: block.id,
        type: block.type as NotionBlockType,
        has_children: block.has_children,
        children: [],
      };

      //block 유형별로 처리
      switch (block.type) {
        case "paragraph":
          transformedBlock.paragraph = { rich_text: block.paragraph.rich_text };
          break;
        case "heading_1":
          transformedBlock.heading_1 = { rich_text: block.heading_1.rich_text };
          break;
        case "heading_2":
          transformedBlock.heading_2 = { rich_text: block.heading_2.rich_text };
          break;
        case "heading_3":
          transformedBlock.heading_3 = { rich_text: block.heading_3.rich_text };
          break;
        case "bulleted_list_item":
          transformedBlock.bulleted_list_item = { rich_text: block.bulleted_list_item.rich_text };
          break;
        case "numbered_list_item":
          transformedBlock.numbered_list_item = { rich_text: block.numbered_list_item.rich_text };
          break;
        case "to_do":
          transformedBlock.to_do = {
            rich_text: block.to_do.rich_text,
            checked: block.to_do.checked,
            color: block.to_do.color || "default",
          };
          break;
        case "toggle":
          transformedBlock.toggle = { rich_text: block.toggle.rich_text };
          break;
        case "quote":
          transformedBlock.quote = { rich_text: block.quote.rich_text };
          break;
        case "callout":
          transformedBlock.callout = {
            rich_text: block.callout.rich_text,
            icon: block.callout.icon,
          };
          break;
        case "divider":
          transformedBlock.divider = {};
          break;
        case "image":
          transformedBlock.image = {
            type: block.image.type,
            file: block.image.type === "file" ? block.image.file : undefined,
            external: block.image.type === "external" ? block.image.external : undefined,
            caption: block.image.caption || [],
          };
          break;
        case "video":
          transformedBlock.video = {
            type: block.video.type,
            file: block.video.type === "file" ? block.video.file : undefined,
            external: block.video.type === "external" ? block.video.external : undefined,
          };
          break;
        case "file":
          transformedBlock.file = {
            type: block.file.type,
            file: block.file.type === "file" ? block.file.file : undefined,
            external: block.file.type === "external" ? block.file.external : undefined,
          };
          break;
        case "bookmark":
          transformedBlock.bookmark = { url: block.bookmark.url, caption: block.bookmark.caption };
          break;
        case "code":
          transformedBlock.code = {
            rich_text: block.code.rich_text,
            language: block.code.language,
          };
          break;
        case "column_list":
          transformedBlock.column_list = {};
          break;
        case "column":
          transformedBlock.column = {};
          break;
        default:
          console.warn(`Unhandled block type: ${block.type}`);
      }

      //자식 block 처리
      if (block.has_children) {
        const children = await fetchChildren(block.id); // fetchChildren 호출
        transformedBlock.children = await transformBlocks(children);
      }

      return transformedBlock;
    })
  );
}
