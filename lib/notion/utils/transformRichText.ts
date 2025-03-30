//최적화 테스트
import { RichText, NotionRichTextItemResponse } from '@/lib/notion/types';

function transformRichText(item: NotionRichTextItemResponse): RichText {
  //텍스트 타입 변환
  if (item.type === 'text') {
    return {
      type: 'text',
      text: {
        content: item.text.content,
        link: item.text.link ? { url: item.text.link.url } : null,
      },
      annotations: item.annotations,
      plain_text: item.plain_text,
      href: item.href || null,
    };
  }
  //기본 값 반환
  return {
    type: 'text',
    text: { content: '', link: null },
    annotations: item.annotations || {},
    plain_text: '',
    href: null,
  };
}

export default transformRichText;
