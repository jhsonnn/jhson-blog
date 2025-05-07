import { NextRequest, NextResponse } from 'next/server';
import { fetchNotionPageBySlug } from '@/lib/notion/api/fetchNotionPageBySlug';

// /api/image-proxy-refresh?slug=... 에서 presigned URL을 다시 받아오는 핸들러
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  }

  const page = await fetchNotionPageBySlug(slug);

  if (!page || !page.originalThumbnailUrl) {
    return NextResponse.json({ error: 'Page not found or missing image' }, { status: 404 });
  }

  return NextResponse.json({ url: page.originalThumbnailUrl });
}
