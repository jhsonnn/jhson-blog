"use client";

import Image from "next/image";
import { useState } from "react";

type PostProps = {
  title: string;
  slug: string;
  date: string;
  thumbnailUrl: string;
};

const Post: React.FC<PostProps> = ({ title, slug, date, thumbnailUrl }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // console.log("Post Props:", { title, slug, date, thumbnailUrl });

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4 transition-transform duration-500 hover:scale-105 hover:shadow-lg">
      <div className="p-6">
        <h2 className="block mt-1 text-lg leading-tight font-semibold text-gray-900 animate-fade-in">
          {title}
        </h2>
        <div className="relative w-full h-48">
          <Image
            src={thumbnailUrl}
            alt={title}
            width={500}
            height={300}
            className={`transition-opacity duration-700 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoadingComplete={() => setIsLoaded(true)}
          />
        </div>
        <p className="text-gray-400 mt-2 animate-fade-in-delayed">
          Published on: {date}
        </p>
      </div>
    </div>
  );
};

export default Post;
