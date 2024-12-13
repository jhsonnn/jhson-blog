// components/ui/TagsMenu.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const TagsMenu = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadTags = async () => {
      try {
        const response = await fetch('/api/tags');

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to fetch tags:', errorText);
          throw new Error(`Failed to fetch tags: ${errorText}`);
        }

        const data: string[] = await response.json();

        if (!data || data.length === 0) {
          setError('No tags available.');
          setTags([]);
        } else {
          setTags(data);
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('Error loading tags:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadTags();
  }, []);

  if (loading) {
    return <div>Loading tags...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
};

export default TagsMenu;
