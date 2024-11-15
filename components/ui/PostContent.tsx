import { fetchPageContentBlocks } from '@/lib/notion/fetchPageContentBlocks';
import { fetchVideoUrl } from '@/lib/notion/fetchVideoUrl';
import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  PageObjectResponse,
  DatabaseObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { useEffect, useState } from 'react';
import { isPageObjectResponse } from '@/types/notionDataType';

function isFullBlockResponse(
  block: BlockObjectResponse | PartialBlockObjectResponse
): block is BlockObjectResponse {
  return block.object === 'block';
}

function isParagraphBlock(
  block: BlockObjectResponse
): block is BlockObjectResponse & { type: 'paragraph' } {
  return block.type === 'paragraph';
}

function isHeading1Block(
  block: BlockObjectResponse
): block is BlockObjectResponse & { type: 'heading_1' } {
  return block.type === 'heading_1';
}

export default function PostContent({
  pageData,
  pageId,
  isPostContent,
}: {
  pageData: PageObjectResponse | DatabaseObjectResponse;
  pageId: string;
  isPostContent: boolean;
}) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<BlockObjectResponse[]>([]);
  isPostContent = true;

  useEffect(() => {
    const fetchVideo = async () => {
      if (isPageObjectResponse(pageData)) {
        // slug 속성에서 텍스트 추출
        const slug =
          pageData.properties.slug?.type === 'rich_text'
            ? pageData.properties.slug.rich_text[0]?.plain_text
            : '';

        // 비디오 URL 가져오기
        const url = await fetchVideoUrl(slug);
        if (url) {
          console.log(`Video URL found for slug "${slug}": ${url}`);
          setVideoUrl(url);
        } else {
          console.log(`No video URL found for slug "${slug}".`);
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
    <div className="dark:bg-neutral-700 bg-neutral-100 p-6 rounded-lg">
      {/* 비디오 URL이 있는 경우 비디오 렌더링 */}
      {videoUrl ? (
        <div>
          <video src={videoUrl} controls width="100%" />
        </div>
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

          return <div key={block.id}>Unsupported block type</div>;
        })}
      </div>
    </div>
  );
}
