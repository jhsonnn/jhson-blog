'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

type CategoryMenuProps = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export default function CategoryMenu({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryMenuProps) {
  return (
    <div className="w-36">
      <Select
        value={selectedCategory}
        onValueChange={(value) => onCategoryChange(value)}
      >
        {/* 트리거 버튼 */}
        <SelectTrigger className="!bg-amber-400 px-3 py-2 rounded-xl text-neutral-50 border border-neutral-200 hover:!text-neutral-50 focus:outline-none focus:ring-2 focus:ring-amber-400 font-bold">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>

        {/* 드롭다운 내용 */}
        <SelectContent className="rounded-xl bg-neutral-50 shadow-md">
          <SelectItem
            value="all"
            className={`px-3 py-2 rounded-full cursor-pointer font-medium transition bg-transparent hover:bg-amber-400 hover:text-neutral-50 hover:font-bold data-[highlighted]:bg-amber-400 data-[highlighted]:text-neutral-50 ${
              selectedCategory === 'all'
                ? 'bg-amber-400 text-neutral-50 font-bold'
                : 'font-normal'
            }`}
          >
            All Categories
          </SelectItem>
          {categories.map((category) => (
            <SelectItem
              key={category}
              value={category}
              className={`px-3 py-2 rounded-full cursor-pointer font-medium transition bg-transparent hover:bg-amber-400 hover:text-neutral-50 hover:font-bold data-[highlighted]:bg-amber-400 data-[highlighted]:text-neutral-50 ${
                selectedCategory === category
                  ? 'bg-amber-400 text-neutral-50 font-bold'
                  : 'font-normal'
              }`}
            >
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
