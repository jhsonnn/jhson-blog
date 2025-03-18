import PostList from '@/components/posts/PostList';
import { fetchNotionPostsByPage } from '@/lib/notion/api/fetchNotionPostsbyPage';

export default async function PostsPage() {
  const { posts } = await fetchNotionPostsByPage(1, 11);
  const normalizedPosts = posts.map((post) => ({
    ...post,
    status: { name: post.status.name ?? 'private' },
  }));

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold my-4">All Posts</h1>
      <PostList initialPosts={normalizedPosts} basePath="/posts" />
    </div>
  );
}
