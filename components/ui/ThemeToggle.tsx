// 'use client';

// import React from 'react';
// import { useTheme } from 'next-themes';

// const ThemeToggle = () => {
//   const { theme, setTheme, resolvedTheme } = useTheme();

//   // 테마가 초기화되기 전에는 아무것도 렌더링하지 않음
//   if (!resolvedTheme) {
//     return null; // 초기 상태가 확인되기 전에는 렌더링 차단
//   }

//   return (
//     <button
//       onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//       className="rounded"
//     >
//       {theme === 'dark' ? '☀️' : '🌙'}
//     </button>
//   );
// };

// export default ThemeToggle;

////

// src/components/ThemeToggle.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // 컴포넌트가 클라이언트에서 마운트된 후 렌더링 허용
  }, []);

  if (!mounted || !resolvedTheme) {
    return <button disabled>Loading...</button>;
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
