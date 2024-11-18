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

  //Notion data 비동기로드
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

    // Notion 데이터를 모두 가져온 후 렌더링
    if (!blocks || blocks.length === 0) {
      console.error('No blocks data found.');
      return <div>Loading content...</div>;
    }

    //서버 데이터 로드 완료 후 클라이언트에 전달
    return (
      <RootLayout>
        <div className="bg-neutral-100 dark:bg-neutral-700 px-20 py-5 rounded-lg">
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
