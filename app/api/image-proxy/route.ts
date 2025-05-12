import { NextRequest, NextResponse } from 'next/server';

async function tryFetchImage(url: string, label: string): Promise<Response | null> {
  try {
    const res = await fetch(url);
    const contentType = res.headers.get('content-type') || '';

    if (!res.ok) {
      console.warn(`[image-proxy] ${label} 응답 실패 - status: ${res.status}, url: ${url}`);
      return null;
    }

    if (!contentType.startsWith('image/')) {
      console.warn(`[image-proxy] ${label} Content-Type 이상함: ${contentType}, url: ${url}`);
      return null;
    }

    const buffer = await res.arrayBuffer();

    //너무 작은 크기의 응답은 presigned URL 오류 페이지일 가능성
    if (buffer.byteLength < 1000) {
      console.warn(
        `[image-proxy] ${label} 응답 byte 수 비정상 (byteLength=${buffer.byteLength}), url: ${url}`
      );
      return null;
    }

    return new Response(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, immutable',
      },
    });
  } catch (e) {
    console.error(`[image-proxy] ${label} fetch 예외 발생 - url: ${url}`, e);
    return null;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  const fallback = searchParams.get('fallback');

  if (!url) {
    console.error('[image-proxy] url 누락');
    return NextResponse.redirect('/default_image.png');
  }

  //1차 시도: presigned URL
  const presignedRes = await tryFetchImage(url, 'presigned');
  if (presignedRes) return presignedRes;

  //2차 시도: Notion proxy fallback
  if (fallback) {
    const fallbackRes = await tryFetchImage(fallback, 'fallback');
    if (fallbackRes) return fallbackRes;
  }

  //최종 실패
  console.warn('[image-proxy] 모든 시도 실패, 기본 이미지로 대체');
  return NextResponse.redirect('/default_image.png');
}
