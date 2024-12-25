// import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
// import Link from 'next/link';
// import Post from '@/components/posts/Post';

// export default async function ProjectsPage() {
//   // 모든 포스트 가져오기
//   const allPosts = await fetchNotionAllPosts();

//   // 'projects' 카테고리 필터링
//   const projectsPosts = allPosts.filter(
//     (post) => post.category.toLowerCase() === 'projects'
//   );

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h1 className="text-2xl font-bold mb-4 text-center">Projects</h1>
//       {projectsPosts.length > 0 ? (
//         <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {projectsPosts.map(
//             ({ id, slug, title, thumbnailUrl, created_time, tags }) => (
//               <li key={id} className="mb-4">
//                 <Link href={`/projects/${slug}`}>
//                   <Post
//                     title={title}
//                     slug={slug}
//                     date={created_time}
//                     thumbnailUrl={thumbnailUrl || '/default-thumbnail.png'}
//                     category="projects"
//                     tags={tags}
//                   />
//                 </Link>
//               </li>
//             )
//           )}
//         </ul>
//       ) : (
//         <p className="text-center text-gray-600">No projects available.</p>
//       )}
//     </div>
//   );
// }

// import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
// import PostList from '@/components/posts/PostList';

// export default async function ProjectsPage() {
//   // 모든 포스트 가져오기
//   const allPosts = await fetchNotionAllPosts();

//   // 'projects' 카테고리 필터링
//   const projectsPosts = allPosts.filter(
//     (post) => post.category.toLowerCase() === 'projects'
//   );

//   return (
//     <PostList
//       title="Projects"
//       posts={projectsPosts}
//       basePath="/projects"
//       noPostsMessage="No projects available."
//     />
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
// import PostList from '@/components/posts/PostList';
// import CategoryMenu from '@/components/menus/CategoryMenu';

// type PostType = {
//   id: string;
//   title: string;
//   slug: string;
//   category: string;
//   tags: string[];
//   created_time: string;
//   thumbnailUrl: string;
// };

// export default function ProjectsPage() {
//   const [posts, setPosts] = useState<PostType[]>([]);
//   const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadPosts = async () => {
//       try {
//         const allPosts = await fetchNotionAllPosts();
//         setPosts(allPosts); // 모든 게시물 로드
//         setFilteredPosts(
//           allPosts.filter((post) => post.category === 'projects')
//         );
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPosts();
//   }, []);

//   const handleCategoryChange = (category: string) => {
//     if (category === 'all-posts') {
//       setFilteredPosts(posts.filter((post) => post.category !== 'none')); // 'none' 제외
//     } else {
//       setFilteredPosts(posts.filter((post) => post.category === category));
//     }
//   };

//   if (loading) return <div className="text-center">Loading...</div>;

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <CategoryMenu onCategoryChange={handleCategoryChange} />
//       <h1 className="text-2xl font-bold mb-4 text-center">Projects</h1>
//       {filteredPosts.length > 0 ? (
//         <PostList title="" posts={filteredPosts} basePath="/projects" />
//       ) : (
//         <p className="text-center text-gray-600">No posts available.</p>
//       )}
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
import PostList from '@/components/posts/PostList';
import CategoryMenu from '@/components/menus/CategoryMenu';

type PostType = {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  created_time: string;
  thumbnailUrl: string;
};

export default function ProjectsPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await fetchNotionAllPosts();
        setPosts(allPosts);
        setFilteredPosts(
          allPosts.filter((post) => post.category === 'projects')
        );
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleCategoryChange = (category: string) => {
    if (category === 'all-posts') {
      setFilteredPosts(posts.filter((post) => post.category !== 'none'));
    } else {
      setFilteredPosts(posts.filter((post) => post.category === category));
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <CategoryMenu onCategoryChange={handleCategoryChange} />
      <h1 className="text-2xl font-bold mb-4 text-center">Projects</h1>
      {filteredPosts.length > 0 ? (
        <PostList title="" posts={filteredPosts} basePath="/projects" />
      ) : (
        <p className="text-center text-gray-600">No posts available.</p>
      )}
    </div>
  );
}
