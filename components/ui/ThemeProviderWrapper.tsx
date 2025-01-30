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
