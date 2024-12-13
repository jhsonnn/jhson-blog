// components/PostContent.tsx

// import { fetchPageContentBlocks } from '@/lib/notion/utils/fetchPageContentBlocks';
// import { fetchVideoUrl } from '@/lib/notion/utils/fetchVideoUrl';
// import {
//   BlockObjectResponse,
//   PartialBlockObjectResponse,
//   PageObjectResponse,
//   DatabaseObjectResponse,
// } from '@notionhq/client/build/src/api-endpoints';
// import { useEffect, useState } from 'react';
// import { isPageObjectResponse } from '@/lib/notion/types/notionDataType';

// function isFullBlockResponse(
//   block: BlockObjectResponse | PartialBlockObjectResponse
// ): block is BlockObjectResponse {
//   return block.object === 'block';
// }

// function isParagraphBlock(
//   block: BlockObjectResponse
// ): block is BlockObjectResponse & { type: 'paragraph' } {
//   return block.type === 'paragraph';
// }

// function isHeading1Block(
//   block: BlockObjectResponse
// ): block is BlockObjectResponse & { type: 'heading_1' } {
//   return block.type === 'heading_1';
// }

// export default function PostContent({
//   pageData,
//   pageId,
// }: {
//   pageData: PageObjectResponse | DatabaseObjectResponse;
//   pageId: string;
// }) {
//   const [videoUrl, setVideoUrl] = useState<string | null>(null);
//   const [blocks, setBlocks] = useState<BlockObjectResponse[]>([]);

//   useEffect(() => {
//     const fetchVideo = async () => {
//       if (isPageObjectResponse(pageData)) {
//         const slug =
//           pageData.properties.slug?.type === 'rich_text'
//             ? pageData.properties.slug.rich_text[0]?.plain_text
//             : '';

//         const url = await fetchVideoUrl(slug);
//         if (url) {
//           setVideoUrl(url);
//         }
//       }
//     };

//     const fetchBlocks = async () => {
//       const blocksData = await fetchPageContentBlocks(pageId);
//       const fullBlocks = blocksData.filter(isFullBlockResponse);
//       setBlocks(fullBlocks);
//     };

//     fetchVideo();
//     fetchBlocks();
//   }, [pageData, pageId]);

//   return (
//     <div className="dark:bg-neutral-700 bg-neutral-100 p-10 rounded-lg">
//       {/* 비디오 렌더링 */}
//       {videoUrl ? (
//         <video src={videoUrl} controls width="100%" className="mt-1" />
//       ) : (
//         <p>No video available for this post</p>
//       )}

//       {/* Notion 블록 렌더링 */}
//       <div>
//         {blocks.map((block) => {
//           if (isParagraphBlock(block)) {
//             const richText = block.paragraph.rich_text || [];
//             const plainText = richText.map((text) => text.plain_text).join('');
//             return <p key={block.id}>{plainText}</p>;
//           }

//           if (isHeading1Block(block)) {
//             const richText = block.heading_1.rich_text || [];
//             const plainText = richText.map((text) => text.plain_text).join('');
//             return <h1 key={block.id}>{plainText}</h1>;
//           }

//           return <div key={block.id}>Unsupported block type</div>;
//         })}
//       </div>
//     </div>
//   );
// }

// components/PostContent.tsx

// PostContent.tsx
// import { useEffect, useState } from 'react';
// import { fetchPageContentBlocks } from '@/lib/notion/utils/fetchPageContentBlocks';
// import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// function isParagraphBlock(
//   block: BlockObjectResponse
// ): block is BlockObjectResponse & { type: 'paragraph' } {
//   return block.type === 'paragraph';
// }

// function isHeading3Block(
//   block: BlockObjectResponse
// ): block is BlockObjectResponse & { type: 'heading_3' } {
//   return block.type === 'heading_3';
// }

// function isBulletedListItemBlock(
//   block: BlockObjectResponse
// ): block is BlockObjectResponse & { type: 'bulleted_list_item' } {
//   return block.type === 'bulleted_list_item';
// }

