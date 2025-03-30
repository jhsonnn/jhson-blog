'use client';

import { useRouter } from 'next/navigation';
import TagsMenu from './TagsMenu';

type TagsMenuWrapperClientProps = {
  tags: string[];
  currentTag: string;
};

export default function TagsMenuWrapperClient({
  tags = [],
  currentTag,
}: TagsMenuWrapperClientProps) {
  const router = useRouter();

  const handleTagChange = (newTag: string) => {
    const params = new URLSearchParams(window.location.search);
    if (newTag === 'all') {
      params.delete('tag');
    } else {
      params.set('tag', newTag);
    }
    router.push(`/?${params.toString()}`);
  };

  if (tags.length === 0) {
    return <div>Loading Tags...</div>;
  }

  return <TagsMenu tags={tags} currentTag={currentTag} onTagChange={handleTagChange} />;
}
