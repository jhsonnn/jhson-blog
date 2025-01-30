// 필터링된 포스트 목록 렌더링
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
    <div className="container mx-auto px-0 py-5">
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
