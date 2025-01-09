'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TagsMenu from './TagsMenu';

export type TagsMenuWrapperProps = {
  tags: string[];
  currentTag: string;
};

export default function TagsMenuWrapper({
  tags,
  currentTag,
}: TagsMenuWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  //url에서 초기 태그 상태 설정
  const [selectedTag, setSelectedTag] = useState(currentTag || 'all');

  useEffect(() => {
    const tagFromURL = searchParams.get('tag') || 'all';
    setSelectedTag(tagFromURL); //url파라미터 기준으로 상태 설정
  }, [searchParams]);

  const handleTagChange = (newTag: string) => {
    setSelectedTag(newTag);

    const params = new URLSearchParams(window.location.search);
    if (newTag === 'all') {
      params.delete('tag');
    } else {
      params.set('tag', newTag);
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <TagsMenu
      tags={tags}
      currentTag={selectedTag}
      onTagChange={handleTagChange}
    />
  );
}
