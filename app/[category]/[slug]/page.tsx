// import NotionRenderer from '@/components/NotionRenderer';
// import RandomPostList from '@/components/posts/RandomPostList';
// import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
// import { fetchNotionPageBySlug } from '@/lib/notion/api/fetchNotionPageBySlug';
// import { fetchVideoUrl } from '@/lib/notion/utils/fetchVideoUrl';
// import { transformBlocks } from '@/lib/notion/utils/transformBlocks';

// interface PageProps {
//   params: { category: string; slug: string };
// }

// //ISR 적용(60초마다 재생성)
// export const revalidate = 60;

// //Notion 색상 매핑
// const notionColorMap: { [key: string]: string } = {
//   default: 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200',
//   gray: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
//   brown: 'bg-yellow-700 text-yellow-500',
//   orange: 'bg-orange-200 text-orange-500',
//   yellow: 'bg-yellow-300 text-yellow-700',
//   green: 'bg-green-300 text-green-600',
//   blue: 'bg-blue-200 text-blue-500',
//   purple: 'bg-purple-200 text-purple-500',
//   pink: 'bg-pink-200 text-pink-500',
//   red: 'bg-red-200 text-red-500',
// };

// //모든 포스트 사전 생성(SSG)
// export async function generateStaticParams() {
//   const { posts } = await fetchNotionAllPosts();
//   return posts.map((post) => ({
//     category: post.category.name,
//     slug: post.slug,
//   }));
// }

// export default async function ContentPage({ params }: PageProps) {
//   const { category, slug } = params;

//   try {
//     //페이지 데이터 + 비디오 url 가져오기
//     const [pageData, videoUrl] = await Promise.all([
//       fetchNotionPageBySlug(slug),
//       fetchVideoUrl(slug),
//     ]);

//     if (!pageData) {
//       return <div>Error: Page not found</div>;
//     }

//     //Notion 블록 데이터 가져오기(캐싱 적용)
//     const blocksResponse = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/block/${pageData.id}`,
//       { cache: 'no-store' }
//     );

//     if (!blocksResponse.ok) {
//       console.error(`Failed to fetch blocks for pageId: ${pageData.id}`);
//       return <div>Error: Unable to fetch content</div>;
//     }

//     const rawBlocks = await blocksResponse.json();
//     const blocks = await transformBlocks(rawBlocks);

//     //랜덤 포스트 데이터 가져오기
//     const { posts: allPosts } = await fetchNotionAllPosts(); // ✅ posts만 가져옴
//     let filteredPosts = allPosts.filter((post) => post.slug !== slug);

//     //랜덤 포스트가 3개 미만이면 다른 포스트를 보충
//     if (filteredPosts.length < 3) {
//       filteredPosts = allPosts.slice(0, 3);
//     }

//     return (
//       <div>
//         <div className="post-content-layout">
//           <div className="flex items-center gap-2 mb-4">
//             <span
//               className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                 notionColorMap[pageData.category.color] ||
//                 notionColorMap.default
//               }`}
//             >
//               {pageData.category.name}
//             </span>
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//             {pageData.title}
//           </h1>
//           <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-4">
//             <span className="mr-2">Jihyeong Son</span> •{' '}
//             <span className="ml-2">
//               {pageData.date
//                 ? new Date(pageData.date).toLocaleDateString('ko-KR')
//                 : 'no date'}
//             </span>
//           </div>
//           <div className="flex flex-wrap gap-2 mb-6">
//             {pageData.tags.map((tag) => (
//               <span
//                 key={tag.name}
//                 className={`px-2 py-1 text-xs rounded-full ${
//                   notionColorMap[tag.color] || notionColorMap.default
//                 }`}
//               >
//                 {tag.name}
//               </span>
//             ))}
//           </div>

//           <NotionRenderer
//             blocks={blocks}
//             videoUrl={videoUrl}
//             pageType={
//               category.toLowerCase() === 'resume' ? 'resume' : undefined
//             }
//           />
//         </div>
//         {filteredPosts.length > 0 ? (
//           <RandomPostList
//             posts={filteredPosts}
//             currentSlug={slug}
//             basePath={`/${category}`}
//           />
//         ) : (
//           <div>No related posts available.</div>
//         )}
//       </div>
//     );
//   } catch (error) {
//     return <div className="w-full text-center">Error loading content.</div>;
//   }
// }

