////최적화 테스트 이전
// import React from 'react';
// import { BlockWithChildren } from '@/lib/notion/types';
// import Image from 'next/image';

// interface NotionRendererProps {
//   blocks: BlockWithChildren[];
//   videoUrl?: string | null;
// }

// const NotionRenderer: React.FC<NotionRendererProps> = React.memo(
//   ({ blocks, videoUrl }) => {
//     if (!blocks || blocks.length === 0) {
//       return <div>No content available</div>;
//     }

//     // 중복 블록 제거
//     const uniqueBlocks = Array.from(
//       new Map(blocks.map((block) => [block.id, block])).values()
//     );

//     return (
//       <div className="notion-container">
//         {videoUrl && (
//           <div className="video-container my-4">
//             <video
//               controls
//               src={videoUrl}
//               className="w-full max-w-screen-lg rounded-xl"
//             >
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         )}
//         {uniqueBlocks.map((block) => (
//           <div key={block.id} className="notion-block">
//             {renderBlock(block)}
//           </div>
//         ))}
//       </div>
//     );
//   }
// );

// const renderBlock = (block: BlockWithChildren) => {
//   console.log('Rendering block type:', block.type);

//   switch (block.type) {
//     case 'paragraph':
//       return renderParagraph(block);
//     case 'heading_1':
//       return renderHeading1(block);
//     case 'heading_2':
//       return renderHeading2(block);
//     case 'heading_3':
//       return renderHeading3(block);
//     case 'bulleted_list_item':
//       return renderBulletedListItem(block);
//     case 'divider':
//       return renderDivider();
//     case 'column_list':
//       return renderColumnList(block);
//     case 'column':
//       return renderColumn(block);
//     case 'image':
//       return renderImage(block);
//     default:
//       console.warn(`Unsupported block type: ${block.type}`);
//       return <div className="unsupported-block">Unsupported block type</div>;
//   }
// };

// // 블록 렌더링 함수
// const renderParagraph = (block: BlockWithChildren) => (
//   <p>
//     {block.paragraph?.rich_text.map((text, index) => (
//       <span key={index}>{text.plain_text}</span>
//     ))}
//   </p>
// );

// const renderHeading1 = (block: BlockWithChildren) => (
//   <h1 className="text-3xl font-bold my-4">
//     {block.heading_1?.rich_text.map((text, index) => (
//       <span key={index}>{text.plain_text}</span>
//     ))}
//   </h1>
// );

// const renderHeading2 = (block: BlockWithChildren) => (
//   <h2 className="text-2xl font-semibold my-3">
//     {block.heading_2?.rich_text.map((text, index) => (
//       <span key={index}>{text.plain_text}</span>
//     ))}
//   </h2>
// );

// const renderHeading3 = (block: BlockWithChildren) => (
//   <h3 className="text-xl font-medium my-2">
//     {block.heading_3?.rich_text.map((text, index) => (
//       <span key={index}>{text.plain_text}</span>
//     ))}
//   </h3>
// );

// const renderBulletedListItem = (block: BlockWithChildren) => (
//   <ul className="list-disc ml-6 my-1">
//     <li>
//       {block.bulleted_list_item?.rich_text.map((text, index) => (
//         <span key={index}>{text.plain_text}</span>
//       ))}
//     </li>
//   </ul>
// );

// const renderImage = (block: BlockWithChildren) => {
//   // block.image가 undefined인지 확인
//   if (!block.image) {
//     console.warn('Image block is missing the image property:', block);
//     return null;
//   }

//   const url =
//     block.image.type === 'file'
//       ? block.image.file?.url
//       : block.image.type === 'external'
//       ? block.image.external?.url
//       : null;

//   if (!url) {
//     console.warn('Image block is missing a valid URL:', block);
//     return null;
//   }

//   const altText = block.image.caption?.[0]?.plain_text || 'Image';

//   return (
//     <div className="relative my-3 max-w-full h-auto rounded-xl">
//       <Image
//         src={url}
//         alt={altText}
//         width={300}
//         height={300}
//         layout="responsive"
//         objectFit="contain"
//         className="rounded-xl"
//         priority={true}
//       />
//     </div>
//   );
// };

// const renderDivider = () => <hr className="my-4 border-gray-300" />;

// const renderColumnList = (block: BlockWithChildren) => {
//   if (!block.children || block.children.length === 0) {
//     console.warn(`No columns available in column_list block: ${block.id}`);
//     return null;
//   }

//   const uniqueChildren = Array.from(
//     new Map(block.children.map((child) => [child.id, child])).values()
//   );

//   return (
//     <div className="flex gap-4 my-4">
//       {uniqueChildren.map((column) => (
//         <div key={column.id} className="flex-1">
//           {renderBlock(column)}
//         </div>
//       ))}
//     </div>
//   );
// };

// const renderColumn = (block: BlockWithChildren) => {
//   if (!block.children || block.children.length === 0) {
//     return null;
//   }

