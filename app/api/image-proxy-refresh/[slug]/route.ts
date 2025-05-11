// import { NextRequest, NextResponse } from 'next/server';
// import { fetchNotionPageBySlug } from '@/lib/notion/api/fetchNotionPageBySlug';

// export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
//   const { slug } = params;
  
//   const page = await fetchNotionPageBySlug(slug);
//   if (!page) {
//     return new NextResponse('Not Found', { status: 404 });
//   }

//   return NextResponse.json({
//     originalThumbnailUrl: page.originalThumbnailUrl ?? '',
//     fallbackThumbnailUrl: page.fallbackThumbnailUrl ?? '',
//   });
// }


//TEST : gif 리렌더링 안되는 문제로 인한 수정 코드 테스트
import { NextRequest, NextResponse } from 'next/server';
import { fetchNotionPageBySlug } from '@/lib/notion/api/fetchNotionPageBySlug';

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  if (!slug || typeof slug !== 'string') {
    return new NextResponse('Invalid slug', { status: 400 });
  }

  try {
    const page = await fetchNotionPageBySlug(slug);

    if (!page || (!page.originalThumbnailUrl && !page.fallbackThumbnailUrl)) {
      return new NextResponse('Thumbnail not found', { status: 404 });
    }

    return NextResponse.json({
      originalThumbnailUrl: page.originalThumbnailUrl ?? '',
      fallbackThumbnailUrl: page.fallbackThumbnailUrl ?? '',
    });
  } catch (error) {
    console.error('[image-proxy-refresh] Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
