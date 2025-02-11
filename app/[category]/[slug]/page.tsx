// import NotionRenderer from '@/components/NotionRenderer';
// import { ApiResponse } from '@/lib/notion/types';
// import transformBlocks from '@/lib/notion/utils/transformBlocks';
// import { fetchVideoUrl } from '@/lib/notion/utils/fetchVideoUrl';
// import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
// import RandomPostList from '@/components/posts/RandomPostList';

// interface PageProps {
//   params: { category?: string; slug?: string };
// }

// export default async function ContentPage({ params }: PageProps) {
//   const { category, slug } = params || {};

//   if (!category || !slug) {
//     console.error('Missing category or slug.');
//     return <div>Error: Missing category or slug.</div>;
//   }

//   try {
//     const postsResponse = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${category}`,
//       { cache: 'no-store' }
//     );

//     if (!postsResponse.ok) {
//       console.error(`Failed to fetch posts. Status: ${postsResponse.status}`);
//       throw new Error(`Failed to fetch posts for category: ${category}`);
//     }

//     const posts: ApiResponse[] = await postsResponse.json();
//     const pageData = posts.find(
//       (item) => item.slug.toLowerCase() === slug.toLowerCase()
//     );

//     if (!pageData) {
//       console.error(`Page data not found for slug: ${slug}`);
//       return <div>Page not found for slug: {slug}</div>;
//     }

//     //Blocks 데이터 가져오기
//     const blocksResponse = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/block/${pageData.id}`,
//       { cache: 'no-store' }
//     );

//     if (!blocksResponse.ok) {
//       console.error(`Failed to fetch blocks for pageId: ${pageData.id}`);
//       return <div>Failed to load content.</div>;
//     }

//     const rawBlocks = await blocksResponse.json();
//     const blocks = await transformBlocks(rawBlocks);

//     if (!blocks || blocks.length === 0) {
//       console.error('No blocks data found.');
//       return <div>No content available.</div>;
//     }

//     //모든 포스트 가져오기
//     const allPosts = await fetchNotionAllPosts();

//     //비디오 URL 가져오기
//     const videoUrl = await fetchVideoUrl(slug);

//     return (
//       <div>
//         <div className="post-content-layout">
//           <NotionRenderer blocks={blocks} videoUrl={videoUrl} />
//         </div>

//         {/* 랜덤 포스트 리스트 */}
//         <RandomPostList
//           posts={allPosts}
//           currentSlug={slug}
//           basePath={`/${category}`}
//         />
//       </div>
//     );
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : 'Unknown error occurred';
//     console.error('Error loading content:', errorMessage);
//     return (
//       <div>
//         Error loading content. Please try again later. Details: {errorMessage}
//       </div>
//     );
//   }
// }

//최적화 이전코드
// import NotionRenderer from '@/components/NotionRenderer';
// import { ApiResponse } from '@/lib/notion/types';
// import { fetchVideoUrl } from '@/lib/notion/utils/fetchVideoUrl';
// import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
// import { transformBlocks } from '@/lib/notion/utils/transformBlocks';
// import RandomPostList from '@/components/posts/RandomPostList';

// interface PageProps {
//   params: { category?: string; slug?: string };
// }

// export default async function ContentPage({ params }: PageProps) {
//   const { category, slug } = params || {};

//   if (!category || !slug) {
//     console.error('Missing category or slug.');
//     return <div>Error: Missing category or slug.</div>;
//   }

//   try {
//     const postsResponse = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${category}`,
//       { cache: 'no-store' }
//     );

//     if (!postsResponse.ok) {
//       console.error(`Failed to fetch posts. Status: ${postsResponse.status}`);
//       throw new Error(`Failed to fetch posts for category: ${category}`);
//     }

//     const posts: ApiResponse[] = await postsResponse.json();
//     const pageData = posts.find(
//       (item) => item.slug.toLowerCase() === slug.toLowerCase()
//     );

