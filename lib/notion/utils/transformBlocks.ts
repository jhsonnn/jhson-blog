// // // lib/notion/utils/transformBlocks.ts
// import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
// import { BlockWithChildren, isBulletedListItemBlock, isHeading1Block, isHeading2Block, isHeading3Block, isParagraphBlock } from '@/lib/notion/types/notionDataType';
// import transformRichText from './transformRichText';


// // fetchChildren 함수: 특정 블록 ID의 하위 블록을 가져오는 함수
// async function fetchChildren(blockId: string): Promise<BlockObjectResponse[]> {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
//   const response = await fetch(`${apiUrl}/api/block/${blockId}`, { cache: 'no-store' });

//   if (!response.ok) {
//     console.error(`Failed to fetch children for blockId: ${blockId}`);
//     return [];
//   }

//   const children = await response.json();
//   console.log(`Fetched children for block ${blockId}:`, children);
//   return children;
// }

// // async function transformBlocks(blocks: BlockObjectResponse[]): Promise<BlockWithChildren[]> {
// //   return Promise.all(
// //     blocks.map(async (block) => {
// //       const transformedBlock: BlockWithChildren = {
// //         id: block.id,
// //         type: block.type,
// //         has_children: block.has_children,
// //         children: [],
// //       };

// //       // Type-specific transformations
// //       if (block.type === 'paragraph' && block.paragraph) {
// //         transformedBlock.paragraph = {
// //           rich_text: block.paragraph.rich_text.map(transformRichText),
// //         };
// //       } else if (block.type === 'heading_1' && block.heading_1) {
// //         transformedBlock.heading_1 = {
// //           rich_text: block.heading_1.rich_text.map(transformRichText),
// //         };
// //       } else if (block.type === 'heading_2' && block.heading_2) {
// //         transformedBlock.heading_2 = {
// //           rich_text: block.heading_2.rich_text.map(transformRichText),
// //         };
// //       } else if (block.type === 'heading_3' && block.heading_3) {
// //         transformedBlock.heading_3 = {
// //           rich_text: block.heading_3.rich_text.map(transformRichText),
// //         };
// //       } else if (block.type === 'bulleted_list_item' && block.bulleted_list_item) {
// //         transformedBlock.bulleted_list_item = {
// //           rich_text: block.bulleted_list_item.rich_text.map(transformRichText),
// //         };
// //       }

// //       // Fetch and transform children if the block has children
// //       if (block.has_children) {
// //         const children = await fetchChildren(block.id);
// //         transformedBlock.children = await transformBlocks(children); // Recursive call
// //       }

// //       return transformedBlock;
// //     })
// //   );
// // }

// async function transformBlocks(blocks: BlockObjectResponse[]): Promise<BlockWithChildren[]> {
//   return Promise.all(
//     blocks.map(async (block) => {
//       const transformedBlock: BlockWithChildren = {
//         id: block.id,
//         type: block.type,
//         has_children: block.has_children,
//         children: [],
//       };

//       // 타입별 변환
//       if (isParagraphBlock(block)) {
//         transformedBlock.paragraph = {
//           rich_text: block.paragraph.rich_text.map(transformRichText),
//         };
//       } else if (isHeading1Block(block)) {
//         transformedBlock.heading_1 = {
//           rich_text: block.heading_1.rich_text.map(transformRichText),
//         };
//       } else if (isHeading2Block(block)) {
//         transformedBlock.heading_2 = {
//           rich_text: block.heading_2.rich_text.map(transformRichText),
//         };
//       } else if (isHeading3Block(block)) {
//         transformedBlock.heading_3 = {
//           rich_text: block.heading_3.rich_text.map(transformRichText),
//         };
//       } else if (isBulletedListItemBlock(block)) {
//         transformedBlock.bulleted_list_item = {
//           rich_text: block.bulleted_list_item.rich_text.map(transformRichText),
//         };
//       }

//       // 하위 블록 변환
//       if (block.has_children) {
//         const children = await fetchChildren(block.id);
//         transformedBlock.children = await transformBlocks(children);
//       }

//       return transformedBlock;
//     })
//   );
// }

// export default transformBlocks;



// // ///진행중2
// // // lib/notion/utils/transformBlocks.ts
// // async function transformBlocks(blocks: BlockObjectResponse[]): Promise<BlockWithChildren[]> {
// //   return Promise.all(
// //     blocks.map(async (block) => {
// //       const transformedBlock: BlockWithChildren = {
// //         id: block.id,
// //         type: block.type,
// //         has_children: block.has_children,
// //         children: [],
// //       };

// //       // 블록 타입별 변환
// //       if (block.type === 'paragraph' && 'paragraph' in block) {
// //         transformedBlock.paragraph = {
// //           rich_text: block.paragraph.rich_text.map(transformRichText),
// //         };
// //       } else if (block.type === 'to_do' && 'to_do' in block) {
// //         transformedBlock.to_do = {
// //           rich_text: block.to_do.rich_text.map(transformRichText),
// //           color: block.to_do.color,
// //           checked: block.to_do.checked,
// //         };
// //       } else if (block.type === 'unsupported') {
// //         transformedBlock.unsupported = true;
// //       }

// //       // 하위 블록 변환
// //       if (block.has_children) {
// //         const children = await fetchChildren(block.id);
// //         transformedBlock.children = await transformBlocks(children);
// //       }

// //       return transformedBlock;
// //     })
// //   );
// // }

// // async function fetchChildren(blockId: string): Promise<BlockObjectResponse[]> {
// //   const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
// //   const response = await fetch(`${apiUrl}/api/block/${blockId}`, { cache: 'no-store' });

// //   if (!response.ok) {
// //     console.error(`Failed to fetch children for blockId: ${blockId}`);
// //     return [];
// //   }

// //   return await response.json();
// // }


// // export default transformBlocks;



// lib/notion/utils/transformBlocks.ts
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { BlockWithChildren, isBulletedListItemBlock, isHeading1Block, isHeading2Block, isHeading3Block, isParagraphBlock, NotionBlockType, NotionRichTextItemResponse } from '@/lib/notion/types/notionDataType';
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
