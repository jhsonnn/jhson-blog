//components/Post.tsx

'use client';

import Image from 'next/image';
import { useState } from 'react';

type PostProps = {
  title: string;
  slug: string;
  date: string;
  thumbnailUrl: string;
  category: string;
  tags: string[];
};

const Post: React.FC<PostProps> = ({
  title,
  //slug,
  date,
  thumbnailUrl,
  category,
  tags,
}: PostProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // 날짜 형식 변환
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    // <div className="min-w-full min-h-full max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-lg mb-6">
    //   <div className="">
    //     {/* 이미지 */}
    //     <div className="relative w-full h-64">
    //       <Image
    //         src={thumbnailUrl}
    //         alt={title}
    //         fill
    //         style={{ objectFit: 'cover', objectPosition: 'center' }}
    //         className={`transition-opacity duration-700 ${
    //           isLoaded ? 'opacity-100' : 'opacity-0'
    //         }`}
    //         onLoadingComplete={() => setIsLoaded(true)}
    //         onError={() => setIsLoaded(false)}
    //       />
    //     </div>

    //     {/* 텍스트 */}
    //     <div className="p-6">
    //       <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
    //       <p className="text-gray-500 mt-2 mb-2">{formattedDate}</p>
    //       <div className="flex flex-wrap gap-2">
    //         <span className="bg-gray-300 text-gray-500 text-xs font-medium px-2 py-1 rounded">
    //           {category}
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="relative min-w-full min-h-full max-w-xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl mb-6">
      {/* 이미지 */}
      <div className="relative w-full h-64">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className={`transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoadingComplete={() => setIsLoaded(true)}
          onError={() => setIsLoaded(false)}
        />
        {/* 이미지 위의의 오버레이 */}
        <div className="absolute inset-0 bg-[var(--sk-fill-gray-quaternary-alpha)] opacity-0 transition-opacity duration-300 hover:opacity-30"></div>
      </div>

      {/* 텍스트 */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-[var(--sk-headline-text-color)] mb-2 transition-colors duration-300 hover:text-[var(--sk-focus-color)]">
          {title}
        </h2>
        <p className="text-[var(--sk-glyph-gray-secondary)] mt-2 mb-2">
          {formattedDate}
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-[var(--sk-fill-tertiary)] text-[var(--sk-glyph-gray-secondary)] text-xs font-medium px-2 py-1 rounded-full border border-gray-300 hover:bg-[var(--sk-fill-gray-secondary)] hover:text-[var(--sk-body-text-color)] transition-colors duration-300">
            {category}
          </span>

          {tags?.map((tag) => (
            <span
              key={tag}
              className="border rounded-full px-3 py-1 text-xs text-gray-700 border-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 빛 반사 효과 */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-[var(--sk-fill-gray-tertiary-alpha)] transition-all duration-300 hover:ring-2 hover:ring-[var(--sk-focus-color)]"></div>
    </div>
  );
};

export default Post;
