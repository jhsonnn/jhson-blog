import { notion } from "@/lib/notion/client";

export async function fetchNotionPageBlocks(pageId: string) {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
    });

    if (!response.results || response.results.length === 0) {
      throw new Error(`No blocks found for pageId: ${pageId}`);
    }

    return response.results;
  } catch (error) {
    console.error(`Failed to fetch blocks for pageId: ${pageId}`, error);
    throw new Error(`Failed to fetch blocks for pageId: ${pageId}`);
  }
}
