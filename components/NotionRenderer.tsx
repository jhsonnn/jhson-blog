import React from "react";
import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { hasChildren } from "@/types/notionDataType";

interface NotionRendererProps {
  blocks: (BlockObjectResponse | PartialBlockObjectResponse)[];
}

const NotionRenderer: React.FC<NotionRendererProps> = ({ blocks }) => (
  <div className="notion-container">
    {blocks.map((block) =>
      isFullBlockResponse(block) ? (
        <div key={block.id}>{renderBlock(block)}</div>
      ) : (
        <div key={block.id}>Unsupported block format</div>
      )
    )}
  </div>
);

// 타입 가드 함수: 블록이 `BlockObjectResponse`인지 확인
const isFullBlockResponse = (
  block: BlockObjectResponse | PartialBlockObjectResponse
): block is BlockObjectResponse => "type" in block;

const renderRichText = (richTextArray: RichTextItemResponse[]) =>
  richTextArray.map((richText, index) => {
    const { plain_text, href } = richText;
    if (href) {
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {plain_text}
        </a>
      );
    }
    return <span key={index}>{plain_text}</span>;
  });

// const renderBlock = (block: BlockObjectResponse) => {
//   switch (block.type) {
//     case "paragraph":
//       return <p>{renderRichText(block.paragraph.rich_text)}</p>;

//     case "heading_1":
//       return <h1>{renderRichText(block.heading_1.rich_text)}</h1>;

//     case "heading_2":
//       return <h2>{renderRichText(block.heading_2.rich_text)}</h2>;

//     case "heading_3":
//       return <h3>{renderRichText(block.heading_3.rich_text)}</h3>;


//       case "bulleted_list_item":
//         return (
//           <ul className="list-disc pl-5">
//             <li>{renderRichText(block.bulleted_list_item.rich_text)}</li>
//           </ul>
//         );
      
//       case "column_list":
//           return (
//             <div className="flex gap-4">
//               {hasChildren(block) && block.children.map((col, index) => (
//                 <div key={index} className="flex-1">
//                   {renderBlock(col)}
//                 </div>
//               ))}
//             </div>
//           );
    
//       case "column":
//           return (
//             <div className="flex-1 p-2">
//               {hasChildren(block) && block.children.map((child, index) => (
//                 <div key={index}>{renderBlock(child)}</div>
//               ))}
//             </div>
//           );
        

     

//     default:
//       console.warn(`Unsupported block type: ${block.type}`);
//       return <div>Unsupported block type: {block.type}</div>;
//   }
// };

const renderBlock = (block: BlockObjectResponse) => {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-base leading-relaxed my-2">
          {renderRichText(block.paragraph.rich_text)}
        </p>
      );

    case "heading_1":
      return (
        <h1 className="text-4xl font-bold my-4">
          {renderRichText(block.heading_1.rich_text)}
        </h1>
      );

    case "heading_2":
      return (
        <h2 className="text-3xl font-semibold my-3">
          {renderRichText(block.heading_2.rich_text)}
        </h2>
      );

    case "heading_3":
      return (
        <h3 className="text-2xl font-medium my-2">
          {renderRichText(block.heading_3.rich_text)}
        </h3>
      );

    case "bulleted_list_item":
      return (
        <ul className="list-disc pl-6 my-2">
          <li>{renderRichText(block.bulleted_list_item.rich_text)}</li>
        </ul>
      );

    case "column_list":
      return (
        <div className="flex gap-6">
          {hasChildren(block) &&
            block.children.map((col, index) => (
              <div key={index} className="flex-1">
                {renderBlock(col)}
              </div>
            ))}
        </div>
      );

    case "column":
      return (
        <div className="flex-1 p-4">
          {hasChildren(block) &&
            block.children.map((child, index) => (
              <div key={index}>{renderBlock(child)}</div>
            ))}
        </div>
      );

    default:
      console.warn(`Unsupported block type: ${block.type}`);
      return <div>Unsupported block type: {block.type}</div>;
  }
};


export default NotionRenderer;
