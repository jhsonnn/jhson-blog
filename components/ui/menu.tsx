// import React from 'react';

// const Menu = () => {
//   return (
//     <div>
//       <ul className="font-bold flex flex-col sm:flex-row md:flex-row lg:flex-col lg:space-x-0 sm:space-x-4">
//         <li className="hover:text-blue-400 cursor-pointer mb-1">
//           <a href="/resume">Resume</a>
//         </li>
//         <li className="hover:text-blue-400 cursor-pointer">
//           <a href="/projects">Projects</a>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Menu;

// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// const Menu = () => {
//   const [categories, setCategories] = useState<string[]>([
//     'projects',
//     'resume',
//   ]);

//   useEffect(() => {
//     // Fetch categories dynamically (optional)
//     const loadCategories = async () => {
//       const fetchedCategories = ['projects', 'resume'];
//       setCategories(fetchedCategories);
//     };
//     loadCategories();
//   }, []);

//   return (
//     <nav>
//       <ul className="font-bold flex flex-col sm:flex-row md:flex-row lg:flex-col lg:space-x-0 sm:space-x-4">
//         {categories.map((category) => (
//           <li
//             key={category}
//             className="hover:text-blue-400 cursor-pointer mb-1"
//           >
//             <Link href={`/${category}`}>{category}</Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Menu;

// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// const Menu = () => {
//   const [categories, setCategories] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadCategories = async () => {
//       setLoading(true); // 로딩 상태 시작
//       setError(null); // 에러 상태 초기화

//       try {
//         const response = await fetch('/api/categories');
//         if (!response.ok) {
//           throw new Error(`Failed to fetch categories: ${response.statusText}`);
//         }
//         const fetchedCategories: string[] = await response.json();
//         setCategories(fetchedCategories);
//       } catch (err) {
//         console.error('Error loading categories:', err);
//         setError('Failed to load categories. Please try again later.');
//       } finally {
//         setLoading(false); // 로딩 상태 종료
//       }
//     };

//     loadCategories();
//   }, []);

//   if (loading) {
//     return <p>Loading categories...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500">{error}</p>; // 에러 메시지 표시
//   }

//   return (
//     <nav>
//       <ul className="font-bold flex flex-col sm:flex-row md:flex-row lg:flex-col lg:space-x-0 sm:space-x-4">
//         {categories.map((category) => (
//           <li
//             key={category}
//             className="hover:text-blue-400 cursor-pointer mb-1"
//           >
//             <Link href={`/${category}`}>
//               <a>{category}</a>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Menu;

//////////

// // src/components/Menu.tsx
// 'use client';
// import { useEffect, useState } from 'react';

// const Menu = () => {
//   const [categories, setCategories] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // useEffect(() => {
//   //   const loadCategories = async () => {
//   //     setLoading(true);
//   //     setError(null);

//   //     try {
//   //       const response = await fetch('/api/category?category=someCategory');
//   //       console.log('[Client] API Response Status:', response.status);

//   //       const textResponse = await response.text();
//   //       console.log('[Client] API Response Text:', textResponse);

//   //       if (!response.ok) {
//   //         throw new Error(`Failed to fetch categories: ${response.statusText}`);
//   //       }

//   //       const fetchedCategories: string[] = JSON.parse(textResponse);
//   //       console.log('[Client] Fetched Categories:', fetchedCategories);

//   //       setCategories(fetchedCategories);
//   //     } catch (err) {
//   //       console.error('[Client] Error loading categories:', err);
//   //       setError('Failed to load categories. Please try again later.');
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   loadCategories();
//   // }, []);

//   // src/components/Menu.tsx
//   useEffect(() => {
//     const loadCategories = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await fetch('/api/category?category=someCategory');
//         console.log('[Client] API Response Status:', response.status);

//         // 응답의 Content-Type 확인
//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           throw new Error('Invalid response format. Expected JSON.');
//         }

//         const data = await response.json();
//         console.log('[Client] Fetched Categories:', data);

