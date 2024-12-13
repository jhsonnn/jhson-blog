//app/layout.tsx;
import { ReactNode } from 'react';
import '@/styles/global.css';
import Header from '@/components/ui/header';
import ConditionalSidebar from '@/components/ui/ConditionalSidebar';
import ThemeProvider from '@/components/ui/ThemeProvider';

export const metadata = {
  title: 'jhsonnn | 손지형의 블로그',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="dark:bg-neutral-900 bg-neutral-50 dark:text-neutral-400 text-neutral-700 px-4 sm:px-10 lg:px-20 py-10">
        <ThemeProvider>
          <div className="container mx-auto border-b border-neutral-400 pb-2">
            <header>
              <Header />
            </header>
          </div>
          {/* 메인 레이아웃 */}
          <main className="container mx-auto flex flex-col lg:grid lg:grid-cols-5 lg:gap-6 pt-10 space-y-7 lg:space-y-0">
            {/* 좌: TagsMenu */}
            <aside className="lg:col-span-1 order-2 lg:order-none lg:row-start-1">
              <ConditionalSidebar section="tagsMenu" />
            </aside>

            {/* 중간: Menu + 메인 콘텐츠 */}
            <div className="lg:col-span-3 lg:row-start-1 lg:row-end-2 order-3 lg:order-none flex flex-col gap-4 lg:mr-12">
              {/* Menu */}
              <aside>
                <ConditionalSidebar section="menu" />
              </aside>

              {/* 메인 콘텐츠 */}
              <section>{children}</section>
            </div>

            {/* 우: Profile */}
            <aside className="lg:col-span-1 order-1 lg:order-none">
              <ConditionalSidebar section="profile" />
            </aside>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
