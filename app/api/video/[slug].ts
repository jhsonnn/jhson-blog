import { NextResponse } from "next/server";
import { fetchVideoUrl } from "@/lib/notion/utils/fetchVideoUrl";

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: "Missing slug parameter" }, { status: 400 });
  }

  try {
    const videoUrl = await fetchVideoUrl(slug);

    if (!videoUrl) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    return NextResponse.json({ videoUrl }, { status: 200 });
  } catch (error) {
    console.error("Error fetching video URL:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
