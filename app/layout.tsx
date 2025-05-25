import '@/styles/global.css';
import { ReactNode } from 'react';
import Header from '@/components/layout/header';
import ThemeProviderWrapper from '@/components/ui/ThemeProviderWrapper';
import { fetchInitialTheme } from '@/lib/theme/themeUtils';
import ReduxInitializer from '@/app/store/ReduxInitializer';
import ReduxProvider from '@/app/store/ReduxProvider';
import { metadata } from '../lib/metadata/meta';
interface RootLayoutProps {
  children: ReactNode;
}

export { metadata };

export default async function RootLayout({ children }: RootLayoutProps) {
  const initialTheme = (await fetchInitialTheme()) || 'light';

  return (
    <html lang="ko" className={`w-full h-full no-scrollbar ${initialTheme}`}>
      <body className="w-full h-full dark:bg-neutral-800 bg-neutral-100 dark:text-neutral-400 text-neutral-700">
        <ReduxProvider>
          <ReduxInitializer />
          <ThemeProviderWrapper initialTheme={initialTheme}>
            <div className="max-w-screen-xl mx-auto px-4">
              <div className="fixed top-0 left-0 right-0 z-50 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-400 dark:border-neutral-700">
                <div className="max-w-screen-xl mx-auto px-4 py-3 max-sm:py-2">
                  <Header />
                </div>
              </div>
              <main className="pt-[64px] py-5">{children}</main>
            </div>
          </ThemeProviderWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
