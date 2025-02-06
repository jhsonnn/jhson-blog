// import { render, screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import PostList from '@/components/posts/PostList';
// import { mockPosts } from '@/tests/mocks/mockPosts';
// import store from '@/app/store';

// describe('PostList Component', () => {
//   const renderWithRedux = (component: React.ReactNode) => {
//     return render(<Provider store={store}>{component}</Provider>);
//   };

//   test('PostList 렌더링', () => {
//     renderWithRedux(<PostList posts={mockPosts} basePath="/posts" />);

//     //1번 포스트 title 확인
//     expect(screen.getByText('Mock Post 1')).toBeInTheDocument();

//     //1번 포스트 링크 확인
//     expect(screen.getByRole('link', { name: /Mock Post 1/i })).toHaveAttribute(
//       'href',
//       '/projects/mock-post-1'
//     );
//   });

//   test('해당되는 포스트 없을 때 없다는 메세지 렌더링', () => {
//     renderWithRedux(<PostList posts={[]} basePath="/posts" />);

//     expect(
//       screen.getByText('검색어와 일치하는 포스트가 없습니다.')
//     ).toBeInTheDocument();
//   });

//   test('Category에 따라서 포스트 필터링', () => {
//     renderWithRedux(
//       <PostList posts={mockPosts} basePath="/posts" categoryFilter="blog" />
//     );

//     expect(screen.queryByText('Mock Post 1')).not.toBeInTheDocument();
//     expect(screen.getByText('Mock Post 2')).toBeInTheDocument();
//   });

//   test('tag에 따라서 포스트 필터링', () => {
//     renderWithRedux(
//       <PostList posts={mockPosts} basePath="/posts" tagFilter="React" />
//     );

//     expect(screen.getByText('Mock Post 1')).toBeInTheDocument();
//     expect(screen.queryByText('Mock Post 2')).not.toBeInTheDocument();
//   });
// });
