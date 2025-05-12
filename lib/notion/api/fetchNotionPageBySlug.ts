//TEST : gif 리렌더링 안되는 문제로 인한 수정 코드 테스트    
import { notionClient } from '@/lib/notion/client';
import { isPageObjectResponse } from '@/lib/notion/types';
import { Post } from '@/lib/notion/types';

export async function fetchNotionPageBySlug(slug: string): Promise<Post | null> {
  const response = await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'slug',
      rich_text: { equals: slug },
    },
  });

  const post = response.results.find(isPageObjectResponse);
  if (!post) return null;

  //최신 presigned URL을 얻기 위해 페이지 재조회
  const refreshedPostRaw = await notionClient.pages.retrieve({ page_id: post.id });
  const refreshedPost = isPageObjectResponse(refreshedPostRaw) ? refreshedPostRaw : null;

  const defaultImageUrl = `${process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '')}/default_image.png`;

  let originalImageUrl = defaultImageUrl;

  const thumbnailProp = refreshedPost?.properties?.thumbnailUrl;

  if (thumbnailProp?.type === 'files' && thumbnailProp.files.length > 0) {
    const file = thumbnailProp.files[0];
    if (file.type === 'file') {
      originalImageUrl = file.file.url; //presigned 최신 URL
    } else if (file.type === 'external') {
      originalImageUrl = file.external.url;
    }
  }

  const notionProxyUrl = originalImageUrl.startsWith('https://prod-files-secure.s3.')
    ? originalImageUrl.replace(
        'https://prod-files-secure.s3.',
        'https://www.notion.so/image/'
      )
    : originalImageUrl;

  const proxiedUrl = `/api/image-proxy?url=${encodeURIComponent(originalImageUrl)}&slug=${encodeURIComponent(
    slug
  )}&fallback=${encodeURIComponent(notionProxyUrl)}`;

  const fallbackImageUrl =
    thumbnailProp?.type === 'files' && thumbnailProp.files.length > 0
      ? proxiedUrl
      : defaultImageUrl;

  return {
    id: post.id,
    title:
      post.properties.title?.type === 'title'
        ? post.properties.title.title[0]?.plain_text || ''
        : '',
    slug:
      post.properties.slug?.type === 'rich_text'
        ? post.properties.slug.rich_text[0]?.plain_text || ''
        : '',
    category:
      post.properties.category?.type === 'select' && post.properties.category.select
        ? {
            name: post.properties.category.select.name,
            color: post.properties.category.select.color,
          }
        : { name: 'none', color: 'default' },
    tags:
      post.properties.tags?.type === 'multi_select'
        ? post.properties.tags.multi_select.map((tag) => ({
            name: tag.name,
            color: tag.color,
          }))
        : [],
    date: post.properties.date?.type === 'date' ? post.properties.date.date?.start || '' : '',
    thumbnailUrl: proxiedUrl,
    originalThumbnailUrl: originalImageUrl,
    fallbackThumbnailUrl: fallbackImageUrl,
    status: {
      name:
        post.properties.status?.type === 'select' && post.properties.status.select?.name
          ? post.properties.status.select.name
          : 'private',
    },
  };
}
