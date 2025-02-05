// // 필터링된 포스트 목록 렌더링
// 'use client';

// import React from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/app/store';
// import Post from '@/components/posts/Post';
// import { Post as PostType } from '@/lib/notion/types';
// import { useFilteredPosts } from '@/app/hooks/useFilteredPosts';

// interface PostListProps {
//   title?: string; // 제목을 optional로 추가
//   posts: PostType[];
//   basePath: string;
//   noPostsMessage?: string;
//   categoryFilter?: string;
//   tagFilter?: string;
// }

// const PostList: React.FC<PostListProps> = ({
//   title,
//   posts,
//   noPostsMessage = '검색어와 일치하는 포스트가 없습니다.',
//   categoryFilter = 'all',
//   tagFilter = 'all',
// }) => {
//   const searchKeyword = useSelector((state: RootState) => state.search.keyword);

//   //필터링된 포스트 가져오기
//   const filteredPosts = useFilteredPosts({
//     posts,
//     searchKeyword,
//     categoryFilter,
//     tagFilter,
//   });

//   return (
//     <div className="container mx-auto px-0 py-5">
//       {title && (
//         <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
//       )}

//       {filteredPosts.length > 0 ? (
//         <ul className="grid grid-cols-1 gap-6">
//           {filteredPosts.map((post) => (
//             <li key={post.id} className="mb-4">
//               <Post
//                 title={post.title}
//                 slug={post.slug}
//                 date={post.created_time}
//                 thumbnailUrl={post.thumbnailUrl || '/default-thumbnail.png'}
//                 category={post.category}
//                 tags={post.tags}
//               />
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-center text-gray-600">{noPostsMessage}</p>
//       )}
//     </div>
//   );
// };

// export default PostList;

//skeleton 테스트
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
  posts: PostType[];
  basePath: string;
  noPostsMessage?: string;
  categoryFilter?: string;
  tagFilter?: string;
}

const PostList: React.FC<PostListProps> = ({
  title,
  posts,
  noPostsMessage = '검색어와 일치하는 포스트가 없습니다.',
  categoryFilter = 'all',
  tagFilter = 'all',
}) => {
  const searchKeyword = useSelector((state: RootState) => state.search.keyword);
  const [isLoading, setIsLoading] = useState(true);

  //필터링된 포스트 가져오기
  const filteredPosts = useFilteredPosts({
    posts,
    searchKeyword,
    categoryFilter,
    tagFilter,
  });

  //로딩 상태 시뮬레이션 (테스트용)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // 1초 로딩 시뮬레이션
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-0 py-5">
      {title && (
        <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
      )}

      {isLoading ? (
        <ul className="grid grid-cols-1 gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index} className="mb-6">
              <div className="relative min-w-full max-w-xl mx-auto bg-neutral-100 dark:bg-neutral-700 rounded-3xl shadow-lg overflow-hidden">
                <Skeleton
                  height="300px"
                  width="100%"
                  className="animate-pulse  bg-neutral-200 dark:bg-neutral-700 rounded-t-3xl"
                />
                <div className="p-5">
                  <Skeleton height="24px" width="80%" className="mb-2" />
                  <Skeleton height="16px" width="60%" className="mb-4" />
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <Skeleton
                        key={idx}
                        height="20px"
                        width="60px"
                        className="rounded-2xl"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : filteredPosts.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6">
          {filteredPosts.map((post) => (
            <li key={post.id} className="mb-4">
              <Post
                title={post.title}
                slug={post.slug}
                date={post.created_time}
                thumbnailUrl={post.thumbnailUrl || '/default-thumbnail.png'}
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

export default PostList;
