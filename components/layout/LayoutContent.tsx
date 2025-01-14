'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import TagsMenuWrapperClient from '@/components/menus/TagsMenuWrapperClient';
import Profile from '@/components/profile/Profile';
import { useState, useEffect } from 'react';

interface LayoutContentProps {
  children: React.ReactNode;
}

const LayoutContent = ({ children }: LayoutContentProps) => {
  const isPostPage = useSelector((state: RootState) => state.layout.isPostPage);
  const tags = useSelector((state: RootState) => state.layout.tags);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsLargeScreen(e.matches);
    };

    setIsLargeScreen(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  return (
    <div
      className={`w-full h-[calc(100vh-4rem)] flex ${
        isLargeScreen ? 'lg:gap-6 overflow-hidden' : 'flex-col'
      }`}
    >
      {/* 큰 화면: 왼쪽 태그 메뉴 */}
      {!isPostPage && isLargeScreen && (
        <aside className="hidden lg:block lg:w-1/5 lg:h-full sticky top-[4rem] overflow-hidden">
          {tags.length > 0 ? (
            <TagsMenuWrapperClient tags={tags} currentTag="all" />
          ) : (
            <div>Loading Tags...</div>
          )}
        </aside>
      )}

      {/* 메인 콘텐츠 */}
      <div
        className={`flex-1 h-full overflow-y-auto no-scrollbar ${
          isPostPage ? 'lg:max-w-4xl lg:mx-auto' : 'lg:mr-10'
        }`}
      >
        {children}
      </div>

      {/* 작은 화면: 카테고리 아래에 태그 메뉴 */}
      {!isPostPage && !isLargeScreen && (
        <div className="block lg:hidden mt-4">
          {tags.length > 0 ? (
            <TagsMenuWrapperClient tags={tags} currentTag="all" />
          ) : (
            <div>Loading Tags...</div>
          )}
        </div>
      )}

      {/* 오른쪽 프로필 (큰 화면에서만 표시) */}
      {!isPostPage && isLargeScreen && (
        <aside className="sticky top-[4rem] lg:w-1/5 lg:h-full overflow-hidden">
          <div className="h-full overflow-y-auto no-scrollbar">
            <Profile />
          </div>
        </aside>
      )}
    </div>
  );
};

export default LayoutContent;