//     if (!pageData) {
//       console.error(`Page data not found for slug: ${slug}`);
//       return <div>Page not found for slug: {slug}</div>;
//     }

//     const blocksResponse = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/block/${pageData.id}`,
//       { cache: 'no-store' }
//     );

//     if (!blocksResponse.ok) {
//       console.error(`Failed to fetch blocks for pageId: ${pageData.id}`);
//       return <div>Failed to load content.</div>;
//     }

//     const rawBlocks = await blocksResponse.json();
//     console.log('Raw Blocks:', rawBlocks);

//     const blocks = await transformBlocks(rawBlocks);
//     console.log('Transformed Blocks:', blocks);

//     if (!blocks || blocks.length === 0) {
//       console.error('No blocks data found.');
//       return <div>No content available.</div>;
//     }

//     const allPosts = await fetchNotionAllPosts();
//     const videoUrl = await fetchVideoUrl(slug);

//     return (
//       <div>
//         <div className="post-content-layout">
//           <NotionRenderer blocks={blocks} videoUrl={videoUrl} />
//         </div>
//         <RandomPostList
//           posts={allPosts}
//           currentSlug={slug}
//           basePath={`/${category}`}
//         />
//       </div>
//     );
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : 'Unknown error occurred';
//     console.error('Error loading content:', errorMessage);
//     return (
//       <div>
//         Error loading content. Please try again later. Details: {errorMessage}
//       </div>
//     );
//   }
// }

// //최적화 테스트
// import NotionRenderer from '@/components/NotionRenderer';
// import { ApiResponse } from '@/lib/notion/types';
// import { fetchVideoUrl } from '@/lib/notion/utils/fetchVideoUrl';
// import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
// import { transformBlocks } from '@/lib/notion/utils/transformBlocks';
// import RandomPostList from '@/components/posts/RandomPostList';

// interface PageProps {
//   params: { category?: string; slug?: string };
// }

// export default async function ContentPage({ params }: PageProps) {
//   const { category, slug } = params || {};

//   if (!category || !slug) {
//     console.error('Missing category or slug.');
//     return <div>Error: Missing category or slug.</div>;
//   }

//   try {
//     //Posts와 Blocks 데이터를 병렬로 Fetch
//     const [postsResponse, videoUrl] = await Promise.all([
//       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${category}`, {
//         cache: 'no-store',
//       }),
//       fetchVideoUrl(slug),
//     ]);

//     if (!postsResponse.ok) {
//       console.error(`Failed to fetch posts. Status: ${postsResponse.status}`);
//       throw new Error(`Failed to fetch posts for category: ${category}`);
//     }

//     const posts: ApiResponse[] = await postsResponse.json();
//     const pageData = posts.find(
//       (item) => item.slug.toLowerCase() === slug.toLowerCase()
//     );

//     if (!pageData) {
//       console.error(`Page data not found for slug: ${slug}`);
//       return <div>Page not found for slug: {slug}</div>;
//     }

//     //Blocks 데이터 Fetch와 Transform 병렬 처리
//     const [blocksResponse, allPosts] = await Promise.all([
//       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/block/${pageData.id}`, {
//         cache: 'no-store',
//       }),
//       fetchNotionAllPosts(),
//     ]);

//     if (!blocksResponse.ok) {
//       console.error(`Failed to fetch blocks for pageId: ${pageData.id}`);
//       throw new Error(`Failed to fetch blocks for pageId: ${pageData.id}`);
//     }

//     const rawBlocks = await blocksResponse.json();
//     console.log('Raw Blocks:', rawBlocks);

//     const blocks = await transformBlocks(rawBlocks);
//     console.log('Transformed Blocks:', blocks);

//     if (!blocks || blocks.length === 0) {
//       console.error('No blocks data found.');
//       return <div>No content available.</div>;
//     }

