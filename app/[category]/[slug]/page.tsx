// import { fetchNotionDatabaseByCategory } from '@/lib/notion/fetchNotionDatabaseByCategory';
// import { fetchPageBlocksWithChildren } from '@/lib/notion/fetchPageBlocks';
// import { fetchVideoUrl } from '@/lib/notion/fetchVideoUrl';
// import NotionRenderer from '@/components/NotionRenderer';
// import RootLayout from '@/app/layout';
// import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
// import { NotionPageItem } from '@/types/notionDataType';

// interface PageProps {
//   params: { category: string; slug: string };
// }

// // interface NotionPageItem {
// //   slug: string;
// //   post: { id: string };
// // }

// export async function generateStaticParams() {
//   const categories = ['projects', 'resume', 'profile'];
//   const paths: Array<{ category: string; slug: string }> = [];

//   try {
//     for (const category of categories) {
//       const items = (await fetchNotionDatabaseByCategory(
//         category
//       )) as NotionPageItem[];

//       if (!items || items.length === 0) {
//         console.warn(`No items found for category: ${category}`);
//         continue;
//       }

//       const categoryPaths = items.map((item) => ({
//         category,
//         slug: item.slug.toLowerCase(),
//       }));

//       paths.push(...categoryPaths);
//     }
//   } catch (error: unknown) {
//     // error 타입이 unknown일 경우 안전하게 처리
//     if (error instanceof Error) {
//       console.error('Error generating static params:', error.message);
//     } else {
//       console.error('Unexpected error occurred:', error);
//     }
//   }

//   return paths;
// }

// export default async function ContentPage({ params }: PageProps) {
//   const { category, slug } = params;

//   try {
//     // Notion 데이터 가져오기
//     const items = (await fetchNotionDatabaseByCategory(
//       category
//     )) as NotionPageItem[];

//     if (!items) {
//       console.error(`No items found for category: ${category}`);
//       return <div>No content available for category: {category}</div>;
//     }

//     const pageData = items.find((item) => item.slug === slug);

//     if (!pageData) {
//       console.error(`Page not found for slug: ${slug}`);
//       return <div>Page not found for slug: {slug}</div>;
//     }

//     const [videoUrl, blocks]: [string | null, BlockObjectResponse[]] =
//       await Promise.all([
//         fetchVideoUrl(slug),
//         fetchPageBlocksWithChildren(pageData.post.id),
//       ]);

//     if (!blocks || blocks.length === 0) {
//       console.error('No blocks data found.');
//       return <div>No content available.</div>;
//     }

//     return (
//       <RootLayout>
//         <div className="bg-neutral-100 dark:bg-neutral-700 px-20 py-5 rounded-lg">
//           {/* 비디오 URL이 있는 경우 비디오 렌더링 */}
//           {videoUrl && (
//             <video src={videoUrl} controls width="100%" className="mb-5" />
//           )}

//           {/* Notion 페이지 블록 렌더링 */}
//           <NotionRenderer blocks={blocks} />
//         </div>
//       </RootLayout>
//     );
//   } catch (error: unknown) {
//     // error가 객체인지 확인 후 처리
//     if (error instanceof Error) {
//       console.error('Error loading page content:', error.message);
//       return <div>Error loading content: {error.message}</div>;
//     } else {
//       console.error('Unexpected error:', error);
//       return <div>An unexpected error occurred.</div>;
//     }
//   }
// }

//app/[category]/[slug]/page.tsx
// import { fetchNotionDatabaseByCategory } from '@/lib/notion/api/fetchNotionDatabaseByCategory';
// import { fetchPageBlocksWithChildren } from '@/lib/notion/api/fetchPageBlocks';
// import { fetchVideoUrl } from '@/lib/notion/utils/fetchVideoUrl';
// import NotionRenderer from '@/components/NotionRenderer';
// import RootLayout from '@/app/layout';
// import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// interface PageProps {
//   params: { category: string; slug: string };
// }

// export default async function ContentPage({ params }: PageProps) {
//   const { category, slug } = params;

//   try {
//     const items = await fetchNotionDatabaseByCategory(category);

//     const pageData = items.find((item) => item.slug === slug);
//     if (!pageData) {
//       return <div>Page not found for slug: {slug}</div>;
//     }

//     const [videoUrl, blocks]: [string | null, BlockObjectResponse[]] =
//       await Promise.all([
//         fetchVideoUrl(slug),
//         fetchPageBlocksWithChildren(pageData.post.id),
//       ]);

//     return (
//       <RootLayout>
//         <div className="bg-neutral-100 dark:bg-neutral-700 px-20 py-5 rounded-lg">
//           {videoUrl && (
//             <video src={videoUrl} controls width="100%" className="mb-5" />
//           )}
//           <NotionRenderer blocks={blocks} />
//         </div>
//       </RootLayout>
//     );
//   } catch (error) {
//     console.error('Error loading page content:', error);
//     return <div>Error loading content. Please try again later.</div>;
//   }
// }

