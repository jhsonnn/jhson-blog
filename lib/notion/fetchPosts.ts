import { Post } from './types';

type FetchPostsParams = {
  category?: string;
  tag?: string;
};

export const fetchPosts = async ({ category, tag }: FetchPostsParams): Promise<Post[]> => {
  const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  //TEST: 노션 수정 중
  const response = await fetch(`${API_URL}/api/posts`, { next: { revalidate: 60 } });
  //const response = await fetch(`${API_URL}/api/posts`, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  const posts: Post[] = await response.json();

  return posts.filter((post) => {
    if (category && post.category?.name !== category) return false;
    if (tag && !post.tags.some((tagItem) => tagItem.name === tag)) return false;
    if (post.status.name !== 'public') return false;
    return post.category.name !== 'none'; //none 인 것 제외
  });
};
