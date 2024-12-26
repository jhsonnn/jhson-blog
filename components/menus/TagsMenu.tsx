'use client';

import { useRouter, useSearchParams } from 'next/navigation';

type TagsMenuProps = {
  tags: string[];
};

export default function TagsMenu({ tags }: TagsMenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tag === 'all') {
      params.delete('tag');
    } else {
      params.set('tag', tag);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="font-bold flex flex-wrap gap-3 lg:flex-col sm:flex-row md:flex-row justify-start items-start">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`px-3 py-1 rounded-full cursor-pointer font-medium transition ${
            searchParams.get('tag') === tag
              ? 'bg-amber-400 text-neutral-50 font-bold' //선택된 태그 스타일
              : 'hover:bg-amber-400 hover:text-neutral-50 bg-transparent text-neutral-700'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
