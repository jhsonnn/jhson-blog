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

// components/ui/menu.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const Menu = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch('/api/category');

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to fetch categories:', errorText);
          throw new Error(`Failed to fetch categories: ${errorText}`);
        }

        const data: string[] = await response.json();

        if (!data || data.length === 0) {
          setError('No categories available.');
          setCategories([]);
        } else {
          setCategories(data);
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('Error loading categories:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return <div>Loading categories...</div>;
  }

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
            <Link href={`/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
