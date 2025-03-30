import { Suspense } from 'react';
import CategoryMenuWrapper from '@/components/menus/CategoryMenuWrapper';
import TagsMenuWrapperClient from '@/components/menus/TagsMenuWrapperClient';
import Profile from '@/components/profile/Profile';
import PostList from '@/components/posts/PostList';
import SearchBar from '@/components/menus/SearchBar';
import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
import Contact from '@/components/contact/Contact';

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string; tag?: string };
}) {
  const { category = 'all', tag = 'all' } = searchParams;
  const { posts: initialPosts, allCategories, allTags } = await fetchNotionAllPosts();

  return (
    <div className="container mx-auto">
      {/* 큰 화면 레이아웃 */}
      <div className="hidden lg:flex lg:gap-8">
        <aside className="w-[17%] lg:h-[calc(100vh-4rem)] sticky top-[4rem] overflow-hidden">
          <Suspense fallback={<>Loading tags...</>}>
            {allTags.length > 0 ? (
              <TagsMenuWrapperClient tags={allTags} currentTag={tag} />
            ) : (
              <>No Tags Available</>
            )}
          </Suspense>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="flex-grow lg:w-[62%]">
          <CategoryMenuWrapper categories={allCategories} currentCategory={category} />
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
          <CategoryMenuWrapper categories={allCategories} currentCategory={category} />
          <Suspense fallback={<div>Loading tags...</div>}>
            {allTags.length > 0 ? (
              <TagsMenuWrapperClient tags={allTags} currentTag={tag} />
            ) : (
              <div>No Tags Available</div>
            )}
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
