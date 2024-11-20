// import { fetchNotionDatabaseByCategory } from '@/lib/notion/fetchNotionDatabase';
// import { fetchPageBlocksWithChildren } from '@/lib/notion/fetchPageBlocks';
// import { fetchVideoUrl } from '@/lib/notion/fetchVideoUrl';
// import NotionRenderer from '@/components/NotionRenderer';
// import RootLayout from '@/app/layout';

// interface PageProps {
//   params: { category: string; slug: string };
// }

// interface NotionPageItem {
//   slug: string;
//   post: { id: string };
// }

// export async function generateStaticParams() {
//   const categories = ['projects', 'resume', 'profile'];
//   const paths: Array<{ category: string; slug: string }> = [];

//   for (const category of categories) {
//     const items = (await fetchNotionDatabaseByCategory(
//       category
//     )) as NotionPageItem[];
//     const categoryPaths = items.map((item) => ({
//       category,
//       slug: item.slug.toLowerCase(),
//     }));
//     paths.push(...categoryPaths);
//   }
//   return paths;
// }

// export default async function ContentPage({ params }: PageProps) {
//   const { category, slug } = params;
//   const items = (await fetchNotionDatabaseByCategory(
//     category
//   )) as NotionPageItem[];
//   const pageData = items.find((item) => item.slug === slug);

//   if (!pageData) {
//     console.error(`Page not found for slug: ${slug}`);
//     return <div>Page not found for slug: {slug}</div>;
//   }

//   try {
//     const videoUrl = await fetchVideoUrl(slug);
//     const blocks = await fetchPageBlocksWithChildren(pageData.post.id);

//     return (
//       <RootLayout isPostContent={true}>
//         <div>
//           {/* 비디오 URL이 있는 경우 비디오 렌더링 */}
//           {videoUrl && (
//             <video
//               src={videoUrl}
//               controls
//               width="100%"
//               style={{ marginBottom: '20px' }}
//             />
//           )}

//           {/* 페이지 콘텐츠 렌더링 */}
//           <NotionRenderer blocks={blocks} />
//         </div>
//       </RootLayout>
//     );
//   } catch (error: any) {
//     console.error('Error loading page content:', error);
//     return <div>Error loading content: {error.message}</div>;
//   }
// }

// import { fetchNotionDatabaseByCategory } from '@/lib/notion/fetchNotionDatabase';
// import { fetchPageBlocksWithChildren } from '@/lib/notion/fetchPageBlocks';
// import { fetchVideoUrl } from '@/lib/notion/fetchVideoUrl';
// import NotionRenderer from '@/components/NotionRenderer';
// import RootLayout from '@/app/layout';

// interface PageProps {
//   params: { category: string; slug: string };
// }

// interface NotionPageItem {
//   slug: string;
//   post: { id: string };
// }

// export async function generateStaticParams() {
//   const categories = ['projects', 'resume', 'profile'];
//   const paths: Array<{ category: string; slug: string }> = [];

//   try {
//     for (const category of categories) {
//       const items = (await fetchNotionDatabaseByCategory(
//         category
//       )) as NotionPageItem[];

//       if (!items) {
//         console.warn(`No items found for category: ${category}`);
//         continue;
//       }

//       const categoryPaths = items.map((item) => ({
//         category,
//         slug: item.slug.toLowerCase(),
//       }));

//       paths.push(...categoryPaths);
//     }
//   } catch (error: any) {
//     console.error('Error generating static params:', error.message);
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

//     // 비디오 URL 및 블록 데이터 가져오기
//     const [videoUrl, blocks] = await Promise.all([
//       fetchVideoUrl(slug),
//       fetchPageBlocksWithChildren(pageData.post.id),
//     ]);

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
//   } catch (error: any) {
//     console.error('Error loading page content:', error);
//     return <div>Error loading content: {error.message}</div>;
//   }
// }

import { fetchNotionDatabaseByCategory } from '@/lib/notion/fetchNotionDatabase';
import { fetchPageBlocksWithChildren } from '@/lib/notion/fetchPageBlocks';
import { fetchVideoUrl } from '@/lib/notion/fetchVideoUrl';
import NotionRenderer from '@/components/NotionRenderer';
import RootLayout from '@/app/layout';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

interface PageProps {
  params: { category: string; slug: string };
}

interface NotionPageItem {
  slug: string;
  post: { id: string };
}

export async function generateStaticParams() {
  const categories = ['projects', 'resume', 'profile'];
  const paths: Array<{ category: string; slug: string }> = [];

  try {
    for (const category of categories) {
      const items = (await fetchNotionDatabaseByCategory(
        category
      )) as NotionPageItem[];

      if (!items || items.length === 0) {
        console.warn(`No items found for category: ${category}`);
        continue;
      }

      const categoryPaths = items.map((item) => ({
        category,
        slug: item.slug.toLowerCase(),
      }));

      paths.push(...categoryPaths);
    }
  } catch (error: unknown) {
    // error 타입이 unknown일 경우 안전하게 처리
    if (error instanceof Error) {
      console.error('Error generating static params:', error.message);
    } else {
      console.error('Unexpected error occurred:', error);
    }
  }

  return paths;
}

export default async function ContentPage({ params }: PageProps) {
  const { category, slug } = params;

  try {
    // Notion 데이터 가져오기
    const items = (await fetchNotionDatabaseByCategory(
      category
    )) as NotionPageItem[];

    if (!items) {
      console.error(`No items found for category: ${category}`);
      return <div>No content available for category: {category}</div>;
    }

    const pageData = items.find((item) => item.slug === slug);

    if (!pageData) {
      console.error(`Page not found for slug: ${slug}`);
      return <div>Page not found for slug: {slug}</div>;
    }

    const [videoUrl, blocks]: [string | null, BlockObjectResponse[]] =
      await Promise.all([
        fetchVideoUrl(slug),
        fetchPageBlocksWithChildren(pageData.post.id),
      ]);

    if (!blocks || blocks.length === 0) {
      console.error('No blocks data found.');
      return <div>No content available.</div>;
    }

    return (
      <RootLayout>
        <div className="bg-neutral-100 dark:bg-neutral-700 px-20 py-5 rounded-lg">
          {/* 비디오 URL이 있는 경우 비디오 렌더링 */}
          {videoUrl && (
            <video src={videoUrl} controls width="100%" className="mb-5" />
          )}

          {/* Notion 페이지 블록 렌더링 */}
          <NotionRenderer blocks={blocks} />
        </div>
      </RootLayout>
    );
  } catch (error: unknown) {
    // error가 객체인지 확인 후 처리
    if (error instanceof Error) {
      console.error('Error loading page content:', error.message);
      return <div>Error loading content: {error.message}</div>;
    } else {
      console.error('Unexpected error:', error);
      return <div>An unexpected error occurred.</div>;
    }
  }
}
