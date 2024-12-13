// import { fetchNotionDatabaseByCategory } from '@/lib/notion/api/fetchNotionDatabaseByCategory';
// import Link from 'next/link';
// import Post from '@/components/ui/Post';
// import { fetchNotionCategories } from '@/lib/notion/fetchNotionCategories';
// import { redirect } from 'next/navigation';

// export default async function CategoryPage({
//   params,
// }: {
//   params: { category: string };
// }) {
//   const { category } = params;

//   const posts = await fetchNotionDatabaseByCategory(category);

//   ///resume -> /resume/resume로 리디렉트
//   if (category.toLowerCase() === 'resume') {
//     redirect(`/${category}/${category}`);
//   }

//   if (posts.length === 0) {
//     return <div>No posts found for category: {category}</div>;
//   }

//   return (
//     <div>
//       <ul>
//         {posts.map(({ id, slug, title, thumbnailUrl, created_time }) => (
//           <li key={id}>
//             <Link href={`/${category}/${slug}`}>
//               <Post
//                 title={title}
//                 slug={slug}
//                 date={created_time}
//                 thumbnailUrl={thumbnailUrl}
//                 category={category}
//               />
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export async function generateStaticParams() {
//   const categories = await fetchNotionCategories();
//   return categories.map((category) => ({ category }));
// }

import { fetchNotionDatabaseByCategory } from '@/lib/notion/api/fetchNotionDatabaseByCategory';
import Link from 'next/link';
import Post from '@/components/ui/Post';
import { fetchNotionCategories } from '@/lib/notion/fetchNotionCategories';
import { redirect } from 'next/navigation';

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;

  if (category.toLowerCase() === 'resume') {
    redirect(`/${category}/${category}`);
  }

  const posts = await fetchNotionDatabaseByCategory(category);

  if (!posts || posts.length === 0) {
    return <div>No posts found for category: {category}</div>;
  }

  return (
    <div>
      <ul>
        {posts.map(
          ({ id, slug, title, thumbnailUrl, created_time, category, tags }) => (
            <li key={id}>
              <Link href={`/${category}/${slug}`}>
                <Post
                  title={title}
                  slug={slug}
                  date={created_time}
                  thumbnailUrl={thumbnailUrl}
                  category={category}
                  tags={tags}
                />
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export async function generateStaticParams() {
  const categories = await fetchNotionCategories();
  return categories.map((category) => ({ category }));
}
