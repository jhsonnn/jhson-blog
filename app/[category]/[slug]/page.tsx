import PostContent from "@/components/ui/PostContent";
import { isRichTextProperty } from "@/types/notionDataType";
import { fetchNotionDatabaseByCategory } from "@/utils/fetchNotionDatabase";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface PageProps {
  params: { category: string; slug: string };
}

export async function generateStaticParams() {
  const categories = ["projects", "resume", "profile"]; // 카테고리 목록
  const paths: Array<{ category: string; slug: string }> = [];

  for (const category of categories) {
    const items = await fetchNotionDatabaseByCategory(category);
    const categoryPaths = items
      .map((item) => {
        const slugProperty = item.post.properties?.slug;
        if (isRichTextProperty(slugProperty)) {
          return {
            category,
            slug: slugProperty.rich_text[0]?.plain_text.toLowerCase(),
          };
        }
        return null; // 슬러그가 없는 경우 null 반환
      })
      .filter((path): path is { category: string; slug: string } => path !== null); // null 필터링

    paths.push(...categoryPaths); // 경로 추가
  }

  // console.log("Generated paths:", paths); // 경로 확인 로그
  return paths;
}


export default async function ContentPage({ params }: PageProps) {
  const { category, slug } = params;

  const items = await fetchNotionDatabaseByCategory(category);
   // 전체 데이터 구조 출력
   console.log("Fetched Items:???", JSON.stringify(items, null, 2)); // 전체 데이터 구조 확인
  
  // slug와 일치하는 페이지 데이터 찾기
  const pageData = items.find((item) => {
    const slugProperty = item.post.properties?.slug;
    return (
      slugProperty?.type === "rich_text" &&
      slugProperty.rich_text[0]?.plain_text === slug
    );
  });

  if (!pageData) {
    console.error(`Page not found for slug: ${slug}`);
    return <div>Page not found for slug: {slug}</div>;
  }

   // 선택된 페이지의 상세 데이터 구조 확인
   console.log("Page Data:???", JSON.stringify(pageData, null, 2)); // pageData 확인
   const pageId = pageData.post.id;
   if (!pageId) {
     console.error("Page ID is undefined or invalid"); // 페이지 ID가 없는 경우 처리
     return <div>Error: Invalid Page ID</div>;
   }

  // return <PostContent slug={slug} pageData={pageData.post} />;
  return <PostContent pageId={pageId} />;
}
