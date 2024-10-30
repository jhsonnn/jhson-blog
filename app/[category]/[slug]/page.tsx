

import { fetchNotionDatabaseByCategory } from "@/utils/fetchNotionDatabase";
import { fetchPageMarkdown } from "@/utils/notionToMarkdown";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface PageProps {
  params: { category: string; slug: string };
}

export async function generateStaticParams() {
  const categories = ["projects", "resume", "profile"];
  const paths: Array<{ category: string; slug: string }> = [];

  for (const category of categories) {
    const items = await fetchNotionDatabaseByCategory(category);
    const categoryPaths = items.map((item) => ({
      category,
      slug: item.slug.toLowerCase(),
    }));

    paths.push(...categoryPaths);
  }

  return paths;
}

export default async function ContentPage({ params }: PageProps) {
  const { category, slug } = params;

  // 해당 카테고리의 데이터 가져오기
  const items = await fetchNotionDatabaseByCategory(category);

  // 슬러그와 일치하는 페이지 데이터 찾기
  const pageData = items.find((item) => item.slug === slug);

  if (!pageData) {
    console.error(`Slug에 해당하는 페이지를 찾을 수 없습니다: ${slug}`);
    return <div>Page not found for slug: {slug}</div>;
  }

  try {
    // post 객체 내부의 id를 사용하여 Markdown 콘텐츠 가져오기
    const markdownContent = await fetchPageMarkdown(pageData.post.id);

    return <MarkdownRenderer markdownContent={markdownContent} />;
  } catch (error: any) {
    console.error("페이지 로딩 실패:", error);
    return <div>Error loading content: {error.message}</div>;
  }
}

