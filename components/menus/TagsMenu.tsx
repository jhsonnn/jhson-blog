'use client';

type TagsMenuProps = {
  tags: string[];
  currentTag: string;
  onTagChange: (tag: string) => void;
};

export default function TagsMenu({
  tags,
  currentTag,
  onTagChange,
}: TagsMenuProps) {
  return (
    <div className="font-bold flex flex-wrap gap-3 lg:flex-col sm:flex-row justify-start items-start">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(tag)}
          className={`px-3 py-1 rounded-full cursor-pointer font-medium transition ${
            currentTag === tag
              ? 'bg-amber-400 text-neutral-50 font-bold'
              : 'hover:bg-amber-400 hover:text-neutral-50 bg-transparent'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
