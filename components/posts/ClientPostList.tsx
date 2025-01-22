// // 'use client';

// // import React, { useState, useMemo } from 'react';
// // import PostList from '@/components/posts/PostList';
// // import SearchBar from '@/components/menus/SearchBar';
// // import { Post } from '@/lib/notion/types/index';

// // interface ClientPostListProps {
// //   allPosts: Post[];
// //   initialCategory: string;
// //   initialTag: string;
// // }

// // const ClientPostList: React.FC<ClientPostListProps> = ({
// //   allPosts,
// //   initialCategory,
// //   initialTag,
// // }) => {
// //   const [searchKeyword, setSearchKeyword] = useState('');

// //   const filteredPosts = useMemo(() => {
// //     return allPosts.filter((post) => {
// //       if (initialCategory !== 'all' && post.category !== initialCategory)
// //         return false;
// //       if (initialTag !== 'all' && !post.tags.includes(initialTag)) return false;
// //       if (
// //         searchKeyword &&
// //         !post.title.toLowerCase().includes(searchKeyword.toLowerCase())
// //       )
// //         return false;
// //       return true;
// //     });
// //   }, [allPosts, initialCategory, initialTag, searchKeyword]);

// //   return (
// //     <div>
// //       <SearchBar onSearch={setSearchKeyword} />
// //       <PostList
// //         title={
// //           searchKeyword ? `Results for "${searchKeyword}"` : 'Filtered Posts'
// //         }
// //         posts={filteredPosts}
// //         basePath="/posts"
// //         noPostsMessage="선택하신 메뉴와 태그에 해당되는 포스트가 없습니다."
// //       />
// //     </div>
// //   );
// // };

// // export default ClientPostList;

'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import PostList from '@/components/posts/PostList';
import { Post } from '@/lib/notion/types/index';
import { RootState } from '@/app/store';

interface ClientPostListProps {
  allPosts: Post[];
  initialCategory: string;
  initialTag: string;
}

const ClientPostList: React.FC<ClientPostListProps> = ({
  allPosts,
  initialCategory,
  initialTag,
}) => {
  const searchKeyword = useSelector((state: RootState) => state.search.keyword);

  return (
    <PostList
      title={
        searchKeyword ? `Results for "${searchKeyword}"` : 'Filtered Posts'
      }
      posts={allPosts}
      basePath="/posts"
      noPostsMessage="선택하신 메뉴와 태그에 해당되는 포스트가 없습니다."
      searchKeyword={searchKeyword}
      categoryFilter={initialCategory}
      tagFilter={initialTag}
    />
  );
};

export default ClientPostList;
