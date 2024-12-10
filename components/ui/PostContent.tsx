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

////////
import React from 'react';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// BlockWithChildren 타입 정의
type BlockWithChildren = BlockObjectResponse & {
  children?: BlockWithChildren[];
};

function renderBlock(block: BlockWithChildren): JSX.Element {
  if (block.type === 'heading_3') {
    const text = block.heading_3.rich_text
      .map((text) => text.plain_text)
      .join('');
    return <h3 key={block.id}>{text}</h3>;
  }

  if (block.type === 'bulleted_list_item') {
    const text = block.bulleted_list_item.rich_text
      .map((text) => text.plain_text)
      .join('');
    return (
      <li key={block.id}>
        {text}
        {block.children && (
          <ul>{block.children.map((child) => renderBlock(child))}</ul>
        )}
      </li>
    );
  }

  if (block.type === 'paragraph') {
    const text = block.paragraph.rich_text
      .map((text) => text.plain_text)
      .join('');
    return <p key={block.id}>{text}</p>;
  }

  return <div key={block.id}>Unsupported block type</div>;
}

export default function PostContent({
  blocks,
}: {
  blocks: BlockWithChildren[];
}) {
  return <div>{blocks.map(renderBlock)}</div>;
}
