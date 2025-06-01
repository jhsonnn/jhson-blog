//refetch 요청 3번까지 함
'use client';

import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    const checkVideoUrl = async () => {
      try {
        const res = await fetch(videoSrc, { method: 'HEAD' });
        if (!res.ok) {
          throw new Error(`Status ${res.status}`);
        }
        console.log(`[ClientVideo] HEAD check success for ${blockId}`);
      } catch (err) {
        console.warn(`[ClientVideo] HEAD check failed for ${blockId}:`, err);
        handleError();
      }
    };

    checkVideoUrl();
  }, [videoSrc]);

  const handleError = async () => {
    console.warn(`[ClientVideo] handleError triggered for ${blockId}, retryCount: ${retryCount}`);

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
    <div key={`${refreshKey}-${videoSrc}`}>
      <video autoPlay loop muted playsInline className={className} aria-label={alt} title={alt}>
        <source key={`${refreshKey}-${videoSrc}`} src={videoSrc} type="video/webm" />
        {alt}
      </video>
    </div>
  );
}
