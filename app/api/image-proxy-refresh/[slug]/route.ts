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
