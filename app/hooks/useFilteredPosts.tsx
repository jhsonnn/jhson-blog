import { useMemo } from 'react';
import { Post as PostType } from '@/lib/notion/types';

interface UseFilteredPostsProps {
  posts: PostType[];
  searchKeyword: string;
  categoryFilter?: string;
  tagFilter?: string;
}

export function useFilteredPosts({
  posts,
  searchKeyword,
  categoryFilter = 'all',
  tagFilter = 'all',
}: UseFilteredPostsProps) {
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (categoryFilter !== 'all' && post.category !== categoryFilter)
        return false;
      if (tagFilter !== 'all' && !post.tags.includes(tagFilter)) return false;
      if (
        searchKeyword &&
        !post.title.toLowerCase().includes(searchKeyword.toLowerCase())
      )
        return false;
      return true;
    });
  }, [posts, searchKeyword, categoryFilter, tagFilter]);

  return filteredPosts;
}
