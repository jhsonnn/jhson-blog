// import { NextRequest, NextResponse } from 'next/server';

// async function fetchNewPresignedUrl(slug: string): Promise<string | null> {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/page/${slug}`, {
//       cache: 'no-store',
//     });

//     if (!res.ok) {
//       console.error('Failed to re-fetch presigned URL. Status:', res.status);
//       return null;
//     }

//     const data = await res.json();
//     return data?.originalThumbnailUrl || null;
//   } catch (err) {
//     console.error('Error during presigned URL re-fetch:', err);
//     return null;
//   }
// }

// async function tryFetchImage(url: string, maxRetries = 2): Promise<Response | null> {
//   for (let attempt = 0; attempt <= maxRetries; attempt++) {
//     try {
//       const response = await fetch(url, { method: 'GET' });
//       if (response.ok) {
//         return response;
//       } else {
//         console.warn(`Fetch failed (attempt ${attempt + 1}):`, response.status);
//       }
//     } catch (err) {
//       console.error(`Fetch error (attempt ${attempt + 1}):`, err);
//     }
//   }
//   return null;
// }

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   let imageUrl = searchParams.get('url');
//   const slug = searchParams.get('slug');

//   if (!imageUrl || !imageUrl.startsWith('http')) {
//     console.error('Invalid or missing imageUrl:', imageUrl);
//     return NextResponse.redirect('/default_image.png');
//   }

//   let response = await tryFetchImage(imageUrl);

//   if (!response && slug) {
//     console.warn('Presigned URL failed. Attempting to re-fetch new one...');
//     const newUrl = await fetchNewPresignedUrl(slug);

//     if (newUrl && newUrl !== imageUrl) {
//       imageUrl = newUrl;
//       response = await tryFetchImage(imageUrl);
//     }
//   }

//   if (!response) {
//     console.error('All fetch attempts failed. Falling back to default image.');
//     return NextResponse.redirect('/default_image.png');
//   }

//   try {
//     const buffer = await response.arrayBuffer();
//     const contentType = response.headers.get('content-type') || 'image/png';
//     const headers = new Headers();
//     headers.set('Content-Type', contentType);
//     return new Response(buffer, { headers });
//   } catch (err) {
//     console.error('Failed to process image response:', err);
//     return NextResponse.redirect('/default_image.png');
//   }
// }


// import { NextRequest, NextResponse } from 'next/server';

// async function fetchNewPresignedUrl(slug: string): Promise<string | null> {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/page/${slug}`, {
//       cache: 'no-store',
//     });
//     if (!res.ok) return null;
//     const data = await res.json();
//     return data?.originalThumbnailUrl || null;
//   } catch {
//     return null;
//   }
// }

// async function tryFetchImage(url: string, maxRetries = 2): Promise<Response | null> {
//   for (let i = 0; i <= maxRetries; i++) {
//     try {
//       const res = await fetch(url);
//       if (res.ok) return res;
//     } catch {}
//   }
//   return null;
// }

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   let imageUrl = searchParams.get('url');
//   const slug = searchParams.get('slug');

//   if (!imageUrl || !imageUrl.startsWith('http')) {
//     return NextResponse.redirect('/default_image.png');
//   }

//   let response = await tryFetchImage(imageUrl);

//   if (!response && slug) {
//     const newUrl = await fetchNewPresignedUrl(slug);
//     if (newUrl && newUrl !== imageUrl) {
//       response = await tryFetchImage(newUrl);
//     }
//   }

//  if (!response) {
//   console.error('All fetch attempts failed. Falling back to default image.');
//   return NextResponse.redirect('/default_image.png');
// }

//   try {
//     const buffer = await response.arrayBuffer();
//     const contentType = response.headers.get('content-type') || 'image/png';
//     const headers = new Headers({ 'Content-Type': contentType });
//     return new Response(buffer, { headers });
//   } catch (error) {
//     console.error('Image buffer error:', error); 
//     return NextResponse.redirect('/default_image.png');
//   }
// // }
// import { NextRequest, NextResponse } from 'next/server';

// async function fetchNewPresignedUrl(slug: string): Promise<string | null> {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/page/${slug}`, {
//       cache: 'no-store',
//     });
//     if (!res.ok) return null;
//     const data = await res.json();
//     return data?.originalThumbnailUrl || null;
//   } catch {
//     return null;
//   }
// }

// async function tryFetchImage(url: string, maxRetries = 2): Promise<Response | null> {
//   for (let i = 0; i <= maxRetries; i++) {
//     try {
//       const res = await fetch(url);
//       if (res.ok) return res;
//     } catch {}
//   }
//   return null;
// }

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   let imageUrl = searchParams.get('url');
//   const slug = searchParams.get('slug');

//   if (!imageUrl || !imageUrl.startsWith('http')) {
//     return NextResponse.redirect('/default_image.png');
//   }

//   let response = await tryFetchImage(imageUrl);

//   if (!response && slug) {
//     const newUrl = await fetchNewPresignedUrl(slug);
//     if (newUrl && newUrl !== imageUrl) {
//       response = await tryFetchImage(newUrl);
//     }
//   }

//   if (!response) {
//     console.error('All fetch attempts failed. Falling back to default image.');
//     return NextResponse.redirect('/default_image.png');
//   }

//   try {
//     const buffer = await response.arrayBuffer();
//     const contentType = response.headers.get('content-type') || 'image/png';
//     const headers = new Headers({ 'Content-Type': contentType });
//     return new Response(buffer, { headers });
//   } catch (error) {
//     console.error('Image buffer error:', error); 
//     return NextResponse.redirect('/default_image.png');
//   }
// }

import { NextRequest, NextResponse } from 'next/server';

async function tryFetchImage(url: string): Promise<Response | null> {
  try {
    const res = await fetch(url);
    if (res.ok) return res;
  } catch (e) {
    console.error('Image fetch failed:', e);
  }
  return null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  const fallback = searchParams.get('fallback');

  if (!url) return NextResponse.redirect('/default_image.png');

  // 1차 시도: presigned URL
  const res = await tryFetchImage(url);
  if (res) {
    const buffer = await res.arrayBuffer();
    return new Response(buffer, {
      headers: { 'Content-Type': res.headers.get('content-type') || 'image/png' },
    });
  }

  // 2차 시도: Notion proxy fallback
  if (fallback) {
    const fallbackRes = await tryFetchImage(fallback);
    if (fallbackRes) {
      const buffer = await fallbackRes.arrayBuffer();
      return new Response(buffer, {
        headers: { 'Content-Type': fallbackRes.headers.get('content-type') || 'image/png' },
      });
    }
  }

  // 최종 실패
  return NextResponse.redirect('/default_image.png');
}
