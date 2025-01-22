// 'use client';

// import { Post } from '@/lib/notion/types';
// import { useState, useMemo } from 'react';


// export function useSearchLogic(posts: Post[], category: string, tag: string) {
//   const [searchKeyword, setSearchKeyword] = useState('');

//   const filteredPosts = useMemo(() => {
//     return posts.filter((post) => {
//       if (category !== 'all' && post.category !== category) return false;
//       if (tag !== 'all' && !post.tags.includes(tag)) return false;
//       if (searchKeyword && !post.title.toLowerCase().includes(searchKeyword.toLowerCase())) return false;
//       return true;
//     });
//   }, [posts, category, tag, searchKeyword]);

//   return { searchKeyword, setSearchKeyword, filteredPosts };
// }
