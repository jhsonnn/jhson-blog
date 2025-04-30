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
// import { useState } from 'react';

// interface ClientImageProps {
//   src: string; //originalThumbnailUrl
//   alt: string;
//   slug: string; //image-proxy가 재발급 시 사용할 값
//   width?: number;
//   height?: number;
// }

// export default function ClientImage({ src, slug, alt, width, height }: ClientImageProps) {
//   const initialProxyUrl = `/api/image-proxy?url=${encodeURIComponent(src)}&slug=${encodeURIComponent(slug)}`;
//   const [imgSrc, setImgSrc] = useState(initialProxyUrl);

//   const isGif = imgSrc.toLowerCase().endsWith('.gif');

//   if (isGif) {
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
//       unoptimized
//     />
//   );
// }

'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ClientImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export default function ClientImage({ src, alt, width, height }: ClientImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  //gif인 경우 일반 <img>사용 (proxy를 거쳐도 gif 최적화가 되지 않음)
  const isGif = imgSrc.toLowerCase().includes('.gif');

  useEffect(() => {
    setImgSrc(src); //slug가 변경될 경우 새 presigned URL을 적용
  }, [src]);

  if (isGif) {
    return (
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className="my-5 max-w-screen-md min-h-[150px] rounded-xl w-auto"
        onError={() => setImgSrc('/default_image.png')}
      />
    );
  }

  return (
    <Image
      key={imgSrc}
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className="mt-5 mb-10 w-full max-w-2xl h-auto rounded-xl object-contain"
      onError={() => setImgSrc('/default_image.png')}
      unoptimized //presigned URL이 최적화 서버와 충돌할 수 있으므로
    />
  );
}
