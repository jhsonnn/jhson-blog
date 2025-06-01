import React, { useMemo } from 'react';
import { BlockWithChildren, isWebmVideo } from '@/lib/notion/types';
import ClientImage from '@/components/ClientImage';
import ClientVideo from './ClientVideo';

interface NotionRendererProps {
  blocks: BlockWithChildren[];
  videoUrl?: string | null;
  pageType?: string;
}

const NotionRenderer: React.FC<NotionRendererProps> = ({ blocks, videoUrl, pageType }) => {
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
          {renderBlock(block, pageType)}
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
    // case 'image':
    //   return renderImage(block, pageType);
    case 'image':
      const fileUrl = block.image?.file?.url || '';
      const externalUrl = block.image?.external?.url || '';

      if (
        fileUrl.split('?')[0].toLowerCase().endsWith('.gif') ||
        externalUrl.split('?')[0].toLowerCase().endsWith('.gif')
      ) {
        return renderGif(block, pageType);
      }

      return renderImage(block, pageType);
    case 'video':
      return isWebmVideo(block) ? renderWebm(block) : renderVideo(block);
    default:
      console.warn('[NotionRenderer] Unsupported block type:', block.type, block);
      return <div className="unsupported-block">Unsupported block type</div>;
  }
};

const renderParagraph = (block: BlockWithChildren) => {
  const richTextArray = block.paragraph?.rich_text ?? [];

  const hasText =
    richTextArray.length > 0 && richTextArray.some((text) => text.plain_text.trim() !== '');

  return (
    <p className={`whitespace-pre-wrap leading-relaxed${hasText ? '' : ' min-h-[1rem]'}`}>
      {hasText ? (
        richTextArray.map((text, index) => {
          let content = text.plain_text;

          //문장 앞 공백 `&nbsp;`로 변환
          if (content.startsWith(' ')) {
            const leadingSpaces = content.match(/^(\s+)/)?.[0] || '';
            const nonSpaceContent = content.trimStart();
            content = '\u00A0'.repeat(leadingSpaces.length) + nonSpaceContent;
          }

          //줄바꿈이면 <span>으로 줄바꿈되도록 처리
          const formattedContent = content.split('\n').map((line, i) => (
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
              {text.annotations.bold ? <strong>{formattedContent}</strong> : formattedContent}
            </a>
          ) : text.annotations.bold ? (
            <strong key={index}>{formattedContent}</strong>
          ) : (
            <React.Fragment key={index}>{formattedContent}</React.Fragment>
          );
        })
      ) : (
        //빈 paragraph 줄바꿈 되도록
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
  <h3 className="sm:text-base text-lg lg:text-xl font-bold my-2">
    {block.heading_3?.rich_text?.map((text, index) => {
      return text.href ? (
        <a
          key={index}
          href={text.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 underline inline-block pointer-events-auto"
        >
          {text.annotations.bold ? <strong>{text.plain_text}</strong> : text.plain_text}
        </a>
      ) : text.annotations.bold ? (
        <strong key={index}>{text.plain_text}</strong>
      ) : (
        <React.Fragment key={index}>{text.plain_text}</React.Fragment>
      );
    })}
  </h3>
);

const renderBulletedListItem = (block: BlockWithChildren, isSubItem = false) => {
  const hasText =
    block.bulleted_list_item?.rich_text?.length &&
    block.bulleted_list_item.rich_text.some((text) => text.plain_text.trim() !== '');

  const hasChildren = block.children && block.children.length > 0;

  return (
    <ul className={`${isSubItem ? 'list-[circle]' : 'list-disc'} pl-6 my-2 text-sm sm:text-base`}>
      {/* 빈 줄 유지하여 공백 유지 */}
      <li className={`${hasText || hasChildren ? '' : 'min-h-[1.5rem] block'}`}>
        {hasText ? (
          block.bulleted_list_item?.rich_text?.map((text, index) => {
            const content = text.plain_text.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {line || <span className="inline-block min-h-[1.5rem] w-full">&nbsp;</span>}
              </React.Fragment>
            ));

            return text.href ? (
              <a
                key={index}
                href={text.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 dark:text-blue-400 hover:underline"
              >
                {text.annotations.bold ? <strong>{content}</strong> : content}
              </a>
            ) : text.annotations.bold ? (
              <strong key={index}>{content}</strong>
            ) : (
              <React.Fragment key={index}>{content}</React.Fragment>
            );
          })
        ) : (
          <span className="block min-h-[1.5rem] w-full">&nbsp;</span>
        )}

        {/* children 렌더링 */}
        {hasChildren && (
          <ul>
            {block.children?.map((childBlock) =>
              childBlock.type === 'bulleted_list_item' ? (
                <li key={childBlock.id}>{renderBulletedListItem(childBlock, true)}</li>
              ) : (
                <p key={childBlock.id} className="pl-6">
                  {childBlock.paragraph?.rich_text?.map((text, index) => {
                    const content = text.plain_text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <br />}
                        {line || <span className="inline-block min-h-[1.5rem] w-full">&nbsp;</span>}
                      </React.Fragment>
                    ));

                    return text.href ? (
                      <a
                        key={index}
                        href={text.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 dark:text-blue-400 hover:underline"
                      >
                        {text.annotations.bold ? <strong>{content}</strong> : content}
                      </a>
                    ) : text.annotations.bold ? (
                      <strong key={index}>{content}</strong>
                    ) : (
                      <React.Fragment key={index}>{content}</React.Fragment>
                    );
                  })}
                </p>
              )
            )}
          </ul>
        )}
      </li>
    </ul>
  );
};

const renderImage = (block: BlockWithChildren, pageType?: string) => {
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
        slug={block.id}
        alt={altText}
        width={pageType === 'resume' ? 200 : 700}
        height={pageType === 'resume' ? 200 : 550}
        fill={false}
        className={baseClass}
      />
    </div>
  );
};

const renderGif = (block: BlockWithChildren, pageType?: string) => {
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

  const altText = block.image.caption?.[0]?.plain_text || 'Notion GIF';

  const baseClass =
    pageType === 'resume'
      ? 'rounded-xl object-contain max-w-[200px] max-h-[200px]'
      : 'rounded-xl object-contain w-[70%] max-w-[700px] min-w-[160px] h-auto';

  return (
    <div className="my-3 max-w-full min-h-[200px] rounded-xl w-auto">
      <ClientImage
        src={proxiedUrl}
        slug={block.id}
        alt={altText}
        width={pageType === 'resume' ? 200 : 700}
        height={pageType === 'resume' ? 200 : 550}
        fill={false}
        className={baseClass}
      />
    </div>
  );
};

const renderVideo = (block: BlockWithChildren) => {
  if (!block.video) return null;

  const videoUrl = block.video.type === 'file' ? block.video.file?.url : block.video.external?.url;

  const caption = block?.['caption']?.[0]?.plain_text ?? 'video';

  if (!videoUrl) return null;

  return (
    <div className="my-4 w-full max-w-screen-md">
      <video controls autoPlay loop muted playsInline className="w-full rounded-xl">
        <source src={videoUrl} type="video/webm" />
        {caption}
      </video>
    </div>
  );
};

const renderWebm = (block: BlockWithChildren) => {
  const videoUrl =
    block.video?.type === 'file' ? block.video?.file?.url : block.video?.external?.url;

  const altText = block.caption?.[0]?.plain_text ?? 'video';

  if (!videoUrl) return null;

  return (
    <div className="my-6 w-full max-w-[700px] mx-auto">
      <ClientVideo
        src={videoUrl}
        blockId={block.id}
        alt={altText}
        className="rounded-xl w-full h-auto object-cover"
      />
    </div>
  );
};

const renderDivider = () => <hr className="my-4 border-gray-300" />;

const renderColumnList = (block: BlockWithChildren, pageType?: string) => {
  if (!block.children?.length) return null;
  return (
    <div className="flex flex-col sm:flex-row items-start gap-6 my-4 w-full">
      {block.children.map((col) => (
        <div key={col.id} className="w-full sm:w-1/2 flex-shrink-0 flex-grow">
          {renderBlock(col, pageType)}
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
