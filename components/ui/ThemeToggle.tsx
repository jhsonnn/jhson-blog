'use client';

import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 저장된 테마를 불러오기
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? '☀️ 라이트 모드' : '🌙 다크 모드'}
    </button>
  );
};

export default ThemeToggle;