//         setCategories(data);
//       } catch (err) {
//         console.error('[Client] Error loading categories:', err);
//         setError('Failed to load categories. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCategories();
//   }, []);

//   if (loading) return <p>Loading categories...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <nav>
//       <ul>
//         {categories.map((category) => (
//           <li key={category}>{category}</li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// // export default Menu;
// 'use client';
// import { useEffect, useState } from 'react';

// // Notion API 데이터 타입 정의
// interface NotionProperty {
//   title: {
//     title: { text: { content: string } }[];
//   };
// }

// interface NotionItem {
//   properties: NotionProperty;
// }

// const Menu = () => {
//   const [categories, setCategories] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadCategories = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await fetch('/api/category'); // 원하는 카테고리
//         if (!response.ok) {
//           throw new Error(`Failed to fetch categories: ${response.statusText}`);
//         }

//         // NotionItem 배열로 API 응답 타입 지정
//         const fetchedCategories: NotionItem[] = await response.json();

//         // 카테고리 이름 추출
//         const categoryTitles = fetchedCategories.map(
//           (item) => item.properties.title.title[0]?.text?.content || 'Unknown'
//         );

//         setCategories(categoryTitles);
//       } catch (err) {
//         console.error('[Client] Error loading categories:', err);
//         setError('Failed to load categories. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCategories();
//   }, []);

//   if (loading) return <p>Loading categories...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <nav>
//       <ul>
//         {categories.map((category) => (
//           <li key={category}>{category}</li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Menu;

///
// components/ui/Menu.tsx
// 'use client';

// import { useEffect, useState } from 'react';

// const Menu = () => {
//   const [categories, setCategories] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const response = await fetch('/api/category');
//         console.log(`[Menu] API response status: ${response.status}`);
//         if (!response.ok) {
//           const errorText = await response.text();
//           console.error(`[Menu] API Error: ${response.status} - ${errorText}`);
//           throw new Error(
//             `Failed to fetch categories. Server responded with: ${errorText}`
//           );
//         }
//         const data = await response.json();
//         console.log('[Menu] Fetched categories:', data);
//         setCategories(data);
//       } catch (error) {
//         const errorMessage =
//           error instanceof Error ? error.message : 'Unknown error';
//         console.error('[Menu] Error loading categories:', errorMessage);
//         setError(errorMessage);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCategories();
//   }, []);

//   if (loading) {
//     return <p>Loading categories...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500">{error}</p>;
//   }

//   return (
//     <nav>
//       <ul>
//         {categories.map((category) => (
//           <li key={category}>{category}</li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Menu;

//진행중2
// 'use client';

// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// const Menu = () => {
//   const [categories, setCategories] = useState<string[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const response = await fetch('/api/category');

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Failed to fetch categories: ${errorText}`);
//         }

//         // const contentType = response.headers.get('content-type');
//         // if (!contentType || !contentType.includes('application/json')) {
//         //   throw new Error('API did not return JSON');
//         // }

//         const data = await response.json();
//         console.log('[Menu] Fetched categories:', data);
//         setCategories(data);
//       } catch (err) {
//         const errorMessage =
//           err instanceof Error ? err.message : 'Unknown error occurred';
//         console.error('[Menu] Error loading categories:', errorMessage);
//         setError(errorMessage);
//       }
//     };

//     loadCategories();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <nav>
//       <ul className="font-bold flex flex-col sm:flex-row md:flex-row lg:flex-col lg:space-x-0 sm:space-x-4">
//         {categories.map((category) => (
//           <li
//             key={category}
//             className="hover:text-blue-400 cursor-pointer mb-1"
//           >
//             <Link href={`/${category}`}>{category}</Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Menu;

///////
// 'use client';

// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// const Menu = () => {
//   const [categories, setCategories] = useState<string[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const response = await fetch('/api/category');

//         if (!response.ok) {
//           const errorData = await response.json(); // JSON 오류 세부정보 읽기
//           throw new Error(
//             `Failed to fetch categories: ${
//               errorData.details || 'Unknown error'
//             }`
//           );
//         }

//         const data = await response.json();
//         console.log('[Menu] Fetched categories:', data);
//         setCategories(data);
//       } catch (err) {
//         const errorMessage =
//           err instanceof Error ? err.message : 'Unknown error occurred';
//         console.error('[Menu] Error loading categories:', errorMessage);
//         setError(errorMessage);
//       }
//     };

//     loadCategories();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <nav>
//       <ul className="font-bold flex flex-col sm:flex-row md:flex-row lg:flex-col lg:space-x-0 sm:space-x-4">
//         {categories.map((category) => (
//           <li
//             key={category}
//             className="hover:text-blue-400 cursor-pointer mb-1"
//           >
//             <Link href={`/${category}`}>{category}</Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Menu;

// 'use client';

// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// const Menu = () => {
//   const [categories, setCategories] = useState<string[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const response = await fetch('/api/category');

//         // JSON 형식 응답인지 확인
//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           throw new Error('API did not return JSON');
//         }

//         const data = await response.json();
//         setCategories(data);
//       } catch (err) {
//         const errorMessage =
//           err instanceof Error ? err.message : 'Unknown error occurred';
//         console.error('[Menu] Error loading categories:', errorMessage);
//         setError(errorMessage);
//       }
//     };

//     loadCategories();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <nav>
//       <ul>
//         {categories.map((category) => (
//           <li key={category}>
//             <Link href={`/${category}`}>{category}</Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Menu;

// 'use client';

// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// const Menu = () => {
//   const [categories, setCategories] = useState<string[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const response = await fetch('/api/category');

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Failed to fetch categories: ${errorText}`);
//         }

//         const data = await response.json();
//         console.log('[Menu] Fetched categories:', data);
//         setCategories(data);
//       } catch (err) {
//         const errorMessage =
//           err instanceof Error ? err.message : 'Unknown error occurred';
//         console.error('[Menu] Error loading categories:', errorMessage);
//         setError(errorMessage);
//       }
//     };

//     loadCategories();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <nav>
//       <ul>
//         {categories.map((category) => (
//           <li key={category}>
//             <Link href={`/${category}`}>{category}</Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Menu;

// //최종진행중
// 'use client';

// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// const Menu = () => {
//   const [categories, setCategories] = useState<string[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const response = await fetch('/api/category');

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Failed to fetch categories: ${errorText}`);
//         }

//         const data = await response.json();
//         console.log('[Menu] Fetched categories:', data);
//         setCategories(data);
//       } catch (err) {
//         const errorMessage =
//           err instanceof Error ? err.message : 'Unknown error occurred';
//         console.error('[Menu] Error loading categories:', errorMessage);
//         setError(errorMessage);
//       }
//     };

//     loadCategories();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <nav>
//       <ul className="font-bold flex flex-col sm:flex-row md:flex-row lg:flex-col lg:space-x-0 sm:space-x-4">
//         {categories.map((category) => (
//           <li
//             key={category}
//             className="hover:text-blue-400 cursor-pointer mb-1"
//           >
//             <Link href={`/${category}`}>{category}</Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Menu;
// 'use client';

// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// const Menu = () => {
//   const [categories, setCategories] = useState<string[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     console.log('NOTION_API_KEY:', process.env.NOTION_API_KEY);
//     console.log('NOTION_DATABASE_ID:', process.env.NOTION_DATABASE_ID);

//     const loadCategories = async () => {
//       try {
//         const response = await fetch('/api/category');

//         console.log('[DEBUG] API Response:', response);

//         if (!response.ok) {
//           const errorText = await response.text();
//           console.error('[Menu] API Error:', errorText);
//           throw new Error(`Failed to fetch categories: ${errorText}`);
//         }

//         const data = await response.json();
//         console.log('[Menu] Fetched categories:', data);
//         setCategories(data);
//       } catch (err: unknown) {
//         const errorMessage =
//           err instanceof Error ? err.message : 'Unknown error occurred';
//         console.error('[Menu] Error loading categories:', errorMessage);
//         setError(errorMessage);
//       }
//     };