//   return (
//     <div className="flex-1">
//       {block.children.map((childBlock) => renderBlock(childBlock))}
//     </div>
//   );
// };

// export default NotionRenderer;

// //최적화 테스트
// import React from 'react';
// import { BlockWithChildren } from '@/lib/notion/types';
// import Image from 'next/image';

// interface NotionRendererProps {
//   blocks: BlockWithChildren[];
//   videoUrl?: string | null;
// }

// const NotionRenderer: React.FC<NotionRendererProps> = React.memo(
//   ({ blocks, videoUrl }) => {
//     if (!blocks || blocks.length === 0) {
//       return <div>No content available</div>;
//     }

//     // 중복 블록 제거
//     const uniqueBlocks = Array.from(
//       new Map(blocks.map((block) => [block.id, block])).values()
//     );

//     return (
//       <div className="notion-container">
//         {videoUrl && (
//           <div className="video-container my-4">
//             <video
//               controls
//               src={videoUrl}
//               className="w-full max-w-screen-lg rounded-xl"
//             >
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         )}
//         {uniqueBlocks.map((block) => (
//           <div key={block.id} className="notion-block">
//             {renderBlock(block)}
//           </div>
//         ))}
//       </div>
//     );
//   }
// );

// const renderBlock = (block: BlockWithChildren) => {
//   console.log('Rendering block type:', block.type);

//   switch (block.type) {
//     case 'paragraph':
//       return renderParagraph(block);
//     case 'heading_1':
//       return renderHeading1(block);
//     case 'heading_2':
//       return renderHeading2(block);
//     case 'heading_3':
//       return renderHeading3(block);
//     case 'bulleted_list_item':
//       return renderBulletedListItem(block);
//     case 'divider':
//       return renderDivider();
//     case 'column_list':
//       return renderColumnList(block);
//     case 'column':
//       return renderColumn(block);
//     case 'image':
//       return renderImage(block);
//     default:
//       console.warn(`Unsupported block type: ${block.type}`);
//       return <div className="unsupported-block">Unsupported block type</div>;
//   }
// };

// // 블록 렌더링 함수
// const renderParagraph = (block: BlockWithChildren) => (
//   <p>
//     {block.paragraph?.rich_text.map((text, index) => (
//       <span key={index}>{text.plain_text}</span>
//     ))}
//   </p>
// );

// const renderHeading1 = (block: BlockWithChildren) => (
//   <h1 className="text-3xl font-bold my-4">
//     {block.heading_1?.rich_text.map((text, index) => (
//       <span key={index}>{text.plain_text}</span>
//     ))}
//   </h1>
// );

// const renderHeading2 = (block: BlockWithChildren) => (
//   <h2 className="text-2xl font-semibold my-3">
//     {block.heading_2?.rich_text.map((text, index) => (
//       <span key={index}>{text.plain_text}</span>
//     ))}
//   </h2>
// );

// const renderHeading3 = (block: BlockWithChildren) => (
//   <h3 className="text-xl font-medium my-2">
//     {block.heading_3?.rich_text.map((text, index) => (
//       <span key={index}>{text.plain_text}</span>
//     ))}
//   </h3>
// );

// const renderBulletedListItem = (block: BlockWithChildren) => (
//   <ul className="list-disc ml-6 my-1">
//     <li>
//       {block.bulleted_list_item?.rich_text.map((text, index) => (
//         <span key={index}>{text.plain_text}</span>
//       ))}
//     </li>
//   </ul>
// );

// const renderImage = (block: BlockWithChildren) => {
//   if (!block.image) {
//     console.warn('Image block is missing the image property:', block);
//     return null;
//   }

//   const url =
//     block.image.type === 'file'
//       ? block.image.file?.url
//       : block.image.external?.url;

//   if (!url) {
//     console.warn('Image block is missing a valid URL.', block);
//     return null;
//   }

//   const altText = block.image.caption?.[0]?.plain_text || 'Image';

//   return (
//     <div className="my-3 max-w-full h-auto rounded-xl">
//       <Image
//         src={url}
//         alt={altText}
//         width={800}
//         height={450}
//         className="rounded-xl"
//         loading="lazy" // 지연 로딩 적용
//         placeholder="blur" // Placeholder 적용
//         blurDataURL="/placeholder.png" // 로우 퀄리티 이미지
//       />
//     </div>
//   );
// };

// const renderDivider = () => <hr className="my-4 border-gray-300" />;

// const renderColumnList = (block: BlockWithChildren) => {
//   if (!block.children || block.children.length === 0) {
//     console.warn(`No columns available in column_list block: ${block.id}`);
//     return null;
//   }

//   const uniqueChildren = Array.from(
//     new Map(block.children.map((child) => [child.id, child])).values()
//   );

//   return (
//     <div className="flex gap-4 my-4">
//       {uniqueChildren.map((column) => (
//         <div key={column.id} className="flex-1">
//           {renderBlock(column)}
//         </div>
//       ))}
//     </div>
//   );
// };

