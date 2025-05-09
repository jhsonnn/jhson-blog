// //TEST
// 'use client';

// import Image from 'next/image';
// import { useEffect, useState } from 'react';

// interface ClientImageProps {
//   src: string;
//   slug: string;
//   alt: string;
//   width?: number;
//   height?: number;
//   fill?: boolean;
//   className?: string;
//   priority?: boolean;
// }

// export default function ClientImage({
//   src,
//   slug,
//   alt,
//   width,
//   height,
//   fill = false,
//   className = '',
//   priority = false,
// }: ClientImageProps) {
//   const [imgSrc, setImgSrc] = useState(src);
//   const isGif = imgSrc.toLowerCase().endsWith('.gif');

//   useEffect(() => {
//     setImgSrc(src);
//   }, [src]);

//   const handleError = async () => {
//     if (!slug) {
//       setImgSrc('/default_image.png');
//       return;
//     }

//     try {
//       const res = await fetch(`/api/image-proxy-refresh/${slug}`, { cache: 'no-store' });

//       if (res.ok) {
//         const data = await res.json();
//         if (data?.originalThumbnailUrl) {
//           const refreshedUrl = `/api/image-proxy?url=${encodeURIComponent(
//             data.originalThumbnailUrl
//           )}&slug=${encodeURIComponent(slug)}&fallback=${encodeURIComponent(
//             data.fallbackThumbnailUrl ?? ''
//           )}&ts=${Date.now()}`;

//           // HEAD 요청으로 이미지 소스 로그
//           const headRes = await fetch(refreshedUrl, { method: 'HEAD', cache: 'no-store' });
//           const source = headRes.headers.get('X-Image-Source') ?? 'unknown';
//           console.log(`[ClientImage] Loaded from: ${source}`);

//           setImgSrc(refreshedUrl);
//           return;
//         }
//       }
//     } catch (e) {
//       console.error('Presigned URL refresh failed:', e);
//     }

//     setImgSrc('/default_image.png');
//   };

//   if (isGif) {
//     return (
//       <img
//         src={imgSrc}
//         alt={alt}
//         width={width}
//         height={height}
//         className={`${className} rounded-xl my-4 max-w-full`}
//         onError={handleError}
//       />
//     );
//   }

//   if (fill) {
//     return (
//       <div className={`relative w-full h-full overflow-hidden ${className}`}>
//         <Image
//           key={imgSrc}
//           src={imgSrc}
//           alt={alt}
//           fill
//           priority={priority}
//           unoptimized
//           className="object-cover rounded-xl"
//           onError={handleError}
//         />
//       </div>
//     );
//   }

//   return (
//     <Image
//       key={imgSrc}
//       src={imgSrc}
//       alt={alt}
//       width={width}
//       height={height}
//       priority={priority}
//       unoptimized
//       className={`${className} mt-5 mb-10 w-full max-w-2xl h-auto rounded-xl object-contain`}
//       onError={handleError}
//     />
//   );
// }

// 'use client';

// import Image from 'next/image';
// import { useEffect, useState, useRef } from 'react';

// interface ClientImageProps {
//   src: string;
//   slug: string;
//   alt: string;
//   width?: number;
//   height?: number;
//   fill?: boolean;
//   className?: string;
//   priority?: boolean;
// }

// const imageCache = new Map<string, string>();

// export default function ClientImage({
//   src,
//   slug,
//   alt,
//   width,
//   height,
//   fill = false,
//   className = '',
//   priority = false,
// }: ClientImageProps) {
//   const [imgSrc, setImgSrc] = useState(() => imageCache.get(slug) ?? src);
//   const isGif = src.toLowerCase().endsWith('.gif');

//   const triedRefresh = useRef(false); //재호출 방지용

//   useEffect(() => {
//     if (!imageCache.has(slug)) {
//       imageCache.set(slug, src);
//     }
//     setImgSrc(imageCache.get(slug)!);

//     if (isGif) {
//       const tester = new window.Image();
//       tester.src = src + `?ts=${Date.now()}`;
//       tester.onload = () => {
//         imageCache.set(slug, src);
//       };
//       tester.onerror = () => {
//         if (!triedRefresh.current) {
//           triedRefresh.current = true;
//           handleError();
//         }
//       };
//     }
//   }, [slug, src]);

//   const handleError = async () => {
//     if (!slug) {
//       setImgSrc('/default_image.png');
//       imageCache.set(slug, '/default_image.png');
//       return;
//     }

//     try {
//       const res = await fetch(`/api/image-proxy-refresh/${slug}`, { cache: 'no-store' });
//       if (res.ok) {
//         const data = await res.json();
//         if (data?.originalThumbnailUrl) {
//           const refreshedUrl = `/api/image-proxy?url=${encodeURIComponent(
//             data.originalThumbnailUrl
//           )}&slug=${encodeURIComponent(slug)}&fallback=${encodeURIComponent(
//             data.fallbackThumbnailUrl ?? ''
//           )}&ts=${Date.now()}`;

