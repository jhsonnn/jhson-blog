import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import PostList from '@/components/posts/PostList';
import { Post as PostType } from '@/lib/notion/types';
import { useFilteredPosts } from '@/app/hooks/useFilteredPosts';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
const store = mockStore({
  search: { keyword: '' },
});
jest.mock('@/app/hooks/useFilteredPosts', () => ({
  useFilteredPosts: jest.fn(),
}));

// Mock 데이터
const mockPosts: PostType[] = [
  {
    id: '1',
    title: 'Test Post 1',
    slug: 'test-post-1',
    category: 'projects',
    tags: ['tag1'],
    date: '2024-01-01',
    thumbnailUrl: '/thumbnail1.png',
    status: { name: 'private' },
  },
  {
    id: '2',
    title: 'Test Post 2',
    slug: 'test-post-2',
    category: 'projects',
    tags: ['tag2'],
    date: '2024-02-01',
    thumbnailUrl: '/thumbnail2.png',
    status: { name: 'public' },
  },
];

//기본 렌더링 테스트 (로딩 중)
test('renders loading skeleton initially', () => {
  render(
    <Provider store={store}>
      <PostList initialPosts={mockPosts} basePath="/posts" />
    </Provider>
  );

  expect(screen.getByText(/검색어와 일치하는 포스트가 없습니다./i)).toBeInTheDocument();
});

//포스트 목록 렌더링 테스트 (로딩 완료 후)
test('renders posts after loading', async () => {
  (useFilteredPosts as jest.Mock).mockReturnValue(mockPosts); // 필터링된 포스트 반환

  render(
    <Provider store={store}>
      <PostList initialPosts={mockPosts} basePath="/posts" />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText(/Test Post 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Post 2/i)).toBeInTheDocument();
  });
});

//필터링 적용 테스트
test('renders filtered posts', async () => {
  (useFilteredPosts as jest.Mock).mockReturnValue([mockPosts[1]]); // 특정 태그 필터링

  render(
    <Provider store={store}>
      <PostList initialPosts={mockPosts} basePath="/posts" />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText(/Test Post 2/i)).toBeInTheDocument();
    expect(screen.queryByText(/Test Post 1/i)).not.toBeInTheDocument(); // 필터링됨
  });
});

//포스트가 없는 경우 메시지 확인
test('displays no posts message when no posts are available', async () => {
  (useFilteredPosts as jest.Mock).mockReturnValue([]); //포스트 없음

  render(
    <Provider store={store}>
      <PostList initialPosts={mockPosts} basePath="/posts" />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText(/검색어와 일치하는 포스트가 없습니다./i)).toBeInTheDocument();
  });
});
