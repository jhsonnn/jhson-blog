// //presigned URL 받아서 이미지로 fetch 해주고
// //만료됐으면 slug로 다시 Notion 페이지 조회해서 새 presigned URL 발급받아 요청함
// //실패하면 /default_image.png로 fallback

// import { NextRequest, NextResponse } from 'next/server';

// //URL 재발급을 위한 helper 함수(노션 페이지 정보 다시 조회)
// // async function fetchNewPresignedUrl(slug: string): Promise<string | null> {
// //   try {
// //     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/page/${slug}`);
// //     const data = await res.json();
// //     return data?.thumbnailUrl || null;
// //   } catch (err) {
// //     console.error('Failed to re-fetch presigned URL:', err);
// //     return null;
// //   }
// // }
// // image-proxy.ts 내부
// async function fetchNewPresignedUrl(slug: string): Promise<string | null> {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/page/${slug}`, {
//       cache: 'no-store',
//     });
//     const data = await res.json();
//     return data?.thumbnailUrl || null;
//   } catch (err) {
//     console.error('Failed to re-fetch presigned URL:', err);
//     return null;
//   }
// }

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   let imageUrl = searchParams.get('url');
//   const slug = searchParams.get('slug');

//   //console.log('요청받은 imageUrl:', imageUrl);

//   if (!imageUrl || !imageUrl.startsWith('http')) {
//     return NextResponse.redirect('/default_image.png');
//   }

//   let response = await fetch(imageUrl, { method: 'GET' });

//   //URL이 만료됐을 경우 재발급 시도
//   if (!response.ok && slug) {
//     console.warn('Presigned URL expired, trying to re-fetch...');
//     const newUrl = await fetchNewPresignedUrl(slug);
//     if (newUrl && newUrl !== imageUrl) {
//       imageUrl = newUrl;
//       response = await fetch(imageUrl, { method: 'GET' });
//     }
//   }

//   //여전히 실패하는거라면면 기본 이미지로 fallback
//   if (!response.ok) {
//     console.error('Image fetch failed after retry. Status:', response.status);
//     return NextResponse.redirect('/default_image.png');
//   }

//   const buffer = await response.arrayBuffer();
//   const contentType = response.headers.get('content-type') || '';
  
//   // return new Response(buffer, {
//   //   headers: {
//   //     'Content-Type': response.headers.get('content-type') || 'image/png',
//   //   },
//   // });

//    const headers = new Headers();
//    if (contentType) {
//     headers.set('Content-Type', contentType);
//   }

//   return new Response(buffer, {
//     headers,
//   });
// }



// presigned URL 받아서 이미지 fetch 해주고
// 만료됐으면 slug로 다시 Notion 페이지 조회해서 새 presigned URL 발급받아 재시도
// 재시도에도 실패하면 /default_image.png로 fallback

import { NextRequest, NextResponse } from 'next/server';

async function fetchNewPresignedUrl(slug: string): Promise<string | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/page/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error('Failed to re-fetch presigned URL. Status:', res.status);
      return null;
    }
    const data = await res.json();
    return data?.originalThumbnailUrl || null;
  } catch (err) {
    console.error('Error during presigned URL re-fetch:', err);
    return null;
  }
}

//이미지 실제 fetch 함수(fetch 실패 시 재시도)
async function tryFetchImage(url: string, maxRetries = 2): Promise<Response | null> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, { method: 'GET' });
      if (response.ok) {
        return response;
      } else {
        console.warn(`Fetch failed (attempt ${attempt + 1}):`, response.status);
      }
    } catch (err) {
      console.error(`Fetch error (attempt ${attempt + 1}):`, err);
    }
  }
  return null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let imageUrl = searchParams.get('url');
  const slug = searchParams.get('slug');

  if (!imageUrl || !imageUrl.startsWith('http')) {
    console.error('Invalid imageUrl:', imageUrl);
    return NextResponse.redirect('/default_image.png');
  }

  //1. 첫 번째 presignedURL로 fetch 시도
  let response = await tryFetchImage(imageUrl);

  //2.실패하면 slug로 새 presignedURL 요청
  if (!response && slug) {
    console.warn('Presigned URL expired or fetch failed, trying to re-fetch new URL...');
    const newUrl = await fetchNewPresignedUrl(slug);

    if (newUrl && newUrl !== imageUrl) {
      console.info('Fetched new presigned URL, retrying image fetch...');
      response = await tryFetchImage(newUrl);
    } else {
      console.error('Failed to fetch a new valid presigned URL.');
    }
  }

  //3. 그래도 실패하면 fallback
  if (!response) {
    console.error('All fetch attempts failed. Falling back to default image.');
    return NextResponse.redirect('/default_image.png');
  }

  const buffer = await response.arrayBuffer();
  const contentType = response.headers.get('content-type') || '';

  const headers = new Headers();
  if (contentType) {
    headers.set('Content-Type', contentType);
  }

  return new Response(buffer, { headers });
}