// //최종진행중
// import NotionRenderer from '@/components/NotionRenderer';
// import RootLayout from '@/app/layout';
// import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
// import { NotionPageItem } from '@/lib/notion/types/notionDataType';

// interface PageProps {
//   params: { category: string; slug: string };
// }

// export default async function ContentPage({ params }: PageProps) {
//   // const { category, slug } = params;
//   const { slug } = params;

//   try {
//     // API 요청을 통해 카테고리별 게시물 가져오기
//     const response = await fetch(
//       // `${process.env.NEXT_PUBLIC_API_URL}/api/post/${category}`
//       `${process.env.NEXT_PUBLIC_API_URL}/api/posts?category=resume`
//     );
//     if (!response.ok) {
//       throw new Error('Failed to fetch posts');
//     }
//     const posts: NotionPageItem[] = await response.json(); // NotionPageItem 타입 적용

//     // 해당 슬러그에 해당하는 게시물 찾기
//     const pageData = posts.find((item) => item.slug === slug);
//     if (!pageData) {
//       return <div>Page not found for slug: {slug}</div>;
//     }

//     // API 요청을 통해 블록 데이터와 비디오 URL 가져오기
//     const [videoResponse, blocksResponse] = await Promise.all([
//       fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/video/${slug}`),
//       fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/block/${pageData.post.id}`),
//     ]);

//     const videoUrl: string | null = videoResponse.ok
//       ? await videoResponse.json()
//       : null;
//     const blocks: BlockObjectResponse[] = blocksResponse.ok
//       ? await blocksResponse.json()
//       : [];

//     return (
//       <RootLayout>
//         <div className="bg-neutral-100 dark:bg-neutral-700 px-20 py-5 rounded-lg">
//           {videoUrl && (
//             <video src={videoUrl} controls width="100%" className="mb-5" />
//           )}
//           <NotionRenderer blocks={blocks} />
//         </div>
//       </RootLayout>
//     );
//   } catch (error) {
//     console.error('Error loading page content:', error);
//     return <div>Error loading content. Please try again later.</div>;
//   }
// }
//app/[category]/[slug]/page.tsx;
// import NotionRenderer from '@/components/NotionRenderer';
// import RootLayout from '@/app/layout';
// import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
// import { ApiResponse } from '@/lib/notion/types/notionDataType';

// interface PageProps {
//   params: { category: string; slug: string };
// }

// export default async function ContentPage({ params }: PageProps) {
//   const { category, slug } = params;

//   try {
//     // API 요청을 통해 게시물 가져오기
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/post/${category}`,
//       { cache: 'no-store' }
//     );

//     if (!response.ok) {
//       throw new Error('Failed to fetch posts');
//     }

//     const posts: ApiResponse[] = await response.json();

//     // 슬러그에 해당하는 게시물 찾기
//     const pageData = posts.find((item) => item.slug === slug);
//     if (!pageData) {
//       return <div>Page not found for slug: {slug}</div>;
//     }

//     // 블록 데이터 가져오기
//     const blocksResponse = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/block/${pageData.id}`
//     );

//     const blocks: BlockObjectResponse[] = blocksResponse.ok
//       ? await blocksResponse.json()
//       : [];

//     return (
//       <RootLayout>
//         <div className="bg-neutral-100 dark:bg-neutral-700 px-20 py-5 rounded-lg">
//           <NotionRenderer blocks={blocks} />
//         </div>
//       </RootLayout>
//     );
//   } catch (error) {
//     console.error('Error loading page content:', error);
//     return <div>Error loading content. Please try again later.</div>;
//   }
// }

// app/[category]/[slug]/page.tsx

import NotionRenderer from '@/components/NotionRenderer';
import { ApiResponse } from '@/lib/notion/types/notionDataType';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

interface PageProps {
  params: { category: string; slug: string };
}

export default async function ContentPage({ params }: PageProps) {
  const { category, slug } = params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/post/${category}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const posts: ApiResponse[] = await response.json();
    const pageData = posts.find(
      (item) => item.slug.toLowerCase() === slug.toLowerCase()
    );

    if (!pageData) {
      console.error(`Page data not found for slug: ${slug}`);
      return <div>Page not found for slug: {slug}</div>;
    }

    console.log('page Data:???', pageData);

    const blocksResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/block/${pageData.id}`
    );

    if (!blocksResponse.ok) {
      console.error(`Failed to fetch blocks for pageId: ${pageData.id}`);
      return <div>Blocks not found for this page</div>;
    }

    const blocks: BlockObjectResponse[] = await blocksResponse.json();

    return (
      <div className="bg-neutral-100 dark:bg-neutral-700 px-20 py-5 rounded-lg">
        <NotionRenderer blocks={blocks} />
      </div>
    );
  } catch (error) {
    console.error('Error loading page content:', error);
    return <div>Error loading content. Please try again later.</div>;
  }
}
