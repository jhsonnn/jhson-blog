import Post from '@/components/ui/Post';
import {
  isFilesProperty,
  isTitleProperty,
  NotionPageItem,
} from '@/types/notionDataType';
import { fetchNotionDatabaseByCategory } from '@/lib/notion/fetchNotionDatabase';
import Link from 'next/link';

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const posts = await fetchNotionDatabaseByCategory(category);

  if (posts.length === 0) {
    return <div>No posts found for category: {category}</div>;
  }

  return (
    <div>
      <ul>
        {posts.map(({ slug, post }: NotionPageItem) => {
          const titleProperty = post.properties?.title;

          let title = 'No Title';
          if (isTitleProperty(titleProperty)) {
            title = titleProperty.title[0]?.plain_text || 'No Title';
          }

          const date = post.created_time;

          let thumbnailUrl = '/default-thumbnail.png';
          //const thumbnailProperty = post.properties?.["\bthumbnailUrl"];
          const thumbnailProperty = (post.properties as any)?.[
            '\bthumbnailUrl'
          ];

          // isFilesProperty 타입 가드 사용
          if (
            isFilesProperty(thumbnailProperty) &&
            thumbnailProperty.files.length > 0
          ) {
            const file = thumbnailProperty.files[0];
            if (file.type === 'file') {
              thumbnailUrl = file.file.url;
            } else if (file.type === 'external') {
              thumbnailUrl = file.external.url;
            }
          }

          return (
            <li key={post.id}>
              <Link href={`/${category}/${slug}`}>
                <Post
                  title={title}
                  slug={slug}
                  date={date}
                  thumbnailUrl={thumbnailUrl}
                  category={category}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Static Site Generation(SSG)으로 카테고리별 페이지 생성
export async function generateStaticParams() {
  const categories = ['projects', 'resume', 'profile'];
  return categories.map((category) => ({ category }));
}
