'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const { theme: _unusedTheme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); //컴포넌트가 클라이언트에서 마운트된 후 렌더링 허용
  }, []);

  if (!mounted || !resolvedTheme) {
    return null;
  }

  const isDarkMode = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
      aria-pressed={isDarkMode}
      className={`relative w-16 h-8 rounded-full flex items-center cursor-pointer transition-colors duration-300 ${
        isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'
      }`}
    >
      <div
        className={`absolute top-1 left-1 w-5 h-5 rounded-fullshadow-md transition-all duration-300 transform ${
          isDarkMode ? 'translate-x-8' : 'translate-x-0'
        }`}
      >
        <span
          className={`text-sm flex items-center justify-center transition-transform duration-300 transform ${
            isDarkMode ? 'rotate-[360deg]' : 'rotate-0'
          }`}
        >
          {isDarkMode ? '🌛' : '🌞'}
        </span>
      </div>
    </button>
  );
};

export default ThemeToggle;
