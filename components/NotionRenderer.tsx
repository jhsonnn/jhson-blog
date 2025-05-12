import React, { useMemo } from 'react';
import { BlockWithChildren } from '@/lib/notion/types';
import ClientImage from '@/components/ClientImage';

interface NotionRendererProps {
  blocks: BlockWithChildren[];
  videoUrl?: string | null;
  pageType?: string;
  pageSlug: string;
}

const NotionRenderer: React.FC<NotionRendererProps> = ({
  blocks,
  videoUrl,
  pageType,
  pageSlug,
}) => {
  const uniqueBlocks = useMemo(
    () => Array.from(new Map(blocks.map((block) => [block.id, block])).values()),
    [blocks]
  );

  if (!uniqueBlocks.length) {
    return <div>No content available</div>;
  }

  return (
    <div className="notion-container">
      {uniqueBlocks.map((block) => (
        <div key={block.id} className="notion-block">
          {renderBlock(block, pageType, pageSlug)}
        </div>
      ))}
      {videoUrl && videoUrl.trim() !== '' && (
        <div className="video-container my-4">
          <video controls src={videoUrl} className="w-full max-w-screen-md rounded-xl mb-10">
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

const renderBlock = (block: BlockWithChildren, pageType?: string, pageSlug?: string) => {
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
      return renderImage(block, pageType, pageSlug);
    default:
      return <div className="unsupported-block">Unsupported block type</div>;
  }
};

const renderParagraph = (block: BlockWithChildren) => {
  const richTextArray = block.paragraph?.rich_text ?? [];
  const hasText = richTextArray.some((text) => text.plain_text.trim() !== '');

  return (
    <p className={`whitespace-pre-wrap leading-relaxed${hasText ? '' : ' min-h-[1rem]'}`}>
      {hasText ? (
        richTextArray.map((text, index) => {
          let content = text.plain_text;
          if (content.startsWith(' ')) {
            const spaceCount = content.match(/^\s+/)?.[0].length || 0;
            content = '\u00A0'.repeat(spaceCount) + content.trimStart();
          }
          const lines = content.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="block h-[1rem]">&nbsp;</span>}
              {line || <span className="inline-block min-h-[1rem]">&nbsp;</span>}
            </React.Fragment>
          ));

          return text.href ? (
            <a
              key={index}
              href={text.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              {text.annotations.bold ? <strong>{lines}</strong> : lines}
            </a>
          ) : text.annotations.bold ? (
            <strong key={index}>{lines}</strong>
          ) : (
            <React.Fragment key={index}>{lines}</React.Fragment>
          );
        })
      ) : (
        <span className="inline-block min-h-[0.5rem] w-full">&nbsp;</span>
      )}
    </p>
  );
};

const renderHeading1 = (block: BlockWithChildren) => (
  <h1 className="text-2xl lg:text-3xl font-bold my-4">
    {block.heading_1?.rich_text?.map((t) => t.plain_text).join(' ')}
  </h1>
);

const renderHeading2 = (block: BlockWithChildren) => (
  <h2 className="text-xl lg:text-2xl font-bold my-3">
    {block.heading_2?.rich_text?.map((t) => t.plain_text).join(' ')}
  </h2>
);

// const renderHeading3 = (block: BlockWithChildren) => (
//   <h3 className="sm:text-base text-lg lg:text-xl font-bold my-2">
//     {block.heading_3?.rich_text?.map((text) => text.plain_text).join(' ')}
//   </h3>
// );

const renderHeading3 = (block: BlockWithChildren) => (
  <h3 className="text-lg lg:text-xl font-bold my-2">
    {block.heading_3?.rich_text?.map((t) => t.plain_text).join(' ')}
  </h3>
);

const renderBulletedListItem = (block: BlockWithChildren) => {
  const hasText =
    block.bulleted_list_item?.rich_text?.some((t) => t.plain_text.trim() !== '') ?? false;
  const hasChildren = block.children?.length ?? 0 > 0;
  return (
    <ul className="list-disc pl-6 my-2 text-sm sm:text-base">
      <li className={`${hasText || hasChildren ? '' : 'min-h-[1.5rem] block'}`}>
        {hasText ? (
          block.bulleted_list_item?.rich_text.map((text, _i) => text.plain_text)
        ) : (
          <span className="block min-h-[1.5rem] w-full">&nbsp;</span>
        )}
      </li>
    </ul>
  );
};

const renderImage = (block: BlockWithChildren, pageType?: string, pageSlug?: string) => {
  if (!block.image) return null;

  let originalUrl: string | null = null;
  if (block.image.type === 'file' && block.image.file?.url) {
    originalUrl = block.image.file.url;
  } else if (block.image.type === 'external' && block.image.external?.url) {
    originalUrl = block.image.external.url;
  }
  if (!originalUrl) return null;

  const notionFallbackUrl = originalUrl.startsWith('https://prod-files-secure.s3.')
    ? originalUrl.replace('https://prod-files-secure.s3.', 'https://www.notion.so/image/')
    : originalUrl;

  const proxiedUrl = `/api/image-proxy?url=${encodeURIComponent(originalUrl)}&slug=${encodeURIComponent(
    block.id
  )}&fallback=${encodeURIComponent(notionFallbackUrl)}`;

  const altText = block.image.caption?.[0]?.plain_text || 'Notion Image';

  const baseClass =
    pageType === 'resume'
      ? 'rounded-xl object-cover max-w-[200px] max-h-[200px]'
      : 'rounded-xl object-cover w-[70%] max-w-[700px] min-w-[160px] h-auto';

  return (
    <div className="my-3 max-w-full min-h-[200px] rounded-xl w-auto">
      <ClientImage
        src={proxiedUrl}
        // slug={block.id}
        slug={pageSlug || '_default'}
        alt={altText}
        width={pageType === 'resume' ? 200 : 700}
        height={pageType === 'resume' ? 200 : 550}
        fill={false}
        className={baseClass}
      />
    </div>
  );
};

const renderDivider = () => <hr className="my-4 border-gray-300" />;

const renderColumnList = (block: BlockWithChildren, pageType?: string, pageSlug?: string) => {
  if (!block.children?.length) return null;
  return (
    <div className="flex flex-col sm:flex-row items-start gap-6 my-4 w-full">
      {block.children.map((col) => (
        <div key={col.id} className="w-full sm:w-1/2 flex-shrink-0 flex-grow">
          {renderBlock(col, pageType, pageSlug)}
        </div>
      ))}
    </div>
  );
};

const renderColumn = (block: BlockWithChildren, pageType?: string) => {
  if (!block.children?.length) return null;
  return (
    <div className="w-full">{block.children.map((child) => renderBlock(child, pageType))}</div>
  );
};

export default NotionRenderer;
