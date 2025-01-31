import { NextResponse } from "next/server";
import { notionClient } from "@/lib/notion/client";

export async function GET() {
  try {
    const response = await notionClient.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
    });

    return NextResponse.json(response.results);
  } catch (error) {
    console.error("Error fetching Notion data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
