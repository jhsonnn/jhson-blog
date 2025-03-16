import { Post } from './types';

type FetchPostsParams = {
  category?: string;
  tag?: string;
};

export const fetchPosts = async ({ category, tag }: FetchPostsParams): Promise<Post[]> => {
  const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  //test
  // const response = await fetch(`${API_URL}/api/posts`, { cache: 'force-cache' });
  const response = await fetch(`${API_URL}/api/posts`, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  const posts: Post[] = await response.json();

  return posts.filter((post) => {
    if (category && post.category !== category) return false;
    if (tag && !post.tags.includes(tag)) return false;
    return post.category !== 'none'; //none 인 것 제외
  });
};
