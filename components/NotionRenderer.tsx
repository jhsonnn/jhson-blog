// import React from 'react';
// import {
//   BlockObjectResponse,
//   PartialBlockObjectResponse,
//   RichTextItemResponse,
// } from '@notionhq/client/build/src/api-endpoints';
// import {
//   BlockWithChildren,
//   hasChildren,
//   isFullBlockResponse,
// } from '@/lib/notion/types/notionDataType';

// interface NotionRendererProps {
//   blocks: (BlockObjectResponse | PartialBlockObjectResponse)[];
// }

// const NotionRenderer: React.FC<NotionRendererProps> = ({ blocks }) => (
//   <div className="notion-container">
//     {blocks.map((block) =>
//       isFullBlockResponse(block) ? (
//         <div key={block.id}>{renderBlock(block)}</div>
//       ) : (
//         <div key={block.id}>Unsupported block format</div>
//       )
//     )}
//   </div>
// );

// const renderRichText = (richTextArray: RichTextItemResponse[]) =>
//   richTextArray.map((richText, index) => {
//     const { plain_text, href, annotations } = richText;

//     const style: React.CSSProperties = {
//       fontWeight: annotations.bold ? 'bold' : undefined,
//       fontStyle: annotations.italic ? 'italic' : undefined,
//       textDecoration: annotations.underline ? 'underline' : undefined,
//       color: annotations.color !== 'default' ? annotations.color : undefined,
//     };

//     return href ? (
//       <a
//         key={index}
//         href={href}
//         target="_blank"
//         rel="noopener noreferrer"
//         style={style}
//         className="hover:underline text-blue-500"
//       >
//         {plain_text}
//       </a>
//     ) : (
//       <span
//         key={index}
//         style={style}
//         className={annotations.bold ? 'font-bold' : ''}
//       >
//         {plain_text}
//       </span>
//     );
//   });

// //const renderBlock = (block: BlockObjectResponse) => {
// const renderBlock = (block: BlockWithChildren) => {
//   switch (block.type) {
//     case 'paragraph':
//       return (
//         <p className="text-base my-1">
//           {renderRichText(block.paragraph.rich_text)}
//         </p>
//       );

//     case 'heading_1':
//       return (
//         <h1 className="text-3xl font-bold my-4">
//           {renderRichText(block.heading_1.rich_text)}
//         </h1>
//       );

//     case 'heading_2':
//       return (
//         <h2 className="text-2xl font-semibold my-3">
//           {renderRichText(block.heading_2.rich_text)}
//         </h2>
//       );

//     case 'heading_3':
//       return (
//         <h3 className="text-xl font-medium my-2">
//           {renderRichText(block.heading_3.rich_text)}
//         </h3>
//       );

//     case 'column_list':
//       return (
//         <div className="flex gap-6">
//           {hasChildren(block) &&
//             block.children.map((col, index) => (
//               <div key={index} className="flex-1">
//                 {renderBlock(col)}
//               </div>
//             ))}
//         </div>
//       );

//     case 'column':
//       return (
//         <div className="flex-1 p-0">
//           {hasChildren(block) &&
//             block.children.map((child, index) => (
//               <div key={index}>{renderBlock(child)}</div>
//             ))}
//         </div>
//       );

//     case 'divider':
//       return <hr className="border-t border-gray-300 my-3" />;

//     case 'bulleted_list_item':
//       return (
//         <ul className="list-disc pl-6 my-2">
//           <li>
//             {block.bulleted_list_item.rich_text.map((text, index) => (
//               <span key={index}>{text.plain_text}</span>
//             ))}
//             {/* 하위 children 블록 재귀 렌더링 */}
//             {block.children && block.children.length > 0 && (
//               <ul className="list-disc pl-6 my-2">
//                 {block.children.map((childBlock) => (
//                   <li key={childBlock.id}>{renderBlock(childBlock)}</li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         </ul>
//       );
//     // case "image":
//     //   return (
//     //     <div >

//     //     </div>
//     //   );

//     default:
//       console.warn(`Unsupported block type: ${block.type}`);
//       return <div>Unsupported block type: {block.type}</div>;
//   }
// };

// export default NotionRenderer;

// components/NotionRenderer.tsx

// import React from 'react';
// import {
//   RichTextItemResponse,
//   ParagraphBlockObjectResponse,
//   ImageBlockObjectResponse,
//   Heading1BlockObjectResponse,
//   Heading2BlockObjectResponse,
//   Heading3BlockObjectResponse,
//   BulletedListItemBlockObjectResponse,
// } from '@notionhq/client/build/src/api-endpoints';

// import { BlockWithChildren } from '@/lib/notion/types/notionDataType';

// interface NotionRendererProps {
//   blocks: BlockWithChildren[]; // `children` 포함된 블록 리스트
// }

// const NotionRenderer: React.FC<NotionRendererProps> = ({ blocks }) => (
//   <div className="notion-container">
//     {blocks.map((block) => (
//       <div key={block.id}>{renderBlock(block)}</div>
//     ))}
//   </div>
// );

