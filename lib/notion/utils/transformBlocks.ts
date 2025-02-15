//ISR 테스트
// utils/transformBlocks.ts
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { BlockWithChildren, NotionBlockType } from "../types";
import { fetchChildren } from "./fetchChildren";

export async function transformBlocks(blocks: BlockObjectResponse[]): Promise<BlockWithChildren[]> {
  const uniqueBlocks = Array.from(new Map(blocks.map((block) => [block.id, block])).values());

  return Promise.all(
    uniqueBlocks.map(async (block) => {
      console.log(`Transforming block: ${block.id} (${block.type})`);

      const transformedBlock: BlockWithChildren = {
        id: block.id,
        type: block.type as NotionBlockType,
        has_children: block.has_children,
        children: [],
      };

      switch (block.type) {
        case "paragraph":
          transformedBlock.paragraph = { rich_text: block.paragraph?.rich_text || [] };
          break;
        case "heading_1":
          transformedBlock.heading_1 = { rich_text: block.heading_1?.rich_text || [] };
          break;
        case "heading_2":
          transformedBlock.heading_2 = { rich_text: block.heading_2?.rich_text || [] };
          break;
        case "heading_3":
          transformedBlock.heading_3 = { rich_text: block.heading_3?.rich_text || [] };
          break;
        case "bulleted_list_item":
          transformedBlock.bulleted_list_item = { rich_text: block.bulleted_list_item?.rich_text || [] };
          break;
        case "numbered_list_item":
          transformedBlock.numbered_list_item = { rich_text: block.numbered_list_item?.rich_text || [] };
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
        default:
          console.warn(`Unhandled block type: ${block.type}`);
      }

      if (block.has_children) {
        const children = await fetchChildren(block.id);
        transformedBlock.children = await transformBlocks(children);
      }

      return transformedBlock;
    })
  );
}
