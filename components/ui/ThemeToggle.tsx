'use client';

import React from 'react';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // 테마가 초기화되기 전에는 아무것도 렌더링하지 않음
  if (!resolvedTheme) {
    return null; // 초기 상태가 확인되기 전에는 렌더링 차단
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
