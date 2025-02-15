//ISR 테스트
import { isPageObjectResponse } from '@/lib/notion/types';
import { notionClient } from '../client';

export async function fetchVideoUrl(slug: string): Promise<string | null> {
  console.log(`Fetching video for slug: ${slug}`);

  if (!process.env.NOTION_VIDEO_DB_ID) {
    console.error('Missing environment variable: NOTION_VIDEO_DB_ID');
    return null;
  }

  try {
    const response = await notionClient.databases.query({
      database_id: process.env.NOTION_VIDEO_DB_ID,
      filter: {
        property: 'name',
        title: { equals: slug },
      },
    });

    console.log(`Notion API response for slug (${slug}):`, response);

    if (response.results.length === 0) {
      console.warn(`No video found for slug: ${slug}`);
      return null;
    }

    const videoPage = response.results[0];
    let videoUrl: string | null = null;

    if (isPageObjectResponse(videoPage)) {
      const urlProperty = videoPage.properties.url;
      if (urlProperty?.type === 'rich_text' && urlProperty.rich_text.length > 0) {
        videoUrl = urlProperty.rich_text[0].plain_text;
      }
    }

    if (!videoUrl) {
      console.warn(`Video URL not found for slug: ${slug}`);
      return null;
    }

    console.log(`Video URL for slug (${slug}):`, videoUrl);
    return videoUrl;
  } catch (error) {
    console.error(`Failed to fetch video URL for slug: ${slug}`, error);
    return null;
  }
}
