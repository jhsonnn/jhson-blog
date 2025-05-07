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

//react.memo 적용

// 'use client';

// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import React from 'react';

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

// function ClientImage({
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

//   //원본 src 기준으로 gif 여부 판단
//   const isGif = imgSrc.toLowerCase().endsWith('.gif');

//   useEffect(() => {
//     if (src !== imgSrc) {
//       setImgSrc(src);
//     }
//   }, [src]);

//   const handleError = async () => {
//     console.log('ClientImage Error');
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

//   // if (isGif) {
//   //   return (
//   //     <img
//   //       src={imgSrc}
//   //       alt={alt}
//   //       width={width}
//   //       height={height}
//   //       className={`${className} rounded-xl my-4 max-w-full`}
//   //       onError={handleError}
//   //     />
//   //   );
//   // }

//   if (isGif) {
//     return (
//       <div className={`relative ${className}`}>
//         <img
//           src={imgSrc}
//           alt={alt}
//           width={width}
//           height={height}
//           className="rounded-xl my-4 max-w-full h-auto object-contain"
//           onError={handleError}
//         />
//       </div>
//     );
//   }

//   if (fill) {
//     return (
//       <div className={`relative w-full h-full overflow-hidden ${className}`}>
//         <Image
//           key={slug}
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
//       key={slug}
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

// export default React.memo(ClientImage);

// //TEST3
// 'use client';

// import Image from 'next/image';
// import { useState } from 'react';
// import React from 'react';

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

// function ClientImage({
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

//   //src 기준으로 GIF 여부 판단
//   const isGif = src.toLowerCase().endsWith('.gif');

//   const handleError = async () => {
//     console.log('ClientImage Error');
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

//   //GIF는 항상 <img> 사용
//   if (isGif) {
//     return (
//       <div className={`relative ${className}`}>
//         <img
//           src={imgSrc}
//           alt={alt}
//           width={width}
//           height={height}
//           className="rounded-xl my-4 max-w-full h-auto object-contain"
//           onError={handleError}
//         />
//       </div>
//     );
//   }

//   if (fill) {
//     return (
//       <div className={`relative w-full h-full overflow-hidden ${className}`}>
//         <Image
//           key={slug}
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

//   // 기본
//   return (
//     <Image
//       key={slug}
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

// export default React.memo(ClientImage);

// //TEST 4
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
//   disableKeyUpdate?: boolean; //react-slick 내 불필요한 리렌더 방지용
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
//   disableKeyUpdate = false,
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
//         key={disableKeyUpdate ? undefined : imgSrc}
//         src={imgSrc}
//         alt={alt}
//         width={width}
//         height={height}
//         className={`${className} rounded-xl my-4 max-w-full`}
//         onError={handleError}
//       />
//     );
//   }

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
//       <Image {...imageProps} fill key={disableKeyUpdate ? undefined : imgSrc} />
//     </div>
//   ) : (
//     <Image {...imageProps} key={disableKeyUpdate ? undefined : imgSrc} />
//   );
// }

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
//         key={imgSrc}
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

// //TEST5
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

// const imageCache = new Map<string, string>(); // slug → valid image url

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
//   const isGif = imgSrc.toLowerCase().endsWith('.gif');

//   useEffect(() => {
//     if (!imageCache.has(slug)) {
//       imageCache.set(slug, src);
//     }
//     setImgSrc(imageCache.get(slug)!);
//   }, [slug, src]);

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

//           const headRes = await fetch(refreshedUrl, { method: 'HEAD', cache: 'no-store' });
//           const source = headRes.headers.get('X-Image-Source') ?? 'unknown';
//           console.log(`[ClientImage] Refreshed from: ${source}`);

//           setImgSrc(refreshedUrl);
//           imageCache.set(slug, refreshedUrl); //캐시 갱신
//           return;
//         }
//       }
//     } catch (e) {
//       console.error('Presigned URL refresh failed:', e);
//     }

//     setImgSrc('/default_image.png');
//     imageCache.set(slug, '/default_image.png');
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

//TEST6
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

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

const imageCache = new Map<string, string>(); //slug → valid image url

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
  const isGif = src.toLowerCase().endsWith('.gif');

  useEffect(() => {
    //캐시가 없다면 등록
    if (!imageCache.has(slug)) {
      imageCache.set(slug, src);
    }

    setImgSrc(imageCache.get(slug)!);

    //GIF는 onError가 안 걸리므로 수동으로 테스트
    if (isGif) {
      const testImg = new window.Image();
      const testUrl = src + `?ts=${Date.now()}`; //캐시 우회

      testImg.onload = () => {
        //정상 로딩됨 → 캐시 등록
        imageCache.set(slug, src);
      };
      testImg.onerror = () => {
        console.warn('[ClientImage] GIF failed to load, trying to refresh...');
        handleError(); //만료됐을 가능성 → 리프레시 시도
      };
      testImg.src = testUrl;
    }
  }, [slug, src]);

  const handleError = async () => {
    if (!slug) {
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

          const headRes = await fetch(refreshedUrl, { method: 'HEAD', cache: 'no-store' });
          const source = headRes.headers.get('X-Image-Source') ?? 'unknown';
          console.log(`[ClientImage] Refreshed from: ${source}`);

          setImgSrc(refreshedUrl);
          imageCache.set(slug, refreshedUrl);
          return;
        }
      }
    } catch (e) {
      console.error('Presigned URL refresh failed:', e);
    }

    setImgSrc('/default_image.png');
    imageCache.set(slug, '/default_image.png');
  };

  if (isGif) {
    return (
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} rounded-xl my-4 max-w-full`}
        onError={handleError}
      />
    );
  }

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
      <Image {...imageProps} fill />
    </div>
  ) : (
    <Image {...imageProps} />
  );
}
