// //세부 콘텐츠 페이지 하단 랜덤한 포스트
// 'use client';

// import React, { useEffect, useState, useCallback } from 'react';
// import Post from './Post';
// import { Post as PostType } from '@/lib/notion/types';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// interface RandomPostListProps {
//   posts: PostType[];
//   currentSlug: string;
//   basePath: string;
// }

// const RandomPostList: React.FC<RandomPostListProps> = ({ posts, currentSlug }) => {
//   const [randomPosts, setRandomPosts] = useState<PostType[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(1);
//   const [visibleCount, setVisibleCount] = useState(3);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);

//   const transitionDurationTime = 500;

//   //화면 크기에 따라 보여줄 포스트 개수 동적 조절
//   const updateVisibleCount = useCallback(() => {
//     if (window.innerWidth < 640) {
//       setVisibleCount(1);
//     } else if (window.innerWidth < 1024) {
//       setVisibleCount(2);
//     } else {
//       setVisibleCount(3);
//     }
//   }, []);

//   useEffect(() => {
//     updateVisibleCount();
//     window.addEventListener('resize', updateVisibleCount);
//     return () => window.removeEventListener('resize', updateVisibleCount);
//   }, [updateVisibleCount]);

//   useEffect(() => {
//     if (posts.length === 0) return;

//     const filteredPosts = posts.filter((post) => post.slug !== currentSlug);

//     if (filteredPosts.length < 3) {
//       setRandomPosts([...posts]);
//     } else {
//       //슬라이드 루프 위해서 첫 번째와 마지막 요소를 추가
//       setRandomPosts([
//         filteredPosts[filteredPosts.length - 1], //앞에 마지막 요소 추가
//         ...filteredPosts.sort(() => Math.random() - 0.5),
//         filteredPosts[0], //뒤에 첫 요소 추가
//       ]);
//     }
//   }, [posts, currentSlug]);

//   const handleNext = () => {
//     if (isTransitioning) return;
//     setIsTransitioning(true);
//     setCurrentIndex((prev) => prev + 1);
//   };

//   const handlePrev = () => {
//     if (isTransitioning) return;
//     setIsTransitioning(true);
//     setCurrentIndex((prev) => prev - 1);
//   };

//   useEffect(() => {
//     if (isTransitioning) {
//       const timeout = setTimeout(() => {
//         setIsTransitioning(false);

//         if (currentIndex === 0) {
//           setCurrentIndex(randomPosts.length - 2);
//         } else if (currentIndex === randomPosts.length - 1) {
//           setCurrentIndex(1);
//         }
//       }, transitionDurationTime);

//       return () => clearTimeout(timeout);
//     }
//   }, [currentIndex, isTransitioning, randomPosts.length]);

//   //자동 전환
//   useEffect(() => {
//     if (isPaused) return;

//     const interval = setInterval(() => {
//       handleNext();
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [isPaused]);

//   return (
//     <div
//       className="relative mt-10"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//     >
//       <h2 className="text-lg lg:text-xl font-bold mb-4">다른 Posts</h2>

//       <div className="overflow-hidden relative">
//         <div
//           className="flex transition-transform mb-10"
//           style={{
//             transform: `translateX(-${
//               (currentIndex - Math.floor(visibleCount / 2)) * (100 / visibleCount)
//             }%)`,
//             transition: isTransitioning ? `transform ${transitionDurationTime}ms ease` : 'none',
//           }}
//         >
//           {randomPosts.map((post, index) => (
//             <div
//               key={`${post.id}-${index}`}
//               className={`flex-shrink-0 px-2 ${
//                 visibleCount === 1 ? 'w-full h-[13rem] sm:h-[14rem] md:h-[16rem]' : ''
//               } ${visibleCount === 2 ? 'w-1/2 h-[220px] sm:h-[240px] md:h-[260px]' : ''}
//                  ${visibleCount === 3 ? 'w-1/3 h-[240px] sm:h-[260px] md:h-[280px]' : ''}`}
//             >
//               <Post {...post} isRandomPosts />
//             </div>
//           ))}
//         </div>

//         {/* 좌우 버튼 */}
//         <button
//           className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-neutral-200 dark:bg-neutral-600 text-neutral-50 dark:text-neutral-500 p-3 rounded-full hover:bg-neutral-400 dark:hover:bg-neutral-600 transition"
//           onClick={handlePrev}
//           aria-label="Previous"
//         >
//           <ChevronLeft className="w-2 h-2 md:w-3 md:h-3 lg:w-3 lg:h-3" />
//         </button>

//         <button
//           className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-neutral-200 dark:bg-neutral-600 text-neutral-50 dark:text-neutral-500 p-3 rounded-full hover:bg-neutral-400 dark:hover:bg-neutral-600 transition"
//           onClick={handleNext}
//           aria-label="Next"
//         >
//           <ChevronRight className="w-2 h-2 md:w-3 md:h-3 lg:w-3 lg:h-3" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RandomPostList;

//TEST : 모바일 터치스와이프 & 현재 slug 제외 모든 post 보여주도록 무한 슬라이더
// 'use client';

// import React, { useEffect, useState, useCallback, useRef } from 'react';
// import Post from './Post';
// import { Post as PostType } from '@/lib/notion/types';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// interface RandomPostListProps {
//   posts: PostType[];
//   currentSlug: string;
//   basePath: string;
// }

// const SLIDE_INTERVAL = 2000;
// const TRANSITION_DURATION = 400;

// const RandomPostList: React.FC<RandomPostListProps> = ({ posts, currentSlug }) => {
//   const [randomPosts, setRandomPosts] = useState<PostType[]>([]);
//   const [visibleCount, setVisibleCount] = useState(3);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   const sliderRef = useRef<HTMLDivElement>(null);

