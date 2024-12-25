// // import { fetchNotionDatabaseByCategory } from '@/lib/notion/api/fetchNotionDatabaseByCategory';
// // import Link from 'next/link';
// // import Post from '@/components/ui/Post';
// // import { fetchNotionCategories } from '@/lib/notion/fetchNotionCategories';
// // import { redirect } from 'next/navigation';

// // export default async function CategoryPage({
// //   params,
// // }: {
// //   params: { category: string };
// // }) {
// //   const { category } = params;

// //   const posts = await fetchNotionDatabaseByCategory(category);

// //   ///resume -> /resume/resume로 리디렉트
// //   if (category.toLowerCase() === 'resume') {
// //     redirect(`/${category}/${category}`);
// //   }

// //   if (posts.length === 0) {
// //     return <div>No posts found for category: {category}</div>;
// //   }

// //   return (
// //     <div>
// //       <ul>
// //         {posts.map(({ id, slug, title, thumbnailUrl, created_time }) => (
// //           <li key={id}>
// //             <Link href={`/${category}/${slug}`}>
// //               <Post
// //                 title={title}
// //                 slug={slug}
// //                 date={created_time}
// //                 thumbnailUrl={thumbnailUrl}
// //                 category={category}
// //               />
// //             </Link>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // export async function generateStaticParams() {
// //   const categories = await fetchNotionCategories();
// //   return categories.map((category) => ({ category }));
// // }

// // import { fetchNotionDatabaseByCategory } from '@/lib/notion/api/fetchNotionDatabaseByCategory';
// // import Link from 'next/link';
// // import Post from '@/components/ui/Post';
// // import { fetchNotionCategories } from '@/lib/notion/fetchNotionCategories';
// // import { redirect } from 'next/navigation';

// // export default async function CategoryPage({
// //   params,
// // }: {
// //   params: { category: string };
// // }) {
// //   const { category } = params;

// //   if (category.toLowerCase() === 'resume') {
// //     redirect(`/${category}/${category}`);
// //   }

// //   const posts = await fetchNotionDatabaseByCategory(category);

// //   if (!posts || posts.length === 0) {
// //     return <div>No posts found for category: {category}</div>;
// //   }

// //   return (
// //     <div>
// //       <ul>
// //         {posts.map(
// //           ({ id, slug, title, thumbnailUrl, created_time, category, tags }) => (
// //             <li key={id}>
// //               <Link href={`/${category}/${slug}`}>
// //                 <Post
// //                   title={title}
// //                   slug={slug}
// //                   date={created_time}
// //                   thumbnailUrl={thumbnailUrl}
// //                   category={category}
// //                   tags={tags}
// //                 />
// //               </Link>
// //             </li>
// //           )
// //         )}
// //       </ul>
// //     </div>
// //   );
// // }

// // export async function generateStaticParams() {
// //   const categories = await fetchNotionCategories();
// //   return categories.map((category) => ({ category }));
// // }

// ////
// // //test
// // import { fetchNotionDatabaseByCategory } from '@/lib/notion/api/fetchNotionDatabaseByCategory';
// // import Link from 'next/link';
// // import Post from '@/components/ui/Post';
// // import { fetchNotionCategories } from '@/lib/notion/fetchNotionCategories';
// // import { redirect } from 'next/navigation';

// // export default async function CategoryPage({
// //   params,
// //   searchParams,
// // }: {
// //   params: { category: string };
// //   searchParams: { tag?: string };
// // }) {
// //   const { category } = params;
// //   const { tag } = searchParams; // 쿼리 파라미터에서 태그를 가져옴

// //   // 'resume' 카테고리 리디렉션
// //   if (category.toLowerCase() === 'resume') {
// //     redirect(`/${category}/lovelyResume`);
// //   }

// //   // 카테고리별로 포스트를 가져옴
// //   const posts = await fetchNotionDatabaseByCategory(category);

// //   // 태그가 있으면 태그에 맞게 필터링
// //   const filteredPosts = tag
// //     ? posts.filter((post) => post.tags?.includes(tag))
// //     : posts;

// //   if (!filteredPosts || filteredPosts.length === 0) {
// //     return (
// //       <div>
// //         No posts{' '}
// //         {tag ? `found for tag: ${tag}` : `found for category: ${category}`}
// //       </div>
// //     );
// //   }

// //   return (
// //     <div>
// //       <h1 className="text-2xl font-bold mb-4">
// //         {tag ? `Posts tagged with: "${tag}"` : `Category: "${category}"`}
// //       </h1>
// //       <ul>
// //         {filteredPosts.map(
// //           ({ id, slug, title, thumbnailUrl, created_time, tags }) => (
// //             <li key={id} className="mb-4">
// //               <Link href={`${category}/${slug}`}>
// //                 <Post
// //                   title={title}
// //                   slug={slug}
// //                   date={created_time}
// //                   thumbnailUrl={thumbnailUrl}
// //                   category={category}
// //                   tags={tags}
// //                 />
// //               </Link>
// //             </li>
// //           )
// //         )}
// //       </ul>
// //     </div>
// //   );
// // }

