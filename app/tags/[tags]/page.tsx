// 특정 태그의 포스트 목록 페이지
import { fetchPosts } from '@/lib/notion/fetchPosts';

const TagPostsPage = async ({ params }: { params: { tags: string } }) => {
  // 특정 태그로 필터링된 포스트 데이터 가져오기
  const posts = await fetchPosts({ tag: params.tags });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tag: {params.tags}</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="mb-4">
            <a
              href={`/${post.category}/${post.slug}`}
              className="text-xl hover:underline"
            >
              {post.title}
            </a>
            <p className="text-gray-500">Tags: {post.tags.join(', ')}</p>
          </div>
        ))
      ) : (
        <p>No posts available for this tag.</p>
      )}
    </div>
  );
};

export default TagPostsPage;
