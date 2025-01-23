import { Post as PostType } from '@/lib/notion/types';

export const mockPost: PostType = {
  id: '1',
  title: 'Mock Post 1',
  slug: 'mock-post-1',
  category: 'projects',
  tags: ['React', 'TypeScript'],
  created_time: '2023-01-01',
  thumbnailUrl: '/images/mock-thumbnail-1.png',
};

export const mockPosts: PostType[] = [
  mockPost,
  {
    id: '2',
    title: 'Mock Post 2',
    slug: 'mock-post-2',
    category: 'blog',
    tags: ['Next.js', 'JavaScript'],
    created_time: '2023-01-02',
    thumbnailUrl: '/images/mock-thumbnail-2.png',
  },
];
