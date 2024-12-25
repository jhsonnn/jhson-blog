'use client';

import { useState, useEffect } from 'react';
import TagsMenu from './TagsMenu';

export default function TagsMenuWrapper() {
  const [tags, setTags] = useState<string[]>([]); // 태그 타입 명시
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const response = await fetch(`${API_URL}/api/tags`, {
          cache: 'no-store',
        });
        if (!response.ok) throw new Error('Failed to fetch tags');
        const data = (await response.json()) as string[]; // 데이터 타입 지정
        setTags(data.filter((tag: string) => tag !== 'none'));
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Failed to load tags'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  if (loading) return <div>Loading tags...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return <TagsMenu tags={tags} />;
}