// const renderBlock = (block: BlockWithChildren) => {
//   switch (block.type) {
//     case 'paragraph':
//       return renderParagraph(block as ParagraphBlockObjectResponse);

//     case 'heading_1':
//       return renderHeading1(block as Heading1BlockObjectResponse);

//     case 'heading_2':
//       return renderHeading2(block as Heading2BlockObjectResponse);

//     case 'heading_3':
//       return renderHeading3(block as Heading3BlockObjectResponse);

//     case 'bulleted_list_item':
//       return renderBulletedListItem(
//         block as BulletedListItemBlockObjectResponse
//       );

//     case 'column_list':
//       return renderColumnList(block as BlockWithChildren);

//     case 'column':
//       return renderColumn(block as BlockWithChildren);

//     case 'image':
//       return renderImage(block as ImageBlockObjectResponse);

//     case 'divider':
//       return <hr className="my-4 border-gray-300" />;

//     default:
//       console.warn(`Unsupported block type: ${block.type}`);
//       return (
//         <div className="text-blue-500 my-2">
//           Unsupported block type: <strong>{block.type}</strong>
//         </div>
//       );
//   }
// };

// const renderParagraph = (block: ParagraphBlockObjectResponse) => {
//   if (!block.paragraph || !Array.isArray(block.paragraph.rich_text)) {
//     console.warn('Invalid paragraph block structure:', block);
//     return <div>Invalid paragraph block</div>;
//   }
//   return (
//     <p className="text-base my-1">
//       {renderRichText(block.paragraph.rich_text)}
//     </p>
//   );
// };

// const renderHeading1 = (block: Heading1BlockObjectResponse) => {
//   if (!block.heading_1?.rich_text) return null;
//   return (
//     <h1 className="text-3xl font-bold my-4">
//       {renderRichText(block.heading_1.rich_text)}
//     </h1>
//   );
// };

// const renderHeading2 = (block: Heading2BlockObjectResponse) => {
//   if (!block.heading_2?.rich_text) return null;
//   return (
//     <h2 className="text-2xl font-semibold my-3">
//       {renderRichText(block.heading_2.rich_text)}
//     </h2>
//   );
// };

// const renderHeading3 = (block: Heading3BlockObjectResponse) => {
//   if (!block.heading_3?.rich_text) return null;
//   return (
//     <h3 className="text-xl font-medium my-2">
//       {renderRichText(block.heading_3.rich_text)}
//     </h3>
//   );
// };

// const renderBulletedListItem = (block: BulletedListItemBlockObjectResponse) => {
//   if (!block.bulleted_list_item?.rich_text) return null;
//   return (
//     <ul className="list-disc ml-6 my-1">
//       <li>{renderRichText(block.bulleted_list_item.rich_text)}</li>
//     </ul>
//   );
// };

// const renderImage = (block: ImageBlockObjectResponse) => {
//   if (!block.image) {
//     console.warn('Invalid image block structure:', block);
//     return <div>Invalid image block</div>;
//   }

//   const { url } =
//     block.image.type === 'file' ? block.image.file : block.image.external;

//   const altText = block.image.caption?.[0]?.plain_text || 'Notion Image';

//   return (
//     <img
//       src={url}
//       alt={altText}
//       className="my-3 max-w-full h-auto rounded-lg"
//     />
//   );
// };

// const renderColumnList = (block: BlockWithChildren) => {
//   if (!block.children || !Array.isArray(block.children)) {
//     console.warn('Invalid column_list structure:', block);
//     return <div>Invalid column list</div>;
//   }

//   return (
//     <div className="flex gap-4 my-4">
//       {block.children.map((column) =>
//         renderColumn(column as BlockWithChildren)
//       )}
//     </div>
//   );
// };

// const renderColumn = (block: BlockWithChildren) => {
//   if (!block.children || !Array.isArray(block.children)) {
//     console.warn('Invalid column structure:', block);
//     return <div>Invalid column</div>;
//   }

//   return (
//     <div className="flex-1">
//       {block.children.map((childBlock) =>
//         renderBlock(childBlock as BlockWithChildren)
//       )}
//     </div>
//   );
// };

// const renderRichText = (richTextArray: RichTextItemResponse[]) => {
//   return richTextArray.map((richText, index) => {
//     const { plain_text, href, annotations } = richText;
//     const style: React.CSSProperties = {
//       fontWeight: annotations.bold ? 'bold' : undefined,
//       fontStyle: annotations.italic ? 'italic' : undefined,
//       textDecoration: annotations.strikethrough
//         ? 'line-through'
//         : annotations.underline
//         ? 'underline'
//         : undefined,
//       fontFamily: annotations.code ? 'monospace' : undefined,
//       color: annotations.color !== 'default' ? annotations.color : undefined,
//     };

