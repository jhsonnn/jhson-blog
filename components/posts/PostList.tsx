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
//                 thumbnailUrl={post.thumbnailUrl || '/default_image.png'}
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
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/app/store';
// import Post from '@/components/posts/Post';
// import Skeleton from '@/components/ui/Skeleton';
// import { Post as PostType } from '@/lib/notion/types';
// import { useFilteredPosts } from '@/app/hooks/useFilteredPosts';

// interface PostListProps {
//   title?: string;
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
//   const [isLoading, setIsLoading] = useState(true);

//   //필터링된 포스트 가져오기
//   const filteredPosts = useFilteredPosts({
//     posts,
//     searchKeyword,
//     categoryFilter,
//     tagFilter,
//   });

//   //로딩 상태 시뮬레이션 (테스트용)
//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 1000); // 1초 로딩 시뮬레이션
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="container mx-auto px-0 py-5">
//       {title && (
//         <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
//       )}

//       {isLoading ? (
//         <ul className="grid grid-cols-1 gap-6">
//           {Array.from({ length: 5 }).map((_, index) => (
//             <li key={index} className="mb-6">
//               <div className="relative min-w-full max-w-xl mx-auto bg-neutral-100 dark:bg-neutral-700 rounded-3xl shadow-lg overflow-hidden">
//                 <Skeleton
//                   height="300px"
//                   width="100%"
//                   className="animate-pulse  bg-neutral-200 dark:bg-neutral-700 rounded-t-3xl"
//                 />
//                 <div className="p-5">
//                   <Skeleton height="24px" width="80%" className="mb-2" />
//                   <Skeleton height="16px" width="60%" className="mb-4" />
//                   <div className="flex flex-wrap gap-2">
//                     {Array.from({ length: 3 }).map((_, idx) => (
//                       <Skeleton
//                         key={idx}
//                         height="20px"
//                         width="60px"
//                         className="rounded-2xl"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : filteredPosts.length > 0 ? (
//         <ul className="grid grid-cols-1 gap-6">
//           {filteredPosts.map((post) => (
//             <li key={post.id} className="mb-4">
//               <Post
//                 title={post.title}
//                 slug={post.slug}
//                 date={post.created_time}
//                 thumbnailUrl={post.thumbnailUrl || '/default_image.png'}
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

// //ISR 테스트
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/app/store';
// import Post from '@/components/posts/Post';
// import Skeleton from '@/components/ui/Skeleton';
// import { Post as PostType } from '@/lib/notion/types';
// import { useFilteredPosts } from '@/app/hooks/useFilteredPosts';

// interface PostListProps {
//   title?: string;
//   posts: PostType[];
//   basePath: string;
//   noPostsMessage?: string;
//   categoryFilter?: string;
//   tagFilter?: string;
// }

// const PostList: React.FC<PostListProps> = ({
//   title,
//   posts,
//   basePath,
//   noPostsMessage = '검색어와 일치하는 포스트가 없습니다.',
//   categoryFilter,
//   tagFilter,
// }) => {
//   const searchKeyword = useSelector((state: RootState) => state.search.keyword);
//   const [isLoading, setIsLoading] = useState(true);

//   //필터링된 포스트 가져오기
//   const filteredPosts = useFilteredPosts({
//     posts,
//     searchKeyword,
//     categoryFilter,
//     tagFilter,
//   });

//   useEffect(() => {
//     //setTimeout 사용해서 메모리 누수 방지
//     const timer = setTimeout(() => setIsLoading(false), 1000);
//     //clearTimeout 사용해서 불필요한 타이머 실행방지
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="container mx-auto px-0 py-5">
//       {title && (
//         <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
//       )}

//       {isLoading ? (
//         <SkeletonList />
//       ) : filteredPosts.length > 0 ? (
//         <ul className="grid grid-cols-1 gap-6">
//           {filteredPosts.map((post) => (
//             <li key={post.id} className="mb-4">
//               <Post
//                 title={post.title}
//                 slug={post.slug}
//                 date={post.created_time}
//                 thumbnailUrl={post.thumbnailUrl || '/default_image.png'}
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

