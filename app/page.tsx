// import { Suspense } from 'react';
// import CategoryMenuWrapper from '@/components/menus/CategoryMenuWrapper';
// import TagsMenuWrapperClient from '@/components/menus/TagsMenuWrapperClient';
// import Profile from '@/components/profile/Profile';
// import PostList from '@/components/posts/PostList';
// import SearchBar from '@/components/menus/SearchBar';
// import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
// import Contact from '@/components/contact/Contact';

// export default async function Home({
//   searchParams,
// }: {
//   searchParams: { category?: string; tag?: string };
// }) {
//   const { category = 'all', tag = 'all' } = searchParams;

//   const allPosts = await fetchNotionAllPosts();
//   const categories = Array.from(new Set(allPosts.map((post) => post.category)));
//   const tags = Array.from(new Set(allPosts.flatMap((post) => post.tags)));

//   return (
//     <div className="container mx-auto">
//       {/* 큰 화면 레이아웃 */}
//       <div className="hidden lg:flex lg:gap-8">
//         <aside className="w-[17%] lg:h-[calc(100vh-4rem)] sticky top-[4rem] overflow-hidden">
//           <Suspense fallback={<div>Loading tags...</div>}>
//             <TagsMenuWrapperClient tags={tags} currentTag={tag} />
//           </Suspense>
//         </aside>

//         {/* 메인 콘텐츠 */}
//         <main className="flex-grow lg:w-[62%]">
//           <CategoryMenuWrapper
//             categories={categories}
//             currentCategory={category}
//           />
//           <SearchBar />
//           <PostList
//             posts={allPosts}
//             basePath="/posts"
//             categoryFilter={category}
//             tagFilter={tag}
//           />
//         </main>

//         <aside className="w-[21%] lg:h-[calc(100vh-4rem)] sticky top-[4rem] overflow-hidden">
//           <Profile />
//           <Contact />
//         </aside>
//       </div>
//       {/* 작은 화면 레이아웃 */}
//       <div className="block lg:hidden">
//         <div className="flex flex-col gap-4 mb-6 lg:mb-2">
//           <CategoryMenuWrapper
//             categories={categories}
//             currentCategory={category}
//           />
//           <Suspense fallback={<div>Loading tags...</div>}>
//             <TagsMenuWrapperClient tags={tags} currentTag={tag} />
//           </Suspense>
//           <SearchBar />
//         </div>
//         <PostList
//           posts={allPosts}
//           basePath="/posts"
//           categoryFilter={category}
//           tagFilter={tag}
//         />
//       </div>
//     </div>
//   );
// }

// //인피니트포스트
import { Suspense } from 'react';
import CategoryMenuWrapper from '@/components/menus/CategoryMenuWrapper';
import TagsMenuWrapperClient from '@/components/menus/TagsMenuWrapperClient';
import Profile from '@/components/profile/Profile';
import PostList from '@/components/posts/PostList';
import SearchBar from '@/components/menus/SearchBar';
import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
import Contact from '@/components/contact/Contact';
import { fetchNotionPostsByPage } from '@/lib/notion/api/fetchNotionPostsbyPage';

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string; tag?: string };
}) {
  const { category = 'all', tag = 'all' } = searchParams;

  // 첫 번째 페이지 데이터만 가져오기
  const { posts: initialPosts } = await fetchNotionPostsByPage(1, 10);

  const allPosts = await fetchNotionAllPosts();
  const categories = Array.from(new Set(allPosts.map((post) => post.category)));
  const tags = Array.from(new Set(allPosts.flatMap((post) => post.tags)));

  return (
    <div className="container mx-auto">
      {/* 큰 화면 레이아웃 */}
      <div className="hidden lg:flex lg:gap-8">
        <aside className="w-[17%] lg:h-[calc(100vh-4rem)] sticky top-[4rem] overflow-hidden">
          <Suspense fallback={<div>Loading tags...</div>}>
            <TagsMenuWrapperClient tags={tags} currentTag={tag} />
          </Suspense>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="flex-grow lg:w-[62%]">
          <CategoryMenuWrapper
            categories={categories}
            currentCategory={category}
          />
          <SearchBar />
          <PostList
            initialPosts={initialPosts}
            basePath="/posts"
            categoryFilter={category}
            tagFilter={tag}
          />
        </main>

        <aside className="w-[21%] lg:h-[calc(100vh-4rem)] sticky top-[4rem] overflow-hidden">
          <Profile />
          <Contact />
        </aside>
      </div>
      {/* 작은 화면 레이아웃 */}
      <div className="block lg:hidden">
        <div className="flex flex-col gap-4 mb-6 lg:mb-2">
          <CategoryMenuWrapper
            categories={categories}
            currentCategory={category}
          />
          <Suspense fallback={<div>Loading tags...</div>}>
            <TagsMenuWrapperClient tags={tags} currentTag={tag} />
          </Suspense>
          <SearchBar />
        </div>
        <PostList
          initialPosts={initialPosts}
          basePath="/posts"
          categoryFilter={category}
          tagFilter={tag}
        />
      </div>
    </div>
  );
}
