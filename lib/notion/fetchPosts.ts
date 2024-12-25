import { Post } from './types';

type FetchPostsParams = {
  category?: string;
  tag?: string;
};

export const fetchPosts = async ({ category, tag }: FetchPostsParams): Promise<Post[]> => {
  const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${API_URL}/api/posts`, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  const posts: Post[] = await response.json();

  // 필터링 로직 추가
  return posts.filter((post) => {
    if (category && post.category !== category) return false; // 카테고리 필터링
    if (tag && !post.tags.includes(tag)) return false;        // 태그 필터링
    return post.category !== 'none';                          // 'none' 제외
  });
};