//     return (
//       <div>
//         <div className="post-content-layout">
//           <NotionRenderer blocks={blocks} videoUrl={videoUrl} />
//         </div>
//         <RandomPostList
//           posts={allPosts}
//           currentSlug={slug}
//           basePath={`/${category}`}
//         />
//       </div>
//     );
//   } catch (error) {
//     console.error('Error loading content:', error);
//     return (
//       <div>
//         Error loading content. Please try again later. Details:{' '}
//         {error instanceof Error ? error.message : 'Unknown error occurred'}
//       </div>
//     );
//   }
// }

// //skeleton 적용 테스트
// import NotionRenderer from '@/components/NotionRenderer';
// import { ApiResponse } from '@/lib/notion/types';
// import { fetchVideoUrl } from '@/lib/notion/utils/fetchVideoUrl';
// import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
// import { transformBlocks } from '@/lib/notion/utils/transformBlocks';
// import RandomPostList from '@/components/posts/RandomPostList';

// interface PageProps {
//   params: { category?: string; slug?: string };
// }

// export default async function ContentPage({ params }: PageProps) {
//   const { category, slug } = params || {};

//   if (!category || !slug) {
//     console.error('Missing category or slug.');
//     return <div>Error: Missing category or slug.</div>;
//   }

//   try {
//     const [postsResponse, videoUrl] = await Promise.all([
//       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${category}`, {
//         cache: 'no-store',
//       }),
//       fetchVideoUrl(slug),
//     ]);

//     if (!postsResponse.ok) {
//       console.error(`Failed to fetch posts. Status: ${postsResponse.status}`);
//       throw new Error(`Failed to fetch posts for category: ${category}`);
//     }

//     const posts: ApiResponse[] = await postsResponse.json();
//     const pageData = posts.find(
//       (item) => item.slug.toLowerCase() === slug.toLowerCase()
//     );

//     if (!pageData) {
//       console.error(`Page data not found for slug: ${slug}`);
//       return <div>Page not found for slug: {slug}</div>;
//     }

//     const [blocksResponse, allPosts] = await Promise.all([
//       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/block/${pageData.id}`, {
//         cache: 'no-store',
//       }),
//       fetchNotionAllPosts(),
//     ]);

//     if (!blocksResponse.ok) {
//       console.error(`Failed to fetch blocks for pageId: ${pageData.id}`);
//       throw new Error(`Failed to fetch blocks for pageId: ${pageData.id}`);
//     }

//     const rawBlocks = await blocksResponse.json();
//     const blocks = await transformBlocks(rawBlocks);

//     if (!blocks || blocks.length === 0) {
//       console.error('No blocks data found.');
//       return <div>No content available.</div>;
//     }

//     return (
//       <div>
//         <div className="post-content-layout">
//           <NotionRenderer blocks={blocks} videoUrl={videoUrl} />
//         </div>
//         <RandomPostList
//           posts={allPosts}
//           currentSlug={slug}
//           basePath={`/${category}`}
//         />
//       </div>
//     );
//   } catch (error) {
//     console.error('Error loading content:', error);
//     return (
//       <div>
//         Error loading content. Please try again later. Details:{' '}
//         {error instanceof Error ? error.message : 'Unknown error occurred'}
//       </div>
//     );
//   }
// }

//ISR 테스트
// app/[category]/[slug]/page.tsx
// import NotionRenderer from '@/components/NotionRenderer';
// import RandomPostList from '@/components/posts/RandomPostList';
// import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
// import { fetchVideoUrl } from '@/lib/notion/utils/fetchVideoUrl';
// import { transformBlocks } from '@/lib/notion/utils/transformBlocks';

// interface PageProps {
//   params: { category: string; slug: string };
// }

// export const revalidate = 60; // ISR 적용 (60초마다 정적 페이지 재생성)

// export default async function ContentPage({ params }: PageProps) {
//   const { category, slug } = params;

//   try {
//     const allPosts = await fetchNotionAllPosts();
//     const pageData = allPosts.find((post) => post.slug === slug);

