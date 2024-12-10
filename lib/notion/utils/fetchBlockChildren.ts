import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export async function fetchBlockChildren(blockId: string): Promise<BlockObjectResponse[]> {
  const response = await fetch(`/api/block/${blockId}/children`);
  const data = await response.json();

  // 응답 데이터를 명확히 필터링하여 타입 지정
  return data.results.filter(
    (block: BlockObjectResponse) => block.object === 'block'
  ) as BlockObjectResponse[];
}
