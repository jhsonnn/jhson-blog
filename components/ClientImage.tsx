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
  disableKeyUpdate?: boolean;
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
  disableKeyUpdate = false,
}: ClientImageProps) {
  const validSrc = src || '/default_image.png';
  const validAlt = alt || 'image';
  const validSlug = slug || '_default';

  const [imgSrc, setImgSrc] = useState(() => imageCache.get(validSlug) ?? validSrc);
  const triedRefresh = useRef(false);
  const [hasFailedOnce, setHasFailedOnce] = useState(false);
  const isWebm = validSrc.toLowerCase().endsWith('.webm');

  useEffect(() => {
    if (imageCache.has(validSlug)) return;

    const tester = new window.Image();
    const testUrl = imgSrc + `?ts=${Date.now()}`;
    tester.src = testUrl;

    const timeoutId = setTimeout(() => {
      if (!tester.complete || tester.naturalWidth === 0) {
        console.warn('[ClientImage] timeout 발생, handleError 호출', validSlug);
        if (!triedRefresh.current) {
          triedRefresh.current = true;
          handleError();
        }
      }
    }, 5000);

    tester.onload = () => {
      clearTimeout(timeoutId);
      console.info('[ClientImage] 이미지 로드 성공', validSlug);
      imageCache.set(validSlug, imgSrc);
      setImgSrc(imgSrc);
    };

    tester.onerror = () => {
      clearTimeout(timeoutId);
      console.warn('[ClientImage] 이미지 로드 실패, handleError 호출', validSlug);
      if (!triedRefresh.current) {
        triedRefresh.current = true;
        handleError();
      }
    };

    return () => clearTimeout(timeoutId);
  }, [validSlug]);

  const handleError = async () => {
    if (hasFailedOnce) return;
    setHasFailedOnce(true);

    const isBlockId = validSlug.includes('-'); // UUID block id는 '-' 포함

    try {
      const res = await fetch(
        isBlockId
          ? `/api/image-proxy-refresh-block/${validSlug}`
          : `/api/image-proxy-refresh/${validSlug}`,
        { cache: 'no-store' }
      );

      if (res.ok) {
        const data = await res.json();
        if (data?.originalThumbnailUrl) {
          const refreshedUrl = `/api/image-proxy?url=${encodeURIComponent(
            data.originalThumbnailUrl
          )}&slug=${encodeURIComponent(validSlug)}&fallback=${encodeURIComponent(
            data.fallbackThumbnailUrl ?? ''
          )}&ts=${Date.now()}`;

          console.info('[ClientImage] 새 URL 적용', validSlug);
          imageCache.set(validSlug, refreshedUrl);
          setImgSrc(refreshedUrl);
          return;
        }
      }
    } catch (e) {
      console.error('[ClientImage] Presigned refresh 실패', validSlug, e);
    }

    const fallback = '/default_image.png?ts=' + Date.now();
    imageCache.set(validSlug, fallback);
    setImgSrc(fallback);
  };

  if (isWebm) {
    if (hasFailedOnce) {
      return (
        <div className="bg-gray-100 text-center text-sm text-gray-600 py-6 rounded-xl">
          {validAlt}
        </div>
      );
    }

    return (
      <video
        key={disableKeyUpdate ? undefined : imgSrc}
        src={imgSrc}
        width={width}
        height={height}
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        onError={handleError}
        className={`${className} rounded-xl my-4 max-w-full h-auto`}
        aria-label={validAlt}
      >
        {validAlt}
      </video>
    );
  }

  const imageProps = {
    src: imgSrc,
    alt: validAlt,
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
      <Image {...imageProps} fill key={disableKeyUpdate ? undefined : imgSrc} />
    </div>
  ) : (
    <Image {...imageProps} key={disableKeyUpdate ? undefined : imgSrc} />
  );
}
