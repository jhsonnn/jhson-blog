// 'use client';

// import { ThemeProvider } from 'next-themes';
// import React from 'react';

// interface ThemeProviderWrapperProps {
//   children: React.ReactNode;
//   initialTheme: string;
// }

// const ThemeProviderWrapper = ({
//   children,
//   initialTheme,
// }: ThemeProviderWrapperProps) => {
//   return (
//     <ThemeProvider
//       attribute="class"
//       defaultTheme={initialTheme}
//       enableSystem
//       storageKey="theme"
//     >
//       {children}
//     </ThemeProvider>
//   );
// };

// export default ThemeProviderWrapper;

// 'use client';

// import { ThemeProvider } from 'next-themes';
// import React from 'react';

// interface ThemeProviderWrapperProps {
//   children: React.ReactNode;
// }

// const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({
//   children,
// }) => {
//   return (
//     <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
//       {children}
//     </ThemeProvider>
//   );
// };

// export default ThemeProviderWrapper;

//테스트
'use client';

import { ThemeProvider } from 'next-themes';
import React from 'react';

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
  initialTheme?: string;
}

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({
  children,
  initialTheme = 'light',
}) => {
  return (
    <ThemeProvider attribute="class" defaultTheme={initialTheme} enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