// //별도 컴포넌트 분리=>postlist 내부 사용하면 렌더링 반복되므로
// const SkeletonList = () => {
//   return (
//     <ul className="grid grid-cols-1 gap-6">
//       {Array.from({ length: 5 }).map((_, index) => (
//         <li key={index} className="mb-6">
//           <div className="relative min-w-full max-w-xl mx-auto bg-neutral-100 dark:bg-neutral-700 rounded-3xl shadow-lg overflow-hidden">
//             <Skeleton
//               height="300px"
//               width="100%"
//               className="animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded-t-3xl"
//             />
//             <div className="p-5">
//               <Skeleton height="24px" width="80%" className="mb-2" />
//               <Skeleton height="16px" width="60%" className="mb-4" />
//               <div className="flex flex-wrap gap-2">
//                 {Array.from({ length: 3 }).map((_, idx) => (
//                   <Skeleton
//                     key={idx}
//                     height="20px"
//                     width="60px"
//                     className="rounded-2xl"
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default PostList;

// // components/posts/PostList.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import Post from '@/components/posts/Post';
// import Skeleton from '@/components/ui/Skeleton';
// import { Post as PostType } from '@/lib/notion/types';

// export interface PostListProps {
//   initialPosts: PostType[]; // 초기 포스트 데이터
//   basePath: string;
//   title?: string;
//   noPostsMessage?: string;
//   categoryFilter?: string;
//   tagFilter?: string;
// }

// const PostList: React.FC<PostListProps> = ({
//   initialPosts,
//   basePath,
//   title,
//   noPostsMessage = 'No matching posts found.',
//   categoryFilter,
//   tagFilter,
// }) => {
//   const [posts, setPosts] = useState<PostType[]>(initialPosts); // 초기 포스트 설정
//   const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리

//   // 필터링된 포스트 계산
//   const filteredPosts = posts.filter((post) => {
//     const matchesCategory =
//       categoryFilter === 'all' || post.category === categoryFilter;
//     const matchesTag =
//       tagFilter === 'all' || post.tags.includes(tagFilter || '');
//     return matchesCategory && matchesTag;
//   });

//   return (
//     <div className="container mx-auto px-0 py-5">
//       {title && (
//         <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
//       )}

//       <ul className="grid grid-cols-1 gap-6">
//         {filteredPosts.map((post) => (
//           <li key={post.id}>
//             <Post
//               title={post.title}
//               slug={`${basePath}/${post.slug}`}
//               date={post.created_time}
//               thumbnailUrl={post.thumbnailUrl || '/default_image.png'}
//               category={post.category}
//               tags={post.tags}
//             />
//           </li>
//         ))}
//       </ul>

//       {isLoading && <SkeletonList />}
//       {!isLoading && filteredPosts.length === 0 && (
//         <p className="text-center text-gray-600">{noPostsMessage}</p>
//       )}
//     </div>
//   );
// };

// const SkeletonList = () => (
//   <ul className="grid grid-cols-1 gap-6">
//     {Array.from({ length: 5 }).map((_, index) => (
//       <li key={index} className="mb-6">
//         <div className="relative min-w-full max-w-xl mx-auto bg-neutral-100 dark:bg-neutral-700 rounded-3xl shadow-lg overflow-hidden">
//           <Skeleton
//             height="300px"
//             width="100%"
//             className="animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded-t-3xl"
//           />
//           <div className="p-5">
//             <Skeleton height="24px" width="80%" className="mb-2" />
//             <Skeleton height="16px" width="60%" className="mb-4" />
//             <div className="flex flex-wrap gap-2">
//               {Array.from({ length: 3 }).map((_, idx) => (
//                 <Skeleton
//                   key={idx}
//                   height="20px"
//                   width="60px"
//                   className="rounded-2xl"
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </li>
//     ))}
//   </ul>
// );

// export default PostList;

// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/app/store';
// import Post from '@/components/posts/Post';
// import Skeleton from '@/components/ui/Skeleton';
// import { Post as PostType } from '@/lib/notion/types';

// export interface PostListProps {
//   title?: string;
//   posts: PostType[];
//   basePath: string;
//   noPostsMessage?: string;
//   categoryFilter?: string;
//   tagFilter?: string;
// }

// const PostList: React.FC<PostListProps> = ({
//   title,
//   posts,
//   basePath,
//   noPostsMessage = '검색어와 일치하는 포스트가 없습니다.',
//   categoryFilter,
//   tagFilter,
// }) => {
//   const searchKeyword = useSelector((state: RootState) => state.search.keyword); // Redux에서 검색어 가져오기
//   const [filteredPosts, setFilteredPosts] = useState<PostType[]>(posts); // 필터링된 포스트 상태
//   const [isLoading, setIsLoading] = useState(false); // 로딩 상태

