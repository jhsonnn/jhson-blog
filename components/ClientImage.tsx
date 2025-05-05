// //presigned URL 안전하게 렌더링 + fallback 처리 위해서
// 'use client';

// import Image from 'next/image';
// import { useState } from 'react';

// interface ClientImageProps {
//   src: string;
//   alt: string;
//   width?: number;
//   height?: number;
// }

// export default function ClientImage({ src, alt, width, height }: ClientImageProps) {
//   const [imgSrc, setImgSrc] = useState(src);

//   //gif 파일인지 확인
//   const isGif = imgSrc.toLowerCase().endsWith('.gif');

//   if (isGif) {
//     //gif는 <img> 태그 그대로 사용
//     return (
//       <img
//         src={imgSrc}
//         alt={alt}
//         width={width}
//         height={height}
//         className="my-5 max-w-screen-md min-h-[150px] rounded-xl w-auto"
//         onError={() => setImgSrc('/default_image.png')}
//       />
//     );
//   }

//   return (
//     <Image
//       key={imgSrc}
//       src={imgSrc}
//       alt={alt}
//       width={width}
//       height={height}
//       className="mt-5 mb-10 w-full max-w-2xl h-auto rounded-xl object-contain"
//       onError={() => setImgSrc('/default_image.png')}
//       unoptimized //presigned URL의 경우도 있으므로 그 경우는 최적화x
//     />
//   );
// }

// 'use client';

// import Image from 'next/image';
// import { useEffect, useState } from 'react';

// interface ClientImageProps {
//   src: string;
//   slug?: string;
//   alt: string;
//   width?: number;
//   height?: number;
// }

// export default function ClientImage({ src, slug, alt, width, height }: ClientImageProps) {
//   const [imgSrc, setImgSrc] = useState(src);
//   const isGif = imgSrc.toLowerCase().endsWith('.gif');

//   useEffect(() => {
//     setImgSrc(src);
//   }, [src]);

//   const handleError = async () => {
//     // slug가 있을 경우에만 재시도
//     if (!slug) return setImgSrc('/default_image.png');

//     try {
//       const res = await fetch(`/api/image-proxy-refresh?slug=${slug}`, { cache: 'no-store' });
//       if (res.ok) {
//         const data = await res.json();
//         if (data?.url) {
//           // 새 presigned URL로 재시도
//           setImgSrc(
//             `/api/image-proxy?url=${encodeURIComponent(data.url)}&slug=${encodeURIComponent(slug)}`
//           );
//           return;
//         }
//       }
//     } catch (e) {
//       console.error('Failed to fetch new presigned URL:', e);
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
//         className="rounded-xl my-4 max-w-full"
//         onError={handleError}
//       />
//     );
//   }

//   return (
//     <Image
//       key={imgSrc}
//       src={imgSrc}
//       alt={alt}
//       width={width}
//       height={height}
//       unoptimized
//       className="mt-5 mb-10 w-full max-w-2xl h-auto rounded-xl object-contain"
//       onError={handleError}
//     />
//   );
// }

// 'use client';

// import Image from 'next/image';
// import { useEffect, useState } from 'react';

// interface ClientImageProps {
//   src: string; // notion proxy url 우선
//   slug: string;
//   alt: string;
//   width?: number;
//   height?: number;
// }

// export default function ClientImage({ src, slug, alt, width, height }: ClientImageProps) {
//   const [imgSrc, setImgSrc] = useState(src);
//   const isGif = imgSrc.toLowerCase().endsWith('.gif');

//   useEffect(() => {
//     setImgSrc(src);
//   }, [src]);

//   const handleError = async () => {
//     if (!slug) return setImgSrc('/default_image.png');
//     try {
//       const res = await fetch(`/api/image-proxy-refresh?slug=${slug}`, { cache: 'no-store' });
//       if (res.ok) {
//         const data = await res.json();
//         if (data?.url) {
//           const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(data.url)}&slug=${slug}`;
//           setImgSrc(proxyUrl);
//           return;
//         }
//       }
//     } catch (e) {
//       console.error('Presigned fetch fallback failed:', e);
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
//         className="rounded-xl my-4 max-w-full"
//         onError={handleError}
//       />
//     );
//   }

//   return (
//     <Image
//       key={imgSrc}
//       src={imgSrc}
//       alt={alt}
//       width={width}
//       height={height}
//       unoptimized
//       className="mt-5 mb-10 w-full max-w-2xl h-auto rounded-xl object-contain"
//       onError={handleError}
//     />
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
//           const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(
//             data.originalThumbnailUrl
//           )}&slug=${encodeURIComponent(slug)}&fallback=${encodeURIComponent(
//             data.fallbackThumbnailUrl ?? ''
//           )}&ts=${Date.now()}`;
//           setImgSrc(proxyUrl);
//           return;
//         }
//       }
//     } catch (e) {
//       console.error('Presigned URL fetch failed:', e);
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
// import { useEffect, useState } from 'react';

// interface ClientImageProps {
//   src: string;
//   slug?: string;
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
//     if (!slug) return setImgSrc('/default_image.png');

//     try {
//       const res = await fetch(`/api/image-proxy-refresh/${slug}`, { cache: 'no-store' });
//       if (res.ok) {
//         const data = await res.json();
//         if (data?.originalThumbnailUrl) {
//           const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(
//             data.originalThumbnailUrl
//           )}&slug=${encodeURIComponent(slug)}&fallback=${encodeURIComponent(
//             data.fallbackThumbnailUrl ?? ''
//           )}`;
//           setImgSrc(proxyUrl);
//           return;
//         }
//       }
//     } catch (e) {
//       console.error('Presigned URL fetch failed:', e);
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
//     if (!slug) return setImgSrc('/default_image.png');
//     console.warn('[Image Load Error] Triggering fallback for slug:', slug);

//     try {
//       const res = await fetch(`/api/image-proxy-refresh/${slug}`, { cache: 'no-store' });
//       if (res.ok) {
//         const data = await res.json();
//         if (data?.originalThumbnailUrl) {
//           const refreshedUrl = `/api/image-proxy?url=${encodeURIComponent(
//             data.originalThumbnailUrl
//           )}&slug=${encodeURIComponent(slug)}&fallback=${encodeURIComponent(
//             data.fallbackThumbnailUrl ?? ''
//           )}&ts=${Date.now()}`; //강제 무효화

//           setImgSrc(refreshedUrl);
//           return;
//         }
//       }
//     } catch (e) {
//       console.error('Presigned URL fetch failed:', e);
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

// //test
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
    setImgSrc(src);
  }, [src]);

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
