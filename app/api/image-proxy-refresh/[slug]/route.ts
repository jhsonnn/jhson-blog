import { NextRequest, NextResponse } from 'next/server';
import { fetchNotionPageBySlug } from '@/lib/notion/api/fetchNotionPageBySlug';

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  const page = await fetchNotionPageBySlug(slug);
  if (!page) {
    return new NextResponse('Not Found', { status: 404 });
  }

  return NextResponse.json({
    originalThumbnailUrl: page.originalThumbnailUrl ?? '',
    fallbackThumbnailUrl: page.fallbackThumbnailUrl ?? '',
  });
}
