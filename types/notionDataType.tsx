// import {
//   PageObjectResponse,
//   RichTextItemResponse,
// } from "@notionhq/client/build/src/api-endpoints"; // Notion API에서 제공하는 타입 사용

// // title 속성에 대한 타입 가드
// export function isTitleProperty(
//   property: PageObjectResponse["properties"][keyof PageObjectResponse["properties"]]
// ): property is {
//   id: string;
//   type: "title";
//   title: RichTextItemResponse[];
// } {
//   return property.type === "title" && "title" in property;
// }

// // number 속성에 대한 타입 가드
// export function isNumberProperty(
//   property: PageObjectResponse["properties"][keyof PageObjectResponse["properties"]]
// ): property is {
//   id: string;
//   type: "number";
//   number: number | null;
// } {
//   return property.type === "number" && "number" in property;
// }

// // Files Property 타입 가드
// export function isFilesProperty(
//   property: PageObjectResponse["properties"][keyof PageObjectResponse["properties"]]
// ): property is {
//   id: string;
//   type: "files";
//   files: Array<
//     | { file: { url: string; expiry_time: string }; name: string; type: "file" }
//     | { external: { url: string }; name: string; type: "external" }
//   >;
// } {
//   return property.type === "files";
// }

// // Rich text 타입인지 확인하는 타입 가드
// export function isRichTextProperty(
//   property: any
// ): property is { type: "rich_text"; rich_text: any } {
//   return property && property.type === "rich_text";
// }
// // 페이지 객체에서 사용할 타입 정의 제거 (이미 Notion API에서 제공되므로 중복 정의 제거)

// // type User = {
// //   object: "user";
// //   id: string;
// // };

// // type Parent = {
// //   type: "database_id";
// //   database_id: string;
// // };

// // type FileProperty = {
// //   id: string;
// //   type: "files";
// //   files: Array<{ name: string; type: string; url: string }> | [];
// // };

// // type MultiSelectOption = {
// //   id: string;
// //   name: string;
// //   color: string;
// // };

// // type SelectOption = {
// //   id: string;
// //   name: string;
// //   color: string;
// // };

// // type RichText = {
// //   type: "text";
// //   text: {
// //     content: string;
// //     link: string | null;
// //   };
// //   annotations: {
// //     bold: boolean;
// //     italic: boolean;
// //     strikethrough: boolean;
// //     underline: boolean;
// //     code: boolean;
// //     color: string;
// //   };
// //   plain_text: string;
// //   href: string | null;
// // };

// // type StatusProperty = {
// //   id: string;
// //   type: "status";
// //   status: {
// //     id: string;
// //     name: string;
// //     color: string;
// //   };
// // };

// // type DateProperty = {
// //   id: string;
// //   type: "date";
// //   date: {
// //     start: string;
// //     end: string | null;
// //     time_zone: string | null;
// //   };
// // };

// // type TitleProperty = {
// //   id: string;
// //   type: "title";
// //   title: RichText[];
// // };

// // type Properties = {
// //   thumbnailUrl: FileProperty;
// //   last_edited_time: DateProperty;
// //   tags: {
// //     id: string;
// //     type: "multi_select";
// //     multi_select: MultiSelectOption[];
// //   };
// //   category: {
// //     id: string;
// //     type: "select";
// //     select: SelectOption;
// //   };
// //   slug: {
// //     id: string;
// //     type: "rich_text";
// //     rich_text: RichText[];
// //   };
// //   status: StatusProperty;
// //   date: DateProperty;
// //   title: TitleProperty;
// // };

// // type PageObjectResponse = {
// //   object: "page";
// //   id: string;
// //   created_time: string;
// //   last_edited_time: string;
// //   created_by: User;
// //   last_edited_by: User;
// //   cover: {
// //     type: "file" | "external";
// //     file?: { url: string };
// //     external?: { url: string };
// //   } | null;
// //   icon: string | null;
// //   parent: Parent;
// //   archived: boolean;
// //   in_trash: boolean;
// //   properties: Properties;
// //   url: string;
// //   public_url: string | null;
// // };

import {
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

// Title property 타입 가드
export function isTitleProperty(
  property:
    | PageObjectResponse["properties"][keyof PageObjectResponse["properties"]]
    | undefined
): property is {
  id: string;
  type: "title";
  title: RichTextItemResponse[];
} {
  return property?.type === "title";
}

// Number property 타입 가드
export function isNumberProperty(
  property: PageObjectResponse["properties"][keyof PageObjectResponse["properties"]]
): property is {
  id: string;
  type: "number";
  number: number | null;
} {
  return property.type === "number";
}

// Files Property 타입 가드
export function isFilesProperty(
  property: PageObjectResponse["properties"][keyof PageObjectResponse["properties"]]
): property is {
  id: string;
  type: "files";
  files: Array<
    | { file: { url: string; expiry_time: string }; name: string; type: "file" }
    | { external: { url: string }; name: string; type: "external" }
  >;
} {
  return property.type === "files";
}

// Rich text property 타입 가드
export function isRichTextProperty(
  property: PageObjectResponse["properties"][keyof PageObjectResponse["properties"]]
): property is {
  id: string;
  type: "rich_text";
  rich_text: RichTextItemResponse[];
} {
  return property.type === "rich_text";
}
