// import {
//   RichTextItemResponse as NotionRichTextItemResponse,
//   BlockObjectResponse as NotionBlockObjectResponse,
//   PageObjectResponse as NotionPageObjectResponse,
//   PageObjectResponse,
// } from '@notionhq/client/build/src/api-endpoints';
// export type { NotionRichTextItemResponse };

// export type NotionBlockType =
//   | 'paragraph'
//   | 'heading_1'
//   | 'heading_2'
//   | 'heading_3'
//   | 'bulleted_list_item'
//   | 'numbered_list_item'
//   | 'to_do'
//   | 'toggle'
//   | 'quote'
//   | 'divider'
//   | 'callout'
//   | 'column'
//   | 'column_list'
//   | 'link_to_page'
//   | 'synced_block'
//   | 'template'
//   | 'breadcrumb'
//   | 'table'
//   | 'table_row'
//   | 'unsupported'
//   | 'rich_text'
//   | 'child_page'
//   | 'child_database'
//   | 'file'
//   | 'image'
//   | 'video'
//   | 'audio'
//   | 'code';

// export type SelectColor =
//   | 'default'
//   | 'gray'
//   | 'brown'
//   | 'orange'
//   | 'yellow'
//   | 'green'
//   | 'blue'
//   | 'purple'
//   | 'pink'
//   | 'red';

// export type ApiColor =
//   | SelectColor
//   | 'gray_background'
//   | 'brown_background'
//   | 'orange_background'
//   | 'yellow_background'
//   | 'green_background'
//   | 'blue_background'
//   | 'purple_background'
//   | 'pink_background'
//   | 'red_background';

// //사용자
// export interface NotionUser {
//   object: 'user';
//   id: string;
// }

// //Notion 페이지 아이템 타입
// export interface NotionPageItem {
//   slug: string;
//   post: {
//     id: string;
//     properties: {
//       title?: {
//         type: 'title';
//         title: NotionRichTextItemResponse[];
//         id: string;
//       };
//       thumbnailUrl?: {
//         type: 'files';
//         files: (
//           | {
//               type: 'file';
//               file: { url: string; expiry_time: string };
//               name: string;
//             }
//           | { type: 'external'; external: { url: string }; name: string }
//         )[];
//         id: string;
//       };
//     };
//     created_time: string;
//   };
// }

// export interface Post {
//   id: string;
//   title: string;
//   slug: string;
//   created_time: string;
// }

// export interface ApiResponse {
//   id: string;
//   slug: string;
//   title: string;
//   created_time: string;
//   thumbnailUrl: string;
// }

// // 블록 관련 타입
// export interface RichText {
//   type: 'text';
//   text: {
//     content: string;
//     link: { url: string } | null;
//   };
//   annotations: {
//     bold: boolean;
//     italic: boolean;
//     strikethrough: boolean;
//     underline: boolean;
//     code: boolean;
//     color: string;
//   };
//   plain_text: string;
//   href?: string | null;
// }

// export type LocalRichTextItemResponse = {
//   plain_text: string;
//   href?: string | null;
//   annotations: {
//     bold: boolean;
//     italic: boolean;
//     strikethrough: boolean;
//     underline: boolean;
//     code: boolean;
//     color: string;
//   };
//   type: 'text' | 'mention' | 'equation';
// };

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
// }

// //페이지 관련 타입
// export interface NotionPage {
//   properties: {
//     category?: SelectProperty;
//   };
// }

// export interface SelectProperty {
//   type: 'select';
//   select: {
//     name: string;
//   } | null;
// }

// export type PartialSelectResponse = {
//   id: string;
//   name: string;
//   color: SelectColor;
// };

// export type SelectPropertyResponse = {
//   id: string;
//   type: 'select';
//   select: PartialSelectResponse | null;
// };

// //타입 가드
// type Property =
//   PageObjectResponse['properties'][keyof PageObjectResponse['properties']];

// export function isPropertyOfType<T extends Property>(
//   property: Property | undefined,
//   type: T['type']
// ): property is T {
//   return property?.type === type;
// }

// export function isBlockOfType<T extends NotionBlockObjectResponse['type']>(
//   block: NotionBlockObjectResponse,
//   type: T
// ): block is NotionBlockObjectResponse & { type: T } {
//   return block.type === type;
// }

// export function isParagraphBlock(
//   block: NotionBlockObjectResponse
// ): block is NotionBlockObjectResponse & { type: 'paragraph' } {
//   return isBlockOfType(block, 'paragraph');
// }

// export function isHeading1Block(
//   block: NotionBlockObjectResponse
// ): block is NotionBlockObjectResponse & { type: 'heading_1' } {
//   return isBlockOfType(block, 'heading_1');
// }

// export function isHeading2Block(
//   block: NotionBlockObjectResponse
// ): block is NotionBlockObjectResponse & { type: 'heading_2' } {
//   return isBlockOfType(block, 'heading_2');
// }

// export function isHeading3Block(
//   block: NotionBlockObjectResponse
// ): block is NotionBlockObjectResponse & { type: 'heading_3' } {
//   return isBlockOfType(block, 'heading_3');
// }

// export function isBulletedListItemBlock(
//   block: NotionBlockObjectResponse
// ): block is NotionBlockObjectResponse & {
//   bulleted_list_item: { rich_text: NotionRichTextItemResponse[] };
// } {
//   return block.type === 'bulleted_list_item' && 'bulleted_list_item' in block;
// }

// export function isImageBlock(
//   block: BlockWithChildren
// ): block is BlockWithChildren & { type: 'image' } {
//   return block.type === 'image' && !!block.image;
// }

// export function isVideoBlock(
//   block: BlockWithChildren
// ): block is BlockWithChildren & { type: 'video' } {
//   return block.type === 'video' && !!block.video;
// }

// export function isPageObjectResponse(
//   value: unknown
// ): value is NotionPageObjectResponse {
//   return (
//     typeof value === 'object' &&
//     value !== null &&
//     'object' in value &&
//     (value as { object: string }).object === 'page' &&
//     'properties' in value &&
//     'parent' in value
//   );
// }

// export function isSelectProperty(
//   property:
//     | PageObjectResponse['properties'][string]
//     | SelectProperty
//     | undefined
// ): property is SelectProperty {
//   return property?.type === 'select' && 'select' in property;
// }

// export function isCategoryProperty(result: NotionPageObjectResponse): boolean {
//   const categoryProperty = result.properties.category;
//   return isSelectProperty(categoryProperty) && !!categoryProperty.select?.name;
// }
