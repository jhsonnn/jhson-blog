//필터링된 포스트 목록
'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import Post from '@/components/posts/Post';
import Skeleton from '@/components/ui/Skeleton';
import { Post as PostType } from '@/lib/notion/types';
import { useFilteredPosts } from '@/app/hooks/useFilteredPosts';

interface PostListProps {
  title?: string;
  initialPosts: PostType[];
  basePath: string;
  noPostsMessage?: string;
  categoryFilter?: string;
  tagFilter?: string;
}

const PostList: React.FC<PostListProps> = ({
  title,
  initialPosts,
  noPostsMessage = '검색어와 일치하는 포스트가 없습니다.',
  categoryFilter,
  tagFilter,
}) => {
  const searchKeyword = useSelector((state: RootState) => state.search.keyword);
  const [isLoading, setIsLoading] = useState(true);

  //최신 날짜순 정렬(내림차순)
  const sortedPosts = [...initialPosts].sort(
    (a, b) =>
      new Date(b.date ?? '0000-00-00').getTime() -
      new Date(a.date ?? '0000-00-00').getTime()
  );

  //필터링된 포스트 가져오기(필터링 후 정렬)
  const filteredPosts = useFilteredPosts({
    posts: sortedPosts,
    searchKeyword,
    categoryFilter,
    tagFilter,
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-0 py-5">
      {title && (
        <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
      )}

      {isLoading ? (
        <SkeletonList />
      ) : filteredPosts.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6">
          {filteredPosts.map((post) => (
            <li key={post.id} className="mb-4">
              <Post
                title={post.title}
                slug={post.slug}
                date={post.date}
                thumbnailUrl={post.thumbnailUrl || '/default_image.png'}
                category={post.category}
                tags={post.tags}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">{noPostsMessage}</p>
      )}
    </div>
  );
};

//별도 컴포넌트로 분리 => PostList 내부 사용하면 렌더링 반복되므로
const SkeletonList = ({ isRandomPosts = false }) => {
  return (
    <ul className="grid grid-cols-1 gap-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={index} className="mb-6">
          <div
            className={`relative min-w-full max-w-xl mx-auto bg-neutral-100 dark:bg-neutral-700 rounded-3xl shadow-lg overflow-hidden flex flex-col 
            ${
              isRandomPosts
                ? 'h-32 sm:h-36 md:h-36 lg:h-40'
                : 'h-72 sm:h-80 md:h-96 lg:h-[26rem]'
            }`}
          >
            {/* 이미지 스켈레톤 */}
            <div
              className={`relative w-full flex-shrink-0 ${
                isRandomPosts
                  ? 'h-28 sm:h-32 md:h-36 lg:h-40'
                  : 'h-48 sm:h-52 md:h-64 lg:h-72'
              }`}
            >
              <Skeleton className="w-full h-full animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded-t-3xl" />
            </div>

            {/* 텍스트 스켈레톤 */}
            <div
              className={`p-3 sm:p-3 md:p-4 lg:p-4 flex flex-col 
              ${
                isRandomPosts
                  ? 'h-16 sm:h-[4.5rem] md:h-[5rem] lg:h-[6rem]'
                  : 'h-auto'
              }`}
            >
              <Skeleton className="w-4/5 h-4 sm:h-5 md:h-6 rounded-md mb-1 sm:mb-2" />
              <Skeleton className="w-3/5 h-3 sm:h-4 md:h-5 rounded-md mb-2" />

              <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className={`h-4 sm:h-5 md:h-6 rounded-2xl ${
                      isRandomPosts
                        ? 'w-10 sm:w-12 md:w-14'
                        : 'w-12 sm:w-14 md:w-16'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
