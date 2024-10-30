import { fetchNotionDatabaseByCategory } from "@/utils/fetchNotionDatabase";
import { fetchPageBlocksWithChildren } from "@/utils/fetchPageBlocks";
import NotionRenderer from "@/components/NotionRenderer";

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
  const items = await fetchNotionDatabaseByCategory(category);
  const pageData = items.find((item) => item.slug === slug);

  if (!pageData) {
    console.error(`Page not found for slug: ${slug}`);
    return <div>Page not found for slug: {slug}</div>;
  }

  try {
    const blocks = await fetchPageBlocksWithChildren(pageData.post.id);
   console.log("blocks:???", blocks)
   
    return <NotionRenderer blocks={blocks} />;
  } catch (error: any) {
    console.error("Error loading page content:", error);
    return <div>Error loading content: {error.message}</div>;
  }
}