//     if (!pageData) {
//       return <div>Page not found.</div>;
//     }

//     const [videoUrl, blocksResponse] = await Promise.all([
//       fetchVideoUrl(slug),
//       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/block/${pageData.id}`, {
//         cache: 'no-store',
//       }),
//     ]);

//     if (!blocksResponse.ok) {
//       console.error(`Failed to fetch blocks for pageId: ${pageData.id}`);
//       return <div>Error: Unable to fetch content</div>;
//     }

//     const rawBlocks = await blocksResponse.json();
//     if (!rawBlocks || rawBlocks.length === 0) {
//       console.error('No blocks data found.');
//       return <div>No content available.</div>;
//     }

//     const blocks = await transformBlocks(rawBlocks);

//     return (
//       <div>
//         <div className="post-content-layout">
//           <NotionRenderer blocks={blocks} videoUrl={videoUrl} />
//         </div>
//         <RandomPostList
//           posts={allPosts}
//           currentSlug={slug}
//           basePath={`/${category}`}
//         />
//       </div>
//     );
//   } catch (error) {
//     console.error('Error loading content:', error);
//     return <div>Error loading content.</div>;
//   }
// }

//ISR 테스트2
// // app/[category]/[slug]/page.tsx
// import NotionRenderer from '@/components/NotionRenderer';
// import RandomPostList from '@/components/posts/RandomPostList';
// import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
// import { fetchVideoUrl } from '@/lib/notion/utils/fetchVideoUrl';
// import { transformBlocks } from '@/lib/notion/utils/transformBlocks';

// interface PageProps {
//   params: { category: string; slug: string };
// }

// // ISR 적용: 60초마다 정적 페이지 재생성
// export const revalidate = 60;

// // 정적 경로 생성 (ISR 성능 최적화)
// export async function generateStaticParams() {
//   const posts = await fetchNotionAllPosts();
//   return posts.map((post) => ({
//     category: post.category,
//     slug: post.slug,
//   }));
// }

// // ISR ContentPage 컴포넌트
// export default async function ContentPage({ params }: PageProps) {
//   const { category, slug } = params;

//   try {
//     // 미리 가져온 모든 포스트 데이터 중 슬러그에 맞는 데이터 찾기
//     const allPosts = await fetchNotionAllPosts();
//     const pageData = allPosts.find((post) => post.slug === slug);

//     if (!pageData) {
//       return <div>Page not found.</div>;
//     }

//     // 블록 데이터와 비디오 URL 병렬로 가져오기
//     const [videoUrl, blocksResponse] = await Promise.all([
//       fetchVideoUrl(slug),
//       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/block/${pageData.id}`, {
//         cache: 'no-store',
//       }),
//     ]);

//     if (!blocksResponse.ok) {
//       console.error(`Failed to fetch blocks for pageId: ${pageData.id}`);
//       return <div>Error: Unable to fetch content</div>;
//     }

//     const rawBlocks = await blocksResponse.json();
//     if (!rawBlocks || rawBlocks.length === 0) {
//       console.error('No blocks data found.');
//       return <div>No content available.</div>;
//     }

//     // 블록 변환 최적화
//     const blocks = await transformBlocks(rawBlocks);

//     return (
//       <div>
//         <div className="post-content-layout">
//           <NotionRenderer blocks={blocks} videoUrl={videoUrl} />
//         </div>
//         <RandomPostList
//           posts={allPosts}
//           currentSlug={slug}
//           basePath={`/${category}`}
//         />
//       </div>
//     );
//   } catch (error) {
//     console.error('Error loading content:', error);
//     return <div>Error loading content.</div>;
//   }
// }

// //페이지네이션 최적화
// // app/[category]/[slug]/page.tsx
// import NotionRenderer from '@/components/NotionRenderer';
// import RandomPostList from '@/components/posts/RandomPostList';
// import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
// import { fetchVideoUrl } from '@/lib/notion/utils/fetchVideoUrl';
// import { transformBlocks } from '@/lib/notion/utils/transformBlocks';