// // export async function generateStaticParams() {
// //   const categories = await fetchNotionCategories();
// //   return categories.map((category) => ({ category }));
// // }

// //test

// import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
// import Link from 'next/link';
// import Post from '@/components/posts/Post';
// import { redirect } from 'next/navigation';

// export default async function CategoryPage({
//   params,
//   searchParams,
// }: {
//   params: { category: string };
//   searchParams: { tag?: string };
// }) {
//   const { category } = params;
//   const { tag } = searchParams;

//   // 'resume' 카테고리 리디렉션
//   if (category.toLowerCase() === 'resume') {
//     redirect(`/${category}/lovelyResume`);
//   }

//   // 모든 포스트 가져오기
//   const allPosts = await fetchNotionAllPosts();

//   // 카테고리 및 태그 필터링
//   const filteredPosts = allPosts.filter(
//     (post) => post.category === category && (!tag || post.tags?.includes(tag))
//   );

//   if (!filteredPosts || filteredPosts.length === 0) {
//     return (
//       <div>
//         No posts{' '}
//         {tag ? `found for tag: ${tag}` : `found for category: ${category}`}
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h1 className="text-2xl font-bold mb-4">
//         {tag ? `Posts tagged with: "${tag}"` : `Category: "${category}"`}
//       </h1>
//       <ul>
//         {filteredPosts.map(
//           ({ id, slug, title, thumbnailUrl, created_time, tags }) => (
//             <li key={id} className="mb-4">
//               <Link href={`/${category}/${slug}`}>
//                 <Post
//                   title={title}
//                   slug={slug}
//                   date={created_time}
//                   thumbnailUrl={thumbnailUrl}
//                   category={category}
//                   tags={tags}
//                 />
//               </Link>
//             </li>
//           )
//         )}
//       </ul>
//     </div>
//   );
// }

// //TODO: 테스트
// import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
// import Link from 'next/link';
// import Post from '@/components/posts/Post';
// import { redirect } from 'next/navigation';

// export default async function CategoryPage({
//   params,
//   searchParams,
// }: {
//   params: { category: string };
//   searchParams: { tag?: string };
// }) {
//   const { category } = params;
//   const { tag } = searchParams;

//   // 'resume' 카테고리 리디렉션
//   if (category.toLowerCase() === 'resume') {
//     redirect(`/${category}/lovelyResume`);
//   }

//   // 모든 포스트 가져오기
//   const allPosts = await fetchNotionAllPosts();

//   // 카테고리 및 태그 필터링
//   const filteredPosts = allPosts.filter(
//     (post) =>
//       post.category.toLowerCase() === category.toLowerCase() &&
//       (!tag || post.tags?.includes(tag))
//   );

//   // 결과가 없을 경우
//   if (!filteredPosts.length) {
//     return (
//       <div className="container mx-auto px-4 py-6">
//         <h1 className="text-2xl font-bold mb-4 text-center">
//           {tag
//             ? `No posts found for tag: "${tag}"`
//             : `No posts found for category: "${category}"`}
//         </h1>
//       </div>
//     );
//   }

//   // 결과 렌더링
//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h1 className="text-2xl font-bold mb-4 text-center">
//         {tag
//           ? `Posts tagged with: "${tag}"`
//           : `Category: "${
//               category.charAt(0).toUpperCase() + category.slice(1)
//             }"`}
//       </h1>
//       <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredPosts.map(
//           ({ id, slug, title, thumbnailUrl, created_time, tags }) => (
//             <li key={id} className="mb-4">
//               <Link href={`/${category}/${slug}`}>
//                 <Post
//                   title={title}
//                   slug={slug}
//                   date={created_time}
//                   thumbnailUrl={thumbnailUrl || '/default-thumbnail.png'}
//                   category={category}
//                   tags={tags}
//                 />
//               </Link>
//             </li>
//           )
//         )}
//       </ul>
//     </div>
//   );
// }

import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
import PostList from '@/components/posts/PostList';
import { redirect } from 'next/navigation';

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { tag?: string };
}) {
  const { category } = params;
  const { tag } = searchParams;

  // 'resume' 카테고리 리디렉션
  if (category.toLowerCase() === 'resume') {
    redirect(`/${category}/lovelyResume`);
  }

  // 모든 포스트 가져오기
  const allPosts = await fetchNotionAllPosts();

  // 카테고리 및 태그 필터링
  const filteredPosts = allPosts.filter(
    (post) =>
      post.category.toLowerCase() === category.toLowerCase() &&
      (!tag || post.tags?.includes(tag))
  );

  const title = tag
    ? `Posts tagged with: "${tag}"`
    : `Category: "${category.charAt(0).toUpperCase() + category.slice(1)}"`;

  return (
    <PostList
      title={title}
      posts={filteredPosts}
      basePath={`/${category}`}
      noPostsMessage={
        tag
          ? `No posts found for tag: "${tag}"`
          : `No posts found for category: "${category}"`
      }
    />
  );
}
