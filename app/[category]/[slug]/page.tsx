import dynamic from 'next/dynamic';
import RandomPostList from '@/components/posts/RandomPostList';
import { fetchNotionAllPosts } from '@/lib/notion/api/fetchNotionAllPosts';
import { fetchNotionPageBySlug } from '@/lib/notion/api/fetchNotionPageBySlug';
import { fetchVideoUrl } from '@/lib/notion/utils/fetchVideoUrl';
import { transformBlocks } from '@/lib/notion/utils/transformBlocks';
import ClientImage from '@/components/ClientImage';
import Loading from './loading';

const NotionRenderer = dynamic(() => import('@/components/NotionRenderer'), {
  loading: () => <Loading />,
  ssr: false,
});

interface PageProps {
  params: { category: string; slug: string };
}

export const revalidate = 60;

const notionColorMap: { [key: string]: string } = {
  default: 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200',
  gray: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  brown: 'bg-yellow-700 text-yellow-500',
  orange: 'bg-orange-200 text-orange-500',
  yellow: 'bg-yellow-300 text-yellow-700',
  green: 'bg-green-300 text-green-600',
  blue: 'bg-blue-200 text-blue-500',
  purple: 'bg-purple-200 text-purple-500',
  pink: 'bg-pink-200 text-pink-500',
  red: 'bg-red-200 text-red-500',
};

export async function generateStaticParams() {
  const { posts } = await fetchNotionAllPosts();

  return posts
    .filter((post) => post.category.name.toLowerCase() !== 'none')
    .map((post) => ({
      category: post.category.name,
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
      return <div className="w-full text-center">Error: Page not found</div>;
    }

    const blocksResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/block/${pageData.id}`,
      //TEST: 노션 수정중
      { next: { revalidate: 60 } }
    );

    if (!blocksResponse.ok) {
      return <div className="w-full text-center">Error: Unable to fetch content</div>;
    }

    const rawBlocks = await blocksResponse.json();
    const blocks = await transformBlocks(rawBlocks);

    let filteredPosts = allPosts.posts.filter((post) => post.slug !== slug);
    if (filteredPosts.length < 3) {
      filteredPosts = allPosts.posts.slice(0, 3);
    }

    return (
      <>
        <div className="post-content-layout">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  notionColorMap[pageData.category.color] || notionColorMap.default
                }`}
              >
                {pageData.category.name}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {pageData.title}
            </h1>
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-4">
              <span className="mr-2">Jihyeong Son</span> •{' '}
              <span className="ml-2">
                {pageData.date ? new Date(pageData.date).toLocaleDateString('ko-KR') : 'no date'}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {pageData.tags.map((tag) => (
                <span
                  key={tag.name}
                  className={`px-2 py-1 text-xs rounded-full ${
                    notionColorMap[tag.color] || notionColorMap.default
                  }`}
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <div>
              <ClientImage
                // src={pageData.thumbnailUrl}
                src={`/api/image-proxy?url=${encodeURIComponent(pageData.thumbnailUrl)}&slug=${encodeURIComponent(slug)}`}
                alt={pageData.title}
                width={600}
                height={400}
              />
            </div>
          </div>

          <NotionRenderer
            blocks={blocks}
            videoUrl={videoUrl}
            pageType={category.toLowerCase() === 'resume' ? 'resume' : undefined}
          />
        </div>
        {filteredPosts.length > 0 ? (
          <RandomPostList posts={filteredPosts} currentSlug={slug} basePath={`/${category}`} />
        ) : (
          <div>No related posts available.</div>
        )}
      </>
    );
  } catch (error) {
    return <div className="w-full text-center">Error loading content.</div>;
  }
}
