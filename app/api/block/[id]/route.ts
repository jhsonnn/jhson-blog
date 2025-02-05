// import { notionClient } from "@/lib/notion/client";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(_req: NextRequest, { params }: { params?: { id?: string } }) {
//   if (!params || !params.id) {
//     console.error("Missing 'id' in params.");
//     return NextResponse.json(
//       { error: "Missing 'id' parameter." },
//       { status: 400 }
//     );
//   }

//   const { id } = params;

//   try {
//     const response = await notionClient.blocks.children.list({
//       block_id: id,
//     });
    
//     if (!response.results || response.results.length === 0) {
//       console.error("No blocks found for id:", id);
//       return NextResponse.json(
//         { error: "No blocks found for the provided id." },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(response.results);
//   } catch (error) {
//     console.error("Error fetching blocks for id:", id, error);
//     return NextResponse.json(
//       { error: "Failed to fetch blocks." },
//       { status: 500 }
//     );
//   }
// }

//최적화 테스트
import { fetchBlockTree } from "@/lib/notion/utils/fetchBlockTree";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Missing block ID' }, { status: 400 });
  }

  try {
    const blocks = await fetchBlockTree(id);
    console.log('Blocks from API:', blocks); // API 호출 결과 디버깅
    return NextResponse.json(blocks);
  } catch (error) {
    console.error('Error fetching block tree:', error);
    return NextResponse.json({ error: 'Failed to fetch blocks' }, { status: 500 });
  }
}