// const renderColumn = (block: BlockWithChildren) => {
//   if (!block.children || block.children.length === 0) {
//     return null;
//   }

//   return (
//     <div className="flex-1">
//       {block.children.map((childBlock) => renderBlock(childBlock))}
//     </div>
//   );
// };

// export default NotionRenderer;

//ISR 테스트
// components/NotionRenderer.tsx
import React, { useMemo } from 'react';
import { BlockWithChildren } from '@/lib/notion/types';
import Image from 'next/image';

interface NotionRendererProps {
  blocks: BlockWithChildren[];
  videoUrl?: string | null;
}

const NotionRenderer: React.FC<NotionRendererProps> = ({
  blocks,
  videoUrl,
}) => {
  const uniqueBlocks = useMemo(
    () =>
      Array.from(new Map(blocks.map((block) => [block.id, block])).values()),
    [blocks]
  );

  if (!uniqueBlocks.length) {
    return <div>No content available</div>;
  }

  return (
    <div className="notion-container">
      {videoUrl && videoUrl.trim() !== '' && (
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
      {uniqueBlocks.map((block) => (
        <div key={block.id} className="notion-block">
          {renderBlock(block)}
        </div>
      ))}
    </div>
  );
};

const renderBlock = (block: BlockWithChildren) => {
  switch (block.type) {
    case 'paragraph':
      return renderParagraph(block);
    case 'heading_1':
      return renderHeading1(block);
    case 'heading_2':
      return renderHeading2(block);
    case 'heading_3':
      return renderHeading3(block);
    case 'bulleted_list_item':
      return renderBulletedListItem(block);
    case 'divider':
      return renderDivider();
    case 'column_list':
      return renderColumnList(block);
    case 'column':
      return renderColumn(block);
    case 'image':
      return renderImage(block);
    default:
      return <div className="unsupported-block">Unsupported block type</div>;
  }
};

const renderParagraph = (block: BlockWithChildren) => (
  <p>{block.paragraph?.rich_text?.map((text) => text.plain_text).join(' ')}</p>
);

const renderHeading1 = (block: BlockWithChildren) => (
  <h1 className="text-3xl font-bold my-4">
    {block.heading_1?.rich_text?.map((text) => text.plain_text).join(' ')}
  </h1>
);

const renderHeading2 = (block: BlockWithChildren) => (
  <h2 className="text-2xl font-semibold my-3">
    {block.heading_2?.rich_text?.map((text) => text.plain_text).join(' ')}
  </h2>
);

const renderHeading3 = (block: BlockWithChildren) => (
  <h3 className="text-xl font-medium my-2">
    {block.heading_3?.rich_text?.map((text) => text.plain_text).join(' ')}
  </h3>
);

const renderBulletedListItem = (block: BlockWithChildren) => {
  if (!block.bulleted_list_item?.rich_text?.length) return null;
  return (
    <ul className="list-disc ml-6 my-1">
      <li>
        {block.bulleted_list_item.rich_text.map((text, index) => (
          <span key={index}>{text.plain_text}</span>
        ))}
      </li>
    </ul>
  );
};

// const renderImage = (block: BlockWithChildren) => {
//   if (!block.image) return null;

//   const url =
//     block.image.type === 'file'
//       ? block.image.file?.url
//       : block.image.external?.url;
//   if (!url) return null;

//   const altText = block.image.caption?.[0]?.plain_text || 'Image';

//   return (
//     <div className="my-3 max-w-full h-auto rounded-xl">
//       <Image
//         src={url}
//         alt={altText}
//         width={800}
//         height={450}
//         className="rounded-xl"
//         loading="lazy"
//         placeholder="blur"
//         blurDataURL="/placeholder.png"
//       />
//     </div>
//   );
// };

const renderImage = (block: BlockWithChildren) => {
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

  const altText = block.image.caption?.[0]?.plain_text || 'Notion Image';

  console.log('렌더링할 이미지 URL:', url);

  return (
    <div className="my-3 max-w-full h-auto rounded-xl">
      <Image
        src={url}
        alt={altText}
        width={800}
        height={450}
        className="rounded-xl"
        loading="lazy"
        placeholder="blur"
        blurDataURL="/default_image.png"
        unoptimized //Notion 이미지의 경우 최적화 기능을 비활성화해야 정상 로드됨
      />
    </div>
  );
};

const renderDivider = () => <hr className="my-4 border-gray-300" />;

const renderColumnList = (block: BlockWithChildren) => {
  if (!block.children?.length) return null;

  return (
    <div className="flex gap-4 my-4">
      {block.children.map((column) => (
        <div key={column.id} className="flex-1">
          {renderBlock(column)}
        </div>
      ))}
    </div>
  );
};

const renderColumn = (block: BlockWithChildren) => {
  if (!block.children?.length) return null;
  return (
    <div className="flex-1">
      {block.children.map((childBlock) => renderBlock(childBlock))}
    </div>
  );
};

export default NotionRenderer;
