// import Post from '@/components/ui/Post';
// import {
//   isFilesProperty,
//   isTitleProperty,
//   NotionPageItem,
// } from '@/types/notionDataType';
// import { fetchNotionDatabaseByCategory } from '@/lib/notion/fetchNotionDatabaseByCategory';
// import Link from 'next/link';

// export default async function CategoryPage({
//   params,
// }: {
//   params: { category: string };
// }) {
//   const { category } = params;
//   const posts = await fetchNotionDatabaseByCategory(category);

//   if (posts.length === 0) {
//     return <div>No posts found for category: {category}</div>;
//   }

//   return (
//     <div>
//       <ul>
//         {posts.map(({ slug, post }: NotionPageItem) => {
//           const titleProperty = post.properties?.title;

//           let title = 'No Title';
//           if (isTitleProperty(titleProperty)) {
//             title = titleProperty.title[0]?.plain_text || 'No Title';
//           }

//           const date = post.created_time;

//           let thumbnailUrl = '/default-thumbnail.png';
//           //const thumbnailProperty = post.properties?.["\bthumbnailUrl"];
//           const thumbnailKey = 'thumbnailUrl';
//           const thumbnailProperty = post.properties?.[thumbnailKey];

//           // isFilesProperty 타입 가드 사용
//           if (
//             isFilesProperty(thumbnailProperty) &&
//             thumbnailProperty.files.length > 0
//           ) {
//             const file = thumbnailProperty.files[0];
//             if (file.type === 'file') {
//               thumbnailUrl = file.file.url;
//             } else if (file.type === 'external') {
//               thumbnailUrl = file.external.url;
//             }
//           }

//           return (
//             <li key={post.id}>
//               <Link href={`/${category}/${slug}`}>
//                 <Post
//                   title={title}
//                   slug={slug}
//                   date={date}
//                   thumbnailUrl={thumbnailUrl}
//                   category={category}
//                 />
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// // Static Site Generation(SSG)으로 카테고리별 페이지 생성
// export async function generateStaticParams() {
//   const categories = ['projects', 'resume', 'profile'];
//   return categories.map((category) => ({ category }));
// }

// // // app/[category]/page.tsx
// import Post from '@/components/ui/Post';
// import { NotionPageItem } from '@/lib/notion/types/notionDataType';
// import { fetchNotionDatabaseByCategory } from '@/lib/notion/api/fetchNotionDatabaseByCategory';
// import Link from 'next/link';

// export default async function CategoryPage({
//   params,
// }: {
//   params: { category: string };
// }) {
//   const { category } = params;
//   const posts = await fetchNotionDatabaseByCategory(category);

//   if (posts.length === 0) {
//     return <div>No posts found for category: {category}</div>;
//   }

//   return (
//     <div>
//       <ul>
//         {posts.map(({ slug, post }: NotionPageItem) => {
//           const title =
//             post.properties.title?.title[0]?.plain_text || 'No Title';
//           const date = post.created_time;

//           // 안전하게 thumbnailUrl 처리
//           let thumbnailUrl = '/default-thumbnail.png';
//           const thumbnailProperty = post.properties.thumbnailUrl;

//           if (
//             thumbnailProperty?.files &&
//             Array.isArray(thumbnailProperty.files) &&
//             thumbnailProperty.files.length > 0
//           ) {
//             const file = thumbnailProperty.files[0];
//             if (file.type === 'file') {
//               thumbnailUrl = file.file.url;
//             } else if (file.type === 'external') {
//               thumbnailUrl = file.external.url;
//             }
//           }

//           return (
//             <li key={post.id}>
//               <Link href={`/${category}/${slug}`}>
//                 <Post
//                   title={title}
//                   slug={slug}
//                   date={date}
//                   thumbnailUrl={thumbnailUrl}
//                   category={category}
//                 />
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// // app/[category]/page.tsx
// // // app/[category]/page.tsx
// // import Post from '@/components/ui/Post';
// // import { NotionPageItem } from '@/lib/notion/types/notionDataType';
// // import { fetchNotionDatabaseByCategory } from '@/lib/notion/api/fetchNotionDatabaseByCategory';
// // import Link from 'next/link';

