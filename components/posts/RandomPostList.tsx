//세부 콘텐츠 페이지 하단 랜덤한 포스트 슬라이더
'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import Post from './Post';
import { Post as PostType } from '@/lib/notion/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RandomPostListProps {
  posts: PostType[]; //전체 포스트 배열
  currentSlug: string; //현재 보고 있는 상세 페이지의 slug
  basePath: string;
}

const SLIDE_INTERVAL = 3000; //3초마다 자동으로 다음 슬라이드
const TRANSITION_DURATION = 400; //transform transition 0.4초

const RandomPostList: React.FC<RandomPostListProps> = ({ posts, currentSlug }) => {
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayPosts, setDisplayPosts] = useState<PostType[]>([]); //실제 렌더링에 사용할 배열(앞뒤 dummy 포함, 무한루프용용)
  const [currentIndex, setCurrentIndex] = useState(1); //index 1부터 시작 (앞에 dummy 있음)
  const [visibleCount, setVisibleCount] = useState(3); //한 화면에 보여줄 카드 수
  const [isPaused, setIsPaused] = useState(false); //마우스 hover하면 자동 슬라이스 일시 정지지
  const [isTransitioning, setIsTransitioning] = useState(true); //transform transition 켜고 끄기기

  const updateVisibleCount = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640)
      setVisibleCount(1); //640미만이면 post 1개
    else if (width < 1024)
      setVisibleCount(2); //1024 미만이면 post 2개
    else setVisibleCount(3); //그 이상이면 post 3개씩 보여줌
  }, []);

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, [updateVisibleCount]);

  useEffect(() => {
    const filtered = posts.filter((p) => p.slug !== currentSlug && !!p.id);
    if (filtered.length === 0) return;

    //무한 루프: 맨 앞과 맨 뒤에 dummy를 붙임
    const extendedSlide = [
      filtered[filtered.length - 1], //마지막->맨 앞앞 dummy
      ...filtered,
      filtered[0], //첫->맨 뒤 dummy
    ];
    setDisplayPosts(extendedSlide);
    setCurrentIndex(1); //진짜 첫 번째에서 시작
  }, [posts, currentSlug]);

  const slideTo = (index: number, withTransition = true) => {
    setIsTransitioning(withTransition);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (!isTransitioning) return;
    slideTo(currentIndex + 1);
  };

  const handlePrev = () => {
    if (!isTransitioning) return;
    slideTo(currentIndex - 1);
  };

  useEffect(() => {
    if (isPaused || displayPosts.length <= visibleCount + 2) return;

    const interval = setInterval(() => {
      slideTo(currentIndex + 1);
    }, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, currentIndex, visibleCount, displayPosts.length]);

  //무한 루프 처리
  useEffect(() => {
    if (!isTransitioning) return;

    const handleLoop = setTimeout(() => {
      //트랜지션 종료 후 index가 dummy 위치에 도달하면 순간적으로 index jump해서 자연스럽게 무한 반복(트랜지션 off)
      if (currentIndex === displayPosts.length - 1) {
        slideTo(1, false); //맨 뒤 dummy->진짜 첫 슬라이드드
      } else if (currentIndex === 0) {
        slideTo(displayPosts.length - 2, false); //맨 처음 dummy->진짜 마지막
      }
    }, TRANSITION_DURATION + 10);
    return () => clearTimeout(handleLoop);
  }, [currentIndex, displayPosts.length, isTransitioning]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      deltaX > 0 ? handlePrev() : handleNext();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="relative mt-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <h2 className="text-lg lg:text-xl font-bold mb-4">다른 Posts</h2>

      <div className="overflow-hidden relative">
        <div
          ref={containerRef}
          className="flex mb-10 transition-transform ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            transition: isTransitioning ? `transform ${TRANSITION_DURATION}ms ease` : 'none',
          }}
        >
          {displayPosts.map((post, index) => (
            <div
              key={`${post.id}-${index}`}
              className={`flex-shrink-0 px-2 ${
                visibleCount === 1
                  ? 'w-full h-[13rem] sm:h-[14rem] md:h-[16rem]'
                  : visibleCount === 2
                    ? 'w-1/2 h-[240px]'
                    : 'w-1/3 h-[260px]'
              }`}
            >
              <Post {...post} isRandomPosts disableKeyUpdate />
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-neutral-200 dark:bg-neutral-600 text-neutral-400 dark:text-neutral-300 p-3 rounded-full hover:bg-neutral-400 dark:hover:bg-neutral-600 transition"
        onClick={handlePrev}
        aria-label="Previous"
      >
        <ChevronLeft className="w-2 h-2 md:w-3 md:h-3 lg:w-3 lg:h-3" />
      </button>

      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-neutral-200 dark:bg-neutral-600 text-neutral-400 dark:text-neutral-300 p-3 rounded-full hover:bg-neutral-400 dark:hover:bg-neutral-600 transition"
        onClick={handleNext}
        aria-label="Next"
      >
        <ChevronRight className="w-2 h-2 md:w-3 md:h-3 lg:w-3 lg:h-3" />
      </button>
    </div>
  );
};

export default RandomPostList;