//     loadCategories();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <nav>
//       <ul className="font-bold flex flex-col sm:flex-row md:flex-row lg:flex-col lg:space-x-0 sm:space-x-4">
//         {categories.map((category) => (
//           <li
//             key={category}
//             className="hover:text-blue-400 cursor-pointer mb-1"
//           >
//             <Link href={`/${category}`}>{category}</Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Menu;

// 'use client';

// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// type Post = {
//   id: string;
//   title: string;
// };

// const Menu = () => {
//   const [categories, setCategories] = useState<string[]>([]);
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const response = await fetch('/api/category');
//         console.log('Post:', response);
//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Failed to fetch categories: ${errorText}`);
//         }

//         const data: string[] = await response.json();
//         setCategories(data);
//       } catch (err: unknown) {
//         const errorMessage =
//           err instanceof Error ? err.message : 'Unknown error occurred';
//         console.error('[Menu] Error loading categories:', errorMessage);
//         setError(errorMessage);
//       }
//     };

//     loadCategories();
//   }, []);

//   const loadPosts = async (category: string) => {
//     try {
//       const response = await fetch(
//         `/api/posts?category=${encodeURIComponent(category)}`
//       );

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Failed to fetch posts: ${errorText}`);
//       }

//       const data: Post[] = await response.json();
//       setPosts(data);
//       setSelectedCategory(category);
//     } catch (err: unknown) {
//       const errorMessage =
//         err instanceof Error ? err.message : 'Unknown error occurred';
//       console.error('[Menu] Error loading posts:', errorMessage);
//       setError(errorMessage);
//     }
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <nav>
//         <ul className="font-bold flex flex-col sm:flex-row md:flex-row lg:flex-col lg:space-x-0 sm:space-x-4">
//           {categories.map((category) => (
//             <li
//               key={category}
//               className="hover:text-blue-400 cursor-pointer mb-1"
//               onClick={() => loadPosts(category)}
//             >
//               {category}
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {selectedCategory && (
//         <div>
//           <h2>{selectedCategory}</h2>
//           <ul>
//             {posts.map((post) => (
//               <li key={post.id}>
//                 <Link href={`/${post.title}`}>{post.title}</Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Menu;

// ///
// 'use client';

// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// const Menu = () => {
//   const [categories, setCategories] = useState<string[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const response = await fetch('/api/category');

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Failed to fetch categories: ${errorText}`);
//         }

//         const data: string[] = await response.json();
//         setCategories(data);
//       } catch (err: unknown) {
//         const errorMessage =
//           err instanceof Error ? err.message : 'Unknown error occurred';
//         console.error('[Menu] Error loading categories:', errorMessage);
//         setError(errorMessage);
//       }
//     };

//     loadCategories();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <nav>
//       <ul className="font-bold flex flex-col sm:flex-row md:flex-row lg:flex-col lg:space-x-0 sm:space-x-4">
//         {categories.map((category) => (
//           <li
//             key={category}
//             className="hover:text-blue-400 cursor-pointer mb-1"
//           >
//             {/* 카테고리 클릭 시 해당 카테고리 동적 라우트로 이동 */}
//             <Link href={`/${category}`}>{category}</Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Menu;

///
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const Menu = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch('/api/category');

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch categories: ${errorText}`);
        }

        const data: string[] = await response.json();
        setCategories(data);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error occurred';
        console.error('[Menu] Error loading categories:', errorMessage);
        setError(errorMessage);
      }
    };

    loadCategories();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <nav>
      <ul className="font-bold flex flex-col sm:flex-row md:flex-row lg:flex-col lg:space-x-0 sm:space-x-4">
        {categories.map((category) => (
          <li
            key={category}
            className="hover:text-blue-400 cursor-pointer mb-1"
          >
            {/* 카테고리 클릭 시 해당 카테고리 동적 라우트로 이동 */}
            <Link href={`/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
