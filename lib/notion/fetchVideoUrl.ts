import { isPageObjectResponse } from "@/types/notionDataType";
import { notion } from "./client";

const videoUrlCache = new Map<string, string | null>();

export async function fetchVideoUrl(slug: string): Promise<string | null> {
  if (videoUrlCache.has(slug)) {
    console.log(`Returning cached video URL for slug: ${slug}`);
    return videoUrlCache.get(slug)!;
  }

  try {
    const videoDatabaseId = process.env.NOTION_VIDEO_DB_ID!;

    const response = await notion.databases.query({
      database_id: videoDatabaseId,
      filter: {
        property: "name",
        title: { equals: slug },
      },
    });

    if (response.results.length === 0) {
      videoUrlCache.set(slug, null); // 캐시 저장
      return null;
    }

    const videoPage = response.results[0];
    let videoUrl = null;
    if (isPageObjectResponse(videoPage)) {
      const urlProperty = videoPage.properties.url;
      if (urlProperty?.type === "rich_text" && urlProperty.rich_text.length > 0) {
        videoUrl = urlProperty.rich_text[0].plain_text;
      }
    }

    videoUrlCache.set(slug, videoUrl); // 캐시 저장
    return videoUrl;
  } catch (error) {
    console.error("Error fetching video URL:", error);
    return null;
  }
}
