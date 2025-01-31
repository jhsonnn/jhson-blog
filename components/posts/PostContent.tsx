//포스트 컨텐츠 렌더링
import {
  BlockWithChildren,
  LocalRichTextItemResponse,
} from '@/lib/notion/types';
import Image from 'next/image';
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
    <Image
      src={url}
      alt={altText}
      layout="responsive"
      width={200}
      height={100}
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
