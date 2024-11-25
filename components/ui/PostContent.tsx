import { fetchPageContentBlocks } from '@/lib/notion/fetchPageContentBlocks';
import { fetchVideoUrl } from '@/lib/notion/fetchVideoUrl';
import {
  BlockObjectResponse,
  PageObjectResponse,
  DatabaseObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { useEffect, useState } from 'react';
import {
  isFullBlockResponse,
  isHeading1Block,
  isHeading3Block,
  isPageObjectResponse,
  isParagraphBlock,
} from '@/types/notionDataType';

export default function PostContent({
  pageData,
  pageId,
}: {
  pageData: PageObjectResponse | DatabaseObjectResponse;
  pageId: string;
}) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<BlockObjectResponse[]>([]);

  useEffect(() => {
    const fetchVideo = async () => {
      if (isPageObjectResponse(pageData)) {
        const slug =
          pageData.properties.slug?.type === 'rich_text'
            ? pageData.properties.slug.rich_text[0]?.plain_text
            : '';

        const url = await fetchVideoUrl(slug);
        if (url) {
          setVideoUrl(url);
        }
      }
    };

    const fetchBlocks = async () => {
      const blocksData = await fetchPageContentBlocks(pageId);
      const fullBlocks = blocksData.filter(isFullBlockResponse);
      setBlocks(fullBlocks);
    };

    fetchVideo();
    fetchBlocks();
  }, [pageData, pageId]);

  return (
    <div className="dark:bg-neutral-700 bg-neutral-100 p-10 rounded-lg">
      {/* 비디오 렌더링 */}
      {videoUrl ? (
        <video src={videoUrl} controls width="100%" className="mt-1" />
      ) : (
        <p>No video available for this post</p>
      )}

      {/* Notion 블록 렌더링 */}
      <div>
        {blocks.map((block) => {
          if (isParagraphBlock(block)) {
            const richText = block.paragraph.rich_text || [];
            const plainText = richText.map((text) => text.plain_text).join('');
            return <p key={block.id}>{plainText}</p>;
          }

          if (isHeading1Block(block)) {
            const richText = block.heading_1.rich_text || [];
            const plainText = richText.map((text) => text.plain_text).join('');
            return <h1 key={block.id}>{plainText}</h1>;
          }

          if (isHeading3Block(block)) {
            const richText = block.heading_3.rich_text || [];
            const plainText = richText.map((text) => text.plain_text).join('');
            return <h3 key={block.id}>{plainText}</h3>;
          }

          return <div key={block.id}>Unsupported block type</div>;
        })}
      </div>
    </div>
  );
}
