// components/ui/ConditionalSidebar.tsx
'use client';

import React from 'react';
import TagsMenu from './tagsMenu';
import Menu from './menu';
import Profile from './profile';

const ConditionalSidebar = ({ section }: { section: string }) => {
  if (section === 'tagsMenu') {
    return <TagsMenu />;
  }

  if (section === 'menu') {
    return <Menu />;
  }

  if (section === 'profile') {
    return <Profile />;
  }

  return null;
};

export default ConditionalSidebar;
