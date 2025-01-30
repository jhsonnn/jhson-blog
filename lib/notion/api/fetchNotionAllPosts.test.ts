import {fetchNotionAllPosts} from "./fetchNotionAllPosts"
jest.mock('@/lib/notion/api/fetchNotionAllPosts');

const mockPosts = [
  {
    id: '1',
    title: 'Test Post',
    slug: 'test-post',
    category: 'projects',
    tags: ['tag1'],
    created_time: '2023-01-01',
    thumbnailUrl: '/thumbnail.png',
  },
];

test('fetchNotionAllPosts로부터 리턴되는 posts', async () => {
  (fetchNotionAllPosts as jest.Mock).mockResolvedValue(mockPosts);

  const posts = await fetchNotionAllPosts();
  expect(posts).toEqual(mockPosts);
  expect(fetchNotionAllPosts).toHaveBeenCalledTimes(1);
});
