// 'use client';

// import React, { useEffect, useState } from 'react';

// const ThemeToggle = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     const theme = document.cookie
//       .split('; ')
//       .find((row) => row.startsWith('theme='))
//       ?.split('=')[1];

//     if (theme === 'dark') {
//       setIsDarkMode(true);
//       document.documentElement.classList.add('dark');
//     } else {
//       setIsDarkMode(false);
//       document.documentElement.classList.remove('dark');
//     }
//   }, []);

//   const toggleTheme = () => {
//     if (isDarkMode) {
//       document.documentElement.classList.remove('dark');
//       document.cookie = 'theme=light; path=/; max-age=31536000';
//       setIsDarkMode(false);
//     } else {
//       document.documentElement.classList.add('dark');
//       document.cookie = 'theme=dark; path=/; max-age=31536000';
//       setIsDarkMode(true);
//     }
//   };

//   return (
//     <button onClick={toggleTheme} className="rounded-md">
//       {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
//     </button>
//   );
// };

// export default ThemeToggle;

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
