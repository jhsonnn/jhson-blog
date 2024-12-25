// // app/page.tsx
// export const revalidate = 60; //ISR, 60초마다 갱신됨

// const Home = async () => {
//   try {
//     const response = await fetch('http://localhost:3000/api/category', {
//       next: { revalidate: 60 }, //ISR설정
//     });
//     const categories: string[] = await response.json();

//     return (
//       <nav>
//         <ul>
//           {categories.map((category) => (
//             <li key={category}>{category}</li>
//           ))}
//         </ul>
//       </nav>
//     );
//   } catch (error) {
//     console.error('[ERROR] Failed to fetch categories:', error);
//     return <div>Error loading categories</div>;
//   }
// };

// // export default Home;
// import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
// import Link from 'next/link';
// import Post from '@/components/posts/Post';

// export default async function HomePage() {
//   // 모든 Posts 가져오기
//   const posts = await fetchNotionAllPosts();

//   if (!posts || posts.length === 0) {
//     return <div>No posts available.</div>;
//   }

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">All Posts</h1>
//       <ul>
//         {posts.map(
//           ({ id, slug, title, thumbnailUrl, created_time, category, tags }) => (
//             <li key={id} className="mb-6">
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
// // }
// 'use client';

// import { useEffect, useState } from 'react';
// import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
// import PostList from '@/components/posts/PostList';

// type PostType = {
//   id: string;
//   title: string;
//   slug: string;
//   category: string;
//   tags: string[];
//   created_time: string;
//   date: string;
//   thumbnailUrl: string;
// };

// export default function HomePage() {
//   const [posts, setPosts] = useState<PostType[]>([]); // 타입 명시
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const loadPosts = async () => {
//       setLoading(true);
//       const allPosts = await fetchNotionAllPosts();
//       setPosts(allPosts); // 타입이 일치하므로 오류 해결
//       setLoading(false);
//     };

//     loadPosts();
//   }, []);

//   if (loading) {
//     return <div className="text-center">Loading...</div>;
//   }

//   return <PostList title="All Posts" posts={posts} basePath="/" />;
// }

// app/page.tsx

// import CategoryMenu from '@/components/menus/CategoryMenu';
// import TagsMenu from '@/components/menus/TagsMenu';
// import Post from '@/components/posts/Post';
// import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';

// export default async function Home({
//   searchParams,
// }: {
//   searchParams: { category?: string; tag?: string };
// }) {
//   const { category, tag } = searchParams;

//   // 전체 포스트 가져오기
//   const allPosts = await fetchNotionAllPosts();

//   // 필터링된 포스트
//   const filteredPosts = allPosts.filter((post) => {
//     if (category && post.category !== category) return false;
//     if (tag && !post.tags.includes(tag)) return false;
//     return true;
//   });

//   // 중복 제거된 카테고리 및 태그
//   const categories = Array.from(new Set(allPosts.map((post) => post.category)));
//   const tags = Array.from(new Set(allPosts.flatMap((post) => post.tags)));

//   return (
//     <div className="container mx-auto px-4 py-6">
//       {/* 메뉴 */}
//       <div className="flex gap-4 mb-6">
//         <CategoryMenu categories={categories} />
//         <TagsMenu tags={tags} />
//       </div>

//       {/* 포스트 리스트 */}
//       {filteredPosts.length > 0 ? (
//         <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredPosts.map((post) => (
//             <li key={post.id}>
//               <Post
//                 title={post.title}
//                 date={post.created_time}
//                 thumbnailUrl={post.thumbnailUrl || '/default-thumbnail.png'}
//                 category={post.category}
//                 tags={post.tags}
//                 slug={post.slug}
//               />
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-600 text-center">
//           No posts available for this selection.
//         </p>
//       )}
//     </div>
//   );
// }

//테스트2
import CategoryMenu from '@/components/menus/CategoryMenu';
import TagsMenu from '@/components/menus/TagsMenu';
import Post from '@/components/posts/Post';
import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string; tag?: string };
}) {
  const { category, tag } = searchParams;

  // 전체 포스트 가져오기
  const allPosts = await fetchNotionAllPosts();

  // 필터링된 포스트
  const filteredPosts = allPosts.filter((post) => {
    if (category && post.category !== category) return false;
    if (tag && !post.tags.includes(tag)) return false;
    return true;
  });

  // 중복 제거된 카테고리 및 태그
  const categories = Array.from(new Set(allPosts.map((post) => post.category)));
  const tags = Array.from(new Set(allPosts.flatMap((post) => post.tags)));

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 메뉴 */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <CategoryMenu categories={categories} />
        <TagsMenu tags={tags} />
      </div>

      {/* 포스트 리스트 */}
      {filteredPosts.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <li key={post.id}>
              <Post
                title={post.title}
                date={post.created_time}
                thumbnailUrl={post.thumbnailUrl || '/default-thumbnail.png'}
                category={post.category}
                tags={post.tags}
                slug={post.slug}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-center">
          No posts available for this selection.
        </p>
      )}
    </div>
  );
}
