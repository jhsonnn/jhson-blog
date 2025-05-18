import '@/styles/global.css';
import { ReactNode } from 'react';
import Header from '@/components/layout/header';
import ThemeProviderWrapper from '@/components/ui/ThemeProviderWrapper';
import { fetchInitialTheme } from '@/lib/theme/themeUtils';
import ReduxInitializer from '@/app/store/ReduxInitializer';
import ReduxProvider from '@/app/store/ReduxProvider';
import type { Metadata } from 'next';

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: '프론트엔드 개발자, 손지형의 포트폴리오',
    template: '%s | 프론트엔드 개발자, 손지형의 포트폴리오',
  },
  description:
    '프론트엔드 개발자로의 전향을 준비하며 만든 포트폴리오 및 블로그입니다. 프로젝트를 통해 개발 경험과 고민을 정리한 개인 공간입니다.',
  keywords: [
    '프론트엔드',
    '프론트',
    '프론트엔드 개발자',
    '신입 프론트엔드',
    '프론트엔드 포트폴리오',
    '프론트엔드 포폴',
    '프론트엔드 개발자 포트폴리오',
    '프론트엔드 개발자 포폴',
    '프론트 포트폴리오',
    '프론트 포폴',
    '개발자 포트폴리오',
    '개발자 포폴',
    '개발자 블로그',
    'React',
    'Next.js',
  ],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: '프론트엔드 개발자, 손지형의 포트폴리오',
    description: '프론트엔드 개발자 손지형의 포트폴리오 입니다.',
    url: 'https://jhsonnn.info',
    siteName: '손지형 포트폴리오',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: 'https://jhsonnn.info/og-image.png',
        width: 1200,
        height: 630,
        alt: 'og-image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '프론트엔드 개발자, 손지형의 포트폴리오',
    description: '프론트엔드 개발자 손지형의 포트폴리오 입니다.',
    images: ['https://jhsonnn.info/og-image.png'],
  },
};

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
