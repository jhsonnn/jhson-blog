import { fetchNotionAllPosts } from './fetchNotionAllPosts';

jest.mock('./fetchNotionAllPosts');

const mockPosts = [
  {
    id: '1',
    title: 'Test Post',
    slug: 'test-post',
    category: 'projects',
    tags: ['tag1'],
    date: '2023-01-01',
    thumbnailUrl: '/thumbnail.png',
    status: { name: 'public' },
  },
];

test('fetchNotionAllPosts 에서 return 되는 posts', async () => {
  (fetchNotionAllPosts as jest.Mock).mockResolvedValue({
    posts: mockPosts,
    allCategories: ['projects'],
    allTags: ['tag1'],
  });

  const result = await fetchNotionAllPosts();

  expect(result).toEqual({
    posts: mockPosts,
    allCategories: ['projects'],
    allTags: ['tag1'],
  });

  expect(fetchNotionAllPosts).toHaveBeenCalledTimes(1);
});
