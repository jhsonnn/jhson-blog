// app/api/route.ts
import { NextResponse } from "next/server";
import { notion } from "@/lib/notion/client";

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
    });

    return NextResponse.json(response.results);
  } catch (error) {
    console.error("Error fetching Notion data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
