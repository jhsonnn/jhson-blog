// //단일 포스트 컴포넌트
// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';

// type PostProps = {
//   title: string;
//   slug: string;
//   date?: string;
//   thumbnailUrl: string;
//   category: { name: string; color: string };
//   tags: { name: string; color: string }[];
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
// }) => {
//   //none 카테고리 or 태그 없는 경우 렌더링 제외
//   if (category.name === 'none' || tags.length === 0) return null;

//   return (
//     <Link href={`/${category.name}/${slug}`} passHref>
//       <div
//         className={`relative min-w-full max-w-xl mx-auto bg-neutral-100 dark:bg-neutral-700 rounded-3xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl flex flex-col
//         ${
//           isRandomPosts
//             ? 'h-56 sm:h-60 md:h-60 lg:h-[260px]'
//             : 'h-72 sm:h-80 md:h-[380px] lg:h-[420px]'
//         }`}
//       >
//         {/* 이미지 영역 */}
//         <div
//           className={`relative w-full flex-shrink-0 ${
//             isRandomPosts
//               ? 'h-[130px] sm:h-[140px] md:h-[140px] lg:h-[150px]'
//               : 'h-48 sm:h-52 md:h-64 lg:h-72'
//           }`}
//         >
//           <Image
//             src={thumbnailUrl}
//             alt={title}
//             layout="fill"
//             className="rounded-t-3xl object-cover"
//             priority
//             loading="eager"
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
//           />
//           <div className="absolute inset-0 bg-[var(--sk-fill-gray-quaternary-alpha)] opacity-0 transition-opacity duration-300 hover:opacity-30"></div>
//         </div>

//         {/* 텍스트 영역 */}
//         <div
//           className={`p-3 sm:p-3 md:p-4 lg:p-4 flex flex-col ${
//             isRandomPosts ? 'h-[80px] sm:h-[80px] md:h-[80px] lg:h-[90px]' : 'h-auto'
//           }`}
//         >
//           <h2
//             className={`font-semibold transition-colors duration-300 hover:text-[var(--sk-focus-color)] ${
//               isRandomPosts
//                 ? 'text-sm sm:text-sm md:text-sm lg:text-base mb-0.5'
//                 : 'text-sm sm:text-base md:text-lg lg:text-xl mb-0.5 sm:mb-2'
//             }`}
//           >
//             {title}
//           </h2>
//           <p
//             className={`text-[var(--sk-glyph-gray-secondary)] transition-colors duration-300 ${
//               isRandomPosts ? 'text-xs sm:text-xs md:text-xs' : 'text-xs sm:text-sm md:text-sm'
//             }`}
//           >
//             {date ?? 'Unknown Date'}
//           </p>
//           <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
//             <span
//               className={`bg-[var(--sk-fill-tertiary)] text-[var(--sk-glyph-gray-secondary)] font-medium px-2 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800
//               ${
//                 isRandomPosts
//                   ? 'text-[10px] sm:text-[10px] md:text-[10px] px-1 py-0.5'
//                   : 'text-[10px] sm:text-xs'
//               }`}
//             >
//               {category.name}
//             </span>
//             {tags.map((tag) => (
//               <span
//                 key={tag.name}
//                 className={`bg-[var(--sk-fill-tertiary)] text-[var(--sk-glyph-gray-secondary)] font-medium px-2 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800
//                   ${
//                     isRandomPosts
//                       ? 'text-[10px] sm:text-[10px] md:text-[10px] px-1 py-0.5'
//                       : 'text-[10px] sm:text-xs px-2 py-1'
//                   }`}
//               >
//                 {tag.name}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default Post;

// 'use client';

// import Link from 'next/link';
// import ClientImage from '@/components/ClientImage';

// type PostProps = {
//   title: string;
//   slug: string;
//   date?: string;
//   thumbnailUrl: string;
//   category: { name: string; color: string };
//   tags: { name: string; color: string }[];
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
// }) => {
//   if (category.name === 'none' || tags.length === 0) return null;

//   return (
//     <Link href={`/${category.name}/${slug}`} passHref>
//       <div
//         className={`relative min-w-full max-w-xl mx-auto bg-neutral-100 dark:bg-neutral-700 rounded-3xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl flex flex-col
//         ${
//           isRandomPosts
//             ? 'h-56 sm:h-60 md:h-60 lg:h-[260px]'
//             : 'h-72 sm:h-80 md:h-[380px] lg:h-[420px]'
//         }`}
//       >
//         {/* 이미지 영역 */}
//         <div
//           className={`relative w-full flex-shrink-0 ${
//             isRandomPosts
//               ? 'h-[130px] sm:h-[140px] md:h-[140px] lg:h-[150px]'
//               : 'h-48 sm:h-52 md:h-64 lg:h-72'
//           }`}
//         >
//           <ClientImage
//             src={thumbnailUrl}
//             slug={slug}
//             alt={title}
//             width={0} // layout="fill" 대신 width/height 0 설정
//             height={0}
//             className="rounded-t-3xl object-cover"
//             fill
//             priority
//           />
//           <div className="absolute inset-0 bg-[var(--sk-fill-gray-quaternary-alpha)] opacity-0 transition-opacity duration-300 hover:opacity-30" />
//         </div>

