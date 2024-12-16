// // components/ui/TagsMenu.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// const TagsMenu = () => {
//   const [tags, setTags] = useState<string[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const loadTags = async () => {
//       try {
//         const response = await fetch('/api/tags');

//         if (!response.ok) {
//           const errorText = await response.text();
//           console.error('Failed to fetch tags:', errorText);
//           throw new Error(`Failed to fetch tags: ${errorText}`);
//         }

//         const data: string[] = await response.json();

//         if (!data || data.length === 0) {
//           setError('No tags available.');
//           setTags([]);
//         } else {
//           setTags(data);
//         }
//       } catch (error: unknown) {
//         const errorMessage =
//           error instanceof Error ? error.message : 'Unknown error occurred';
//         console.error('Error loading tags:', errorMessage);
//         setError(errorMessage);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadTags();
//   }, []);

//   if (loading) {
//     return <div>Loading tags...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <nav>
//       <ul className="font-bold gap-5 flex flex-col sm:flex-row md:flex-row lg:flex-col lg:space-x-0 sm:space-x-4">
//         {tags.map((tag) => (
//           <li key={tag} className="hover:text-amber-400 cursor-pointer mb-1">
//             <Link href={`/tags/${tag}`}>{tag}</Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default TagsMenu;

/////
import Link from 'next/link';

const TagsMenu = async () => {
  try {
    // 환경 변수가 없을 경우 기본 URL 설정
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${API_URL}/api/tags`, { cache: 'no-store' });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch tags: ${errorText}`);
    }

    const tags: string[] = await response.json();

    if (!tags || tags.length === 0) {
      return <div>No tags available.</div>;
    }

    return (
      <nav>
        <ul className="font-bold gap-5 flex flex-col sm:flex-row md:flex-row lg:flex-col lg:space-x-0 sm:space-x-4">
          {tags.map((tag) => (
            <li key={tag} className="hover:text-amber-400 cursor-pointer mb-1">
              <Link href={`/tags/${tag}`}>{tag}</Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  } catch (error) {
    throw new Error(
      `TagsMenu error: ${
        error instanceof Error ? error.message : 'Unknown error occurred'
      }`
    );
  }
};

export default TagsMenu;
