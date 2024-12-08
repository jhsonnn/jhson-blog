import React from 'react';
import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';
import {
  BlockWithChildren,
  hasChildren,
  isFullBlockResponse,
} from '@/lib/notion/types/notionDataType';

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

const renderRichText = (richTextArray: RichTextItemResponse[]) =>
  richTextArray.map((richText, index) => {
    const { plain_text, href, annotations } = richText;

    const style: React.CSSProperties = {
      fontWeight: annotations.bold ? 'bold' : undefined,
      fontStyle: annotations.italic ? 'italic' : undefined,
      textDecoration: annotations.underline ? 'underline' : undefined,
      color: annotations.color !== 'default' ? annotations.color : undefined,
    };

    return href ? (
      <a
        key={index}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
        className="hover:underline text-blue-500"
      >
        {plain_text}
      </a>
    ) : (
      <span
        key={index}
        style={style}
        className={annotations.bold ? 'font-bold' : ''}
      >
        {plain_text}
      </span>
    );
  });

//const renderBlock = (block: BlockObjectResponse) => {
const renderBlock = (block: BlockWithChildren) => {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-base my-1">
          {renderRichText(block.paragraph.rich_text)}
        </p>
      );

    case 'heading_1':
      return (
        <h1 className="text-3xl font-bold my-4">
          {renderRichText(block.heading_1.rich_text)}
        </h1>
      );

    case 'heading_2':
      return (
        <h2 className="text-2xl font-semibold my-3">
          {renderRichText(block.heading_2.rich_text)}
        </h2>
      );

    case 'heading_3':
      return (
        <h3 className="text-xl font-medium my-2">
          {renderRichText(block.heading_3.rich_text)}
        </h3>
      );

    case 'column_list':
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

    case 'column':
      return (
        <div className="flex-1 p-0">
          {hasChildren(block) &&
            block.children.map((child, index) => (
              <div key={index}>{renderBlock(child)}</div>
            ))}
        </div>
      );

    case 'divider':
      return <hr className="border-t border-gray-300 my-3" />;

    case 'bulleted_list_item':
      return (
        <ul className="list-disc pl-6 my-2">
          <li>
            {block.bulleted_list_item.rich_text.map((text, index) => (
              <span key={index}>{text.plain_text}</span>
            ))}
            {/* 하위 children 블록 재귀 렌더링 */}
            {block.children && block.children.length > 0 && (
              <ul className="list-disc pl-6 my-2">
                {block.children.map((childBlock) => (
                  <li key={childBlock.id}>{renderBlock(childBlock)}</li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      );
    // case "image":
    //   return (
    //     <div >

    //     </div>
    //   );

    default:
      console.warn(`Unsupported block type: ${block.type}`);
      return <div>Unsupported block type: {block.type}</div>;
  }
};

export default NotionRenderer;
