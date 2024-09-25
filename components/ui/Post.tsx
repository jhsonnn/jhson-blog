"use client";

import Image from "next/image";

type PostProps = {
  title: string;
  slug: string;
  date: string;
  thumbnailUrl: string;
};

const Post: React.FC<PostProps> = ({ title, slug, date, thumbnailUrl }) => {
  console.log("Post Props:", { title, slug, date, thumbnailUrl }); // 디버깅 로그 추가

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
      <div className="p-6">
        <h2 className="block mt-1 text-lg leading-tight font-semibold text-gray-900">
          {title}
        </h2>
        <div className="relative w-full h-48">
          <Image src={thumbnailUrl} alt={title} width={500} height={300} />
        </div>
        <p className="text-gray-400 mt-2">Published on: {date}</p>
      </div>
    </div>
  );
};

export default Post;
