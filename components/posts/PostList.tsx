// // 필터링된 포스트 목록을 렌더링

// import Link from 'next/link';
// import Post from '@/components/posts/Post';

// type PostType = {
//   id: string;
//   slug: string;
//   title: string;
//   thumbnailUrl: string;
//   created_time: string;
//   category: string;
//   tags: string[];
// };

// interface PostListProps {
//   title: string;
//   posts: PostType[];
//   basePath: string; //링크 기본 경로
//   noPostsMessage?: string; //데이터 없을 때 메시지
// }

// const PostList = ({
//   title,
//   posts,
//   basePath,
//   noPostsMessage = 'No posts available.',
// }: PostListProps) => {
//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
//       {posts.length > 0 ? (
//         <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {posts.map(
//             ({ id, slug, title, thumbnailUrl, created_time, tags }) => (
//               <li key={id} className="mb-4">
//                 <Link href={`${basePath}/${slug}`}>
//                   <Post
//                     title={title}
//                     slug={slug}
//                     date={created_time}
//                     thumbnailUrl={thumbnailUrl || '/default-thumbnail.png'}
//                     category={basePath.replace('/', '')}
//                     tags={tags}
//                   />
//                 </Link>
//               </li>
//             )
//           )}
//         </ul>
//       ) : (
//         <p className="text-center text-gray-600">{noPostsMessage}</p>
//       )}
//     </div>
//   );
// };

// export default PostList;

// //테스트2
// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import Post from '@/components/posts/Post';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/app/store';
// import { Post as PostType } from '@/lib/notion/types';

// interface PostListProps {
//   posts: PostType[];
//   basePath: string;
//   noPostsMessage?: string;
//   categoryFilter?: string;
//   tagFilter?: string;
// }

// const PostList: React.FC<PostListProps> = ({
//   posts,
//   basePath,
//   noPostsMessage = '검색어와 일치하는 포스트가 없습니다.',
//   categoryFilter = 'all',
//   tagFilter = 'all',
// }) => {
//   const searchKeyword = useSelector((state: RootState) => state.search.keyword);

//   //검색어에 따라서 post 필터링
//   const filteredPosts = posts.filter((post) => {
//     if (categoryFilter !== 'all' && post.category !== categoryFilter)
//       return false;
//     if (tagFilter !== 'all' && !post.tags.includes(tagFilter)) return false;
//     if (
//       searchKeyword &&
//       !post.title.toLowerCase().includes(searchKeyword.toLowerCase())
//     )
//       return false;
//     return true;
//   });

//   return (
//     <div className="container mx-auto px-0">
//       {filteredPosts.length > 0 ? (
//         <ul className="grid grid-cols-1 gap-6">
//           {filteredPosts.map((post) => (
//             <li key={post.id} className="mb-4">
//               <Link href={`${basePath}/${post.slug}`}>
//                 <Post
//                   title={post.title}
//                   slug={post.slug}
//                   date={post.created_time}
//                   thumbnailUrl={post.thumbnailUrl || '/default-thumbnail.png'}
//                   category={post.category}
//                   tags={post.tags}
//                 />
//               </Link>
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

//테스트3
// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import Post from '@/components/posts/Post';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/app/store';
// import { Post as PostType } from '@/lib/notion/types';
// import { useFilteredPosts } from '@/app/hooks/useFilteredPosts';

// interface PostListProps {
//   posts: PostType[];
//   basePath: string;
//   noPostsMessage?: string;
//   categoryFilter?: string;
//   tagFilter?: string;
// }

// const PostList: React.FC<PostListProps> = ({
//   posts,
//   basePath,
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
//     <div className="container mx-auto px-0">
//       {filteredPosts.length > 0 ? (
//         <ul className="grid grid-cols-1 gap-6">
//           {filteredPosts.map((post) => (
//             <li key={post.id} className="mb-4">
//               <Link href={`${basePath}/${post.slug}`}>
//                 <Post
//                   title={post.title}
//                   slug={post.slug}
//                   date={post.created_time}
//                   thumbnailUrl={post.thumbnailUrl || '/default-thumbnail.png'}
//                   category={post.category}
//                   tags={post.tags}
//                 />
//               </Link>
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

// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import Post from '@/components/posts/Post';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/app/store';
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
//   basePath,
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
//     <div className="container mx-auto px-0 py-6">
//       {title && (
//         <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
//       )}

//       {filteredPosts.length > 0 ? (
//         <ul className="grid grid-cols-1 gap-6">
//           {filteredPosts.map((post) => (
//             <li key={post.id} className="mb-4">
//               <Link href={`${basePath}/${post.slug}`} passHref>
//                 <Post
//                   title={post.title}
//                   slug={post.slug}
//                   date={post.created_time}
//                   thumbnailUrl={post.thumbnailUrl || '/default-thumbnail.png'}
//                   category={post.category}
//                   tags={post.tags}
//                 />
//               </Link>
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

'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import Post from '@/components/posts/Post';
import { Post as PostType } from '@/lib/notion/types';
import { useFilteredPosts } from '@/app/hooks/useFilteredPosts';

interface PostListProps {
  title?: string; // 제목을 optional로 추가
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

  //필터링된 포스트 가져오기
  const filteredPosts = useFilteredPosts({
    posts,
    searchKeyword,
    categoryFilter,
    tagFilter,
  });

  return (
    <div className="container mx-auto px-0 py-6">
      {title && (
        <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
      )}

      {filteredPosts.length > 0 ? (
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
