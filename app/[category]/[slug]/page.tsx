import NotionRenderer from '@/components/NotionRenderer';
import { ApiResponse } from '@/lib/notion/types';
import transformBlocks from '@/lib/notion/utils/transformBlocks';
import { fetchVideoUrl } from '@/lib/notion/utils/fetchVideoUrl';

interface PageProps {
  params: { category?: string; slug?: string };
}

export default async function ContentPage({ params }: PageProps) {
  const { category, slug } = params || {};

  if (!category || !slug) {
    console.error('Missing category or slug.');
    return <div>Error: Missing category or slug.</div>;
  }

  try {
    // Posts 데이터 가져오기
    const postsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${category}`,
      { cache: 'no-store' }
    );

    console.log('NEXT_PUBLIC_BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL);

    if (!postsResponse.ok) {
      console.error(`Failed to fetch posts. Status: ${postsResponse.status}`);
      throw new Error(`Failed to fetch posts for category: ${category}`);
    }

    const posts: ApiResponse[] = await postsResponse.json();
    const pageData = posts.find(
      (item) => item.slug.toLowerCase() === slug.toLowerCase()
    );

    if (!pageData) {
      console.error(`Page data not found for slug: ${slug}`);
      return <div>Page not found for slug: {slug}</div>;
    }

    // Blocks 데이터 가져오기
    const blocksResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/block/${pageData.id}`,
      { cache: 'no-store' }
    );

    if (!blocksResponse.ok) {
      console.error(`Failed to fetch blocks for pageId: ${pageData.id}`);
      return <div>Failed to load content.</div>;
    }

    const rawBlocks = await blocksResponse.json();
    const blocks = await transformBlocks(rawBlocks);

    if (!blocks || blocks.length === 0) {
      console.error('No blocks data found.');
      return <div>No content available.</div>;
    }

    // 비디오 URL 가져오기
    const videoUrl = await fetchVideoUrl(slug);
    console.log('Video URL:', videoUrl);

    return (
      <div className="bg-neutral-100 dark:bg-neutral-700 px-20 py-5 rounded-xl">
        <NotionRenderer blocks={blocks} videoUrl={videoUrl} />
      </div>
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error loading content:', errorMessage);
    return (
      <div>
        Error loading content. Please try again later. Details: {errorMessage}
      </div>
    );
  }
}
