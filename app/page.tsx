import { Suspense } from 'react';
import CategoryMenuWrapper from '@/components/menus/CategoryMenuWrapper';
import TagsMenuWrapperClient from '@/components/menus/TagsMenuWrapperClient';
import Profile from '@/components/profile/Profile';
import Post from '@/components/posts/Post';
import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string; tag?: string };
}) {
  const { category = 'all', tag = 'all' } = searchParams;

  const allPosts = await fetchNotionAllPosts();
  const filteredPosts = allPosts.filter((post) => {
    if (category !== 'all' && post.category !== category) return false;
    if (tag !== 'all' && !post.tags.includes(tag)) return false;
    return true;
  });

  const categories = Array.from(new Set(allPosts.map((post) => post.category)));
  const tags = Array.from(new Set(allPosts.flatMap((post) => post.tags)));

  const renderPostList = () => {
    if (filteredPosts.length > 0) {
      return (
        <ul className="grid grid-cols-1 gap-8">
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
      );
    }

    return (
      <p className="text-gray-600 text-center">
        선택하신 메뉴와 태그에 해당되는 포스트가 없습니다.
      </p>
    );
  };

  return (
    <div className="container mx-auto">
      {/* 큰 화면: 태그 메뉴, 카테고리 메뉴, 프로필 */}
      <div className="hidden lg:flex lg:gap-8">
        {/* 화면 좌측: TagsMenu */}
        <aside className="w-1/6 lg:h-[calc(100vh-4rem)] sticky top-[4rem] overflow-hidden">
          <Suspense fallback={<div>Loading tags...</div>}>
            <TagsMenuWrapperClient tags={tags} currentTag={tag} />
          </Suspense>
        </aside>

        {/* 화면 가운데: CategoryMenu + Posts */}
        <main className="flex-grow lg:w-4/6">
          <div className="mb-4">
            <CategoryMenuWrapper
              categories={categories}
              currentCategory={category}
            />
          </div>
          {renderPostList()}
        </main>

        {/* 화면 우측: Profile */}
        <aside className="w-1/6 lg:h-[calc(100vh-4rem)] sticky top-[4rem] overflow-hidden">
          <Profile />
        </aside>
      </div>

      {/* 작은 화면: TagsMenu + CategoryMenu + Posts */}
      <div className="block lg:hidden">
        <div className="flex flex-col gap-4 mb-6">
          <CategoryMenuWrapper
            categories={categories}
            currentCategory={category}
          />
          <Suspense fallback={<div>Loading tags...</div>}>
            <TagsMenuWrapperClient tags={tags} currentTag={tag} />
          </Suspense>
        </div>
        {renderPostList()}
      </div>
    </div>
  );
}
