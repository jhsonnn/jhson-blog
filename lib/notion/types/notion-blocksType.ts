// import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionBlockType, NotionRichTextItemResponse } from "./notion-apiType";

export interface RichText {
  type: 'text';
  text: {
    content: string;
    link: { url: string } | null;
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
}

export type LocalRichTextItemResponse = {
  plain_text: string;
  href?: string | null;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  type: 'text' | 'mention' | 'equation';
};

// export interface BlockWithChildren {
//   id: string;
//   type: NotionBlockType;
//   has_children: boolean;
//   children?: BlockWithChildren[];
//   paragraph?: { rich_text: NotionRichTextItemResponse[] };
//   heading_1?: { rich_text: NotionRichTextItemResponse[] };
//   heading_2?: { rich_text: NotionRichTextItemResponse[] };
//   heading_3?: { rich_text: NotionRichTextItemResponse[] };
//   bulleted_list_item?: { rich_text: NotionRichTextItemResponse[] };
//   to_do?: {
//     rich_text: NotionRichTextItemResponse[];
//     checked: boolean;
//     color: string;
//   };
//   image?: {
//     type: 'file' | 'external';
//     file?: { url: string };
//     external?: { url: string };
//     caption?: NotionRichTextItemResponse[];
//   };
//   video?: {
//     type: 'file' | 'external';
//     file?: { url: string };
//     external?: { url: string };
//   };
//   [key: string]: unknown;
// }

export interface BlockWithChildren {
  id: string;
  type: NotionBlockType;
  has_children: boolean;
  children?: BlockWithChildren[];

  paragraph?: { rich_text: NotionRichTextItemResponse[] };
  heading_1?: { rich_text: NotionRichTextItemResponse[] };
  heading_2?: { rich_text: NotionRichTextItemResponse[] };
  heading_3?: { rich_text: NotionRichTextItemResponse[] };
  bulleted_list_item?: { rich_text: NotionRichTextItemResponse[] };
  to_do?: {
    rich_text: NotionRichTextItemResponse[];
    checked: boolean;
    color: string;
  };
  image?: {
    type: 'file' | 'external';
    file?: { url: string };
    external?: { url: string };
    caption?: NotionRichTextItemResponse[];
  };
  video?: {
    type: 'file' | 'external';
    file?: { url: string };
    external?: { url: string };
  };
  embed?: {
    url: string;
    caption: RichTextItemResponse[];
  };
  bookmark?: {
    url: string;
    caption: RichTextItemResponse[];
  };
  table_of_contents?: {
    color: string;
  };
   pdf?: {
    type: "external" | "file";
    external?: { url: string };
    file?: { url: string; expiry_time: string };
    caption: RichTextItemResponse[];
   };
   link_preview?: {
    url: string;
  };
  [key: string]: unknown;
}


