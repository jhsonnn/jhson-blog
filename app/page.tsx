import CategoryMenuWrapper from '@/components/menus/CategoryMenuWrapper';
import TagsMenu from '@/components/menus/TagsMenu';
import Post from '@/components/posts/Post';
import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string; tag?: string };
}) {
  const { category, tag } = searchParams;

  //전체 포스트 가져오기
  const allPosts = await fetchNotionAllPosts();

  //필터링된 포스트
  const filteredPosts = allPosts.filter((post) => {
    if (category && post.category !== category) return false;
    if (tag && !post.tags.includes(tag)) return false;
    return true;
  });

  //중복 제거된 카테고리 및 태그
  const categories = Array.from(new Set(allPosts.map((post) => post.category)));
  const tags = Array.from(new Set(allPosts.flatMap((post) => post.tags)));

  return (
    <div className="container mx-auto">
      {/* 메뉴 */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <CategoryMenuWrapper categories={categories} />

        {/* 작은 화면에서만 태그 메뉴 표시 */}
        <div className="block lg:hidden">
          <TagsMenu tags={tags} />
        </div>
      </div>

      {/* 포스트 리스트 */}
      {filteredPosts.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6">
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
          선택하신 메뉴와 태그에 해당되는 포스트가 없습니다.
        </p>
      )}
    </div>
  );
}
