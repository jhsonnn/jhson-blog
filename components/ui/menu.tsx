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

// // components/ui/menu.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';

const Menu = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
    <div className="w-36 max-w-xs">
      <Select onValueChange={(value) => router.push(`/${value}`)}>
        <SelectTrigger className="rounded-xl border-2 border-gray-300 text-left">
          <SelectValue placeholder="All Posts" className="font-bold text-xl" />
        </SelectTrigger>
        <SelectContent className="rounded-xl bg-white shadow-md">
          {categories.map((category) => (
            <SelectItem
              key={category}
              value={category}
              className="!bg-white px-3 py-2 text-gray-700 hover:!bg-gray-300 hover:!text-black focus:!bg-amber-400 focus:!rounded-xl focus:!text-black"
            >
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Menu;
