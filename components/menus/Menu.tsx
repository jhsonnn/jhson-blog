// //   // src/components/Menu.tsx
// //   useEffect(() => {
// //     const loadCategories = async () => {
// //       setLoading(true);
// //       setError(null);

// //       try {
// //         const response = await fetch('/api/category?category=someCategory');
// //         console.log('[Client] API Response Status:', response.status);

// //         // 응답의 Content-Type 확인
// //         const contentType = response.headers.get('content-type');
// //         if (!contentType || !contentType.includes('application/json')) {
// //           throw new Error('Invalid response format. Expected JSON.');
// //         }

// //         const data = await response.json();
// //         console.log('[Client] Fetched Categories:', data);

// //         setCategories(data);
// //       } catch (err) {
// //         console.error('[Client] Error loading categories:', err);
// //         setError('Failed to load categories. Please try again later.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadCategories();
// //   }, []);

// //   if (loading) return <p>Loading categories...</p>;
// //   if (error) return <p className="text-red-500">{error}</p>;

// //   return (
// //     <nav>
// //       <ul>
// //         {categories.map((category) => (
// //           <li key={category}>{category}</li>
// //         ))}
// //       </ul>
// //     </nav>
// //   );
// // };

// // // export default Menu;

// // // // components/ui/menu.tsx
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from '@/components/ui/select';
// // import { useRouter } from 'next/navigation';

// // const Menu = () => {
// //   const [categories, setCategories] = useState<string[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const router = useRouter();

// //   useEffect(() => {
// //     const loadCategories = async () => {
// //       try {
// //         const response = await fetch('/api/category');

// //         if (!response.ok) {
// //           const errorText = await response.text();
// //           console.error('Failed to fetch categories:', errorText);
// //           throw new Error(`Failed to fetch categories: ${errorText}`);
// //         }

// //         const data: string[] = await response.json();

// //         if (!data || data.length === 0) {
// //           setError('No categories available.');
// //           setCategories([]);
// //         } else {
// //           setCategories(data);
// //         }
// //       } catch (error: unknown) {
// //         const errorMessage =
// //           error instanceof Error ? error.message : 'Unknown error occurred';
// //         console.error('Error loading categories:', errorMessage);
// //         setError(errorMessage);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadCategories();
// //   }, []);

// //   if (loading) {
// //     return <div>Loading categories...</div>;
// //   }

// //   if (error) {
// //     return <div>Error: {error}</div>;
// //   }

// //   return (
// //     <div className="w-36 max-w-xs">
// //       <Select onValueChange={(value) => router.push(`/${value}`)}>
// //         <SelectTrigger className="rounded-xl border-2 border-gray-300 text-left">
// //           <SelectValue placeholder="All Posts" className="font-bold text-xl" />
// //         </SelectTrigger>
// //         <SelectContent className="rounded-xl bg-white shadow-md">
// //           {categories.map((category) => (
// //             <SelectItem
// //               key={category}
// //               value={category}
// //               className="!bg-white px-3 py-2 text-gray-700 hover:!bg-gray-300 hover:!text-black focus:!bg-amber-400 focus:!rounded-xl focus:!text-black"
// //             >
// //               {category}
// //             </SelectItem>
// //           ))}
// //         </SelectContent>
// //       </Select>
// //     </div>
// //   );
// // };

// // export default Menu;

// /////
// // components/ui/Menu.tsx
// // 'use client'; // 클라이언트 컴포넌트로 전환

// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from '@/components/ui/select';
// // import { useState, useEffect } from 'react';

// // const Menu = () => {
// //   const [categories, setCategories] = useState<string[]>([]);
// //   const [error, setError] = useState<string | null>(null);
// //   const [loading, setLoading] = useState<boolean>(true);

// //   useEffect(() => {
// //     const loadCategories = async () => {
// //       try {
// //         const API_URL =
// //           process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
// //         const response = await fetch(`${API_URL}/api/category`, {
// //           cache: 'no-store',
// //         });

// //         if (!response.ok) {
// //           const errorText = await response.text();
// //           throw new Error(`Failed to fetch categories: ${errorText}`);
// //         }

// //         const data: string[] = await response.json();

// //         if (!data || data.length === 0) {
// //           setError('No categories available.');
// //           setCategories([]);
// //         } else {
// //           setCategories(data);
// //         }
// //       } catch (error) {
// //         setError(
// //           error instanceof Error ? error.message : 'Unknown error occurred'
// //         );
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadCategories();
// //   }, []);

// //   if (loading) {
// //     return <div>Loading categories...</div>;
// //   }

// //   if (error) {
// //     return <div>Error: {error}</div>;
// //   }

