'use client';

import { Post } from '@/lib/notion/types';
import { useMemo } from 'react';

/**
 * 게시물 필터링 로직을 관리하는 커스텀 훅
 * @param allPosts 전체 게시물
 * @param category 선택된 카테고리
 * @param tag 선택된 태그
 * @param searchKeyword 검색 키워드
 * @returns 필터링된 게시물
 */
export const useFilteredPosts = (
  allPosts: Post[],
  category: string,
  tag: string,
  searchKeyword: string
): Post[] => {
  return useMemo(() => {
    return allPosts.filter((post) => {
      if (category !== 'all' && post.category !== category) return false;
      if (tag !== 'all' && !post.tags.includes(tag)) return false;
      if (
        searchKeyword &&
        !post.title.toLowerCase().includes(searchKeyword.toLowerCase())
      )
        return false;
      return true;
    });
  }, [allPosts, category, tag, searchKeyword]);
};
