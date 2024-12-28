import { ReactNode } from 'react';
import '@/styles/global.css';
import Header from '@/components/layout/header';
import Profile from '@/components/ui/profile';
import TagsMenu from '@/components/menus/TagsMenu';
import { fetchTags } from '@/lib/notion/api/fetchTags';
import ThemeProviderWrapper from '@/components/ui/ThemeProviderWrapper';
import { fetchInitialTheme } from '@/lib/theme/themeUtils';

interface RootLayoutProps {
  children: ReactNode;
  currentSlug?: string;
}

export default async function RootLayout({
  children,
  currentSlug,
}: RootLayoutProps) {
  const tags = await fetchTags();

  // 슬러그가 있으면 태그 메뉴와 프로필 숨김
  const isPostPage = Boolean(currentSlug);

  // 서버에서 초기 테마를 설정
  const initialTheme = (await fetchInitialTheme()) || 'light';

  return (
    <html lang="en" className={initialTheme}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>jhsonnn | 손지형의 블로그</title>
      </head>
      <body className="dark:bg-neutral-800 bg-neutral-100 dark:text-neutral-400 text-neutral-700 px-4 sm:px-6 lg:px-10 py-10 max-w-screen-xl mx-auto">
        <ThemeProviderWrapper initialTheme={initialTheme}>
          {/* 헤더 */}
          <div className="container mx-auto border-b border-neutral-400 pb-2">
            <header>
              <Header />
            </header>
          </div>

          {/* 메인 레이아웃 */}
          <main
            className={`container mx-auto pt-10 ${
              !isPostPage ? 'lg:flex lg:gap-6 lg:h-[calc(100vh-4rem)]' : ''
            }`}
          >
            {!isPostPage && (
              <aside className="hidden lg:block lg:w-1/5 lg:h-full lg:overflow-hidden lg:sticky lg:top-10">
                <div className="h-full overflow-y-auto no-scrollbar">
                  <TagsMenu tags={tags} />
                </div>
              </aside>
            )}
            <div
              className={`flex-1 flex flex-col gap-4 lg:h-full lg:overflow-y-auto no-scrollbar ${
                isPostPage ? 'rounded-2xl lg:max-w-4xl lg:mx-auto' : 'lg:mr-10'
              }`}
            >
              <section>{children}</section>
            </div>
            {!isPostPage && (
              <aside className="hidden lg:block lg:w-1/5 lg:h-full lg:overflow-hidden lg:sticky lg:top-10">
                <div className="h-full overflow-y-auto no-scrollbar">
                  <Profile />
                </div>
              </aside>
            )}
          </main>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
