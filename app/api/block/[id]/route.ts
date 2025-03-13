// import { fetchBlockTree } from "@/lib/notion/utils/fetchBlockTree";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
//   const { id } = params;
//   if (!id) {
//     return NextResponse.json({ error: 'Missing block ID' }, { status: 400 });
//   }

//   try {
//     const blocks = await fetchBlockTree(id);
//     return NextResponse.json(blocks);
//   } catch (error) {
//     console.error('Error fetching block tree:', error);
//     return NextResponse.json({ error: 'Failed to fetch blocks' }, { status: 500 });
//   }
// }


//test
import { fetchBlockTree } from "@/lib/notion/utils/fetchBlockTree";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, context: { params?: { id?: string } }) {
  const id = context.params?.id;

  if (!id) {
    return NextResponse.json({ error: "Missing block ID" }, { status: 400 });
  }

  try {
    const blocks = await fetchBlockTree(id);
    return NextResponse.json(blocks);
  } catch (error) {
    console.error("Error fetching block tree:", error);
    return NextResponse.json({ error: "Failed to fetch blocks" }, { status: 500 });
  }
}
