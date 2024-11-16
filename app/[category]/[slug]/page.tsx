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

import { fetchNotionDatabaseByCategory } from '@/lib/notion/fetchNotionDatabase';
import { fetchPageBlocksWithChildren } from '@/lib/notion/fetchPageBlocks';
import { fetchVideoUrl } from '@/lib/notion/fetchVideoUrl';
import NotionRenderer from '@/components/NotionRenderer';
import RootLayout from '@/app/layout';

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

  for (const category of categories) {
    const items = (await fetchNotionDatabaseByCategory(
      category
    )) as NotionPageItem[];
    const categoryPaths = items.map((item) => ({
      category,
      slug: item.slug.toLowerCase(),
    }));
    paths.push(...categoryPaths);
  }
  return paths;
}
export default async function ContentPage({ params }: PageProps) {
  const { category, slug } = params;
  const items = (await fetchNotionDatabaseByCategory(
    category
  )) as NotionPageItem[];
  const pageData = items.find((item) => item.slug === slug);

  if (!pageData) {
    console.error(`Page not found for slug: ${slug}`);
    return <div>Page not found for slug: {slug}</div>;
  }

  try {
    const videoUrl = await fetchVideoUrl(slug);
    const blocks = await fetchPageBlocksWithChildren(pageData.post.id);

    return (
      <RootLayout>
        <div
          // `isPostContent`에 따른 조건부 스타일링
          className={`${
            slug === 'post-slug' // 특정 조건에 따라 스타일 적용
              ? 'bg-neutral-100 dark:bg-neutral-700 p-5 rounded-lg'
              : 'bg-white'
          }`}
        >
          {/* 비디오 URL이 있는 경우 비디오 렌더링 */}
          {videoUrl && (
            <video src={videoUrl} controls width="100%" className="mb-5" />
          )}

          {/* 페이지 콘텐츠 렌더링 */}
          <NotionRenderer blocks={blocks} />
        </div>
      </RootLayout>
    );
  } catch (error: any) {
    console.error('Error loading page content:', error);
    return <div>Error loading content: {error.message}</div>;
  }
}
