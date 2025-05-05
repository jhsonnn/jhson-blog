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

'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import React from 'react'; // memo를 사용하기 위해 필요

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

function ClientImage({
  src,
  slug,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
}: ClientImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const isGif = imgSrc.toLowerCase().endsWith('.gif');

  useEffect(() => {
    if (src !== imgSrc) {
      setImgSrc(src);
    }
  }, [src]);

  const handleError = async () => {
    console.log('ClientImage Error');
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
          console.log(`[ClientImage] Loaded from: ${source}`);

          setImgSrc(refreshedUrl);
          return;
        }
      }
    } catch (e) {
      console.error('Presigned URL refresh failed:', e);
    }

    setImgSrc('/default_image.png');
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

  if (fill) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <Image
          key={slug}
          src={imgSrc}
          alt={alt}
          fill
          priority={priority}
          unoptimized
          className="object-cover rounded-xl"
          onError={handleError}
        />
      </div>
    );
  }

  return (
    <Image
      key={slug}
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      unoptimized
      className={`${className} mt-5 mb-10 w-full max-w-2xl h-auto rounded-xl object-contain`}
      onError={handleError}
    />
  );
}

export default React.memo(ClientImage);
