'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CategoryMenu from './CategoryMenu';

type CategoryMenuWrapperProps = {
  categories: string[];
  currentCategory: string;
};

export default function CategoryMenuWrapper({
  categories,
  currentCategory,
}: CategoryMenuWrapperProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    const params = new URLSearchParams(window.location.search);
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
