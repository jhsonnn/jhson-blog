// import { isPageObjectResponse } from '@/lib/notion/types';
// import { notionClient } from '../client';

// const videoUrlCache = new Map<string, { url: string | null; expiry: number }>();
// const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour caching duration

// function getVideoCache(slug: string): string | null {
//   const cached = videoUrlCache.get(slug);
//   if (cached && Date.now() <= cached.expiry) return cached.url;
//   videoUrlCache.delete(slug);
//   return null;
// }

// function setVideoCache(slug: string, url: string | null) {
//   videoUrlCache.set(slug, { url, expiry: Date.now() + CACHE_DURATION_MS });
// }

// export async function fetchVideoUrl(slug: string): Promise<string | null> {
//   //  console.log('NOTION_VIDEO_DB_ID:', process.env.NOTION_VIDEO_DB_ID);
  
//   const cachedUrl = getVideoCache(slug);
//   if (cachedUrl !== null) {
//     console.debug(`[CACHE] Video URL for slug: ${slug}`);
//     return cachedUrl;
//   }

//   if (!process.env.NOTION_VIDEO_DB_ID) {
//     throw new Error('Missing environment variable: NOTION_VIDEO_DB_ID');
//   }

//   //console.log('Slug:', slug);
  
//   try {
    
//     const response = await notionClient.databases.query({
//       database_id: process.env.NOTION_VIDEO_DB_ID,
//       filter: {
//         property: 'name',
//         title: {
//           equals: slug, 
//         },
//       },
//     });
    
    
//   //console.log('Query Result:', JSON.stringify(response, null, 2));
    
//     if (response.results.length === 0) {
//       setVideoCache(slug, null);
//       return null;
//     }

//     const videoPage = response.results[0];
//     let videoUrl: string | null = null;

//     if (isPageObjectResponse(videoPage)) {
//       const urlProperty = videoPage.properties.url;
//       if (urlProperty.type === 'rich_text' && urlProperty.rich_text.length > 0) {
//         videoUrl = urlProperty.rich_text[0].plain_text;
//       }
//     }

//     setVideoCache(slug, videoUrl);
//     return videoUrl;
//   } catch (error) {
//     console.error(`[ERROR] Failed to fetch video URL for slug: ${slug}`, error);
//     return null;
//   }
// }


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
