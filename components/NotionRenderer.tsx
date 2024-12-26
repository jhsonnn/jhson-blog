import React from 'react';
import {
  ParagraphBlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  ImageBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { BlockWithChildren, isImageBlock } from '@/lib/notion/types';

interface NotionRendererProps {
  blocks: BlockWithChildren[];
  videoUrl?: string | null;
}

const NotionRenderer: React.FC<NotionRendererProps> = ({
  blocks,
  videoUrl,
}) => {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    console.warn('Blocks are empty or invalid:', blocks);
    //return null;
    return <div>No content available</div>;
  }

  const filteredBlocks = blocks.filter(
    (block) =>
      !(block.type === 'paragraph' && block.paragraph?.rich_text.length === 0)
  );

  return (
    <div className="notion-container">
      {videoUrl && (
        <div className="video-container my-4">
          <video
            controls
            src={videoUrl}
            className="w-full max-w-screen-lg rounded-xl"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {filteredBlocks.map((block) => (
        <div key={block.id}>
          {renderBlock(block) ?? 'Unsupported block type'}
        </div>
      ))}
    </div>
  );
};

const renderBlock = (block: BlockWithChildren) => {
  switch (block.type) {
    case 'paragraph':
      if (
        !block.paragraph?.rich_text ||
        block.paragraph.rich_text.length === 0
      ) {
        console.warn('Empty paragraph block:', block);
        return null;
      }
      return renderParagraph(block as ParagraphBlockObjectResponse);
    case 'heading_1':
      return renderHeading1(block as Heading1BlockObjectResponse);

    case 'heading_2':
      return renderHeading2(block as Heading2BlockObjectResponse);

    case 'heading_3':
      return renderHeading3(block as Heading3BlockObjectResponse);

    case 'bulleted_list_item':
      if (block.bulleted_list_item?.rich_text.length === 0) {
        return null;
      }
      return renderBulletedListItem(
        block as BulletedListItemBlockObjectResponse
      );

    case 'divider':
      return renderDivider();

    // case 'line_break':
    //   return <br key={block.id} />;

    // case 'quote':
    //   if (isQuoteBlock(block)) {
    //     return renderQuote(block);
    //   }
    //   console.warn('Invalid quote block:', block);
    //   return null;

    case 'image':
      if (isImageBlock(block)) {
        return renderImage(block as ImageBlockObjectResponse);
      }
      break;

    case 'video':
      console.log('Rendering video block:', block.video); // 렌더링 전 비디오 블록 출력
      if (block.video) {
        return renderVideo(block);
      } else {
        console.warn('No video property found for video block:', block); // 비디오 속성 없음 로그 출력
      }
      break;

    case 'column_list':
      return renderColumnList(block);

    case 'column':
      return renderColumn(block);

    default:
      console.warn(`Unsupported block type: ${block.type}`, block);
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
  <ul className="list-disc ml-6 my-1" key={block.id}>
    <li>
      {block.bulleted_list_item.rich_text.map((text, index) => (
        <span key={index}>{text.plain_text}</span>
      ))}
    </li>
  </ul>
);

const renderDivider = () => <hr className="my-4 border-gray-300" />;

// const renderQuote = (block: QuoteBlockObjectResponse) => (
//   <blockquote className="italic border-l-4 pl-4 my-2">
//     {block.quote.rich_text.map((text, index) => (
//       <span key={index}>{text.plain_text}</span>
//     ))}
//   </blockquote>
// );

const renderImage = (block: ImageBlockObjectResponse) => {
  if (!block.image) {
    console.warn('Image block is missing the image property:', block);
    return null;
  }

  const url =
    block.image.type === 'file'
      ? block.image.file?.url
      : block.image.external?.url;

  if (!url) {
    console.warn('Image block is missing a valid URL:', block);
    return null;
  }

  const altText = block.image.caption?.[0]?.plain_text || 'Image';

  return (
    <img
      src={url}
      alt={altText}
      className="my-3 max-w-full h-auto rounded-xl"
    />
  );
};

const renderVideo = (block: BlockWithChildren) => {
  if (!block.video) {
    console.warn(`Video block is missing the video property: ${block.id}`);
    return null;
  }

  const url =
    block.video.type === 'file'
      ? block.video.file?.url
      : block.video.external?.url;

  if (!url) {
    console.warn(`Video block is missing a valid URL: ${block.id}`);
    return null;
  }

  return (
    <div key={block.id} className="video-container">
      <video controls src={url} className="w-full max-w-screen-lg rounded-xl">
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

// const renderColumnList = (block: BlockWithChildren) => {
//   if (!block.children || block.children.length === 0) {
//     console.warn(`No columns available in column_list block: ${block.id}`);
//     return null;
//   }

//   return (
//     <div className="flex gap-4 my-4">
//       {block.children.map((column) => {
//         if (!column.children || column.children.length === 0) {
//           return null;
//         }

//         return (
//           <div key={column.id} className="flex-1">
//             {column.children.map((childBlock) => {
//               if (
//                 childBlock.type === 'bulleted_list_item' &&
//                 childBlock.bulleted_list_item
//               ) {
//                 return (
//                   <ul className="list-disc" key={childBlock.id}>
//                     <li>
//                       {childBlock.bulleted_list_item.rich_text.map(
//                         (text, index) => (
//                           <span key={index}>{text.plain_text}</span>
//                         )
//                       )}
//                       {childBlock.children &&
//                         childBlock.children.length > 0 && (
//                           <ul className="list-disc">
//                             {childBlock.children.map(
//                               (nestedChild) => renderBlock(nestedChild) // renderBlock 내부에서 key 확인 필요
//                             )}
//                           </ul>
//                         )}
//                     </li>
//                   </ul>
//                 );
//               }

//               return renderBlock(childBlock);
//             })}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

const renderColumnList = (block: BlockWithChildren) => {
  if (!block.children || block.children.length === 0) {
    console.warn(`No columns available in column_list block: ${block.id}`);
    return null;
  }

  return (
    <div key={block.id} className="flex gap-4 my-4">
      {block.children.map((column) => {
        if (!column.children || column.children.length === 0) {
          return null;
        }

        return (
          <div key={column.id} className="flex-1">
            {column.children.map((childBlock) => (
              <div key={childBlock.id}>{renderBlock(childBlock)}</div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

const renderColumn = (block: BlockWithChildren) => {
  if (!block.children || block.children.length === 0) {
    return null;
  }

  return (
    <div key={block.id} className="flex-1">
      {block.children.map((childBlock) => renderBlock(childBlock))}
    </div>
  );
};

export default NotionRenderer;
