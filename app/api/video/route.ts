import { NextApiRequest, NextApiResponse } from 'next';
import { fetchVideoUrl } from '@/lib/notion/utils/fetchVideoUrl';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!process.env.NOTION_VIDEO_DB_ID) {
    return res.status(500).json({ error: 'NOTION_VIDEO_DB_ID is missing in environment variables' });
  }

  try {
    const videoUrl = await fetchVideoUrl(slug as string);
    if (!videoUrl) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.status(200).json({ videoUrl });
  } catch (error) {
    console.error('Error fetching video URL:', error);
    res.status(500).json({ error: 'Failed to fetch video URL' });
  }
}
