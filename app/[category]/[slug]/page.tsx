import { fetchNotionPageBySlug } from "@/utils/fetchNotionPageBySlug";
import { fetchPageContentBlocks } from "@/utils/fetchPageContentBlocks";
import { isTitleProperty } from "@/types/notionDataType";
import { notFound } from "next/navigation";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// 블록 필터링해서 특정 타입 또는 ID의 블록만 렌더링
const renderFilteredBlocks = (blocks: any[]) => {
  // 원하는 블록 타입이나 ID에 맞는 데이터만 필터링
  const filteredBlocks = blocks.filter((block) => {
    return block.type === "paragraph" || block.type === "heading_2";
  });

  return filteredBlocks.map((block) => (
    <div key={block.id}>{renderBlock(block)}</div>
  ));
};

const renderBlock = (block: any) => {
  switch (block.type) {
    case "paragraph":
      return <p>{block.paragraph.rich_text[0]?.plain_text}</p>;
    case "heading_1":
      return <h1>{block.heading_1.rich_text[0]?.plain_text}</h1>;
    case "heading_2":
      return <h2>{block.heading_2.rich_text[0]?.plain_text}</h2>;
    default:
      return <div>Unsupported block type</div>;
  }
};

const PostPage = async ({
  params,
}: {
  params: { category: string; slug: string };
}) => {
  const { category, slug } = params;

  try {
    console.log(`Fetching post for category: ${category} with slug: ${slug}`);

    // slug로 페이지 메타데이터 가져오기
    const post = await fetchNotionPageBySlug(slug);
    if (!post || !("properties" in post)) {
      return notFound();
    }

    // 페이지 블록 가져오기
    const pageId = post.id;
    const blocks = await fetchPageContentBlocks(pageId);
    console.log("Fetched page blocks:", blocks);

    // 제목 설정
    const titleProperty = post.properties?.title;
    let title = "No Title";
    if (isTitleProperty(titleProperty)) {
      title = titleProperty.title?.[0]?.plain_text || "No Title";
    }

    return (
      <div>
        <h1>{title}</h1>
        {/* 필터링된 블록 데이터를 렌더링 */}
        <div>{renderFilteredBlocks(blocks)}</div>
      </div>
    );
  } catch (error: any) {
    console.error(
      "Error fetching Notion page or blocks:",
      error.message,
      error.stack
    );
    return <div>Error loading post: {error.message}</div>;
  }
};

export default PostPage;
