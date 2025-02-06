// app/posts/page.tsx
import PostList from '@/components/posts/PostList';
import { fetchNotionPostsByPage } from '@/lib/notion/api/fetchNotionPostsbyPage';

export default async function PostsPage() {
  const { posts } = await fetchNotionPostsByPage(1, 10);

  return (
    <div>
      <h1 className="text-3xl font-bold my-4">All Posts</h1>
      <PostList initialPosts={posts} basePath="/posts" />
    </div>
  );
}
