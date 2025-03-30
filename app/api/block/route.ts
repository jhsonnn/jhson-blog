import { notionClient } from '@/lib/notion/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    //요청에서 blockIds를 받아옴
    const { blockIds } = await req.json();

    if (!Array.isArray(blockIds) || blockIds.length === 0) {
      console.error("Invalid or missing 'blockIds' parameter.");
      return NextResponse.json(
        { error: "Invalid 'blockIds' parameter. It must be an array of block IDs." },
        { status: 400 }
      );
    }

    //Promise.all로 병렬 처리
    const blocks = await Promise.all(
      blockIds.map(async (id) => {
        try {
          const response = await notionClient.blocks.children.list({ block_id: id });
          return response.results;
        } catch (error) {
          console.error(`Error fetching blocks for id: ${id}`, error);
          return [];
        }
      })
    );

    //결과를 평탄화(flat)해서 반환
    return NextResponse.json(blocks.flat());
  } catch (error) {
    console.error('Error in /api/blocks:', error);
    return NextResponse.json({ error: 'Failed to fetch blocks.' }, { status: 500 });
  }
}
