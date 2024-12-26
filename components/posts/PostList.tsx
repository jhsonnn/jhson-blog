// 필터링된 포스트 목록을 렌더링

import Link from 'next/link';
import Post from '@/components/posts/Post';

type PostType = {
  id: string;
  slug: string;
  title: string;
  thumbnailUrl: string;
  created_time: string;
  category: string;
  tags: string[];
};

interface PostListProps {
  title: string;
  posts: PostType[];
  basePath: string; //링크 기본 경로
  noPostsMessage?: string; //데이터 없을 때 메시지
}

const PostList = ({
  title,
  posts,
  basePath,
  noPostsMessage = 'No posts available.',
}: PostListProps) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
      {posts.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(
            ({ id, slug, title, thumbnailUrl, created_time, tags }) => (
              <li key={id} className="mb-4">
                <Link href={`${basePath}/${slug}`}>
                  <Post
                    title={title}
                    slug={slug}
                    date={created_time}
                    thumbnailUrl={thumbnailUrl || '/default-thumbnail.png'}
                    category={basePath.replace('/', '')}
                    tags={tags}
                  />
                </Link>
              </li>
            )
          )}
        </ul>
      ) : (
        <p className="text-center text-gray-600">{noPostsMessage}</p>
      )}
    </div>
  );
};

export default PostList;