// //   return (
// //     <div className="w-36 max-w-xs">
// //       <Select onValueChange={(value) => (window.location.href = `/${value}`)}>
// //         <SelectTrigger className="rounded-xl border-2 border-gray-300 text-left">
// //           <SelectValue placeholder="All Posts" className="font-bold text-xl" />
// //         </SelectTrigger>
// //         <SelectContent className="rounded-xl bg-white shadow-md">
// //           {categories.map((category) => (
// //             <SelectItem
// //               key={category}
// //               value={category}
// //               className="!bg-white px-3 py-2 text-gray-700 hover:!bg-gray-300 hover:!text-black focus:!bg-amber-400 focus:!rounded-xl focus:!text-black"
// //             >
// //               {category}
// //             </SelectItem>
// //           ))}
// //         </SelectContent>
// //       </Select>
// //     </div>
// //   );
// // };

// // export default Menu;

// // /////
// // 'use client'; // 클라이언트 컴포넌트로 전환

// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from '@/components/ui/select';
// // import { useState, useEffect } from 'react';

// // const Menu = () => {
// //   const [categories, setCategories] = useState<string[]>([]);
// //   const [error, setError] = useState<string | null>(null);
// //   const [loading, setLoading] = useState<boolean>(true);

// //   useEffect(() => {
// //     const loadCategories = async () => {
// //       try {
// //         const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
// //         const response = await fetch(`${API_URL}/api/category`, {
// //           cache: 'no-store',
// //         });

// //         if (!response.ok) {
// //           const errorText = await response.text();
// //           throw new Error(`Failed to fetch categories: ${errorText}`);
// //         }

// //         const data: string[] = await response.json();

// //         if (!data || data.length === 0) {
// //           setError('No categories available.');
// //           setCategories([]);
// //         } else {
// //           setCategories(data);
// //         }
// //       } catch (error) {
// //         setError(
// //           error instanceof Error ? error.message : 'Unknown error occurred'
// //         );
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadCategories();
// //   }, []);

// //   if (loading) {
// //     return <div>Loading categories...</div>;
// //   }

// //   if (error) {
// //     return <div>Error: {error}</div>;
// //   }

// //   return (
// //     <div className="w-36 max-w-xs">
// //       <Select onValueChange={(value) => (window.location.href = `/${value}`)}>
// //         <SelectTrigger className="rounded-xl border-2 border-gray-300 text-left">
// //           <SelectValue placeholder="All Posts" className="font-bold text-xl" />
// //         </SelectTrigger>
// //         <SelectContent className="rounded-xl bg-white shadow-md">
// //           {/* All Posts 옵션 추가 */}
// //           <SelectItem
// //             key="all-posts"
// //             value="all-posts"
// //             className="!bg-white px-3 py-2 text-gray-700 hover:!bg-gray-300 hover:!text-black focus:!bg-amber-400 focus:!rounded-xl focus:!text-black"
// //           >
// //             All Posts
// //           </SelectItem>

// //           {/* 동적으로 불러온 카테고리 */}
// //           {categories.map((category) => (
// //             <SelectItem
// //               key={category}
// //               value={category}
// //               className="!bg-white px-3 py-2 text-gray-700 hover:!bg-gray-300 hover:!text-black focus:!bg-amber-400 focus:!rounded-xl focus:!text-black"
// //             >
// //               {category}
// //             </SelectItem>
// //           ))}
// //         </SelectContent>
// //       </Select>
// //     </div>
// //   );
// // };

// // export default Menu;

// //test

// // 카테고리 기반 필터링 메뉴
// 'use client';

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const Menu = () => {
//   const [categories, setCategories] = useState<string[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const router = useRouter();

//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const API_URL =
//           process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
//         const response = await fetch(`${API_URL}/api/category`, {
//           cache: 'no-store',
//         });

//         if (!response.ok) throw new Error('Failed to fetch categories');
//         const data: string[] = await response.json();
//         setCategories(data.filter((category) => category !== 'none')); // 'none' 제외
//       } catch (error) {
//         setError(
//           error instanceof Error ? error.message : 'Unknown error occurred'
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCategories();
//   }, []);

//   if (loading) return <div>Loading categories...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="w-36 max-w-xs">
//       <Select
//         onValueChange={(value) => {
//           if (value === 'all-posts') {
//             router.push('/projects'); // All Posts
//           } else if (value === 'resume') {
//             window.location.href = '/resume'; //resume 리다이렉트
//           } else {
//             router.push(`/${value}`); //특정 카테고리 이동
//           }
//         }}
//       >
//         <SelectTrigger className="rounded-xl border-2 border-gray-300 text-left">
//           <SelectValue placeholder="All Posts" />
//         </SelectTrigger>
//         <SelectContent className="rounded-xl bg-white shadow-md">
//           <SelectItem
//             key="all-posts"
//             value="all-posts"
//             className="!bg-white px-3 py-2 text-gray-700 hover:!bg-gray-300 hover:!text-black focus:!bg-amber-400 focus:!rounded-xl"
//           >
//             All Posts
//           </SelectItem>
//           {categories.map((category) => (
//             <SelectItem
//               key={category}
//               value={category}
//               className="!bg-white px-3 py-2 text-gray-700 hover:!bg-gray-300 hover:!text-black focus:!bg-amber-400 focus:!rounded-xl"
//             >
//               {category}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// };

// export default Menu;

//TODO: 테스트
