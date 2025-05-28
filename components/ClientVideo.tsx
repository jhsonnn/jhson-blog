// 'use client';

// import React, { useState, useRef } from 'react';

// interface ClientVideoProps {
//   src: string;
//   blockId: string;
//   alt: string;
//   className?: string;
// }

// export default function ClientVideo({ src, blockId, alt, className = '' }: ClientVideoProps) {
//   const [videoSrc, setVideoSrc] = useState(src);
//   const triedRefresh = useRef(false);

//   const handleError = async () => {
//     if (triedRefresh.current) return;
//     triedRefresh.current = true;

//     try {
//       const res = await fetch(`/api/image-proxy-refresh-block/${blockId}`);
//       if (res.ok) {
//         const data = await res.json();
//         setVideoSrc(
//           data.originalThumbnailUrl || data.fallbackThumbnailUrl || '/default_video.webm'
//         );
//       } else {
//         setVideoSrc('/default_video.webm');
//       }
//     } catch (err) {
//       console.error('[ClientVideo] Failed to refresh video:', err);
//       setVideoSrc('/default_video.webm');
//     }
//   };

//   return (
//     <video
//       autoPlay
//       loop
//       muted
//       playsInline
//       className={className}
//       aria-label={alt}
//       title={alt}
//       onError={handleError}
//     >
//       <source src={videoSrc} type="video/webm" />
//       {alt}
//     </video>
//   );
// }

// //TEST : video 처리
// 'use client';

// import React, { useState, useRef } from 'react';

// interface ClientVideoProps {
//   src: string;
//   blockId: string;
//   alt: string;
//   className?: string;
// }

// export default function ClientVideo({ src, blockId, alt, className = '' }: ClientVideoProps) {
//   const [videoSrc, setVideoSrc] = useState(() => src + `?ts=${Date.now()}`);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const triedRefresh = useRef(false);

//   const handleError = async () => {
//     if (triedRefresh.current) return;
//     triedRefresh.current = true;

//     try {
//       const res = await fetch(`/api/image-proxy-refresh-block/${blockId}`);
//       if (res.ok) {
//         const data = await res.json();
//         const refreshedUrl =
//           (data.originalThumbnailUrl || data.fallbackThumbnailUrl || '/default_video.webm') +
//           `?ts=${Date.now()}`;
//         setVideoSrc(refreshedUrl);
//         setRefreshKey((prev) => prev + 1);
//       } else {
//         setVideoSrc('/default_video.webm?ts=' + Date.now());
//         setRefreshKey((prev) => prev + 1);
//       }
//     } catch (err) {
//       console.error('[ClientVideo] Failed to refresh video:', err);
//       setVideoSrc('/default_video.webm?ts=' + Date.now());
//       setRefreshKey((prev) => prev + 1);
//     }
//   };

//   return (
//     <video
//       key={`${refreshKey}-${videoSrc}`}
//       autoPlay
//       loop
//       muted
//       playsInline
//       className={className}
//       aria-label={alt}
//       title={alt}
//       onError={handleError}
//     >
//       <source src={videoSrc} type="video/webm" />
//       {alt}
//     </video>
//   );
// }

//TEST : refetch 요청 3번까지 하도록 수정
'use client';

import React, { useState } from 'react';

interface ClientVideoProps {
  src: string;
  blockId: string;
  alt: string;
  className?: string;
}

export default function ClientVideo({ src, blockId, alt, className = '' }: ClientVideoProps) {
  const [videoSrc, setVideoSrc] = useState(() => {
    const initialUrl = src + `?ts=${Date.now()}`;
    console.log(`[ClientVideo] Initial videoSrc for ${blockId}: ${initialUrl}`);
    return initialUrl;
  });
  const [refreshKey, setRefreshKey] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const handleError = async () => {
    console.warn(`[ClientVideo] onError triggered for ${blockId}, retryCount: ${retryCount}`);

    if (retryCount >= maxRetries) {
      console.error(`[ClientVideo] Max retries (${maxRetries}) reached for ${blockId}. Giving up.`);
      return;
    }

    console.log(
      `[ClientVideo] Attempting presigned refresh for ${blockId} (retry ${retryCount + 1})`
    );

    try {
      const res = await fetch(`/api/image-proxy-refresh-block/${blockId}`);
      if (res.ok) {
        const data = await res.json();
        const refreshedUrl =
          (data.originalThumbnailUrl || data.fallbackThumbnailUrl || videoSrc) +
          `?ts=${Date.now()}`;

        console.log(`[ClientVideo] Received refreshed URL for ${blockId}: ${refreshedUrl}`);

        setVideoSrc(refreshedUrl);
        setRefreshKey((prev) => prev + 1);
        setRetryCount((prev) => prev + 1);
      } else {
        console.warn(`[ClientVideo] Refresh request failed for ${blockId}, status: ${res.status}`);
        setRetryCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error(`[ClientVideo] Failed to fetch refreshed URL for ${blockId}:`, err);
      setRetryCount((prev) => prev + 1);
    }
  };

  return (
    <video
      key={`${refreshKey}-${videoSrc}`}
      autoPlay
      loop
      muted
      playsInline
      className={className}
      aria-label={alt}
      title={alt}
      onError={handleError}
    >
      <source src={videoSrc} type="video/webm" />
      {alt}
    </video>
  );
}
