'use client';

import { ThemeProvider } from 'next-themes';
import React from 'react';

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
  initialTheme: string;
}

const ThemeProviderWrapper = ({
  children,
  initialTheme,
}: ThemeProviderWrapperProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={initialTheme}
      enableSystem
      storageKey="theme"
    >
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