// // export default async function CategoryPage({
// //   params,
// // }: {
// //   params: { category: string };
// // }) {
// //   const { category } = params;
// //   const posts: NotionPageItem[] = await fetchNotionDatabaseByCategory(category);

// //   if (posts.length === 0) {
// //     return <div>No posts found for category: {category}</div>;
// //   }

// //   return (
// //     <div>
// //       <ul>
// //         {posts.map(({ slug, post }) => {
// //           const title =
// //             post.properties.title?.title[0]?.plain_text || 'No Title';
// //           const date = post.created_time;
// //           const thumbnailUrl = post.properties.thumbnailUrl
// //             ? post.properties.thumbnailUrl.files[0].type === 'file'
// //               ? post.properties.thumbnailUrl.files[0].file.url
// //               : post.properties.thumbnailUrl.files[0].external.url
// //             : '/default-thumbnail.png';

// //           return (
// //             <li key={post.id}>
// //               <Link href={`/${category}/${slug}`}>
// //                 <Post
// //                   title={title}
// //                   slug={slug}
// //                   date={date}
// //                   thumbnailUrl={thumbnailUrl}
// //                   category={category}
// //                 />
// //               </Link>
// //             </li>
// //           );
// //         })}
// //       </ul>
// //     </div>
// //   );
// // }

//최종진행중
//app/[category]/page.tsx
// import Post from '@/components/ui/Post';
// import { NotionPageItem } from '@/lib/notion/types/notionDataType';
// import { fetchNotionDatabaseByCategory } from '@/lib/notion/api/fetchNotionDatabaseByCategory';
// import Link from 'next/link';

// export default async function CategoryPage({
//   params,
// }: {
//   params: { category: string };
// }) {
//   const { category } = params;
//   const posts = await fetchNotionDatabaseByCategory(category);

//   if (posts.length === 0) {
//     return <div>No posts found for category: {category}</div>;
//   }

//   return (
//     <div>
//       <ul>
//         {posts.map(({ slug, post }: NotionPageItem) => {
//           const title =
//             post.properties.title?.title[0]?.plain_text || 'No Title';
//           const date = post.created_time;

//           let thumbnailUrl = '/default-thumbnail.png';
//           const thumbnailProperty = post.properties.thumbnailUrl;

//           if (
//             thumbnailProperty?.files &&
//             Array.isArray(thumbnailProperty.files) &&
//             thumbnailProperty.files.length > 0
//           ) {
//             const file = thumbnailProperty.files[0];
//             if (file.type === 'file') {
//               thumbnailUrl = file.file.url;
//             } else if (file.type === 'external') {
//               thumbnailUrl = file.external.url;
//             }
//           }

//           return (
//             <li key={post.id}>
//               <Link href={`/${category}/${slug}`}>
//                 <Post
//                   title={title}
//                   slug={slug}
//                   date={date}
//                   thumbnailUrl={thumbnailUrl}
//                   category={category}
//                 />
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// import Post from '@/components/ui/Post';
// import Link from 'next/link';

// interface PageProps {
//   params: { category: string };
// }

// interface ApiResponse {
//   id: string;
//   slug: string;
//   title: string;
//   created_time: string;
// }

// export default async function CategoryPage({ params }: PageProps) {
//   const { category } = params;

