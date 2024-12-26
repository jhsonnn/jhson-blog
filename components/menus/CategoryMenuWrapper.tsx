'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import CategoryMenu from './CategoryMenu';

type CategoryMenuWrapperProps = {
  categories: string[];
};

export default function CategoryMenuWrapper({
  categories,
}: CategoryMenuWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'all'
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams.toString());

    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <CategoryMenu
      categories={categories}
      selectedCategory={selectedCategory}
      onCategoryChange={handleCategoryChange}
    />
  );
}
