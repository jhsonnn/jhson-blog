'use client';

import { useState, useEffect } from 'react';
import CategoryMenu from './CategoryMenu';

export default function CategoryMenuWrapper() {
  const [categories, setCategories] = useState<string[]>([]); // 카테고리 타입 명시
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const response = await fetch(`${API_URL}/api/categories`, {
          cache: 'no-store',
        });
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = (await response.json()) as string[]; // 데이터 타입 지정
        setCategories(data.filter((category: string) => category !== 'none'));
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Failed to load categories'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return <CategoryMenu categories={categories} />;
}