//   try {
//     // API 요청을 통해 카테고리별 게시물 가져오기
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/post/${category}`
//     );

//     if (!response.ok) {
//       console.error('Failed to fetch posts:', response.status);
//       throw new Error('Failed to fetch posts');
//     }

//     // 응답 데이터를 명확한 타입으로 변환
//     const posts: ApiResponse[] = await response.json();
//     console.log('posts:', posts);

//     if (!posts || posts.length === 0) {
//       console.warn('No posts found for category:', category);
//       return <div>No posts found for category: {category}</div>;
//     }

//     return (
//       <div>
//         <ul>
//           {posts.map(({ id, slug, title, created_time }) => {
//             // 썸네일 기본값 설정
//             const thumbnailUrl = '/default-thumbnail.png';

//             return (
//               <li key={id}>
//                 <Link href={`/${category}/${slug}`}>
//                   <Post
//                     title={title}
//                     slug={slug}
//                     date={created_time}
//                     thumbnailUrl={thumbnailUrl}
//                     category={category}
//                   />
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     );
//   } catch (error) {
//     console.error('Error loading posts:', error);
//     return <div>Error loading posts. Please try again later.</div>;
//   }
// }
///////
// import Post from '@/components/ui/Post';
// import Link from 'next/link';

// interface PageProps {
//   params: { category: string };
// }

// interface ApiResponse {
//   id: string;
//   slug: string;
//   title: string;
//   created_time: string;
//   thumbnailUrl?: string;
// }

// export default async function CategoryPage({ params }: PageProps) {
//   const { category } = params;

//   try {
//     // API URL 설정
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
//     const response = await fetch(`${apiUrl}/api/post/${category}`, {
//       cache: 'no-store',
//     });

//     // 응답 확인
//     if (!response.ok) {
//       console.error('Failed to fetch posts:', response.status);
//       throw new Error('Failed to fetch posts');
//     }

//     // 데이터 파싱 및 타입 정의
//     const posts: ApiResponse[] = await response.json();

//     // 데이터가 없을 경우
//     if (!posts || posts.length === 0) {
//       return <div>No posts found for category: {category}</div>;
//     }

//     return (
//       <div>
//         <ul>
//           {/* <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid gap-6"> */}
//           {posts.map(({ id, slug, title, created_time, thumbnailUrl }) => (
//             <li key={id}>
//               <Link href={`/${category}/${slug}`}>
//                 <Post
//                   title={title}
//                   slug={slug}
//                   date={created_time}
//                   thumbnailUrl={thumbnailUrl || '/default-thumbnail.png'}
//                   category={category}
//                 />
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   } catch (error) {
//     console.error('Error loading posts:', error);
//     return <div>Error loading posts. Please try again later.</div>;
//   }
// }
// import Post from '@/components/ui/Post';
// import Link from 'next/link';
// import { ApiResponse } from '@/lib/notion/types/notionDataType'; // 기존에 정의된 ApiResponse 타입 가져오기

// interface PageProps {
//   params: { category: string };
// }

// export default async function CategoryPage({ params }: PageProps) {
//   const { category } = params;

//   try {
//     // API URL 설정
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
//     const response = await fetch(`${apiUrl}/api/post/${category}`, {
//       cache: 'no-store',
//     });

//     // 응답 확인
//     if (!response.ok) {
//       console.error('Failed to fetch posts:', response.status);
//       throw new Error('Failed to fetch posts');
//     }

//     // 데이터 파싱 및 타입 정의
//     const posts: ApiResponse[] = await response.json();

//     // 데이터가 없을 경우
//     if (!posts || posts.length === 0) {
//       return <div>No posts found for category: {category}</div>;
//     }

//     return (
//       <div>
//         <ul>
//           {posts.map(({ id, slug, title, created_time }) => {
//             const thumbnailUrl = '/default-thumbnail.png';

//             return (
//               <li key={id}>
//                 <Link href={`/${category}/${slug}`}>
//                   <Post
//                     title={title}
//                     slug={slug}
//                     date={created_time}
//                     thumbnailUrl={thumbnailUrl}
//                     category={category}
//                   />
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     );
//   } catch (error) {
//     console.error('Error loading posts:', error);
//     return <div>Error loading posts. Please try again later.</div>;
//   }
// }

//// 정상작동함
//app/[category]/page.tsx

// import Post from '@/components/ui/Post';
// import Link from 'next/link';
// import { ApiResponse } from '@/lib/notion/types/notionDataType';

// interface PageProps {
//   params: { category: string };
// }

// export default async function CategoryPage({ params }: PageProps) {
//   const { category } = params;

//   try {
//     const apiUrl =
//       `${process.env.NEXT_PUBLIC_API_URL}/api/post/${category}`.replace(
//         /([^:]\/)\/+/g,
//         '$1'
//       );
//     console.log('Fetching posts from:', apiUrl);

//     const response = await fetch(apiUrl, {
//       cache: 'no-store',
//     });

//     if (!response.ok) {
//       console.error(`Failed to fetch posts. Status: ${response.status}`);
//       throw new Error(`Failed to fetch posts for category: ${category}`);
//     }

//     const posts: ApiResponse[] = await response.json();
//     console.log('Received posts:', posts);

//     if (!posts || posts.length === 0) {
//       return <div>No posts found for category: {category}</div>;
//     }

//     return (
//       <div>
//         <ul>
//           {posts.map(({ id, slug, title, created_time, thumbnailUrl }) => {
//             const thumbnail = thumbnailUrl || '/default-thumbnail.png';

//             return (
//               <li key={id}>
//                 <Link href={`/${category}/${slug}`}>
//                   <Post
//                     title={title}
//                     slug={slug}
//                     date={created_time}
//                     thumbnailUrl={thumbnail}
//                     category={category}
//                   />
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     );
//   } catch (error) {
//     console.error('Error loading posts:', error);
//     return <div>Error loading posts. Please try again later.</div>;
//   }
// }

// import Post from '@/components/ui/Post';
// import Link from 'next/link';
// import { ApiResponse } from '@/lib/notion/types/notionDataType';

// interface PageProps {
//   params: { category: string };
// }

// export default async function CategoryPage({ params }: PageProps) {
//   const { category } = params;

//   try {
//     const apiUrl =
//       `${process.env.NEXT_PUBLIC_API_URL}/api/post/${category}`.replace(
//         /([^:]\/)\/+/g,
//         '$1'
//       );
//     console.log('Fetching posts from:', apiUrl);

//     const response = await fetch(apiUrl, {
//       cache: 'no-store',
//     });

//     if (!response.ok) {
//       console.error(`Failed to fetch posts. Status: ${response.status}`);
//       throw new Error(`Failed to fetch posts for category: ${category}`);
//     }

//     const posts: ApiResponse[] = await response.json();
//     console.log('Received posts:', posts);

//     if (!posts || posts.length === 0) {
//       return <div>No posts found for category: {category}</div>;
//     }

//     return (
//       <div>
//         <ul>
//           {posts.map((post) => {
//             // Extract thumbnail URL
//             let thumbnail = '/default-thumbnail.png';
//             const thumbnailProperty = post.thumbnailUrl;

//             if (thumbnailProperty) {
//               if (
//                 thumbnailProperty.type === 'files' &&
//                 thumbnailProperty.files.length > 0
//               ) {
//                 const file = thumbnailProperty.files[0];
//                 if (file.type === 'file') {
//                   thumbnail = file.file.url;
//                 } else if (file.type === 'external') {
//                   thumbnail = file.external.url;
//                 }
//               }
//             }

//             return (
//               <li key={post.id}>
//                 <Link href={`/${category}/${post.slug}`}>
//                   <Post
//                     title={post.title || 'Untitled'}
//                     slug={post.slug}
//                     date={post.created_time}
//                     thumbnailUrl={thumbnail}
//                     category={category}
//                   />
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     );
//   } catch (error) {
//     console.error('Error loading posts:', error);
//     return <div>Error loading posts. Please try again later.</div>;
//   }
// }

import { fetchNotionDatabaseByCategory } from '@/lib/notion/api/fetchNotionDatabaseByCategory';
import Link from 'next/link';
import Post from '@/components/ui/Post';
import { fetchNotionCategories } from '@/lib/notion/fetchNotionCategories';

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;

  const posts = await fetchNotionDatabaseByCategory(category);

  if (posts.length === 0) {
    return <div>No posts found for category: {category}</div>;
  }

  return (
    <div>
      <ul>
        {posts.map(({ id, slug, title, thumbnailUrl, created_time }) => (
          <li key={id}>
            <Link href={`/${category}/${slug}`}>
              <Post
                title={title}
                slug={slug}
                date={created_time}
                thumbnailUrl={thumbnailUrl}
                category={category}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function generateStaticParams() {
  const categories = await fetchNotionCategories();
  return categories.map((category) => ({ category }));
}
