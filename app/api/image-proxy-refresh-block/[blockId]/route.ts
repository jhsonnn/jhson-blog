// import { NextRequest, NextResponse } from 'next/server';
// import { notionClient } from '@/lib/notion/client';
// import { isBlockObjectResponse } from '@/lib/notion/types';

// export async function GET(
//   _req: NextRequest,
//   { params }: { params: { blockId: string } }
// ) {
//   const { blockId } = params;

//   if (!blockId || typeof blockId !== 'string') {
//     return new NextResponse('Invalid block ID', { status: 400 });
//   }

//   try {
//     const blockRes = await notionClient.blocks.retrieve({ block_id: blockId });

//     if (!isBlockObjectResponse(blockRes) || blockRes.type !== 'image') {
//       return new NextResponse('Image block not found', { status: 404 });
//     }

//     const image = blockRes.image;
//     let originalThumbnailUrl = '';
//     if (image.type === 'file') {
//       originalThumbnailUrl = image.file.url;
//     } else if (image.type === 'external') {
//       originalThumbnailUrl = image.external.url;
//     }

//     const fallbackThumbnailUrl = originalThumbnailUrl.startsWith(
//       'https://prod-files-secure.s3.'
//     )
//       ? originalThumbnailUrl.replace(
//           'https://prod-files-secure.s3.',
//           'https://www.notion.so/image/'
//         )
//       : originalThumbnailUrl;

//     return NextResponse.json({
//       originalThumbnailUrl,
//       fallbackThumbnailUrl,
//     });
//   } catch (error) {
//     console.error('[image-proxy-refresh-block] Error:', error);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }


//TEST : video 처리
import { NextRequest, NextResponse } from 'next/server';
import { notionClient } from '@/lib/notion/client';
import { isBlockObjectResponse } from '@/lib/notion/types';

export async function GET(
  _req: NextRequest,
  { params }: { params: { blockId: string } }
) {
  const { blockId } = params;

  if (!blockId || typeof blockId !== 'string') {
    return new NextResponse('Invalid block ID', { status: 400 });
  }

  try {
    const blockRes = await notionClient.blocks.retrieve({ block_id: blockId });

    if (!isBlockObjectResponse(blockRes)) {
      return new NextResponse('Block not found', { status: 404 });
    }

    let originalThumbnailUrl = '';
    let fallbackThumbnailUrl = '';

    if (blockRes.type === 'image') {
      const image = blockRes.image;
      originalThumbnailUrl = image.type === 'file' ? image.file.url : image.external.url;
      fallbackThumbnailUrl = originalThumbnailUrl.startsWith('https://prod-files-secure.s3.')
        ? originalThumbnailUrl.replace('https://prod-files-secure.s3.', 'https://www.notion.so/image/')
        : originalThumbnailUrl;
    } else if (blockRes.type === 'video') {
      const video = blockRes.video;
      originalThumbnailUrl = video.type === 'file' ? video.file.url : video.external.url;
      fallbackThumbnailUrl = originalThumbnailUrl;
    } else {
      return new NextResponse('Unsupported block type', { status: 404 });
    }

    return NextResponse.json({
      originalThumbnailUrl,
      fallbackThumbnailUrl,
    });
  } catch (error) {
    console.error('[image-proxy-refresh-block] Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