//           imageCache.set(slug, refreshedUrl);
//           setImgSrc(refreshedUrl);
//           return;
//         }
//       }
//     } catch (e) {
//       console.error('Presigned URL refresh failed:', e);
//     }

//     setImgSrc('/default_image.png');
//     imageCache.set(slug, '/default_image.png');
//   };

//   //GIF 렌더링
//   if (isGif) {
//     return (
//       <img
//         key={imgSrc}
//         src={imgSrc}
//         alt={alt}
//         width={width}
//         height={height}
//         onError={() => {
//           console.log(`[GIF Error] ${imgSrc}`);
//           handleError();
//         }}
//         className={`${className} rounded-xl my-4 max-w-full`}
//       />
//     );
//   }

//   //이미지 (next/image)
//   const imageProps = {
//     src: imgSrc,
//     alt,
//     width,
//     height,
//     priority,
//     unoptimized: true,
//     onError: handleError,
//     className: fill
//       ? 'object-cover rounded-xl'
//       : `${className} mt-5 mb-10 w-full max-w-2xl h-auto rounded-xl object-contain`,
//   };

//   return fill ? (
//     <div className={`relative w-full h-full overflow-hidden ${className}`}>
//       <Image {...imageProps} fill />
//     </div>
//   ) : (
//     <Image {...imageProps} />
//   );
// }

//TEST : gif 리렌더링 안되는 문제로 인한 수정 코드 테스트
'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

interface ClientImageProps {
  src: string;
  slug: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

const imageCache = new Map<string, string>();

export default function ClientImage({
  src,
  slug,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
}: ClientImageProps) {
  const [imgSrc, setImgSrc] = useState(() => imageCache.get(slug) ?? src);
  const triedRefresh = useRef(false);
  const isGif = src.toLowerCase().endsWith('.gif');

  //초기 src 검사 및 수동 만료 체크
  useEffect(() => {
    if (!imageCache.has(slug)) {
      imageCache.set(slug, src);
    }
    setImgSrc(imageCache.get(slug)!);

    const tester = new window.Image();
    const tsUrl = src + `?ts=${Date.now()}`;
    tester.src = tsUrl;

    const timeoutId = setTimeout(() => {
      if (!tester.complete || tester.naturalWidth === 0) {
        if (!triedRefresh.current) {
          triedRefresh.current = true;
          handleError();
        }
      }
    }, 1000);

    tester.onload = () => {
      clearTimeout(timeoutId);
      imageCache.set(slug, src);
    };

    tester.onerror = () => {
      clearTimeout(timeoutId);
      if (!triedRefresh.current) {
        triedRefresh.current = true;
        handleError();
      }
    };

    return () => clearTimeout(timeoutId);
  }, [slug, src]);

  //Presigned URL 재요청 로직
  const handleError = async () => {
    if (!slug) {
      imageCache.set(slug, '/default_image.png');
      setImgSrc('/default_image.png');
      return;
    }

    try {
      const res = await fetch(`/api/image-proxy-refresh/${slug}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data?.originalThumbnailUrl) {
          const refreshedUrl = `/api/image-proxy?url=${encodeURIComponent(
            data.originalThumbnailUrl
          )}&slug=${encodeURIComponent(slug)}&fallback=${encodeURIComponent(
            data.fallbackThumbnailUrl ?? ''
          )}&ts=${Date.now()}`;

          imageCache.set(slug, refreshedUrl);
          setImgSrc(refreshedUrl);
          return;
        }
      }
    } catch (e) {
      console.error('[ClientImage] Presigned URL refresh failed:', e);
    }

    imageCache.set(slug, '/default_image.png');
    setImgSrc('/default_image.png');
  };

  //GIF <img>
  if (isGif) {
    return (
      <img
        key={imgSrc}
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        onError={() => {
          //먼저 캐시 제거
          imageCache.set(slug, '/default_image.png');
          setImgSrc('/default_image.png');
        }}
        className={`${className} rounded-xl my-4 max-w-full`}
      />
    );
  }

  //기타 이미지 (next/image)
  const imageProps = {
    src: imgSrc,
    alt,
    width,
    height,
    priority,
    unoptimized: true,
    onError: handleError,
    className: fill
      ? 'object-cover rounded-xl'
      : `${className} mt-5 mb-10 w-full max-w-2xl h-auto rounded-xl object-contain`,
  };

  return fill ? (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <Image {...imageProps} fill key={imgSrc} />
    </div>
  ) : (
    <Image {...imageProps} key={imgSrc} />
  );
}
