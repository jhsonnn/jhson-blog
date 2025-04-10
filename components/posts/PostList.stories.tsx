import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import PostList, { PostListProps } from './PostList';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
const store = mockStore({
  search: { keyword: '' },
});

const mockPosts: PostListProps['initialPosts'] = [
  {
    id: '1',
    title: 'Example Post 1',
    slug: 'example-post-1',
    date: '2024-01-01',
    thumbnailUrl: '/default_image.png',
    category: { name: 'projects', color: 'blue' },
    tags: [{ name: '인턴', color: 'green' }],
    status: { name: 'public' },
  },
  {
    id: '2',
    title: 'Example Post 2',
    slug: 'example-post-2',
    date: '2024-02-01',
    thumbnailUrl: '/default_image.png',
    category: { name: 'projects', color: 'green' },
    tags: [{ name: '개인프로젝트', color: 'blue' }],
    status: { name: 'public' },
  },
];

const meta: Meta<PostListProps> = {
  title: 'Post/PostList',
  component: PostList,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<PostListProps>;

export const Default: Story = {
  args: {
    title: 'storybook postList',
    initialPosts: mockPosts,
    basePath: '/posts',
    categoryFilter: 'projects',
    tagFilter: 'all',
  },
};

export const NoPosts: Story = {
  args: {
    title: 'empty post list',
    initialPosts: [],
    basePath: '/posts',
    noPostsMessage: 'no post.',
  },
};

export const LongTitleAndMultipleTags: Story = {
  args: {
    title: 'long title post list long title post list long title post list',
    initialPosts: mockPosts.map((post) => ({
      ...post,
      tags: [...post.tags, { name: 'React', color: 'red' }, { name: 'Storybook', color: 'purple' }],
    })),
    basePath: '/posts',
  },
};