//   // 필터링된 포스트 계산
//   useEffect(() => {
//     setIsLoading(true);

//     const filtered = posts.filter((post) => {
//       const matchesCategory =
//         categoryFilter === 'all' || post.category === categoryFilter;
//       const matchesTag =
//         tagFilter === 'all' || post.tags.includes(tagFilter || '');
//       const matchesSearch =
//         post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//         post.tags.some((tag) =>
//           tag.toLowerCase().includes(searchKeyword.toLowerCase())
//         );
//       return matchesCategory && matchesTag && matchesSearch;
//     });

//     setFilteredPosts(filtered);
//     setIsLoading(false); // 필터링 완료 후 로딩 상태 해제
//   }, [searchKeyword, categoryFilter, tagFilter, posts]); // 의존성 배열에 필터링에 필요한 값들 추가

//   return (
//     <div className="container mx-auto px-0 py-5">
//       {title && (
//         <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
//       )}

//       {isLoading ? (
//         <SkeletonList />
//       ) : filteredPosts.length > 0 ? (
//         <ul className="grid grid-cols-1 gap-6">
//           {filteredPosts.map((post) => (
//             <li key={post.id} className="mb-4">
//               <Post
//                 title={post.title}
//                 slug={`${basePath}/${post.slug}`}
//                 date={post.created_time}
//                 thumbnailUrl={post.thumbnailUrl || '/default_image.png'}
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

// // 별도 컴포넌트 분리 => postlist 내부 사용하면 렌더링 반복되므로
// const SkeletonList = () => {
//   return (
//     <ul className="grid grid-cols-1 gap-6">
//       {Array.from({ length: 5 }).map((_, index) => (
//         <li key={index} className="mb-6">
//           <div className="relative min-w-full max-w-xl mx-auto bg-neutral-100 dark:bg-neutral-700 rounded-3xl shadow-lg overflow-hidden">
//             <Skeleton
//               height="300px"
//               width="100%"
//               className="animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded-t-3xl"
//             />
//             <div className="p-5">
//               <Skeleton height="24px" width="80%" className="mb-2" />
//               <Skeleton height="16px" width="60%" className="mb-4" />
//               <div className="flex flex-wrap gap-2">
//                 {Array.from({ length: 3 }).map((_, idx) => (
//                   <Skeleton
//                     key={idx}
//                     height="20px"
//                     width="60px"
//                     className="rounded-2xl"
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// };

// // export default PostList;
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/app/store';
// import Post from '@/components/posts/Post';
// import Skeleton from '@/components/ui/Skeleton';
// import { Post as PostType } from '@/lib/notion/types';
// import { useFilteredPosts } from '@/app/hooks/useFilteredPosts';

// interface PostListProps {
//   title?: string;
//   initialPosts: PostType[];
//   basePath: string;
//   noPostsMessage?: string;
//   categoryFilter?: string;
//   tagFilter?: string;
// }

// const PostList: React.FC<PostListProps> = ({
//   title,
//   initialPosts,
//   noPostsMessage = '검색어와 일치하는 포스트가 없습니다.',
//   categoryFilter,
//   tagFilter,
// }) => {
//   const searchKeyword = useSelector((state: RootState) => state.search.keyword);
//   const [isLoading, setIsLoading] = useState(true);

//   //필터링된 포스트 가져오기
//   const filteredPosts = useFilteredPosts({
//     posts: initialPosts,
//     searchKeyword,
//     categoryFilter,
//     tagFilter,
//   });

//   useEffect(() => {
//     // setTimeout 사용해서 메모리 누수 방지
//     const timer = setTimeout(() => setIsLoading(false), 1000);
//     //clearTimeout 사용해서 불필요한 타이머 실행방지
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="container mx-auto px-0 py-5">
//       {title && (
//         <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
//       )}

//       {isLoading ? (
//         <SkeletonList />
//       ) : filteredPosts.length > 0 ? (
//         <ul className="grid grid-cols-1 gap-6">
//           {filteredPosts.map((post) => (
//             <li key={post.id} className="mb-4">
//               <Post
//                 title={post.title}
//                 slug={post.slug}
//                 date={post.created_time}
//                 thumbnailUrl={post.thumbnailUrl || '/default_image.png'}
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

