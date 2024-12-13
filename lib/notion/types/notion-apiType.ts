import {
  RichTextItemResponse as NotionRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';

export type { NotionRichTextItemResponse };

export type NotionBlockType =
  | 'paragraph'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'to_do'
  | 'toggle'
  | 'quote'
  | 'divider'
  | 'callout'
  | 'column'
  | 'column_list'
  | 'link_to_page'
  | 'synced_block'
  | 'template'
  | 'breadcrumb'
  | 'table'
  | 'table_row'
  | 'unsupported'
  | 'rich_text'
  | 'child_page'
  | 'child_database'
  | 'file'
  | 'image'
  | 'video'
  | 'audio'
  | 'code';

export type SelectColor =
  | 'default'
  | 'gray'
  | 'brown'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red';

export type ApiColor =
  | SelectColor
  | 'gray_background'
  | 'brown_background'
  | 'orange_background'
  | 'yellow_background'
  | 'green_background'
  | 'blue_background'
  | 'purple_background'
  | 'pink_background'
  | 'red_background';


export type FileObject = {
  type: "file";
  file: { url: string; expiry_time: string };
  name: string;
};

export type ExternalObject = {
  type: "external";
  external: { url: string };
  name: string;
};

export type FileValue = FileObject | ExternalObject;
