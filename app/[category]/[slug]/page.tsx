// // // app/[category]/[slug]/page.tsx
// // import NotionRenderer from '@/components/NotionRenderer';
// // import { ApiResponse } from '@/lib/notion/types/notionDataType';
// // import transformBlocks from '@/lib/notion/utils/transformBlocks';

// // interface PageProps {
// //   params: { category?: string; slug?: string };
// // }

// // export default async function ContentPage({ params }: PageProps) {
// //   const { category, slug } = params || {};

// //   // console.log('Category:', category);
// //   // console.log('Slug:', slug);

// //   if (!category || !slug) {
// //     console.error('Missing category or slug.');
// //     return <div>Error: Missing category or slug.</div>;
// //   }

// //   try {
// //     //서버에서 직접 데이터 가져오기
// //     //이유: 데이터 패칭 전략
// //     //next.js 13 권장 방식, 데이터가 정적빌드에 포함되지 않고 항상 최신 데이터를 가져올 수 있는 장점
// //     //- SSR/ISR을 활용하기 위함: Next.js는 fetch 호출을 통해 데이터를 가져오면 해당 데이터를 SSR(Server-Side Rendering) 단계에서 처리하거나, ISR(Incremental Static Regeneration)을 설정할 수 있습니다.
// //     //- 클라이언트에서 API 호출을 피하기 위함: 클라이언트에서 API를 호출하면 브라우저에 API URL이 노출됩니다. 서버에서 데이터를 가져오면 API URL을 숨길 수 있고, API 호출 횟수도 제어 가능합니다.
// //     //- 최신 데이터를 유지하기 위함: API의 캐싱 전략(no-store)으로 항상 최신 데이터를 가져올 수 있습니다.

// //     //fetch posts
// //     const postsResponse = await fetch(
// //       `${process.env.NEXT_PUBLIC_API_URL}/api/post/${category}`,
// //       {
// //         cache: 'no-store', //항상 최신 데이터를 가져옴
// //       }
// //     );

// //     // console.log('Posts API Response Status:', postsResponse.status);

// //     if (!postsResponse.ok) {
// //       console.error(`Failed to fetch posts. Status: ${postsResponse.status}`);
// //       throw new Error(`Failed to fetch posts for category: ${category}`);
// //     }

// //     const posts: ApiResponse[] = await postsResponse.json();
// //     // console.log('Fetched posts:', posts);

// //     // console.log('Provided slug:', slug);

// //     const pageData = posts.find(
// //       (item) => item.slug.toLowerCase() === slug.toLowerCase()
// //     );

// //     if (!pageData) {
// //       console.error(`Page data not found for slug: ${slug}`);
// //       return <div>Page not found for slug: {slug}</div>;
// //     }

// //     //fetch blocks
// //     const blocksResponse = await fetch(
// //       `${process.env.NEXT_PUBLIC_API_URL}/api/block/${pageData.id}`,
// //       {
// //         cache: 'no-store',
// //       }
// //     );

// //     if (!blocksResponse.ok) {
// //       console.error(`Failed to fetch blocks for pageId: ${pageData.id}`);
// //       return <div>Failed to load content.</div>;
// //     }

// //     // console.log('Blocks API Response Status:', blocksResponse.status);

// //     const rawBlocks = await blocksResponse.json();
// //     console.log('Raw Blocks:', rawBlocks);

// //     const blocks = await transformBlocks(rawBlocks);
// //     console.log('Transformed Blocks:', blocks);

// //     if (!blocks || blocks.length === 0) {
// //       console.error('No blocks data found.');
// //       return <div>No content available.</div>;
// //     }

// //     //fetch videoDB
// //     // Fetch videoDB and find matching video URL
// //     const videoResponse = await fetch(
// //       `${process.env.NEXT_PUBLIC_API_URL}/api/videodb`,
// //       { cache: 'no-store' }
// //     );

// //     if (!videoResponse.ok) {
// //       console.error(`Failed to fetch video database.`);
// //       throw new Error('Failed to fetch video database.');
// //     }

// //     const videoDb: { title: string; url: string }[] =
// //       await videoResponse.json();
// //     const matchingVideo = videoDb.find((video) => video.title === slug);
// //     const videoUrl = matchingVideo?.url || null;

// //     return (
// //       <div className="bg-neutral-100 dark:bg-neutral-700 px-20 py-5 rounded-lg">
// //         {/* slug을 props로 전달 */}
// //         <NotionRenderer blocks={blocks} videoUrl={videoUrl} />
// //       </div>
// //     );
// //   } catch (error) {
// //     const errorMessage =
// //       error instanceof Error ? error.message : 'Unknown error occurred';
// //     console.error('Error loading content:', errorMessage);
// //     return (
// //       <div>
// //         Error loading content. Please try again later. Details: {errorMessage}
// //       </div>
// //     );
// //   }
// // }

// app/[category]/[slug]/page.tsx
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
