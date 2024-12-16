// //app/layout.tsx;
// import { ReactNode } from 'react';
// import '@/styles/global.css';
// import Header from '@/components/ui/header';
// import ConditionalSidebar from '@/components/ui/ConditionalSidebar';
// import ThemeProvider from '@/components/ui/ThemeProvider';

// export const metadata = {
//   title: 'jhsonnn | 손지형의 블로그',
//   description: 'Generated by create next app',
// };

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>{metadata.title}</title>
//         <meta name="description" content={metadata.description} />
//       </head>
//       <body className="dark:bg-neutral-900 bg-neutral-50 dark:text-neutral-400 text-neutral-700 px-4 sm:px-10 lg:px-20 py-10">
//         <ThemeProvider>
//           <div className="container mx-auto border-b border-neutral-400 pb-2">
//             <header>
//               <Header />
//             </header>
//           </div>
//           {/* 메인 레이아웃 */}
//           <main className="container mx-auto flex flex-col lg:grid lg:grid-cols-5 lg:gap-6 pt-10 space-y-7 lg:space-y-0">
//             {/* 좌: TagsMenu */}
//             <aside className="lg:col-span-1 order-2 lg:order-none lg:row-start-1">
//               <ConditionalSidebar section="tagsMenu" />
//             </aside>

//             {/* 중간: Menu + 메인 콘텐츠 */}
//             <div className="lg:col-span-3 lg:row-start-1 lg:row-end-2 order-3 lg:order-none flex flex-col gap-4 lg:mr-12">
//               {/* Menu */}
//               <aside>
//                 <ConditionalSidebar section="menu" />
//               </aside>

//               {/* 메인 콘텐츠 */}
//               <section>{children}</section>
//             </div>

//             {/* 우: Profile */}
//             <aside className="lg:col-span-1 order-1 lg:order-none">
//               <ConditionalSidebar section="profile" />
//             </aside>
//           </main>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

/////
// // app/layout.tsx
// import { ReactNode } from 'react';
// import '@/styles/global.css';
// import Header from '@/components/ui/header';
// import TagsMenu from '@/components/ui/tagsMenu';
// import Menu from '@/components/ui/menu';
// import Profile from '@/components/ui/profile';
// import ThemeProvider from '@/components/ui/ThemeProvider';

// export const metadata = {
//   title: 'jhsonnn | 손지형의 블로그',
//   description: 'Generated by create next app',
// };

// interface LayoutProps {
//   children: ReactNode;
// }

// export default function RootLayout({ children }: LayoutProps) {
//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>{metadata.title}</title>
//         <meta name="description" content={metadata.description} />
//       </head>
//       <body className="dark:bg-neutral-900 bg-neutral-50 dark:text-neutral-400 text-neutral-700 px-4 sm:px-10 lg:px-20 py-10">
//         <ThemeProvider>
//           <div className="container mx-auto border-b border-neutral-400 pb-2">
//             <header>
//               <Header />
//             </header>
//           </div>

//           <main className="container mx-auto flex flex-col lg:grid lg:grid-cols-5 lg:gap-6 pt-10 space-y-7 lg:space-y-0">
//             <aside className="lg:col-span-1 order-2 lg:order-none lg:row-start-1">
//               <TagsMenu />
//             </aside>

//             <div className="lg:col-span-3 lg:row-start-1 lg:row-end-2 order-3 lg:order-none flex flex-col gap-4 lg:mr-12">
//               <aside>
//                 <Menu />
//               </aside>
//               <section>{children}</section>
//             </div>

//             <aside className="lg:col-span-1 order-1 lg:order-none">
//               <Profile />
//             </aside>
//           </main>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

/////
import { ReactNode } from 'react';
import '@/styles/global.css';
import Header from '@/components/ui/header';
import TagsMenu from '@/components/ui/tagsMenu';
import Menu from '@/components/ui/menu';
import Profile from '@/components/ui/profile';

export const metadata = {
  title: 'My Blog',
  description: 'A blog built with Next.js',
};

interface LayoutProps {
  children: ReactNode;
  params?: { category?: string; slug?: string }; // 동적 경로 처리
}

export default function RootLayout({ children, params }: LayoutProps) {
  const isPostContentPage = params?.category && params?.slug; // /[category]/[slug] 경로 확인

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
      </head>
      <body className="dark:bg-neutral-900 bg-neutral-50 dark:text-neutral-400 text-neutral-700 px-4 sm:px-10 lg:px-20 py-10">
        <div className="container mx-auto border-b border-neutral-400 pb-2">
          <header>
            <Header />
          </header>
        </div>

        <main className="container mx-auto flex flex-col lg:grid lg:grid-cols-5 lg:gap-6 pt-10 space-y-7 lg:space-y-0">
          {/* 좌측: TagsMenu */}
          {!isPostContentPage && (
            <aside className="lg:col-span-1 order-2 lg:order-none lg:row-start-1">
              <TagsMenu />
            </aside>
          )}

          {/* 중간: Menu + 메인 콘텐츠 */}
          <div className="lg:col-span-3 lg:row-start-1 lg:row-end-2 order-3 lg:order-none flex flex-col gap-4 lg:mr-12">
            {!isPostContentPage && (
              <aside>
                <Menu />
              </aside>
            )}
            <section>{children}</section>
          </div>

          {/* 우측: Profile */}
          {!isPostContentPage && (
            <aside className="lg:col-span-1 order-1 lg:order-none">
              <Profile />
            </aside>
          )}
        </main>
      </body>
    </html>
  );
}