//         {/* 텍스트 영역 */}
//         <div
//           className={`p-3 sm:p-3 md:p-4 lg:p-4 flex flex-col ${
//             isRandomPosts ? 'h-[80px] sm:h-[80px] md:h-[80px] lg:h-[90px]' : 'h-auto'
//           }`}
//         >
//           <h2
//             className={`font-semibold transition-colors duration-300 hover:text-[var(--sk-focus-color)] ${
//               isRandomPosts
//                 ? 'text-sm sm:text-sm md:text-sm lg:text-base mb-0.5'
//                 : 'text-sm sm:text-base md:text-lg lg:text-xl mb-0.5 sm:mb-2'
//             }`}
//           >
//             {title}
//           </h2>
//           <p
//             className={`text-[var(--sk-glyph-gray-secondary)] transition-colors duration-300 ${
//               isRandomPosts ? 'text-xs sm:text-xs md:text-xs' : 'text-xs sm:text-sm md:text-sm'
//             }`}
//           >
//             {date ?? 'Unknown Date'}
//           </p>
//           <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
//             <span
//               className={`bg-[var(--sk-fill-tertiary)] text-[var(--sk-glyph-gray-secondary)] font-medium px-2 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800
//               ${
//                 isRandomPosts
//                   ? 'text-[10px] sm:text-[10px] md:text-[10px] px-1 py-0.5'
//                   : 'text-[10px] sm:text-xs'
//               }`}
//             >
//               {category.name}
//             </span>
//             {tags.map((tag) => (
//               <span
//                 key={tag.name}
//                 className={`bg-[var(--sk-fill-tertiary)] text-[var(--sk-glyph-gray-secondary)] font-medium px-2 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800
//                   ${
//                     isRandomPosts
//                       ? 'text-[10px] sm:text-[10px] md:text-[10px] px-1 py-0.5'
//                       : 'text-[10px] sm:text-xs px-2 py-1'
//                   }`}
//               >
//                 {tag.name}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default Post;

//test

// components/posts/Post.tsx
'use client';

import Link from 'next/link';
import ClientImage from '@/components/ClientImage';

type PostProps = {
  title: string;
  slug: string;
  date?: string;
  thumbnailUrl: string;
  category: { name: string; color: string };
  tags: { name: string; color: string }[];
  isRandomPosts?: boolean;
};

const Post: React.FC<PostProps> = ({
  title,
  slug,
  date,
  thumbnailUrl,
  category,
  tags,
  isRandomPosts = false,
}) => {
  if (category.name === 'none' || tags.length === 0) return null;

  return (
    <Link href={`/${category.name}/${slug}`} passHref>
      <div
        className={`relative min-w-full max-w-xl mx-auto bg-neutral-100 dark:bg-neutral-700 rounded-3xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl flex flex-col
        ${
          isRandomPosts
            ? 'h-56 sm:h-60 md:h-60 lg:h-[260px]'
            : 'h-72 sm:h-80 md:h-[380px] lg:h-[420px]'
        }`}
      >
        {/* 이미지 영역 */}
        <div
          className={`relative w-full flex-shrink-0 ${
            isRandomPosts
              ? 'h-[130px] sm:h-[140px] md:h-[140px] lg:h-[150px]'
              : 'h-48 sm:h-52 md:h-64 lg:h-72'
          }`}
        >
          <ClientImage
            src={thumbnailUrl}
            slug={slug}
            alt={title}
            width={0}
            height={0}
            fill
            priority
            className="rounded-t-3xl object-cover"
          />
          <div className="absolute inset-0 bg-[var(--sk-fill-gray-quaternary-alpha)] opacity-0 transition-opacity duration-300 hover:opacity-30" />
        </div>

        {/* 텍스트 영역 */}
        <div
          className={`p-3 sm:p-3 md:p-4 lg:p-4 flex flex-col ${
            isRandomPosts ? 'h-[80px] sm:h-[80px] md:h-[80px] lg:h-[90px]' : 'h-auto'
          }`}
        >
          <h2
            className={`font-semibold transition-colors duration-300 hover:text-[var(--sk-focus-color)] ${
              isRandomPosts
                ? 'text-sm sm:text-sm md:text-sm lg:text-base mb-0.5'
                : 'text-sm sm:text-base md:text-lg lg:text-xl mb-0.5 sm:mb-2'
            }`}
          >
            {title}
          </h2>
          <p
            className={`text-[var(--sk-glyph-gray-secondary)] transition-colors duration-300 ${
              isRandomPosts ? 'text-xs sm:text-xs md:text-xs' : 'text-xs sm:text-sm md:text-sm'
            }`}
          >
            {date ?? 'Unknown Date'}
          </p>
          <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
            <span
              className={`bg-[var(--sk-fill-tertiary)] text-[var(--sk-glyph-gray-secondary)] font-medium px-2 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800
              ${
                isRandomPosts
                  ? 'text-[10px] sm:text-[10px] md:text-[10px] px-1 py-0.5'
                  : 'text-[10px] sm:text-xs'
              }`}
            >
              {category.name}
            </span>
            {tags.map((tag) => (
              <span
                key={tag.name}
                className={`bg-[var(--sk-fill-tertiary)] text-[var(--sk-glyph-gray-secondary)] font-medium px-2 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800
                  ${
                    isRandomPosts
                      ? 'text-[10px] sm:text-[10px] md:text-[10px] px-1 py-0.5'
                      : 'text-[10px] sm:text-xs px-2 py-1'
                  }`}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
