// //단일 포스트 컴포넌트
// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState } from 'react';

// type PostProps = {
//   title: string;
//   slug: string;
//   date: string;
//   thumbnailUrl: string;
//   category: string;
//   tags: string[];
//   isRandomPosts?: boolean;
// };

// const Post: React.FC<PostProps> = ({
//   title,
//   slug,
//   date,
//   thumbnailUrl,
//   category,
//   tags,
//   isRandomPosts = false,
// }: PostProps) => {
//   const [_isLoaded, setIsLoaded] = useState(false);

//   //날짜 형식 변환
//   const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   return (
//     <Link href={`/${category}/${slug}`} passHref>
//       <div
//         className={`relative min-w-full min-h-full max-w-xl mx-auto bg-neutral-100 dark:bg-neutral-700 rounded-3xl shadow-lg overflow-hidden transition-transform transition-colors duration-300 hover:scale-[1.01] hover:shadow-xl mb-6 cursor-pointer ${
//           isRandomPosts ? 'h-[280px]' : ''
//         }`}
//       >
//         <div
//           className={`absolute inset-0 transition-colors duration-300 z-0 ${
//             isRandomPosts
//               ? 'rounded-lg h-[150px] bg-neutral-200 dark:bg-neutral-800'
//               : 'rounded-3xl h-full bg-neutral-100 dark:bg-neutral-700'
//           }`}
//         />

//         {/* 이미지 */}
//         <div
//           className={`relative w-full ${
//             isRandomPosts ? 'h-[180px]' : 'h-80'
//           } z-10`}
//           style={{ aspectRatio: '16 / 9' }} //비율 고정
//         >
//           <Image
//             src={thumbnailUrl}
//             alt={title}
//             layout="fill"
//             className={`rounded-t-3xl object-cover`} //transition-opacity 제거
//             onLoad={() => setIsLoaded(true)}
//             onError={() => setIsLoaded(false)}
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px" //반응형
//             priority={true} //LCP 최적화
//             loading="eager"
//           />
//           {/* 이미지 위 오버레이 */}
//           <div className="absolute inset-0 bg-[var(--sk-fill-gray-quaternary-alpha)] opacity-0 transition-opacity duration-300 hover:opacity-30"></div>
//         </div>

//         {/* 텍스트 */}
//         <div
//           className={`relative px-5 pt-3 my-auto bg-transparent z-10 dark:text-neutral-400 text-neutral-700 ${
//             isRandomPosts ? 'h-24' : 'h-auto'
//           }`}
//         >
//           <h2 className="text-xl font-semibold text-[var(--sk-headline-text-color)] mb-2 transition-colors duration-300 hover:text-[var(--sk-focus-color)]">
//             {title}
//           </h2>
//           <p className="text-[var(--sk-glyph-gray-secondary)] mt-2 mb-2 transition-colors duration-300">
//             {formattedDate}
//           </p>
//           <div className="flex flex-wrap gap-2">
//             <span className="bg-[var(--sk-fill-tertiary)] text-[var(--sk-glyph-gray-secondary)] text-xs font-medium px-2 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:bg-[var(--sk-fill-gray-secondary)] hover:text-[var(--sk-body-text-color)] transition-colors duration-300">
//               {category}
//             </span>
//             {tags?.map((tag) => (
//               <span
//                 key={tag}
//                 className="border rounded-full bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 px-3 py-1 text-xs transition-colors duration-300"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default Post;

// //인피니트 포스트
// // Infinite Post Component
// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState } from 'react';

// interface PostProps {
//   title: string;
//   slug: string;
//   date: string;
//   thumbnailUrl: string;
//   category: string;
//   tags: string[];
//   isRandomPosts?: boolean;
// }

// const Post: React.FC<PostProps> = ({
//   title,
//   slug,
//   date,
//   thumbnailUrl,
//   category,
//   tags,
//   isRandomPosts = false,
// }) => {
//   const [_isLoaded, setIsLoaded] = useState(false);

//   // 날짜 형식 변환
//   const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   return (
//     <Link href={`/${category}/${slug}`} passHref>
//       <div
//         className={`relative min-w-full min-h-full max-w-xl mx-auto bg-neutral-100 dark:bg-neutral-700 rounded-3xl shadow-lg overflow-hidden transition-transform transition-colors duration-300 hover:scale-[1.01] hover:shadow-xl mb-6 cursor-pointer ${
//           isRandomPosts ? 'h-[280px]' : ''
//         }`}
//       >
//         <div
//           className={`absolute inset-0 transition-colors duration-300 z-0 ${
//             isRandomPosts
//               ? 'rounded-lg h-[150px] bg-neutral-200 dark:bg-neutral-800'
//               : 'rounded-3xl h-full bg-neutral-100 dark:bg-neutral-700'
//           }`}
//         />

