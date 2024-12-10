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

//components/NotionRenderer.tsx
import React from 'react';
import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';

import {
  BlockWithChildren,
  isFullBlockResponse,
} from '@/lib/notion/types/notionDataType';

// ✅ Image 타입 정의
interface ImageFile {
  type: 'file';
  file: { url: string; expiry_time: string };
  caption: RichTextItemResponse[];
}

interface ImageExternal {
  type: 'external';
  external: { url: string };
  caption: RichTextItemResponse[];
}

interface ImageBlock {
  type: 'image';
  image: ImageFile | ImageExternal;
}

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

/**
 * Type Guard 개선
 * block.type이 'image'일 때, block.image가 존재함을 TypeScript에 명확히 알려줍니다.
 */
const isImageBlock = (
  block: BlockWithChildren
): block is BlockWithChildren & ImageBlock => {
  if (block.type !== 'image') return false;
  if (!('image' in block)) return false;

  const image = block.image;
  if (!image || typeof image !== 'object') return false;
  if (!('type' in image)) return false;

  return image.type === 'file' || image.type === 'external';
};

/**
 * 블록 렌더링 함수
 */
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

    case 'image': {
      if (!isImageBlock(block)) {
        console.warn('Unsupported image block structure');
        return <div>Unsupported image block structure</div>;
      }

      // imageUrl 타입 명시 제거 (ESLint 에러 해결)
      let imageUrl = '';
      if (block.image.type === 'file') {
        imageUrl = block.image.file.url;
      } else if (block.image.type === 'external') {
        imageUrl = block.image.external.url;
      } else {
        console.warn(`Unsupported image type: ${block.image}`);
        return <div>Unsupported image type</div>;
      }

      const altText = block.image.caption[0]?.plain_text ?? 'Notion Image';

      return (
        <img
          src={imageUrl}
          alt={altText}
          className="my-3 max-w-full h-auto rounded-lg"
        />
      );
    }

    default:
      console.warn(`Unsupported block type: ${block.type}`);
      return <div>Unsupported block type: {block.type}</div>;
  }
};

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
      <span key={index} style={style}>
        {plain_text}
      </span>
    );
  });

export default NotionRenderer;
