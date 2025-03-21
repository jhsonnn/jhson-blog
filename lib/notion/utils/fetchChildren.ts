import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export async function fetchChildren(blockId: string): Promise<BlockObjectResponse[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  try {
      //TEST: 노션 수정 중

    const response = await fetch(`${baseUrl}/api/block/${blockId}`,{ next: { revalidate: 60 } });
    //const response = await fetch(`${baseUrl}/api/block/${blockId}`, { cache: 'no-store' });

    if (!response.ok) {
      console.error(`Failed to fetch children for blockId: ${blockId}`);
      return [];
    }

    const children = await response.json();
    return Array.isArray(children) ? children : [];
  } catch (error) {
    console.error(`Error fetching children for blockId: ${blockId}`, error);
    return [];
  }
}