//         {/* 이미지 */}
//         <div
//           className={`relative w-full ${
//             isRandomPosts ? 'h-[180px]' : 'h-80'
//           } z-10`}
//           style={{ aspectRatio: '16 / 9' }}
//         >
//           <Image
//             src={thumbnailUrl}
//             alt={title}
//             layout="fill"
//             className="rounded-t-3xl object-cover"
//             onLoad={() => setIsLoaded(true)}
//             onError={() => setIsLoaded(false)}
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
//             priority={true}
//             loading="eager"
//           />
//           <div className="absolute inset-0 bg-[var(--sk-fill-gray-quaternary-alpha)] opacity-0 transition-opacity duration-300 hover:opacity-30"></div>
//         </div>

//         {/* 텍스트 */}
//         <div
//           className={`relative px-5 pt-3 my-auto bg-transparent z-10 dark:text-neutral-400 text-neutral-700 ${
//             isRandomPosts ? 'h-24' : 'h-auto'
//           }`}
//         >
//           <h2 className="text-xl font-semibold text-[var(--sk-headline-text-color)] mb-2 transition-colors duration-300 hover:text-[var(--sk-focus-color)]">
//             {title}
//           </h2>
//           <p className="text-[var(--sk-glyph-gray-secondary)] mt-2 mb-2 transition-colors duration-300">
//             {formattedDate}
//           </p>
//           <div className="flex flex-wrap gap-2">
//             <span className="bg-[var(--sk-fill-tertiary)] text-[var(--sk-glyph-gray-secondary)] text-xs font-medium px-2 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:bg-[var(--sk-fill-gray-secondary)] hover:text-[var(--sk-body-text-color)] transition-colors duration-300">
//               {category}
//             </span>
//             {tags?.map((tag) => (
//               <span
//                 key={tag}
//                 className="border rounded-full bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 px-3 py-1 text-xs transition-colors duration-300"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default Post;

//랜덤포스트boolean 제거
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface PostProps {
  title: string;
  slug: string;
  date: string;
  thumbnailUrl: string;
  category: string;
  tags: string[];
}

const Post: React.FC<PostProps> = ({
  title,
  slug,
  date,
  thumbnailUrl,
  category,
  tags,
}) => {
  const [_isLoaded, setIsLoaded] = useState(false);

  // 날짜 형식 변환
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/${category}/${slug}`} passHref>
      <div className="relative min-w-full min-h-full max-w-xl mx-auto bg-neutral-100 dark:bg-neutral-700 rounded-3xl shadow-lg overflow-hidden transition-transform transition-colors duration-300 hover:scale-[1.01] hover:shadow-xl mb-6 cursor-pointer">
        <div className="absolute inset-0 transition-colors duration-300 z-0 rounded-3xl h-full bg-neutral-100 dark:bg-neutral-700" />

        {/* 이미지 */}
        <div
          className="relative w-full h-80 z-10"
          style={{ aspectRatio: '16 / 9', height: '12rem' }}
        >
          <Image
            src={thumbnailUrl}
            alt={title}
            layout="fill"
            className="rounded-t-3xl object-cover"
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsLoaded(false)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            priority={true}
            loading="eager"
          />
          <div className="absolute inset-0 bg-[var(--sk-fill-gray-quaternary-alpha)] opacity-0 transition-opacity duration-300 hover:opacity-30"></div>
        </div>

        {/* 텍스트 */}
        <div className="relative px-5 pt-3 my-auto bg-transparent z-10 dark:text-neutral-400 text-neutral-700 h-auto">
          <h2
            className="text-xl font-semibold text-[var(--sk-headline-text-color)] mb-2 transition-colors duration-300 hover:text-[var(--sk-focus-color)]"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </h2>
          <p className="text-[var(--sk-glyph-gray-secondary)] mt-2 mb-2 transition-colors duration-300">
            {formattedDate}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-[var(--sk-fill-tertiary)] text-[var(--sk-glyph-gray-secondary)] text-xs font-medium px-2 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:bg-[var(--sk-fill-gray-secondary)] hover:text-[var(--sk-body-text-color)] transition-colors duration-300">
              {category}
            </span>
            {tags?.map((tag) => (
              <span
                key={tag}
                className="border rounded-full bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 px-3 py-1 text-xs transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