// //별도 컴포넌트로 분리 => PostList 내부 사용하면 렌더링 반복되므로
// const SkeletonList = () => {
//   return (
//     <ul className="grid grid-cols-1 gap-6">
//       {Array.from({ length: 5 }).map((_, index) => (
//         <li key={index} className="mb-6">
//           <div className="relative min-w-full max-w-xl mx-auto bg-neutral-100 dark:bg-neutral-700 rounded-3xl shadow-lg overflow-hidden">
//             <Skeleton
//               height="300px"
//               width="100%"
//               className="animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded-t-3xl"
//             />
//             <div className="p-5">
//               <Skeleton height="24px" width="80%" className="mb-2" />
//               <Skeleton height="16px" width="60%" className="mb-4" />
//               <div className="flex flex-wrap gap-2">
//                 {Array.from({ length: 3 }).map((_, idx) => (
//                   <Skeleton
//                     key={idx}
//                     height="20px"
//                     width="60px"
//                     className="rounded-2xl"
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default PostList;

// //테스트0211
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/app/store';
// import Post from '@/components/posts/Post';
// import Skeleton from '@/components/ui/Skeleton';
// import { Post as PostType } from '@/lib/notion/types';
// import { useFilteredPosts } from '@/app/hooks/useFilteredPosts';

// interface PostListProps {
//   title?: string;
//   initialPosts: PostType[];
//   basePath: string;
//   noPostsMessage?: string;
//   categoryFilter?: string;
//   tagFilter?: string;
// }

// const PostList: React.FC<PostListProps> = ({
//   title,
//   initialPosts,
//   noPostsMessage = '검색어와 일치하는 포스트가 없습니다.',
//   categoryFilter,
//   tagFilter,
// }) => {
//   const searchKeyword = useSelector((state: RootState) => state.search.keyword);
//   const [isLoading, setIsLoading] = useState(true);

//   //필터링된 포스트 가져오기
//   const filteredPosts = useFilteredPosts({
//     posts: initialPosts,
//     searchKeyword,
//     categoryFilter,
//     tagFilter,
//   });

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="container mx-auto px-0 py-5">
//       {title && (
//         <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
//       )}

//       {isLoading ? (
//         <SkeletonList />
//       ) : filteredPosts.length > 0 ? (
//         <ul className="grid grid-cols-1 gap-6">
//           {filteredPosts.map((post) => (
//             <li key={post.id} className="mb-4">
//               <Post
//                 title={post.title}
//                 slug={post.slug}
//                 date={post.date ?? 'no date'}
//                 thumbnailUrl={post.thumbnailUrl || '/default_image.png'}
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

// //별도 컴포넌트로 분리
// const SkeletonList = () => {
//   return (
//     <ul className="grid grid-cols-1 gap-6">
//       {Array.from({ length: 5 }).map((_, index) => (
//         <li key={index} className="mb-6">
//           <div className="relative min-w-full max-w-xl mx-auto bg-neutral-100 dark:bg-neutral-700 rounded-3xl shadow-lg overflow-hidden">
//             <Skeleton
//               height="300px"
//               width="100%"
//               className="animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded-t-3xl"
//             />
//             <div className="p-5">
//               <Skeleton height="24px" width="80%" className="mb-2" />
//               <Skeleton height="16px" width="60%" className="mb-4" />
//               <div className="flex flex-wrap gap-2">
//                 {Array.from({ length: 3 }).map((_, idx) => (
//                   <Skeleton
//                     key={idx}
//                     height="20px"
//                     width="60px"
//                     className="rounded-2xl"
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default PostList;

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

  console.log('Filtered Posts:', filteredPosts);

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

// 별도 컴포넌트로 분리 => PostList 내부 사용하면 렌더링 반복되므로
const SkeletonList = () => {
  return (
    <ul className="grid grid-cols-1 gap-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={index} className="mb-6">
          <div className="relative min-w-full max-w-xl mx-auto bg-neutral-100 dark:bg-neutral-700 rounded-3xl shadow-lg overflow-hidden">
            <Skeleton
              height="300px"
              width="100%"
              className="animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded-t-3xl"
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
  );
};

export default PostList;
