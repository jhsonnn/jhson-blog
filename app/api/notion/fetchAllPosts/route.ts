import { NextResponse } from "next/server";
import { fetchNotionAllPosts } from "@/lib/notion/api/fetchNotionAllPosts";

export async function GET() {
  try {
    console.log("Fetching Notion posts...");
    const posts = await fetchNotionAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching Notion posts:", error);
    return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 });
  }
}
