'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React, { ReactNode } from 'react';

const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <NextThemesProvider
    attribute="class"
    enableSystem={true}
    defaultTheme="system"
  >
    {children}
  </NextThemesProvider>
);

export default ThemeProvider;
