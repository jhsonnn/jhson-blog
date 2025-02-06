// import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
// import PostList from '@/components/posts/PostList';
// import { redirect } from 'next/navigation';

// export default async function CategoryPage({
//   params,
//   searchParams,
// }: {
//   params: { category: string };
//   searchParams: { tag?: string };
// }) {
//   const { category } = params;
//   const { tag } = searchParams;

//   //resume 카테고리 리디렉션
//   if (category.toLowerCase() === 'resume') {
//     redirect(`/${category}/lovelyResume`);
//   }

//   //모든 포스트 가져오기
//   const allPosts = await fetchNotionAllPosts();

//   //카테고리 및 태그 필터링
//   const filteredPosts = allPosts.filter(
//     (post) =>
//       post.category.toLowerCase() === category.toLowerCase() &&
//       (!tag || post.tags?.includes(tag))
//   );

//   const title = tag
//     ? `Posts tagged with: "${tag}"`
//     : `Category: "${category.charAt(0).toUpperCase() + category.slice(1)}"`;

//   return (
//     <PostList
//       title={title}
//       posts={filteredPosts}
//       basePath={`/${category}`}
//       noPostsMessage={
//         tag
//           ? `No posts found for tag: "${tag}"`
//           : `No posts found for category: "${category}"`
//       }
//     />
//   );
// }

//인피니트포스트
import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
import PostList from '@/components/posts/PostList';
import { redirect } from 'next/navigation';

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { tag?: string };
}) {
  const { category } = params;
  const { tag } = searchParams;

  //resume 카테고리 리디렉션
  if (category.toLowerCase() === 'resume') {
    redirect(`/${category}/lovelyResume`);
  }

  //모든 포스트 가져오기
  const allPosts = await fetchNotionAllPosts();

  //카테고리 및 태그 필터링
  const filteredPosts = allPosts.filter(
    (post) =>
      post.category.toLowerCase() === category.toLowerCase() &&
      (!tag || post.tags?.includes(tag))
  );

  const title = tag
    ? `Posts tagged with: "${tag}"`
    : `Category: "${category.charAt(0).toUpperCase() + category.slice(1)}"`;

  return (
    <PostList
      title={title}
      initialPosts={filteredPosts}
      basePath={`/${category}`}
      noPostsMessage={
        tag
          ? `No posts found for tag: "${tag}"`
          : `No posts found for category: "${category}"`
      }
    />
  );
}
