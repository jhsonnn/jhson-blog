export type NotionDateProperty = {
  id: string;
  type: "date";
  date: {
    start: string;
    end?: string | null;
    time_zone?: string | null;
  } | null;
};

export type NotionMultiSelectProperty = {
  id: string;
  type: "multi_select";
  multi_select: Array<{
    id: string;
    name: string;
    color: string;
  }>;
};

export type NotionSelectProperty = {
  id: string;
  type: "select";
  select: {
    id: string;
    name: string;
    color: string;
  } | null;
};

export type NotionFile = {
  name: string;
  type: "file";
  file: {
    url: string;
    expiry_time: string;
  };
};

export type NotionExternalFile = {
  name: string;
  type: "external";
  external: {
    url: string;
  };
};

export type NotionFilesProperty = {
  id: string;
  type: "files";
  files: Array<NotionFile | NotionExternalFile>;
};

export type NotionRichTextProperty = {
  id: string;
  type: "rich_text";
  rich_text: NotionRichText[];
};

export type NotionStatusProperty = {
  id: string;
  type: "status";
  status: {
    id: string;
    name: string;
    color: string;
  };
};

export type NotionTitleProperty = {
  id: string;
  type: "title";
  title: NotionRichText[];
};

export type NotionProperty =
  | NotionDateProperty
  | NotionMultiSelectProperty
  | NotionSelectProperty
  | NotionFilesProperty
  | NotionRichTextProperty
  | NotionStatusProperty
  | NotionTitleProperty;

// export type NotionData = {
//   id: string;
//   created_time: string;
//   last_edited_time: string;
//   url: string;
//   properties: {
//     last_edited_time?: NotionDateProperty;
//     thumbnail?: NotionFilesProperty;
//     tags?: NotionMultiSelectProperty;
//     category?: NotionSelectProperty;
//     slug?: NotionRichTextProperty;
//     status?: NotionStatusProperty;
//     date?: NotionDateProperty;
//     title?: NotionTitleProperty;
//   };
// };

export type NotionData = {
  id: string;
  created_time: string;
  last_edited_time: string;
  url: string;
  properties: {
    last_edited_time?: NotionDateProperty;
    thumbnail?: NotionFilesProperty;
    tags?: NotionMultiSelectProperty;
    category?: NotionSelectProperty;
    slug?: NotionRichTextProperty;
    status?: NotionStatusProperty;
    date?: NotionDateProperty;
    title?: NotionTitleProperty;
  };
};

// Notion에서 사용하는 Rich Text 타입 정의
export type NotionRichText = {
  type: string;
  text: {
    content: string;
    link?: string | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href?: string | null;
};

// Title Property 타입 정의
export type TitlePropertyValue = {
  id: string;
  type: "title";
  title: NotionRichText[];
};

// Rich Text Property 타입 정의
export type RichTextPropertyValue = {
  id: string;
  type: "rich_text";
  rich_text: NotionRichText[];
};

// PropertyValueMap은 Notion 페이지의 모든 속성 타입을 정의합니다.
export type PropertyValueMap = {
  [property: string]:
    | TitlePropertyValue
    | RichTextPropertyValue
    | { type: "select"; select: { name: string } }
    | { type: "date"; date: { start: string; end: string | null } }
    | { type: "multi_select"; multi_select: { name: string }[] }
    | { type: "files"; files: { name: string; url: string }[] }
    | { type: "number"; number: number | null };
};

// Title 속성 타입인지 확인하는 타입 가드 함수
export const isTitleProperty = (
  property: any
): property is NotionTitleProperty => {
  return property?.type === "title";
};

// Rich Text 속성 타입인지 확인하는 타입 가드 함수
export const isRichTextProperty = (
  property: any
): property is RichTextPropertyValue => {
  return property?.type === "rich_text";
};