//     return href ? (
//       <a
//         key={index}
//         href={href}
//         target="_blank"
//         rel="noopener noreferrer"
//         style={style}
//         className="hover:underline text-blue-500"
//       >
//         {plain_text}
//       </a>
//     ) : (
//       <span key={index} style={style}>
//         {plain_text}
//       </span>
//     );
//   });
// };

// export default NotionRenderer;

//진행중
// components/NotionRenderer.tsx
'use client';

import React from 'react';
import {
  ParagraphBlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  ImageBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { BlockWithChildren } from '@/lib/notion/types/notionDataType';

interface NotionRendererProps {
  blocks: BlockWithChildren[];
}

const NotionRenderer: React.FC<NotionRendererProps> = ({ blocks }) => (
  <div className="notion-container">
    {blocks.map(
      (block) =>
        renderBlock(block) ?? <div key={block.id}>Unsupported block type</div>
    )}
  </div>
);

const renderBlock = (block: BlockWithChildren) => {
  switch (block.type) {
    case 'paragraph':
      return renderParagraph(block as ParagraphBlockObjectResponse);
    case 'heading_1':
      return renderHeading1(block as Heading1BlockObjectResponse);
    case 'heading_2':
      return renderHeading2(block as Heading2BlockObjectResponse);
    case 'heading_3':
      return renderHeading3(block as Heading3BlockObjectResponse);
    case 'bulleted_list_item':
      return renderBulletedListItem(
        block as BulletedListItemBlockObjectResponse
      );
    case 'divider':
      return renderDivider();
    case 'image':
      return renderImage(block as ImageBlockObjectResponse);
    case 'column_list':
      return renderColumnList(block);
    default:
      console.warn(`Unsupported block type: ${block.type}`);
      return null;
  }
};

const renderParagraph = (block: ParagraphBlockObjectResponse) => (
  <p className="my-2">
    {block.paragraph.rich_text.map((text, index) => (
      <span key={index}>{text.plain_text}</span>
    ))}
  </p>
);

const renderHeading1 = (block: Heading1BlockObjectResponse) => (
  <h1 className="text-3xl font-bold my-4">
    {block.heading_1.rich_text.map((text, index) => (
      <span key={index}>{text.plain_text}</span>
    ))}
  </h1>
);

const renderHeading2 = (block: Heading2BlockObjectResponse) => (
  <h2 className="text-2xl font-semibold my-3">
    {block.heading_2.rich_text.map((text, index) => (
      <span key={index}>{text.plain_text}</span>
    ))}
  </h2>
);

const renderHeading3 = (block: Heading3BlockObjectResponse) => (
  <h3 className="text-xl font-medium my-2">
    {block.heading_3.rich_text.map((text, index) => (
      <span key={index}>{text.plain_text}</span>
    ))}
  </h3>
);

const renderBulletedListItem = (block: BulletedListItemBlockObjectResponse) => (
  <ul className="list-disc ml-6 my-1">
    <li>
      {block.bulleted_list_item.rich_text.map((text, index) => (
        <span key={index}>{text.plain_text}</span>
      ))}
    </li>
  </ul>
);

const renderDivider = () => <hr className="my-4 border-gray-300" />;

const renderImage = (block: ImageBlockObjectResponse) => {
  const { url } =
    block.image.type === 'file' ? block.image.file : block.image.external;
  const altText = block.image.caption?.[0]?.plain_text || 'Image';
  return (
    <img
      src={url}
      alt={altText}
      className="my-3 max-w-full h-auto rounded-lg"
    />
  );
};

const renderColumnList = (block: BlockWithChildren) => {
  console.group(`Debugging column_list block: ${block.id}`);
  console.log('block:', block);

  if (!block.children) {
    console.warn('No children available for column_list block:', block.id);
    console.groupEnd();
    return <div>No columns available</div>;
  }

  if (block.children.length === 0) {
    console.warn('Children array is empty for column_list block:', block.id);
    console.groupEnd();
    return <div>No columns available</div>;
  }

  console.log(`block.children length: ${block.children.length}`);
  console.log('block.children details:', block.children);

  return (
    <div className="flex gap-4 my-4">
      {block.children.map((column, columnIndex) => {
        console.group(`Column ${columnIndex + 1} (ID: ${column.id})`);
        console.log('column:', column);

        if (!column.children) {
          console.warn('No children found in this column:', column.id);
          console.groupEnd();
          return <div key={column.id}>No content in this column</div>;
        }

        if (column.children.length === 0) {
          console.warn('Children array is empty in this column:', column.id);
          console.groupEnd();
          return <div key={column.id}>No content in this column</div>;
        }

        console.log(`column.children length: ${column.children.length}`);
        console.log('column.children details:', column.children);

        console.groupEnd();
        return (
          <div key={column.id} className="flex-1">
            {column.children.map(
              (childBlock) =>
                renderBlock(childBlock as BlockWithChildren) ?? (
                  <div key={childBlock.id}>Unsupported block type</div>
                )
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NotionRenderer;
