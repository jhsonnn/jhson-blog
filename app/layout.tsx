import { ReactNode } from 'react';
import { ReduxProvider } from '@/components/utils/ReduxProvider';
import '@/styles/global.css';
import Header from '@/components/layout/header';
import ThemeProviderWrapper from '@/components/ui/ThemeProviderWrapper';
import { fetchInitialTheme } from '@/lib/theme/themeUtils';
import ReduxInitializer from '@/components/utils/ReduxInitializer';

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const initialTheme = (await fetchInitialTheme()) || 'light';

  return (
    <html lang="en" className={`w-full h-full no-scrollbar ${initialTheme}`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>jhsonnn | 손지형의 블로그</title>
      </head>
      <body className="w-full h-full dark:bg-neutral-800 bg-neutral-100 dark:text-neutral-400 text-neutral-700">
        <ReduxProvider>
          <ReduxInitializer />
          <ThemeProviderWrapper initialTheme={initialTheme}>
            {/* 헤더 */}
            <div className="container mx-auto fixed top-0 w-full z-50 bg-neutral-100 dark:bg-neutral-800">
              <div className="border-b border-neutral-400 py-3">
                <Header />
              </div>
            </div>
            {/* 메인 콘텐츠 */}
            <div className="py-5 pt-[64px]">{children}</div>
          </ThemeProviderWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
