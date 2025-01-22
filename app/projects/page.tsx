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
//   const [categories, setCategories] = useState<string[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string>('all-posts');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadPosts = async () => {
//       try {
//         const allPosts = await fetchNotionAllPosts();
//         setPosts(allPosts);
//         setCategories([...new Set(allPosts.map((post) => post.category))]);
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
//     setSelectedCategory(category);
//     if (category === 'all-posts') {
//       setFilteredPosts(posts.filter((post) => post.category !== 'none'));
//     } else {
//       setFilteredPosts(posts.filter((post) => post.category === category));
//     }
//   };

//   if (loading) return <div className="text-center">Loading...</div>;

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <CategoryMenu
//         categories={categories}
//         selectedCategory={selectedCategory}
//         onCategoryChange={handleCategoryChange}
//       />
//       <h1 className="text-2xl font-bold mb-4 text-center">Projects</h1>
//       {filteredPosts.length > 0 ? (
//         <PostList title="" posts={filteredPosts} basePath="/projects" />
//       ) : (
//         <p className="text-center text-gray-600">No posts available.</p>
//       )}
//     </div>
//   );
// }
