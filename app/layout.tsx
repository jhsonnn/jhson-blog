// import { ReactNode } from 'react';
// import '@/styles/global.css';
// import Header from '@/components/ui/header';
// import ConditionalSidebar from '@/components/ui/ConditionalSidebar';

// export const metadata = {
//   title: 'jhsonnn | 손지형의 블로그',
//   description: 'Generated by create next app',
// };

// export default function RootLayout({
//   children,
//   isPostContent = false,
// }: {
//   children: ReactNode;
//   isPostContent?: boolean;
// }) {
//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>{metadata.title}</title>
//         <meta name="description" content={metadata.description} />
//       </head>
//       <body className="dark:bg-neutral-900 bg-neutral-50 dark:text-neutral-400 text-neutral-700 px-4 sm:px-10 lg:px-20 py-10">
//         <div className="container mx-auto border-b border-neutral-400 pb-2">
//           <header>
//             <Header />
//           </header>
//         </div>

//         {/* 메인 레이아웃 */}
//         <main className="container mx-auto flex flex-col lg:flex-row pt-10 space-y-7 lg:space-y-0">
//           <section
//             className={`w-full order-3 lg-order-2 lg:w-7/10 lg:p-10 md:p-0 rounded-2xl lg:mr-6 md:mx-0 ${
//               isPostContent
//                 ? 'bg-neutral-100 dark:bg-neutral-700 md:px-5 md:py-5'
//                 : ''
//             }`}
//           >
//             {children}
//           </section>
//           <ConditionalSidebar />
//         </main>
//       </body>
//     </html>
//   );
// }

import { ReactNode } from 'react';
import '@/styles/global.css';
import Header from '@/components/ui/header';
import ConditionalSidebar from '@/components/ui/ConditionalSidebar';

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
        <div className="container mx-auto border-b border-neutral-400 pb-2">
          <header>
            <Header />
          </header>
        </div>

        {/* 메인 레이아웃 */}
        <main className="container mx-auto flex flex-col lg:flex-row pt-10 space-y-7 lg:space-y-0">
          <section className="w-full order-3 lg-order-2 lg:w-7/10 lg:p-10 md:p-0 rounded-2xl lg:mr-6 md:mx-0">
            {children}
          </section>
          <ConditionalSidebar />
        </main>
      </body>
    </html>
  );
}
