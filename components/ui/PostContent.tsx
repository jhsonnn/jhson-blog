// import { Client } from "@notionhq/client";
// import React from "react";
// import { fetchNotionPageBySlug } from "@/utils/fetchNotionPageBySlug";
// import ClientWrapper from "@/components/ClientWrapper";
// import Post from "@/components/ui/Post";
// import {
//   PageObjectResponse,
//   PartialPageObjectResponse,
//   DatabaseObjectResponse,
// } from "@notionhq/client/build/src/api-endpoints";

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// // 타입 가드: properties가 있는지 확인
// const isDatabaseItem = (
//   page: PageObjectResponse | PartialPageObjectResponse | DatabaseObjectResponse
// ): page is PageObjectResponse | DatabaseObjectResponse => {
//   return "properties" in page;
// };

// // 타입 가드: title 속성이 있는지 확인
// const isTitleProperty = (property: any): property is { title: any[] } => {
//   return property && property.type === "title" && Array.isArray(property.title);
// };

// const DynamicPage = async ({ slug }: { slug: string }) => {
//   try {
//     // 슬러그로 페이지 ID를 얻어옴
//     const pageId = await fetchNotionPageBySlug(slug);

//     if (!pageId) {
//       throw new Error("Page ID not found");
//     }

//     // 페이지 메타데이터 및 콘텐츠 불러오기
//     const pageMetaData = await notion.pages.retrieve({ page_id: pageId });

//     let title = "No Title";
//     let date = "No Date";
//     let thumbnailUrl = "/default-thumbnail.png";

//     // 페이지가 데이터베이스 항목인지 확인
//     if (isDatabaseItem(pageMetaData)) {
//       const titleProperty = pageMetaData.properties?.title;

//       // title 속성 타입 확인
//       if (isTitleProperty(titleProperty)) {
//         title = titleProperty.title?.[0]?.plain_text || "No Title Available";
//       }

//       // date 속성 확인
//       const dateProperty = pageMetaData.properties?.date;
//       if (dateProperty?.type === "date" && dateProperty.date) {
//         date = dateProperty.date?.start || "No Date";
//       }

//       // thumbnail 속성이 files 타입인지 확인
//       const thumbnailProperty = pageMetaData.properties?.thumbnail;
//       if (thumbnailProperty?.type === "files") {
//         const thumbnailFiles = thumbnailProperty.files || [];

//         if (thumbnailFiles.length > 0) {
//           const thumbnail = thumbnailFiles[0];

//           // 파일 타입에 따른 URL 추출
//           if (thumbnail.type === "file") {
//             thumbnailUrl =
//               new Date() < new Date(thumbnail.file.expiry_time)
//                 ? thumbnail.file.url
//                 : "/default-thumbnail.png";
//           } else if (thumbnail.type === "external") {
//             thumbnailUrl = thumbnail.external.url;
//           }
//         }
//       }
//     }

//     return (
//       <ClientWrapper>
//         <Post
//           title={title}
//           slug={slug}
//           date={date}
//           thumbnailUrl={thumbnailUrl}
//         />
//       </ClientWrapper>
//     );
//   } catch (error) {
//     console.error("Error fetching page: ", error);
//     let errorMessage = "An unknown error occurred";
//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }
//     return <div>Error: {errorMessage}</div>;
//   }
// };

// export default DynamicPage;
