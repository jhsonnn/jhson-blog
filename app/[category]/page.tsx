import { fetchNotionDatabase } from "@/utils/fetchNotionDatabase";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { isTitleProperty, isNumberProperty } from "@/types/notionDataType";
import Link from "next/link";
import Post from "@/components/ui/Post";

// 카테고리 페이지 정의
const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const category = params.category;

  try {
    const items: PageObjectResponse[] = await fetchNotionDatabase(category);
    console.log("Fetched items for", category, JSON.stringify(items, null, 2));

    if (!items || items.length === 0) {
      return <div>No items found for this category</div>;
    }

    return (
      <div>
        <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Items</h1>
        <ul>
          {items.map((item) => {
            const titleProperty = item.properties.title;

            // 속성 타입을 확인하여 안전하게 접근
            let title = "No Title";
            if (isTitleProperty(titleProperty)) {
              title = titleProperty.title?.[0]?.plain_text || "No Title";
            } else {
              console.warn(
                "Title property not found or invalid for item",
                item
              );
            }

            const slug = `/${category}/${item.id}`;
            const date = item.created_time;

            // cover 속성에서 external 또는 file 타입 처리
            let thumbnailUrl = "/default-thumbnail.jpg"; // 기본 썸네일 이미지
            if (item.cover) {
              if (item.cover.type === "external") {
                thumbnailUrl = item.cover.external.url;
              } else if (item.cover.type === "file") {
                thumbnailUrl = item.cover.file.url;
              }
            }

            return (
              <li key={item.id}>
                <Link href={slug}>
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
  } catch (error) {
    console.error("Error fetching Notion database:", error);
    return <div>Error loading items</div>;
  }
};

// 동적 경로 생성을 위한 generateStaticParams
export const generateStaticParams = async () => {
  const categories = ["projects", "resume"];
  const paths = categories.map((category) => ({
    category,
  }));

  console.log("Generated paths:", paths);

  return paths;
};

export default CategoryPage;
