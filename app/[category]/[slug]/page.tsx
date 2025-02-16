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
  const posts = await fetchNotionAllPosts();
  return posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export default async function ContentPage({ params }: PageProps) {
  const { category, slug } = params;

  try {
    const [pageData, videoUrl, allPosts] = await Promise.all([
      fetchNotionPageBySlug(slug),
      fetchVideoUrl(slug),
      fetchNotionAllPosts(),
    ]);

    if (!pageData) {
      console.error('Page data not found');
      return <div>Error: Page not found</div>;
    }

    //resume 페이지 인지 확인(이미지 사이즈 조정 위해서)
    const isResumePage = category.toLowerCase() === 'resume';

    //현재 포스트 제외한 랜덤 포스트 선택 (최소 3개 보장)
    let filteredPosts = allPosts.filter((post) => post.slug !== slug);
    if (filteredPosts.length < 3) {
      filteredPosts = allPosts.slice(0, 3);
    }

    const blocksResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/block/${pageData.id}`,
      { cache: 'force-cache' }
    );

    if (!blocksResponse.ok) {
      console.error(`Failed to fetch blocks for pageId: ${pageData.id}`);
      return <div>Error: Unable to fetch content</div>;
    }

    const rawBlocks = await blocksResponse.json();
    const blocks = await transformBlocks(rawBlocks);

    return (
      <div>
        <div className="post-content-layout">
          <NotionRenderer
            blocks={blocks}
            videoUrl={videoUrl}
            pageType={isResumePage ? 'resume' : undefined}
          />
        </div>
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
