import { NextRequest, NextResponse } from 'next/server';
import { fetchNotionPageBySlug } from '@/lib/notion/api/fetchNotionPageBySlug';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) return NextResponse.json({ url: null }, { status: 400 });

  const page = await fetchNotionPageBySlug(slug);
  const url = page?.originalThumbnailUrl || null;

  return NextResponse.json({ url });
}
