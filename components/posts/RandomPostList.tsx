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

// //TEST : 깜빡임 방지 테스트
// 'use client';

// import React, { useEffect, useState, useCallback } from 'react';
// import Post from './Post';
// import { Post as PostType } from '@/lib/notion/types';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import './randomPostSlider.css';

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
//     if (posts.length === 0) return;

//     const filteredPosts = posts.filter((post) => post.slug !== currentSlug);

//     if (filteredPosts.length < 3) {
//       setRandomPosts([...posts]);
//     } else {
//       setRandomPosts([
//         filteredPosts[filteredPosts.length - 1],
//         ...filteredPosts.sort(() => Math.random() - 0.5),
//         filteredPosts[0],
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
//           className="random-slider-track flex mb-10"
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
//               <Post {...post} isRandomPosts disableKeyUpdate />
//             </div>
//           ))}
//         </div>

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
//     if (posts.length === 0) return;

//     const filteredPosts = posts.filter((post) => post.slug !== currentSlug);

//     if (filteredPosts.length < 3) {
//       setRandomPosts([...posts]);
//     } else {
//       setRandomPosts([
//         filteredPosts[filteredPosts.length - 1],
//         ...filteredPosts.sort(() => Math.random() - 0.5),
//         filteredPosts[0],
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
//           className="flex mb-10 will-change-transform [transform:translate3d(0,0,0)] [transition-delay:10ms]"
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
//               <Post {...post} isRandomPosts disableKeyUpdate />
//             </div>
//           ))}
//         </div>

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

// //TEST : 방향 전환 슬라이더로 변환 테스트 => 실패
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
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [visibleCount, setVisibleCount] = useState(3);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

//   const transitionDurationTime = 500;

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
//     if (posts.length === 0) return;
//     const filteredPosts = posts.filter((post) => post.slug !== currentSlug);
//     setRandomPosts(filteredPosts);
//   }, [posts, currentSlug]);

//   const handleNext = () => {
//     if (isTransitioning || randomPosts.length === 0) return;
//     setIsTransitioning(true);

//     setCurrentIndex((prev) => {
//       if (direction === 'forward') {
//         if (prev >= randomPosts.length - visibleCount) {
//           setDirection('backward');
//           return prev - 1;
//         }
//         return prev + 1;
//       } else {
//         if (prev <= 0) {
//           setDirection('forward');
//           return prev + 1;
//         }
//         return prev - 1;
//       }
//     });
//   };

//   const handlePrev = () => {
//     if (isTransitioning || randomPosts.length === 0) return;
//     setIsTransitioning(true);

//     setCurrentIndex((prev) => {
//       if (direction === 'backward') {
//         if (prev <= 0) {
//           setDirection('forward');
//           return prev + 1;
//         }
//         return prev - 1;
//       } else {
//         if (prev >= randomPosts.length - visibleCount) {
//           setDirection('backward');
//           return prev - 1;
//         }
//         return prev + 1;
//       }
//     });
//   };

//   useEffect(() => {
//     if (isTransitioning) {
//       const timeout = setTimeout(() => setIsTransitioning(false), transitionDurationTime);
//       return () => clearTimeout(timeout);
//     }
//   }, [isTransitioning]);

//   useEffect(() => {
//     if (isPaused) return;
//     const interval = setInterval(() => {
//       handleNext();
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [isPaused, direction, randomPosts.length, visibleCount]);

//   return (
//     <div
//       className="relative mt-10"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//     >
//       <h2 className="text-lg lg:text-xl font-bold mb-4">다른 Posts</h2>

//       <div className="overflow-hidden relative">
//         <div
//           className="flex mb-10 will-change-transform transition-transform [transform:translate3d(0,0,0)]"
//           style={{
//             transform: `translateX(-$${currentIndex * (100 / visibleCount)}%)`,
//             transition: isTransitioning ? `transform ${transitionDurationTime}ms ease` : 'none',
//           }}
//         >
//           {randomPosts.map((post, index) => (
//             <div
//               key={`${post.id}-${index}`}
//               className={`flex-shrink-0 px-2 ${
//                 visibleCount === 1 ? 'w-full h-[13rem] sm:h-[14rem] md:h-[16rem]' : ''
//               } ${visibleCount === 2 ? 'w-1/2 h-[220px] sm:h-[240px] md:h-[260px]' : ''} ${
//                 visibleCount === 3 ? 'w-1/3 h-[240px] sm:h-[260px] md:h-[280px]' : ''
//               }`}
//             >
//               <Post {...post} isRandomPosts disableKeyUpdate />
//             </div>
//           ))}
//         </div>

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

//TEST : 최적화된 방향 반전 슬라이더 + fallback 대응
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Post from './Post';
import { Post as PostType } from '@/lib/notion/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RandomPostListProps {
  posts: PostType[];
  currentSlug: string;
  basePath: string;
}

const RandomPostList: React.FC<RandomPostListProps> = ({ posts, currentSlug }) => {
  const [randomPosts, setRandomPosts] = useState<PostType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const transitionDurationTime = 500;

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
    if (!posts.length) return;
    const filtered = posts.filter((p) => p.slug !== currentSlug);
    setRandomPosts(filtered);
    setCurrentIndex(0);
  }, [posts, currentSlug]);

  const handleNext = () => {
    if (isTransitioning || randomPosts.length <= visibleCount) return;
    setIsTransitioning(true);

    setCurrentIndex((prev) => {
      if (direction === 'forward') {
        if (prev >= randomPosts.length - visibleCount) {
          setDirection('backward');
          return prev - 1;
        }
        return prev + 1;
      } else {
        if (prev <= 0) {
          setDirection('forward');
          return prev + 1;
        }
        return prev - 1;
      }
    });
  };

  const handlePrev = () => {
    if (isTransitioning || randomPosts.length <= visibleCount) return;
    setIsTransitioning(true);

    setCurrentIndex((prev) => {
      if (direction === 'backward') {
        if (prev <= 0) {
          setDirection('forward');
          return prev + 1;
        }
        return prev - 1;
      } else {
        if (prev >= randomPosts.length - visibleCount) {
          setDirection('backward');
          return prev - 1;
        }
        return prev + 1;
      }
    });
  };

  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => setIsTransitioning(false), transitionDurationTime);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  useEffect(() => {
    if (isPaused || randomPosts.length <= visibleCount) return;
    const interval = setInterval(() => handleNext(), 3000);
    return () => clearInterval(interval);
  }, [isPaused, direction, randomPosts.length, visibleCount]);

  return (
    <div
      className="relative mt-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h2 className="text-lg lg:text-xl font-bold mb-4">다른 Posts</h2>

      <div className="overflow-hidden relative">
        <div
          className="flex mb-10 will-change-transform transition-transform [transform:translate3d(0,0,0)]"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            transition: isTransitioning ? `transform ${transitionDurationTime}ms ease` : 'none',
          }}
        >
          {randomPosts.map((post, index) => (
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
