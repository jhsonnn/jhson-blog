//app/api/video/route.ts
import { fetchVideoUrl } from '@/lib/notion/utils/fetchVideoUrl';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!process.env.NOTION_VIDEO_DB_ID) {
    return new Response(JSON.stringify({ error: 'NOTION_VIDEO_DB_ID is missing in environment variables' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    if (!slug) {
      return new Response(JSON.stringify({ error: 'Slug is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const videoUrl = await fetchVideoUrl(slug);
    if (!videoUrl) {
      return new Response(JSON.stringify({ error: 'Video not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ videoUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching video URL:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch video URL' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
