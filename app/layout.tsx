import '@/styles/global.css';
import { ReactNode } from 'react';
import Header from '@/components/layout/header';
import ThemeProviderWrapper from '@/components/ui/ThemeProviderWrapper';
import { fetchInitialTheme } from '@/lib/theme/themeUtils';
import ReduxInitializer from '@/components/utils/ReduxInitializer';
import ReduxProvider from '@/components/utils/ReduxProvider';

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const initialTheme = (await fetchInitialTheme()) || 'light';

  return (
    <html lang="en" className={`w-full h-full no-scrollbar ${initialTheme}`}>
      <head>
        <meta charSet="UTF-8" />
        <title>jhsonnn | 손지형의 블로그</title>
        <meta
          name="description"
          content="프론트엔드 개발자로의 전향을 준비하며 개인 프로젝트로 만든 블로그 입니다. 블로그를 통해 프론트엔드 개발을 공부하면서 진행했던 프로젝트들을 소개하고자 하였습니다. 뿐만 아니라 제가 어떻게 살아오고 어떠한 경험들을 해왔는지 스스로의 인생을 돌아볼 수 있는 소중한 시간이었습니다."
          key="desc"
        />
        <meta
          name="keywords"
          content="프론트엔드 개발자, 신입 프론트엔드 개발자, 프론트엔드, 프론트엔드 포트폴리오, 프론트엔드 개발자 포트폴리오"
          key="keywords"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
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
