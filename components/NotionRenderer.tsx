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
      {uniqueBlocks.map((block) => (
        <div key={block.id} className="notion-block">
          {renderBlock(block, pageType)}
        </div>
      ))}
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

// const renderParagraph = (block: BlockWithChildren) => (
//   <p>{block.paragraph?.rich_text?.map((text) => text.plain_text).join(' ')}</p>
// );

// const renderParagraph = (block: BlockWithChildren) => (
//   <p>
//     {block.paragraph?.rich_text?.map((text, index) =>
//       text.href ? (
//         <a
//           key={index}
//           href={text.href}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-500 hover:underline"
//         >
//           {text.plain_text}
//         </a>
//       ) : (
//         <span key={index}>{text.plain_text}</span>
//       )
//     )}
//   </p>
// );

// const renderParagraph = (block: BlockWithChildren) => {
//   if (!block.paragraph?.rich_text || block.paragraph.rich_text.length === 0) {
//     return <p className="leading-relaxed min-h-[1rem]">&nbsp;</p>; // 빈 paragraph도 공간을 차지하도록 설정
//   }

//   return (
//     <p className="leading-relaxed">
//       {block.paragraph.rich_text.map((text, index) =>
//         text.href ? (
//           <a
//             key={index}
//             href={text.href}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 dark:text-blue-400 underline"
//           >
//             {text.plain_text.split('\n').map((line, i) => (
//               <React.Fragment key={i}>
//                 {i > 0 && <br />}
//                 {line.trim() === '' ? (
//                   <span className="inline-block min-h-[1rem]">&nbsp;</span>
//                 ) : (
//                   line
//                 )}
//               </React.Fragment>
//             ))}
//           </a>
//         ) : (
//           text.plain_text.split('\n').map((line, i) => (
//             <React.Fragment key={i}>
//               {i > 0 && <br />}
//               {line.trim() === '' ? (
//                 <span className="inline-block min-h-[1rem]">&nbsp;</span>
//               ) : (
//                 line
//               )}
//             </React.Fragment>
//           ))
//         )
//       )}
//     </p>
//   );
// };

const renderParagraph = (block: BlockWithChildren) => {
  const richTextArray = block.paragraph?.rich_text ?? []; // rich_text가 undefined면 빈 배열 반환

  const hasText =
    richTextArray.length > 0 &&
    richTextArray.some((text) => text.plain_text.trim() !== '');

  return (
    <p className={`leading-relaxed ${hasText ? '' : 'min-h-[1rem]'}`}>
      {hasText ? (
        richTextArray.map((text, index) =>
          text.href ? (
            <a
              key={index}
              href={text.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              {text.plain_text.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <br />}
                  {line || (
                    <span className="inline-block min-h-[1rem]">&nbsp;</span>
                  )}
                </React.Fragment>
              ))}
            </a>
          ) : (
            text.plain_text.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {line || (
                  <span className="inline-block min-h-[1rem]">&nbsp;</span>
                )}
              </React.Fragment>
            ))
          )
        )
      ) : (
        //빈 paragraph도 공간을 차지하도록 설정(띄어쓰기 되도록)
        <span className="inline-block min-h-[1rem] w-full">&nbsp;</span>
      )}
    </p>
  );
};

const renderHeading1 = (block: BlockWithChildren) => (
  <h1 className="text-2xl lg:text-3xl font-bold my-4">
    {block.heading_1?.rich_text?.map((text) => text.plain_text).join(' ')}
  </h1>
);

const renderHeading2 = (block: BlockWithChildren) => (
  <h2 className="text-xl lg:text-2xl font-bold my-3">
    {block.heading_2?.rich_text?.map((text) => text.plain_text).join(' ')}
  </h2>
);

const renderHeading3 = (block: BlockWithChildren) => (
  <h3 className="sm:text-base text-lg lg:text-xl font-bold my-2">
    {block.heading_3?.rich_text?.map((text) => text.plain_text).join(' ')}
  </h3>
);

const renderBulletedListItem = (
  block: BlockWithChildren,
  isSubItem = false
) => {
  const hasText =
    block.bulleted_list_item?.rich_text?.length &&
    block.bulleted_list_item.rich_text.some(
      (text) => text.plain_text.trim() !== ''
    );

  const hasChildren = block.children && block.children.length > 0;

  return (
    <ul
      className={`${
        isSubItem ? 'list-[circle]' : 'list-disc'
      } pl-6 my-2 text-sm sm:text-base`}
    >
      {/* 빈 줄 유지하여 공백 유지 */}
      <li className={`${hasText || hasChildren ? '' : 'min-h-[1.5rem] block'}`}>
        {hasText ? (
          block.bulleted_list_item?.rich_text?.map((text, index) => {
            const content = text.plain_text.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {line || (
                  <span className="inline-block min-h-[1.5rem] w-full">
                    &nbsp;
                  </span>
                )}
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
          <ul className="pl-6 my-1">
            {block.children?.map((childBlock) =>
              childBlock.type === 'bulleted_list_item' ? (
                <li key={childBlock.id}>
                  {renderBulletedListItem(childBlock, true)}
                </li>
              ) : (
                <p key={childBlock.id} className="pl-6">
                  {childBlock.paragraph?.rich_text?.map((text, index) => {
                    const content = text.plain_text
                      .split('\n')
                      .map((line, i) => (
                        <React.Fragment key={i}>
                          {i > 0 && <br />}
                          {line || (
                            <span className="inline-block min-h-[1.5rem] w-full">
                              &nbsp;
                            </span>
                          )}
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
                        {text.annotations.bold ? (
                          <strong>{content}</strong>
                        ) : (
                          content
                        )}
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
  if (!block.image) {
    console.warn('Image block is missing the image property:', block);
    return null;
  }

  const imageUrl =
    block.image?.type === 'file'
      ? block.image.file?.url
      : block.image.external?.url;

  if (!imageUrl) {
    console.warn('Image block is missing a valid URL:', block.image);
    return null;
  }

  const altText = block.image.caption?.[0]?.plain_text || 'Notion Image';

  //gif인지 확인인
  const isGif = imageUrl.toLowerCase().endsWith('.gif');

  return (
    <div className="my-3 max-w-full min-h-[200px] rounded-xl w-auto">
      {isGif ? (
        <img
          src={imageUrl}
          alt={altText}
          className="rounded-xl max-w-full h-auto"
        />
      ) : (
        <Image
          key={imageUrl}
          src={imageUrl}
          alt={altText}
          width={pageType === 'resume' ? 200 : 700}
          height={pageType === 'resume' ? 200 : 550}
          className="rounded-xl"
          loading="lazy"
          placeholder="blur"
          blurDataURL="/default_image.png"
          unoptimized
        />
      )}
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
