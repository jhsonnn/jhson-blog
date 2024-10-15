import { fetchNotionDatabase } from "@/utils/fetchNotionDatabase";
import { isTitleProperty, isFilesProperty } from "@/types/notionDataType";
import Link from "next/link";
import Post from "@/components/ui/Post";

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const category = params.category;

  try {
    console.log(`Fetching items for category: ${category}`);

    const items = await fetchNotionDatabase(category);

    if (!items || items.length === 0) {
      console.warn(`No items found for category: ${category}`);
      return <div>No items found for this category</div>;
    }

    return (
      <div>
        <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Items</h1>
        <ul>
          {items.map(({ slug, post }) => {
            if (!post.properties) {
              console.warn("No properties found for item", post);
              return null;
            }

            const titleProperty = post.properties.title;
            let title = "No Title";
            if (titleProperty && isTitleProperty(titleProperty)) {
              title = titleProperty.title?.[0]?.plain_text || "No Title";
            }

            const date = post.created_time;

            let thumbnailUrl = "/default-thumbnail.jpg";
            const thumbnailProperty = post?.properties?.["\bthumbnailUrl"];
            if (
              thumbnailProperty &&
              isFilesProperty(thumbnailProperty) &&
              thumbnailProperty.files.length > 0
            ) {
              const file = thumbnailProperty.files[0];
              if (file.type === "file") {
                thumbnailUrl = file.file.url;
              }
            }

            return (
              <li key={post.id}>
                <Link href={`/${category}/${slug}`}>
                  <Post
                    title={title}
                    slug={slug}
                    date={date}
                    thumbnailUrl={thumbnailUrl}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } catch (error: any) {
    console.error(
      "Error fetching Notion database:",
      error.message,
      error.stack
    );
    return <div>Error loading items: {error.message}</div>;
  }
};

// 동적 경로 생성을 위한 generateStaticParams
export const generateStaticParams = async () => {
  const categories = ["projects", "resume"];
  const paths = [];

  for (const category of categories) {
    const items = await fetchNotionDatabase(category);
    const categoryPaths = items.map((item) => ({
      category,
      slug: item.slug.toLowerCase(), // 소문자로 변환하여 통일
    }));
    paths.push(...categoryPaths);
  }

  console.log("생성된 경로:", JSON.stringify(paths, null, 2)); // 생성된 경로 로그
  return paths;
};

export default CategoryPage;
