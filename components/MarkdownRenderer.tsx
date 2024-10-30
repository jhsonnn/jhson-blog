
// // components/MarkdownRenderer.tsx
// import React from "react";
// import ReactMarkdown from "react-markdown";
// import rehypeRaw from "rehype-raw"; // HTML 태그를 렌더링
// import remarkGfm from "remark-gfm"; // GitHub Flavored Markdown 지원
// import remarkBreaks from "remark-breaks"; // 줄바꿈 지원

// interface MarkdownRendererProps {
//   markdownContent: string;
// }

// const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
//   markdownContent,
// }) => {
//   return (
//     <div className="prose prose-lg prose-invert mx-auto my-8">
//       <ReactMarkdown
//         children={markdownContent}
//         remarkPlugins={[remarkGfm, remarkBreaks]} // 마크다운 플러그인 적용
//         rehypePlugins={[rehypeRaw]} // HTML 태그 렌더링 가능
//       />
//     </div>
//   );
// };

// export default MarkdownRenderer;



import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw"; // HTML 태그 지원
import remarkGfm from "remark-gfm"; // GFM(GitHub Flavored Markdown) 지원
import remarkBreaks from "remark-breaks"; // 줄바꿈 지원

interface MarkdownRendererProps {
  markdownContent: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  markdownContent,
}) => {
  return (
    <div className="prose prose-lg prose-invert mx-auto my-8">
      <ReactMarkdown
        children={markdownContent}
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        components={{
          div: ({ node, className, children, ...props }) => {
            // 'column-list'를 처리하여 2열 레이아웃 설정
            if (className?.includes("column-list")) {
              return (
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  {...props}
                >
                  {children}
                </div>
              );
            }

            // 각 column을 동일한 너비로 설정
            if (className?.includes("column")) {
              return (
                <div className="flex-1 p-4" {...props}>
                  {children}
                </div>
              );
            }

            return (
              <div className={className || ""} {...props}>
                {children}
              </div>
            );
          },
        }}
      />
    </div>
  );
};

export default MarkdownRenderer;
