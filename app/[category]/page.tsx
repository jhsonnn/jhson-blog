import { fetchNotionDatabase } from "@/utils/fetchNotionDatabase";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { isTitleProperty } from "@/types/notionDataType"; // 타입 가드 import
import Link from "next/link";
import Post from "@/components/ui/Post"; // Post 컴포넌트 import

// 타입 정의
type CategoryPageProps = {
  items: PageObjectResponse[];
  category: string;
};

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const category = params.category;

  try {
    const items = await fetchNotionDatabase(category);

    if (!items || items.length === 0) {
      return <div>No items found for this category</div>;
    }

    return (
      <div>
        <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Items</h1>
        <ul>
          {items.map((item) => {
            const titleProperty = item.properties.title;

            let title = "No Title";
            if (isTitleProperty(titleProperty)) {
              title = titleProperty.title?.[0]?.plain_text || "No Title";
            }

            const slug = `/${category}/${item.id}`; // 각 아이템의 slug 생성
            const date = item.created_time; // Notion 아이템의 생성 시간

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

  // 경로가 올바르게 생성되는지 확인
  console.log("Generated paths:", paths);

  return paths;
};

export default CategoryPage;
