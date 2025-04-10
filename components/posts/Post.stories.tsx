import type { Meta, StoryObj } from '@storybook/react';
import Post from './Post';

const meta: Meta<typeof Post> = {
  title: 'Post/Post',
  component: Post,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Post>;

export const Default: Story = {
  args: {
    title: 'Example Post Title',
    slug: 'example-post',
    date: '2025-04-10',
    thumbnailUrl: '/default_image.png',
    category: {
      name: 'projects',
      color: 'blue',
    },
    tags: [
      { name: 'Next.js', color: 'green' },
      { name: 'Notion', color: 'gray' },
    ],
  },
};

export const RandomPostSize: Story = {
  args: {
    ...Default.args,
    isRandomPosts: true,
  },
};
