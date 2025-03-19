import { Post as PostType } from '@/lib/notion/types';

export const mockPost: PostType = {
  id: '1',
  title: 'Mock Post 1',
  slug: 'mock-post-1',
  category: { name: 'projects', color: 'blue' },
  tags: [{name: "tag1", color: "green"}],
  date: '2023-01-01',
  thumbnailUrl: '/images/mock-thumbnail-1.png',
  status: { name: "private" },
};

export const mockPosts: PostType[] = [
  mockPost,
  {
    id: '2',
    title: 'Mock Post 2',
    slug: 'mock-post-2',
    category: { name: 'blog', color: 'green' },
    tags: [{name: "tag2", color: "blue"}],
    date: '2023-01-02',
    thumbnailUrl: '/images/mock-thumbnail-2.png',
    status: { name: "public" },
  },
];