//   const updateVisibleCount = useCallback(() => {
//     const width = window.innerWidth;
//     if (width < 640) setVisibleCount(1);
//     else if (width < 1024) setVisibleCount(2);
//     else setVisibleCount(3);
//   }, []);

//   useEffect(() => {
//     updateVisibleCount();
//     window.addEventListener('resize', updateVisibleCount);
//     return () => window.removeEventListener('resize', updateVisibleCount);
//   }, [updateVisibleCount]);

//   useEffect(() => {
//     if (!posts.length) return;
//     const filtered = posts.filter((p) => p.slug !== currentSlug);
//     setRandomPosts([...filtered, ...filtered]); // for looping
//   }, [posts, currentSlug]);

//   useEffect(() => {
//     if (isPaused || randomPosts.length <= visibleCount) return;
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % randomPosts.length);
//     }, SLIDE_INTERVAL);
//     return () => clearInterval(interval);
//   }, [isPaused, randomPosts.length, visibleCount]);

//   const handleManualSlide = (direction: 'prev' | 'next') => {
//     if (randomPosts.length <= visibleCount) return;
//     setCurrentIndex((prev) => {
//       if (direction === 'prev') {
//         return (prev - 1 + randomPosts.length) % randomPosts.length;
//       } else {
//         return (prev + 1) % randomPosts.length;
//       }
//     });
//   };

//   const getTransform = () => {
//     return `translateX(-${(100 / visibleCount) * currentIndex}%)`;
//   };

//   return (
//     <div
//       className="relative mt-10"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//     >
//       <h2 className="text-lg lg:text-xl font-bold mb-4">다른 Posts</h2>

//       <div className="overflow-hidden relative">
//         <div
//           ref={sliderRef}
//           className="flex mb-10 will-change-transform transition-transform"
//           style={{
//             transform: getTransform(),
//             transition: `transform ${TRANSITION_DURATION}ms ease`,
//           }}
//         >
//           {randomPosts.map((post, index) => (
//             <div
//               key={`${post.id}-${index}`}
//               className={`flex-shrink-0 px-2 ${
//                 visibleCount === 1
//                   ? 'w-full h-[13rem] sm:h-[14rem] md:h-[16rem]'
//                   : visibleCount === 2
//                     ? 'w-1/2 h-[240px]'
//                     : 'w-1/3 h-[260px]'
//               }`}
//             >
//               <Post {...post} isRandomPosts disableKeyUpdate />
//             </div>
//           ))}
//         </div>

//         <button
//           className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-neutral-200 dark:bg-neutral-600 text-neutral-50 dark:text-neutral-500 p-3 rounded-full hover:bg-neutral-400 dark:hover:bg-neutral-600 transition"
//           onClick={() => handleManualSlide('prev')}
//           aria-label="Previous"
//         >
//           <ChevronLeft className="w-2 h-2 md:w-3 md:h-3 lg:w-3 lg:h-3" />
//         </button>

//         <button
//           className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-neutral-200 dark:bg-neutral-600 text-neutral-50 dark:text-neutral-500 p-3 rounded-full hover:bg-neutral-400 dark:hover:bg-neutral-600 transition"
//           onClick={() => handleManualSlide('next')}
//           aria-label="Next"
//         >
//           <ChevronRight className="w-2 h-2 md:w-3 md:h-3 lg:w-3 lg:h-3" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RandomPostList;

'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import Post from './Post';
import { Post as PostType } from '@/lib/notion/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RandomPostListProps {
  posts: PostType[];
  currentSlug: string;
  basePath: string;
}

const SLIDE_INTERVAL = 3000;
const TRANSITION_DURATION = 400;

const RandomPostList: React.FC<RandomPostListProps> = ({ posts, currentSlug }) => {
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayPosts, setDisplayPosts] = useState<PostType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(1); // index 1부터 시작 (앞에 dummy 있음)
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const updateVisibleCount = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) setVisibleCount(1);
    else if (width < 1024) setVisibleCount(2);
    else setVisibleCount(3);
  }, []);

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, [updateVisibleCount]);

  useEffect(() => {
    const filtered = posts.filter((p) => p.slug !== currentSlug && !!p.id);
    if (filtered.length === 0) return;

    // 복제 슬라이드 포함
    const extended = [
      filtered[filtered.length - 1], // 마지막 → 첫 시작 dummy
      ...filtered,
      filtered[0], // 첫 → 마지막 dummy
    ];
    setDisplayPosts(extended);
    setCurrentIndex(1); // 진짜 첫 번째에서 시작
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

  // 무한 루프 처리
  useEffect(() => {
    if (!isTransitioning) return;

    const handleLoop = setTimeout(() => {
      if (currentIndex === displayPosts.length - 1) {
        slideTo(1, false); // 마지막 dummy → 진짜 첫
      } else if (currentIndex === 0) {
        slideTo(displayPosts.length - 2, false); // 첫 dummy → 진짜 마지막
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

        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-neutral-200 dark:bg-neutral-600 text-neutral-50 dark:text-neutral-500 p-3 rounded-full hover:bg-neutral-400 dark:hover:bg-neutral-600 transition"
          onClick={handlePrev}
          aria-label="Previous"
        >
          <ChevronLeft className="w-2 h-2 md:w-3 md:h-3 lg:w-3 lg:h-3" />
        </button>

        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-neutral-200 dark:bg-neutral-600 text-neutral-50 dark:text-neutral-500 p-3 rounded-full hover:bg-neutral-400 dark:hover:bg-neutral-600 transition"
          onClick={handleNext}
          aria-label="Next"
        >
          <ChevronRight className="w-2 h-2 md:w-3 md:h-3 lg:w-3 lg:h-3" />
        </button>
      </div>
    </div>
  );
};

export default RandomPostList;
