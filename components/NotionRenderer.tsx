//ISR 테스트
import React, { useMemo } from 'react';
import { BlockWithChildren } from '@/lib/notion/types';
import Image from 'next/image';

interface NotionRendererProps {
  blocks: BlockWithChildren[];
  videoUrl?: string | null;
  pageType?: string;
}

const NotionRenderer: React.FC<NotionRendererProps> = ({
  blocks,
  videoUrl,
  pageType,
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
            className="w-full max-w-screen-md rounded-xl"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {uniqueBlocks.map((block) => (
        <div key={block.id} className="notion-block">
          {renderBlock(block, pageType)}
        </div>
      ))}
    </div>
  );
};

const renderBlock = (block: BlockWithChildren, pageType?: string) => {
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
      return renderColumnList(block, pageType);
    case 'column':
      return renderColumn(block, pageType);
    case 'image':
      return renderImage(block, pageType);
    default:
      return <div className="unsupported-block">Unsupported block type</div>;
  }
};

const renderParagraph = (block: BlockWithChildren) => (
  <p>{block.paragraph?.rich_text?.map((text) => text.plain_text).join(' ')}</p>
);

const renderHeading1 = (block: BlockWithChildren) => (
  <h1 className="text-2xl lg:text-3xl font-bold my-4">
    {block.heading_1?.rich_text?.map((text) => text.plain_text).join(' ')}
  </h1>
);

const renderHeading2 = (block: BlockWithChildren) => (
  <h2 className="text-xl lg:text-2xl font-semibold my-3">
    {block.heading_2?.rich_text?.map((text) => text.plain_text).join(' ')}
  </h2>
);

const renderHeading3 = (block: BlockWithChildren) => (
  <h3 className="text-lg lg:text-xl font-medium my-2">
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

const renderImage = (block: BlockWithChildren, pageType?: string) => {
  if (!block.image) {
    console.warn('Image block is missing the image property:', block);
    return null;
  }

  console.log('Full Image Block:', block.image);

  const url =
    block.image?.type === 'file'
      ? block.image?.file?.url
      : block.image?.external?.url;

  if (!url) {
    console.warn('Image block is missing a valid URL:', block.image);
    return null;
  }

  const altText = block.image.caption?.[0]?.plain_text || 'Notion Image';

  const imageSize = {
    width: pageType === 'resume' ? 200 : 700,
    height: pageType === 'resume' ? 200 : 550,
  };

  console.log(`Rendering image on ${pageType || 'default'} page`, imageSize);
  console.log(`Image URL:`, url);

  return (
    <div className="my-3 max-w-full min-h-[200px] rounded-xl w-auto">
      <Image
        key={url} //URL 바뀌면 리렌더링
        src={url}
        alt={altText}
        width={imageSize.width}
        height={imageSize.height}
        className="rounded-xl"
        loading="lazy"
        placeholder="blur"
        blurDataURL="/default_image.png"
        unoptimized //Next.js가 최적화하지 않도록 설정
      />
    </div>
  );
};

const renderDivider = () => <hr className="my-4 border-gray-300" />;

const renderColumnList = (block: BlockWithChildren, pageType?: string) => {
  if (!block.children?.length) return null;

  return (
    <div className="flex gap-4 my-4">
      {block.children.map((column) => (
        <div key={column.id} className="flex-1">
          {renderBlock(column, pageType)}
        </div>
      ))}
    </div>
  );
};

const renderColumn = (block: BlockWithChildren, pageType?: string) => {
  if (!block.children?.length) return null;
  return (
    <div className="flex-1">
      {block.children.map((childBlock) => renderBlock(childBlock, pageType))}
    </div>
  );
};

export default NotionRenderer;
