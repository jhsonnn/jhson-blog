import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(_req: NextRequest, { params }: { params?: { id?: string } }) {
  if (!params || !params.id) {
    console.error("Missing 'id' in params.");
    return NextResponse.json(
      { error: "Missing 'id' parameter." },
      { status: 400 }
    );
  }

  const { id } = params;

  try {
    const response = await notion.blocks.children.list({
      block_id: id,
    });
    
    if (!response.results || response.results.length === 0) {
      console.error("No blocks found for id:", id);
      return NextResponse.json(
        { error: "No blocks found for the provided id." },
        { status: 404 }
      );
    }

    return NextResponse.json(response.results);
  } catch (error) {
    console.error("Error fetching blocks for id:", id, error);
    return NextResponse.json(
      { error: "Failed to fetch blocks." },
      { status: 500 }
    );
  }
}