// export default function PageContent({ pageId }: { pageId: string }) {
//   const [blocks, setBlocks] = useState<BlockObjectResponse[]>([]);

//   useEffect(() => {
//     const fetchBlocks = async () => {
//       const pageBlocks = await fetchPageContentBlocks(pageId);
//       setBlocks(pageBlocks);
//     };

//     fetchBlocks();
//   }, [pageId]);

//   return (
//     <div className="page-content">
//       {blocks.map((block) => {
//         if (isParagraphBlock(block)) {
//           const text = block.paragraph.rich_text
//             .map((rt) => rt.plain_text)
//             .join('');
//           return <p key={block.id}>{text}</p>;
//         }

//         if (isHeading3Block(block)) {
//           const text = block.heading_3.rich_text
//             .map((rt) => rt.plain_text)
//             .join('');
//           return <h3 key={block.id}>{text}</h3>;
//         }

//         if (isBulletedListItemBlock(block)) {
//           const text = block.bulleted_list_item.rich_text
//             .map((rt) => rt.plain_text)
//             .join('');
//           return <li key={block.id}>{text}</li>;
//         }

//         // Unsupported block fallback
//         return <div key={block.id}>Unsupported block type</div>;
//       })}
//     </div>
//   );
// }

// ////////

// components/PostContent.tsx
import {
  BlockWithChildren,
  LocalRichTextItemResponse,
} from '@/lib/notion/types';
import React from 'react';

type PostContentProps = {
  blocks: BlockWithChildren[];
};

const PostContent: React.FC<PostContentProps> = ({ blocks }) => {
  return (
    <div>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
};

const BlockRenderer: React.FC<{ block: BlockWithChildren }> = ({ block }) => {
  switch (block.type) {
    case 'heading_3':
      return <Heading3Block block={block} />;
    case 'paragraph':
      return <ParagraphBlock block={block} />;
    case 'bulleted_list_item':
      return <BulletedListItemBlock block={block} />;
    case 'image':
      return <ImageBlock block={block} />;
    case 'video':
      return <VideoBlock block={block} />;
    default:
      console.warn(`Unsupported block type: ${block.type}`);
      return (
        <div key={block.id} style={{ color: 'red' }}>
          Unsupported block type: {block.type}
        </div>
      );
  }
};

// const Heading1Block: React.FC<{ block: BlockWithChildren }> = ({ block }) => {
//   const text = renderRichText(block.heading_1?.rich_text);
//   return <h1>{text}</h1>;
// };

// const Heading2Block: React.FC<{ block: BlockWithChildren }> = ({ block }) => {
//   const text = renderRichText(block.heading_2?.rich_text);
//   return <h2>{text}</h2>;
// };

const Heading3Block: React.FC<{ block: BlockWithChildren }> = ({ block }) => {
  const text = renderRichText(block.heading_3?.rich_text);
  return <h3>{text}</h3>;
};

const ParagraphBlock: React.FC<{ block: BlockWithChildren }> = ({ block }) => {
  const text = renderRichText(block.paragraph?.rich_text);
  return <p>{text}</p>;
};

const BulletedListItemBlock: React.FC<{ block: BlockWithChildren }> = ({
  block,
}) => {
  const text = renderRichText(block.bulleted_list_item?.rich_text);
  return (
    <ul>
      <li>{text}</li>
      {block.children &&
        block.children.map((child) => (
          <BlockRenderer key={child.id} block={child} />
        ))}
    </ul>
  );
};

const ImageBlock: React.FC<{ block: BlockWithChildren }> = ({ block }) => {
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

const VideoBlock: React.FC<{ block: BlockWithChildren }> = ({ block }) => {
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
    <video
      key={block.id}
      controls
      src={url}
      className="my-4 w-full max-w-screen-lg rounded-xl"
    >
      Your browser does not support the video tag.
    </video>
  );
};

const renderRichText = (
  richTextArray?: LocalRichTextItemResponse[]
): string => {
  if (!richTextArray) return '';
  return richTextArray.map((item) => item.plain_text).join('');
};

export default PostContent;
