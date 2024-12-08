// app/api/block/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { notion } from '@/lib/notion/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    console.error('Invalid block ID:', id);
    return res.status(400).json({ error: 'Invalid block ID' });
  }

  try {
    // 1️⃣ Notion 페이지 정보를 가져옵니다.
    const pageInfo = await notion.pages.retrieve({ page_id: id });
    console.log('🟢 Page Info:', pageInfo);

    // 2️⃣ 해당 페이지의 자식 블록을 가져옵니다.
    const { results: blocks } = await notion.blocks.children.list({ block_id: id });

    if (!blocks.length) {
      console.warn('⚠️ No blocks found for page ID:', id);
      return res.status(404).json({ error: 'No blocks found' });
    }

    res.status(200).json(blocks);
  } catch (error) {
    console.error('Error fetching blocks:', error);
    res.status(404).json({ error: 'Failed to fetch page blocks' });
  }
}
