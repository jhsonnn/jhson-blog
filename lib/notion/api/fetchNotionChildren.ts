//blockId에 따라 데이터 필터링
import { BlockWithChildren } from '@/lib/notion/types';

export async function fetchNotionChildren(blockId: string): Promise<BlockWithChildren[]> {
  try {
    const response = await fetch(`/api/block/${blockId}`);
    if (response.ok) {
      const data = await response.json();
      return data.results as BlockWithChildren[];
    } else {
      console.error(`Failed to fetch children for block: ${blockId}`);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching children for block: ${blockId}`, error);
    return [];
  }
}