import dynamic from 'next/dynamic';
import RandomPostList from '@/components/posts/RandomPostList';
import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
import { fetchNotionPageBySlug } from '@/lib/notion/api/fetchNotionPageBySlug';
import { fetchVideoUrl } from '@/lib/notion/utils/fetchVideoUrl';
import { transformBlocks } from '@/lib/notion/utils/transformBlocks';
import Loading from './loading';

const NotionRenderer = dynamic(() => import('@/components/NotionRenderer'), {
  loading: () => <Loading />,
  ssr: false,
});

interface PageProps {
  params: { category: string; slug: string };
}

//ISR 적용 (60초마다 재생성)
export const revalidate = 60;

//Notion 색상 매핑
const notionColorMap: { [key: string]: string } = {
  default: 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200',
  gray: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  brown: 'bg-yellow-700 text-yellow-500',
  orange: 'bg-orange-200 text-orange-500',
  yellow: 'bg-yellow-300 text-yellow-700',
  green: 'bg-green-300 text-green-600',
  blue: 'bg-blue-200 text-blue-500',
  purple: 'bg-purple-200 text-purple-500',
  pink: 'bg-pink-200 text-pink-500',
  red: 'bg-red-200 text-red-500',
};

//모든 포스트 사전 생성 (SSG)
export async function generateStaticParams() {
  const { posts } = await fetchNotionAllPosts();
  return posts.map((post) => ({
    category: post.category.name,
    slug: post.slug,
  }));
}

export default async function ContentPage({ params }: PageProps) {
  const { category, slug } = params;

  try {
    //페이지 데이터 + 비디오 URL을 병렬로 가져와서서 로딩 속도 개선
    const [pageData, videoUrl, allPosts] = await Promise.all([
      fetchNotionPageBySlug(slug),
      fetchVideoUrl(slug),
      fetchNotionAllPosts(),
    ]);

    if (!pageData) {
      return <div className="w-full text-center">Error: Page not found</div>;
    }

    //Notion 블록 데이터 가져오기 (캐싱 적용)
    const blocksResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/block/${pageData.id}`,
      { cache: 'force-cache', next: { revalidate: 60 } }
    );

    if (!blocksResponse.ok) {
      console.error(`Failed to fetch blocks for pageId: ${pageData.id}`);
      return (
        <div className="w-full text-center">Error: Unable to fetch content</div>
      );
    }

    const rawBlocks = await blocksResponse.json();
    const blocks = await transformBlocks(rawBlocks);

    let filteredPosts = allPosts.posts.filter((post) => post.slug !== slug);
    if (filteredPosts.length < 3) {
      filteredPosts = allPosts.posts.slice(0, 3);
    }

    return (
      <div>
        <div className="post-content-layout">
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                notionColorMap[pageData.category.color] ||
                notionColorMap.default
              }`}
            >
              {pageData.category.name}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {pageData.title}
          </h1>
          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-4">
            <span className="mr-2">Jihyeong Son</span> •{' '}
            <span className="ml-2">
              {pageData.date
                ? new Date(pageData.date).toLocaleDateString('ko-KR')
                : 'no date'}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {pageData.tags.map((tag) => (
              <span
                key={tag.name}
                className={`px-2 py-1 text-xs rounded-full ${
                  notionColorMap[tag.color] || notionColorMap.default
                }`}
              >
                {tag.name}
              </span>
            ))}
          </div>

          <NotionRenderer
            blocks={blocks}
            videoUrl={videoUrl}
            pageType={
              category.toLowerCase() === 'resume' ? 'resume' : undefined
            }
          />
        </div>
        {filteredPosts.length > 0 ? (
          <RandomPostList
            posts={filteredPosts}
            currentSlug={slug}
            basePath={`/${category}`}
          />
        ) : (
          <div>No related posts available.</div>
        )}
      </div>
    );
  } catch (error) {
    return <div className="w-full text-center">Error loading content.</div>;
  }
}