// interface PageProps {
//   params: { category: string; slug: string };
// }

// // ISR 적용: 60초마다 정적 페이지 재생성
// export const revalidate = 60;

// // 정적 경로 생성 (ISR 성능 최적화)
// export async function generateStaticParams() {
//   const posts = await fetchNotionAllPosts();
//   return posts.map((post) => ({
//     category: post.category,
//     slug: post.slug,
//   }));
// }

// // ISR ContentPage 컴포넌트
// export default async function ContentPage({ params }: PageProps) {
//   const { category, slug } = params;

//   try {
//     const allPosts = await fetchNotionAllPosts(); // 모든 게시물을 페이징 없이 가져옴
//     const pageData = allPosts.find((post) => post.slug === slug);

//     if (!pageData) {
//       return <div>Page not found.</div>;
//     }

//     const [videoUrl, blocksResponse] = await Promise.all([
//       fetchVideoUrl(slug),
//       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/block/${pageData.id}`, {
//         cache: 'no-store',
//       }),
//     ]);

//     if (!blocksResponse.ok) {
//       console.error(`Failed to fetch blocks for pageId: ${pageData.id}`);
//       return <div>Error: Unable to fetch content</div>;
//     }

//     const rawBlocks = await blocksResponse.json();
//     const blocks = await transformBlocks(rawBlocks);

//     return (
//       <div>
//         <div className="post-content-layout">
//           <NotionRenderer blocks={blocks} videoUrl={videoUrl} />
//         </div>
//         <RandomPostList
//           posts={allPosts} // 초기 Infinite Scrolling에 필요한 데이터
//           currentSlug={slug}
//           basePath={`/${category}`}
//         />
//       </div>
//     );
//   } catch (error) {
//     console.error('Error loading content:', error);
//     return <div>Error loading content.</div>;
//   }
// }

//ISR테스트0211
import NotionRenderer from '@/components/NotionRenderer';
import RandomPostList from '@/components/posts/RandomPostList';
import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
import { fetchNotionPageBySlug } from '@/lib/notion/api/fetchNotionPageBySlug';
import { fetchVideoUrl } from '@/lib/notion/utils/fetchVideoUrl';
import { transformBlocks } from '@/lib/notion/utils/transformBlocks';

interface PageProps {
  params: { category: string; slug: string };
}

//ISR 적용. 60초마다 정적 페이지 재생성
export const revalidate = 60;

//동적경로를 미리 생성해서 정적 경로 생성
export async function generateStaticParams() {
  const posts = await fetchNotionAllPosts({ limit: 10 });
  return posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export default async function ContentPage({ params }: PageProps) {
  const { category, slug } = params;

  try {
    //특정 slug에 대한 데이터만 가져옴
    const pageData = await fetchNotionPageBySlug(slug);

    if (!pageData) {
      return <div>Page not found.</div>;
    }

    const [videoUrl, blocksResponse] = await Promise.all([
      fetchVideoUrl(slug),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/block/${pageData.id}`, {
        cache: 'no-store',
      }),
    ]);

    if (!blocksResponse.ok) {
      console.error(`Failed to fetch blocks for pageId: ${pageData.id}`);
      return <div>Error: Unable to fetch content</div>;
    }

    const rawBlocks = await blocksResponse.json();
    const blocks = await transformBlocks(rawBlocks);

    return (
      <div>
        <div className="post-content-layout">
          <NotionRenderer blocks={blocks} videoUrl={videoUrl} />
        </div>
        <RandomPostList
          posts={[pageData]}
          currentSlug={slug}
          basePath={`/${category}`}
        />
      </div>
    );
  } catch (error) {
    console.error('Error loading content:', error);
    return <div>Error loading content.</div>;
  }
}
