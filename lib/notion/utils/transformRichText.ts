// // lib/notion/utils/transformRichText.ts
// import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
// import { RichText } from '@/lib/notion/types/notionDataType';

// function transformRichText(item: RichTextItemResponse): RichText {
//   if (item.type === 'text') {
//     return {
//       type: 'text',
//       text: {
//         content: item.text.content,
//         link: item.text.link ? item.text.link.url : null,
//       },
//       annotations: item.annotations,
//       plain_text: item.plain_text,
//       href: item.href || null,
//     };
//   }

//   throw new Error(`Unsupported RichTextItemResponse type: ${item.type}`);
// }

// export default transformRichText;

//진행중2
// lib/notion/utils/transformRichText.ts
import { RichText, NotionRichTextItemResponse } from '@/lib/notion/types';

function transformRichText(item: NotionRichTextItemResponse): RichText {
  // 텍스트 타입 변환 처리
  if (item.type === 'text') {
    return {
      type: 'text',
      text: {
        content: item.text.content,
        link: item.text.link ? { url: item.text.link.url } : null, // url을 객체로 변환
      },
      annotations: item.annotations,
      plain_text: item.plain_text,
      href: item.href || null,
    };
  }

  console.warn(`Unsupported RichTextItemResponse type: ${item.type}`);

  // 기본 값 반환해서 앱 중단 방지
  return {
    type: 'text',
    text: {
      content: '',
      link: null,
    },
    annotations: item.annotations || {},
    plain_text: '',
    href: null,
  };
}

export default transformRichText;
