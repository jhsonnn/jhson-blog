import { NextRequest, NextResponse } from 'next/server';

async function tryFetchImage(url: string): Promise<Response | null> {
  try {
    const res = await fetch(url);
    if (res.ok) return res;
  } catch (e) {
    console.error('Image fetch failed:', e);
  }
  return null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  const fallback = searchParams.get('fallback');

  if (!url) return NextResponse.redirect('/default_image.png');

  //1차 시도: presigned URL
  const res = await tryFetchImage(url);
  if (res) {
    console.log("1차 시도");
    const buffer = await res.arrayBuffer();
    return new Response(buffer, {
      headers: {
        'Content-Type': res.headers.get('content-type') || 'image/png',
        'Cache-Control': 'public, max-age=86400, immutable', // ✅ 캐시 헤더
      },
    });
  }

  //2차 시도: Notion proxy fallback
  if (fallback) {
    console.log("2차 시도");
    const fallbackRes = await tryFetchImage(fallback);
    if (fallbackRes) {
      console.log("2-2차 시도");
      const buffer = await fallbackRes.arrayBuffer();
      return new Response(buffer, {
        headers: {
          'Content-Type': fallbackRes.headers.get('content-type') || 'image/png',
          'Cache-Control': 'public, max-age=86400, immutable', // ✅ 캐시 헤더
        },
      });
    }
  }

  //최종 실패
  return NextResponse.redirect('/default_image.png');
}
