//TEST: Next.js API 프록시 사용, 최신 url 유지하면서 캐싱 적용
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { imageUrl } = req.query;

  if (!imageUrl || typeof imageUrl !== 'string') {
    return res.status(400).json({ error: 'Invalid image URL' });
  }

  try {
    const notionImageUrl = decodeURIComponent(imageUrl);
    const response = await fetch(notionImageUrl);
    const arrayBuffer = await response.arrayBuffer();

    res.setHeader('Content-Type', response.headers.get('Content-Type') || 'image/jpeg');
    //Cache-Control 적용, 최대 1시간동안 최신 url 유지
    res.setHeader('Cache-Control', 'public, max-age=3600');

    return res.send(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error('Error fetching Notion image:', error);
    return res.status(500).json({ error: 'Failed to fetch image' });
  }
}
