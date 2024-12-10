import { NextResponse } from "next/server";
import { notion } from "@/lib/notion/client";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const response = await notion.blocks.children.list({
      block_id: id,
    });

    if (!response.results) {
      return NextResponse.json(
        { error: `No blocks found for pageId: ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json(response.results);
  } catch (error) {
    console.error(`Failed to fetch blocks for pageId: ${id}`, error);
    return NextResponse.json(
      { error: `Failed to fetch blocks for pageId: ${id}` },
      { status: 500 }
    );
  }
}
