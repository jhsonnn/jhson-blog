'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Menu from '@/components/ui/menu';
import Profile from '@/components/ui/profile';

const ConditionalSidebar = () => {
  const pathname = usePathname();
  // '/[category]/[slug]'이면 header만 표시되도록
  const isPostPage = /^\/[^/]+\/[^/]+$/.test(pathname);

  if (isPostPage) return null;
  return (
    <>
      <aside className="order-1 lg:order-3 w-full lg:w-1/5">
        <Profile />
      </aside>
      <aside className="order-2 lg:order-1 w-full lg:w-1/5 lg:block">
        <Menu />
      </aside>
    </>
  );
};

export default ConditionalSidebar;
