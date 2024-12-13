// fetchPageBlocks.ts

import { notion } from "../client";
import { BlockWithChildren } from "../types";

export async function fetchWithRetry(blockId: string, retries = 3): Promise<BlockWithChildren[]> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await notion.blocks.children.list({ block_id: blockId });

      //console.log(`Attempt ${attempt + 1}: Fetched response for blockId ${blockId}`, response);

      return response.results as BlockWithChildren[];
    } catch (error) {
      if (attempt < retries - 1) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential delay
        console.warn(`Retrying fetch after ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error(`Failed to fetch blocks after ${retries} attempts:`, error);
        throw error;
      }
    }
  }

  //빈 배열 기본값 반환
  console.warn(`Returning empty array for blockId ${blockId} after ${retries} retries.`);
  return [];
}
