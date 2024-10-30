import { fetchPageContentBlocks } from "@/utils/fetchPageContentBlocks";
import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

// 타입 가드: 블록이 'BlockObjectResponse' 타입인지 확인합니다.
function isFullBlockResponse(
  block: BlockObjectResponse | PartialBlockObjectResponse
): block is BlockObjectResponse {
  return block.object === "block"; // 'object'가 'block'이면 전체 블록으로 간주
}

// 타입 가드: 블록이 'paragraph' 타입인지 확인합니다.
function isParagraphBlock(
  block: BlockObjectResponse
): block is BlockObjectResponse & { type: "paragraph" } {
  return block.type === "paragraph";
}

// 타입 가드: 블록이 'heading_1' 타입인지 확인합니다.
function isHeading1Block(
  block: BlockObjectResponse
): block is BlockObjectResponse & { type: "heading_1" } {
  return block.type === "heading_1";
}

export default async function PostContent({ pageId }: { pageId: string }) {
  const blocks = await fetchPageContentBlocks(pageId);

  console.log("blocks:???", blocks); // 디버깅용 로그

  return (
    <div>
      {blocks.map((block) => {
        // 전체 블록 객체인지 확인
        if (!isFullBlockResponse(block)) {
          console.warn("Skipping incomplete block:", block); // 부분 블록 스킵
          return null;
        }

        // Paragraph 블록 처리
        if (isParagraphBlock(block)) {
          const richText = block.paragraph.rich_text || [];
          const plainText = richText[0]?.plain_text || "";
          return <p key={block.id}>{plainText}</p>;
        }

        // Heading_1 블록 처리
        if (isHeading1Block(block)) {
          const richText = block.heading_1.rich_text || [];
          const plainText = richText[0]?.plain_text || "";
          return <h1 key={block.id}>{plainText}</h1>;
        }

        // 다른 블록 타입 처리
        return <div key={block.id}>Unsupported block type</div>;
      })}
    </div>
  );
}


// import { ExtendedRecordMap } from "notion-types";
// import dynamic from "next/dynamic";

// // NotionRenderer를 동적 import합니다.
// const NotionRenderer = dynamic(() =>
//   import("react-notion-x").then((mod) => mod.NotionRenderer)
// );

// interface PostContentProps {
//   recordMap: ExtendedRecordMap;
// }

// export default function PostContent({ recordMap }: PostContentProps) {
//   return (
//     <div className="notion-container">
//       <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={true} />
//     </div>
//   );
// }
