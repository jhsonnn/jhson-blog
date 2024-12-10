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
};

const Post: React.FC<PostProps> = ({ title, date, thumbnailUrl, category }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // 날짜 형식 변환
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-w-full min-h-full max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-lg mb-6">
      <div className="">
        {/* 이미지 */}
        <div className="relative w-full h-64">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            className={`transition-opacity duration-700 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoadingComplete={() => setIsLoaded(true)}
            onError={() => setIsLoaded(false)}
          />
        </div>

        {/* 텍스트 */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-500 mt-2 mb-2">{formattedDate}</p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-300 text-gray-500 text-xs font-medium px-2 py-1 rounded">
              {category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
