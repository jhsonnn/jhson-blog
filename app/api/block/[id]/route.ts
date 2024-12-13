// import { NextResponse } from "next/server";
// import { notion } from "@/lib/notion/client";

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   const { id } = params;

//   try {
//     const response = await notion.blocks.children.list({
//       block_id: id,
//     });

//     if (!response.results) {
//       return NextResponse.json(
//         { error: `No blocks found for pageId: ${id}` },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(response.results);
//   } catch (error) {
//     console.error(`Failed to fetch blocks for pageId: ${id}`, error);
//     return NextResponse.json(
//       { error: `Failed to fetch blocks for pageId: ${id}` },
//       { status: 500 }
//     );
//   }
// }

///진행중2

// app/api/block/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(_req: NextRequest, { params }: { params?: { id?: string } }) {
  console.log("Received Params:", params);

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

    console.log("Fetched Blocks:", response);

    console.log('Raw API Response for Block ID:', JSON.stringify(response, null, 2));

    
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
