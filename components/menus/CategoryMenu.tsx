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

// const CategoryMenu = () => {
//   const [categories, setCategories] = useState<string[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('/api/category', { cache: 'no-store' });
//         if (!response.ok) throw new Error('Failed to fetch categories');

//         const data: string[] = await response.json();
//         setCategories(data.filter((category) => category !== 'none'));
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Unknown error occurred');
//       }
//     };

//     fetchCategories();
//   }, []);

//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="w-36 max-w-xs">
//       <Select
//         onValueChange={(value) => {
//           if (value === 'projects') {
//             router.push('/projects'); // 명확한 projects 경로
//           } else {
//             router.push(`/${value}`); // 동적 카테고리 경로
//           }
//         }}
//       >
//         <SelectTrigger className="rounded-xl border-2 border-gray-300 text-left">
//           <SelectValue placeholder="All Posts" />
//         </SelectTrigger>
//         <SelectContent className="rounded-xl bg-white shadow-md">
//           <SelectItem key="projects" value="projects">
//             Projects
//           </SelectItem>
//           {categories.map((category) => (
//             <SelectItem key={category} value={category}>
//               {category}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// };

// export default CategoryMenu;

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

// const CategoryMenu = () => {
//   const [categories, setCategories] = useState<string[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('/api/category', { cache: 'no-store' });
//         if (!response.ok) throw new Error('Failed to fetch categories');

//         const data: string[] = await response.json();
//         setCategories(data.filter((category) => category !== 'none'));
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Unknown error occurred');
//       }
//     };

//     fetchCategories();
//   }, []);

//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="w-36 max-w-xs">
//       <Select
//         onValueChange={(value) => {
//           if (value === 'all-posts') {
//             router.push('/'); // '/' 경로로 이동
//           } else {
//             router.push(`/${value}`);
//           }
//         }}
//       >
//         <SelectTrigger className="rounded-xl border-2 border-gray-300 text-left">
//           <SelectValue placeholder="All Posts" />
//         </SelectTrigger>
//         <SelectContent className="rounded-xl bg-white shadow-md">
//           <SelectItem key="all-posts" value="all-posts">
//             All Posts
//           </SelectItem>
//           {categories.map((category) => (
//             <SelectItem key={category} value={category}>
//               {category}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// };

// export default CategoryMenu;

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

// const CategoryMenu = () => {
//   const [categories, setCategories] = useState<string[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('/api/category', { cache: 'no-store' });
//         if (!response.ok) throw new Error('Failed to fetch categories');

//         const data: string[] = await response.json();
//         setCategories(data.filter((category) => category !== 'none'));
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Unknown error occurred');
//       }
//     };

//     fetchCategories();
//   }, []);

//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="w-36 max-w-xs">
//       <Select
//         onValueChange={(value) => {
//           if (value === 'all-posts') {
//             router.push('/'); // '/' 경로로 이동
//           } else {
//             router.push(`/${value}`);
//           }
//         }}
//       >
//         <SelectTrigger className="rounded-xl border-2 border-gray-300 text-left">
//           <SelectValue placeholder="All Posts" />
//         </SelectTrigger>
//         <SelectContent className="rounded-xl bg-white shadow-md">
//           <SelectItem key="all-posts" value="all-posts">
//             All Posts
//           </SelectItem>
//           {categories.map((category) => (
//             <SelectItem key={category} value={category}>
//               {category}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// };

// export default CategoryMenu;

///good
// components/menus/CategoryMenu.tsx
// 'use client';

// type CategoryMenuProps = {
//   categories: string[];
// };

// export default function CategoryMenu({ categories }: CategoryMenuProps) {
//   return (
//     <div className="flex gap-2">
//       {categories.map((category) => (
//         <button
//           key={category}
//           className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//         >
//           {category}
//         </button>
//       ))}
//     </div>
//   );
// }

//테스트2
// 'use client';

// import { useRouter, useSearchParams } from 'next/navigation';

// type CategoryMenuProps = {
//   categories: string[];
// };

// export default function CategoryMenu({ categories }: CategoryMenuProps) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const handleCategoryClick = (category: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     if (category === 'all') {
//       params.delete('category');
//     } else {
//       params.set('category', category);
//     }
//     router.push(`/?${params.toString()}`); // URL 상태 업데이트
//   };

//   return (
//     <div className="">
//       <select
//         className="!bg-white px-3 py-2 rounded-xl text-gray-700 hover:!bg-gray-300 hover:!text-black focus:!bg-amber-400 focus:!rounded-xl"
//         onChange={(e) => handleCategoryClick(e.target.value)}
//         defaultValue={searchParams.get('category') || 'all'}
//       >
//         <option value="all">All Categories</option>
//         {categories.map((category) => (
//           <option
//             key={category}
//             value={category}
//             className="!bg-white px-3 py-2  text-gray-700 hover:!bg-gray-300 hover:!text-black focus:!bg-amber-400 focus:!rounded-xl"
//           >
//             {category}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

//테스트3
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

type CategoryMenuProps = {
  categories: string[];
};

export default function CategoryMenu({ categories }: CategoryMenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.push(`/?${params.toString()}`); // URL 상태 업데이트
  };

  return (
    <div>
      <select
        className="!bg-white px-3 py-2 rounded-xl text-gray-700 hover:!bg-gray-300 hover:!text-black focus:!bg-amber-400 focus:!rounded-xl"
        onChange={(e) => handleCategoryClick(e.target.value)}
        defaultValue={searchParams.get('category') || 'all'}
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option
            key={category}
            value={category}
            className="!bg-white px-3 py-2  text-gray-700 hover:!bg-gray-300 hover:!text-black focus:!bg-amber-400 focus:!rounded-xl"
          >
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
