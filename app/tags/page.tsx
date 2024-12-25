import { fetchPosts } from '@/lib/notion/fetchPosts';
import Post from '@/components/posts/Post';

const TagPostsPage = async ({ params }: { params: { tags: string } }) => {
  const posts = await fetchPosts({ tag: params.tags });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Tag: {params.tags}
      </h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Post
              key={post.id}
              title={post.title}
              date={post.created_time}
              thumbnailUrl={post.thumbnailUrl || '/default-thumbnail.png'}
              category={post.category}
              tags={post.tags}
              slug={post.slug}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">
          No posts available for this tag.
        </p>
      )}
    </div>
  );
};

export default TagPostsPage;
