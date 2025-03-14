import NotionRenderer from '@/components/NotionRenderer';
import RandomPostList from '@/components/posts/RandomPostList';
import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
import { fetchNotionPageBySlug } from '@/lib/notion/api/fetchNotionPageBySlug';
import { fetchVideoUrl } from '@/lib/notion/utils/fetchVideoUrl';
import { transformBlocks } from '@/lib/notion/utils/transformBlocks';

interface PageProps {
  params: { category: string; slug: string };
}

//ISR 적용 (60초마다 정적 페이지 재생성)
export const revalidate = 60;

//모든 포스트 경로 사전 생성(SSG)
export async function generateStaticParams() {
  const posts = await fetchNotionAllPosts(); //사전 데이터 생성
  return posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export default async function ContentPage({ params }: PageProps) {
  const { category, slug } = params;

  try {
    //페이지 데이터 + 비디오 URL 가져오기(필수 데이터만 우선 패칭)
    const [pageData, videoUrl] = await Promise.all([
      fetchNotionPageBySlug(slug),
      fetchVideoUrl(slug),
    ]);

    if (!pageData) {
      console.error('Page data not found');
      return <div>Error: Page not found</div>;
    }

    //Notion 블록 데이터 가져오기(캐싱 적용)
    const blocksResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/block/${pageData.id}`,
      { cache: 'force-cache' } //불필요한 중복 API 요청 방지
    );

    if (!blocksResponse.ok) {
      console.error(`Failed to fetch blocks for pageId: ${pageData.id}`);
      return <div>Error: Unable to fetch content</div>;
    }

    const rawBlocks = await blocksResponse.json();
    const blocks = await transformBlocks(rawBlocks);

    //랜덤 포스트 데이터 가져오기
    const allPosts = await fetchNotionAllPosts();
    let filteredPosts = allPosts.filter((post) => post.slug !== slug);

    //랜덤 포스트가 3개 미만이면 다른 포스트를 보충
    if (filteredPosts.length < 3) {
      filteredPosts = allPosts.slice(0, 3);
    }

    //resume 페이지 여부 확인
    const isResumePage = category.toLowerCase() === 'resume';

    return (
      <div>
        <div className="post-content-layout">
          <NotionRenderer
            blocks={blocks}
            videoUrl={videoUrl}
            pageType={isResumePage ? 'resume' : undefined}
          />
        </div>
        {/* 하단 랜덤포스트트 */}
        {filteredPosts.length > 0 ? (
          <RandomPostList
            posts={filteredPosts}
            currentSlug={slug}
            basePath={`/${category}`}
          />
        ) : (
          <div>No related posts available.</div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error loading content:', error);
    return <div className="w-full text-center">Error loading content.</div>;
  }
}
