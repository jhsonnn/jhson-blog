// app/api/tags/route.ts
import { NextResponse } from "next/server";
import { fetchTags } from "@/lib/notion/api/fetchTags";

export async function GET() {
  try {
    const tags = await fetchTags();
    return NextResponse.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 });
  }
}