import { NextRequest, NextResponse } from 'next/server';

//URL 재발급을 위한 helper 함수(노션 페이지 정보 다시 조회)
async function fetchNewPresignedUrl(slug: string): Promise<string | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/page/${slug}`);
    const data = await res.json();
    return data?.thumbnailUrl || null;
  } catch (err) {
    console.error('Failed to re-fetch presigned URL:', err);
    return null;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let imageUrl = searchParams.get('url');
  const slug = searchParams.get('slug');

  //console.log('요청받은 imageUrl:', imageUrl);

  if (!imageUrl || !imageUrl.startsWith('http')) {
    return NextResponse.redirect('/default_image.png');
  }

  let response = await fetch(imageUrl, { method: 'GET' });

  //URL이 만료됐을 경우 재발급 시도
  if (!response.ok && slug) {
    console.warn('Presigned URL expired, trying to re-fetch...');
    const newUrl = await fetchNewPresignedUrl(slug);
    if (newUrl && newUrl !== imageUrl) {
      imageUrl = newUrl;
      response = await fetch(imageUrl, { method: 'GET' });
    }
  }

  //여전히 실패하는거라면면 기본 이미지로 fallback
  if (!response.ok) {
    console.error('Image fetch failed after retry. Status:', response.status);
    return NextResponse.redirect('/default_image.png');
  }

  const buffer = await response.arrayBuffer();
  return new Response(buffer, {
    headers: {
      'Content-Type': response.headers.get('content-type') || 'image/png',
    },
  });
}