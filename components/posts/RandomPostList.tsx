//세부 콘텐츠 페이지 하단 랜덤한 포스트
'use client';

import React, { useEffect, useState } from 'react';
import Post from './Post';
import { Post as PostType } from '@/lib/notion/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RandomPostListProps {
  posts: PostType[];
  currentSlug: string;
  basePath: string;
}

const RandomPostList: React.FC<RandomPostListProps> = ({
  posts,
  currentSlug,
}) => {
  const [randomPosts, setRandomPosts] = useState<PostType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [visibleCount, setVisibleCount] = useState(3); //한 페이지 자체에 보여주는 포스트 수
  const transitionDurationTime = 500;
  const [isTransitioning, setIsTransitioning] = useState(false);

  //화면 크기에 따라 visibleCount 조정
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  //랜덤 포스트 생성 (컴포넌트 마운트 시 한 번만 실행)
  useEffect(() => {
    const filteredPosts = posts.filter((post) => post.slug !== currentSlug);
    const shuffledPosts = filteredPosts
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);

    // 복제된 아이템 추가
    const extendedPosts = [
      shuffledPosts[shuffledPosts.length - 1],
      ...shuffledPosts,
      shuffledPosts[0],
    ];

    setRandomPosts(extendedPosts);
  }, [posts, currentSlug]);

  //다음 슬라이드로 이동
  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  //이전 슬라이드로 이동
  const handlePrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  //포스트 끝에 도달하면 이동처리
  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);

        if (currentIndex === 0) {
          //맨 처음에서 마지막으로 이동
          setCurrentIndex(randomPosts.length - 2);
        } else if (currentIndex === randomPosts.length - 1) {
          //맨 끝에서 처음으로 이동
          setCurrentIndex(1);
        }
      }, transitionDurationTime);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, isTransitioning, randomPosts.length]);

  //자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (randomPosts.length === 0) return null;

  return (
    <div className="relative mt-10">
      <h2 className="text-xl font-bold mb-4">다른 Posts</h2>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform mb-10"
          style={{
            transform: `translateX(-${
              (currentIndex - Math.floor(visibleCount / 2)) *
              (100 / visibleCount)
            }%)`,
            transition: isTransitioning
              ? `transform ${transitionDurationTime}ms ease`
              : 'none',
          }}
        >
          {randomPosts.map((post, index) => (
            <div
              key={index}
              className={`flex-shrink-0 px-2`}
              style={{
                width: `${100 / visibleCount}%`,
              }}
            >
              <Post
                title={post.title}
                slug={post.slug}
                date={post.created_time}
                thumbnailUrl={post.thumbnailUrl || '/default-thumbnail.png'}
                category={post.category}
                tags={post.tags}
                isRandomPosts={true}
              />
            </div>
          ))}
        </div>
      </div>
      {/* 왼쪽 화살표 버튼 */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-neutral-300 dark:bg-neutral-800 text-white p-2 rounded-full hover:bg-neutral-400 dark:hover:bg-neutral-600 transition"
        onClick={handlePrev}
        aria-label="Previous"
      >
        <ChevronLeft size={24} />
      </button>

      {/* 오른쪽 화살표 버튼 */}
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-neutral-300 dark:bg-neutral-800 text-white p-2 rounded-full hover:bg-neutral-400 dark:hover:bg-neutral-600 transition"
        onClick={handleNext}
        aria-label="Next"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default RandomPostList;
