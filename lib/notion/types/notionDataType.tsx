// // // import {
// // //   PageObjectResponse,
// // //   RichTextItemResponse,
// // // } from "@notionhq/client/build/src/api-endpoints"; // Notion API에서 제공하는 타입 사용

// // import {
// //   BlockObjectResponse,
// //   //BulletedListItemBlockObjectResponse,
// //   //CodeBlockObjectResponse,
// //   //ColumnBlockObjectResponse,
// //   //ColumnListBlockObjectResponse,
// //   DatabaseObjectResponse,
// //   //DividerBlockObjectResponse,
// //   // FileBlockObjectResponse,
// //   //Heading1BlockObjectResponse,
// //   //Heading2BlockObjectResponse,
// //   //Heading3BlockObjectResponse,
// //   ImageBlockObjectResponse,
// //   // NumberedListItemBlockObjectResponse,
// //   PageObjectResponse,
// //   // ParagraphBlockObjectResponse,
// //   PartialDatabaseObjectResponse,
// //   PartialPageObjectResponse,
// //   QuoteBlockObjectResponse,
// //   TextRichTextItemResponse,
// //   //  UnsupportedBlockObjectResponse,
// //   VideoBlockObjectResponse,
// // } from '@notionhq/client/build/src/api-endpoints';

// // // // title 속성에 대한 타입 가드
// // // export function isTitleProperty(
// // //   property: PageObjectResponse["properties"][keyof PageObjectResponse["properties"]]
// // // ): property is {
// // //   id: string;
// // //   type: "title";
// // //   title: RichTextItemResponse[];
// // // } {
// // //   return property.type === "title" && "title" in property;
// // // }

// // // // number 속성에 대한 타입 가드
// // // export function isNumberProperty(
// // //   property: PageObjectResponse["properties"][keyof PageObjectResponse["properties"]]
// // // ): property is {
// // //   id: string;
// // //   type: "number";
// // //   number: number | null;
// // // } {
// // //   return property.type === "number" && "number" in property;
// // // }

// // // // Files Property 타입 가드
// // // export function isFilesProperty(
// // //   property: PageObjectResponse["properties"][keyof PageObjectResponse["properties"]]
// // // ): property is {
// // //   id: string;
// // //   type: "files";
// // //   files: Array<
// // //     | { file: { url: string; expiry_time: string }; name: string; type: "file" }
// // //     | { external: { url: string }; name: string; type: "external" }
// // //   >;
// // // } {
// // //   return property.type === "files";
// // // }

// // // // Rich text 타입인지 확인하는 타입 가드
// // // export function isRichTextProperty(
// // //   property: any
// // // ): property is { type: "rich_text"; rich_text: any } {
// // //   return property && property.type === "rich_text";
// // // }
// // // // 페이지 객체에서 사용할 타입 정의 제거 (이미 Notion API에서 제공되므로 중복 정의 제거)

// // // // type User = {
// // // //   object: "user";
// // // //   id: string;
// // // // };

// // // // type Parent = {
// // // //   type: "database_id";
// // // //   database_id: string;
// // // // };

// // // // type FileProperty = {
// // // //   id: string;
// // // //   type: "files";
// // // //   files: Array<{ name: string; type: string; url: string }> | [];
// // // // };

// // // // type MultiSelectOption = {
// // // //   id: string;
// // // //   name: string;
// // // //   color: string;
// // // // };

// // // // type SelectOption = {
// // // //   id: string;
// // // //   name: string;
// // // //   color: string;
// // // // };

// // // // type RichText = {
// // // //   type: "text";
// // // //   text: {
// // // //     content: string;
// // // //     link: string | null;
// // // //   };
// // // //   annotations: {
// // // //     bold: boolean;
// // // //     italic: boolean;
// // // //     strikethrough: boolean;
// // // //     underline: boolean;
// // // //     code: boolean;
// // // //     color: string;
// // // //   };
// // // //   plain_text: string;
// // // //   href: string | null;
// // // // };

// // // // type StatusProperty = {
// // // //   id: string;
// // // //   type: "status";
// // // //   status: {
// // // //     id: string;
// // // //     name: string;
// // // //     color: string;
// // // //   };
// // // // };

// // // // type DateProperty = {
// // // //   id: string;
// // // //   type: "date";
// // // //   date: {
// // // //     start: string;
// // // //     end: string | null;
// // // //     time_zone: string | null;
// // // //   };
// // // // };

// // // // type TitleProperty = {
// // // //   id: string;
// // // //   type: "title";
// // // //   title: RichText[];
// // // // };

// // // // type Properties = {
// // // //   thumbnailUrl: FileProperty;
// // // //   last_edited_time: DateProperty;
// // // //   tags: {
// // // //     id: string;
// // // //     type: "multi_select";
// // // //     multi_select: MultiSelectOption[];
// // // //   };
// // // //   category: {
// // // //     id: string;
// // // //     type: "select";
// // // //     select: SelectOption;
// // // //   };
// // // //   slug: {
// // // //     id: string;
// // // //     type: "rich_text";
// // // //     rich_text: RichText[];
// // // //   };
// // // //   status: StatusProperty;
// // // //   date: DateProperty;
// // // //   title: TitleProperty;
// // // // };

// // // // type PageObjectResponse = {
// // // //   object: "page";
// // // //   id: string;
// // // //   created_time: string;
// // // //   last_edited_time: string;
// // // //   created_by: User;
// // // //   last_edited_by: User;
// // // //   cover: {
// // // //     type: "file" | "external";
// // // //     file?: { url: string };
// // // //     external?: { url: string };
// // // //   } | null;
// // // //   icon: string | null;
// // // //   parent: Parent;
// // // //   archived: boolean;
// // // //   in_trash: boolean;
// // // //   properties: Properties;
// // // //   url: string;
// // // //   public_url: string | null;
// // // // };

// // // types/notionBlock.ts

// // export type NotionBlockType =
// //   | 'paragraph'
// //   | 'heading_1'
// //   | 'heading_2'
// //   | 'heading_3'
// //   | 'bulleted_list_item'
// //   | 'numbered_list_item'
// //   | 'to_do'
// //   | 'toggle'
// //   | 'quote'
// //   | 'divider'
// //   | 'callout'
// //   | 'column'
// //   | 'column_list'
// //   | 'link_to_page'
// //   | 'synced_block'
// //   | 'template'
// //   | 'breadcrumb'
// //   | 'table'
// //   | 'table_row'
// //   | 'unsupported'
// //   | 'rich_text';

// // export interface NotionUser {
// //   object: 'user';
// //   id: string;
// // }

// // export interface RichText {
// //   type: 'text';
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
// // }

// // export interface Heading2Block {
// //   type: 'heading_2';
// //   heading_2: {
// //     rich_text: RichText[];
// //     color: string;
// //     is_toggleable: boolean;
// //   };
// // }

// // export interface NotionBlock {
// //   object: 'block';
// //   id: string;
// //   parent: {
// //     type: 'page_id';
// //     page_id: string;
// //   };
// //   created_time: string;
// //   last_edited_time: string;
// //   created_by: NotionUser;
// //   last_edited_by: NotionUser;
// //   has_children: boolean;
// //   archived: boolean;
// //   in_trash: boolean;
// //   type: NotionBlockType;
// //   heading_2?: Heading2Block['heading_2'];
// //   rich_text?: RichText[];
// // }

// // import {
// //   BlockObjectResponse,
// //   DatabaseObjectResponse,
// //   PageObjectResponse,
// //   PartialBlockObjectResponse,
// //   PartialDatabaseObjectResponse,
// //   PartialPageObjectResponse,
// //   RichTextItemResponse,
// //   TextRichTextItemResponse,
// // } from '@notionhq/client/build/src/api-endpoints';

// // // 타입 가드에 사용할 공통 타입
// // type Property =
// //   PageObjectResponse['properties'][keyof PageObjectResponse['properties']];

// // /**
// //  * 공통 타입 가드 함수: 주어진 property가 특정 type인지 확인합니다.
// //  */
// // function isPropertyOfType<T extends Property>(
// //   property: Property | undefined,
// //   type: T['type']
// // ): property is T {
// //   return property?.type === type;
// // }

// // export function isFullPageObjectResponse(
// //   value:
// //     | PageObjectResponse
// //     | PartialPageObjectResponse
// //     | PartialDatabaseObjectResponse
// // ): value is PageObjectResponse {
// //   return 'properties' in value;
// // }

// // // Title property 타입 가드
// // export function isTitleProperty(property: Property | undefined): property is {
// //   id: string;
// //   type: 'title';
// //   title: RichTextItemResponse[];
// // } {
// //   return isPropertyOfType(property, 'title');
// // }

// // // Number property 타입 가드
// // export function isNumberProperty(property: Property | undefined): property is {
// //   id: string;
// //   type: 'number';
// //   number: number | null;
// // } {
// //   return isPropertyOfType(property, 'number');
// // }

// // // Files property 타입 가드
// // export function isFilesProperty(property: Property | undefined): property is {
// //   id: string;
// //   type: 'files';
// //   files: Array<
// //     | { file: { url: string; expiry_time: string }; name: string; type: 'file' }
// //     | { external: { url: string }; name: string; type: 'external' }
// //   >;
// // } {
// //   return isPropertyOfType(property, 'files');
// // }

// // // PageObjectResponse 타입가드
// // export function isPageObjectResponse(
// //   value:
// //     | PageObjectResponse
// //     | PartialPageObjectResponse
// //     | PartialDatabaseObjectResponse
// //     | DatabaseObjectResponse
// // ): value is PageObjectResponse {
// //   return value.object === 'page' && 'properties' in value && 'parent' in value;
// // }
// // // Rich text property 타입 가드
// // export function isRichTextProperty(
// //   property: Property | undefined
// // ): property is {
// //   id: string;
// //   type: 'rich_text';
// //   rich_text: RichTextItemResponse[];
// // } {
// //   return isPropertyOfType(property, 'rich_text');
// // }

// // /**
// //  * 공통 타입 가드 함수
// //  * @param block - 블록 객체
// //  * @param type - 특정 블록 타입 (예: 'heading_1', 'image' 등)
// //  * @returns 특정 타입의 블록인지 여부
// //  */

// // /**
// //  * BlockWithChildren 타입 정의
// //  * BlockObjectResponse에 children 속성을 추가한 타입
// //  */
// // // export type BlockWithChildren = BlockObjectResponse & {
// // //   children: BlockWithChildren[];
// // // };

// // export type LocalRichTextItemResponse = {
// //   plain_text: string;
// //   href?: string | null;
// //   annotations: {
// //     bold: boolean;
// //     italic: boolean;
// //     strikethrough: boolean;
// //     underline: boolean;
// //     code: boolean;
// //     color: string;
// //   };
// //   type: 'text' | 'mention' | 'equation';
// // };

// // export interface BlockWithChildren {
// //   id: string;
// //   type: string;
// //   has_children: boolean;
// //   children?: BlockWithChildren[];
// //   paragraph?: { rich_text: RichText[] };
// //   heading_1?: { rich_text: RichText[] };
// //   heading_2?: { rich_text: RichText[] };
// //   heading_3?: { rich_text: RichText[] };
// //   bulleted_list_item?: { rich_text: RichText[] };
// //   image?: {
// //     type: 'file' | 'external';
// //     file?: { url: string };
// //     external?: { url: string };
// //     caption?: RichText[];
// //   };
// // }

// // /**
// //  * 특정 블록이 children을 가지고 있는지 확인하는 타입 가드
// //  * @param block - 블록 객체
// //  * @returns block이 children을 가지고 있는지 여부
// //  */
// // // export function isBlockWithChildren(
// // //   block: BlockObjectResponse
// // // ): block is BlockWithChildren {
// // //   if (!block.has_children) return false;

// // //   if (!('children' in block) || block.children === undefined) {
// // //     (block as BlockWithChildren).children = [];
// // //   }

// // //   return true;
// // // }

// // /**
// //  * 블록이 특정 타입인지 확인하는 함수
// //  * @param block - 블록 객체
// //  * @param type - 블록 타입 (예: 'heading_3', 'bulleted_list_item' 등)
// //  * @returns 블록이 특정 타입인지 여부
// //  */

// // export function isBlockOfType<T extends BlockObjectResponse['type']>(
// //   block: BlockObjectResponse,
// //   type: T
// // ): block is BlockObjectResponse & { type: T } {
// //   return block.type === type;
// // }

// // export function isFullBlockResponse(
// //   block: BlockObjectResponse | PartialBlockObjectResponse
// // ): block is BlockObjectResponse {
// //   return (
// //     'type' in block &&
// //     'id' in block &&
// //     block.object === 'block' &&
// //     'has_children' in block
// //   );
// // }

// // export function isParagraphBlock(
// //   block: BlockObjectResponse
// // ): block is BlockObjectResponse & { type: 'paragraph' } {
// //   return isBlockOfType(block, 'paragraph');
// // }

// // export function isHeading1Block(
// //   block: BlockObjectResponse
// // ): block is BlockObjectResponse & { type: 'heading_1' } {
// //   return isBlockOfType(block, 'heading_1');
// // }

// // export function isHeading2Block(
// //   block: BlockObjectResponse
// // ): block is BlockObjectResponse & { type: 'heading_2' } {
// //   return isBlockOfType(block, 'heading_2');
// // }

// // // export function isHeading3Block(
// // //   block: BlockObjectResponse
// // // ): block is BlockObjectResponse & { type: 'heading_3' } {
// // //   console.log('Checking isHeading3Block:', block.type);
// // //   return block.type === 'heading_3';
// // // }
// // export function isHeading3Block(
// //   block: BlockObjectResponse
// // ): block is BlockObjectResponse & { type: 'heading_3' } {
// //   return block.type === 'heading_3';
// // }

// // export function isBulletedListItemBlock(
// //   block: BlockObjectResponse
// // ): block is BlockObjectResponse & { type: 'bulleted_list_item' } {
// //   console.log('Checking isBulletedListItemBlock:', block.type);
// //   return block.type === 'bulleted_list_item';
// // }

// // export function isNumberedListItemBlock(
// //   block: BlockObjectResponse
// // ): block is BlockObjectResponse & { type: 'numbered_list_item' } {
// //   return block.type === 'numbered_list_item';
// // }

// // export function isColumnListBlock(
// //   block: BlockObjectResponse
// // ): block is BlockObjectResponse & { type: 'column_list' } {
// //   return block.type === 'column_list';
// // }

// // export function isDividerBlock(
// //   block: BlockObjectResponse
// // ): block is BlockObjectResponse & { type: 'divider' } {
// //   return block.type === 'divider';
// // }

// // export function isCalloutBlock(
// //   block: BlockObjectResponse
// // ): block is BlockObjectResponse & { type: 'callout' } {
// //   return isBlockOfType(block, 'callout');
// // }

// // export function isQuoteBlock(
// //   block: BlockObjectResponse
// // ): block is BlockObjectResponse & { type: 'quote' } {
// //   return isBlockOfType(block, 'quote');
// // }

// // export function isImageBlock(
// //   block: BlockObjectResponse
// // ): block is BlockObjectResponse & { type: 'image' } {
// //   return isBlockOfType(block, 'image');
// // }

// // export function isVideoBlock(
// //   block: BlockObjectResponse
// // ): block is BlockObjectResponse & { type: 'video' } {
// //   return isBlockOfType(block, 'video');
// // }

// // export function isToDoBlock(
// //   block: BlockObjectResponse
// // ): block is BlockObjectResponse & { type: 'to_do' } {
// //   return isBlockOfType(block, 'to_do');
// // }

// // export function isChildPageBlock(
// //   block: BlockObjectResponse
// // ): block is BlockObjectResponse & { type: 'child_page' } {
// //   return isBlockOfType(block, 'child_page');
// // }

// // export type RichTextItem = {
// //   plain_text: string;
// //   href?: string;
// //   annotations: {
// //     bold: boolean;
// //     italic: boolean;
// //     underline: boolean;
// //     strikethrough: boolean;
// //     code: boolean;
// //     color: string;
// //   };
// // };

// // // NotionPageItem 타입
// // // export interface NotionPageItem {
// // //   slug: string;
// // //   post: {
// // //     id: string;
// // //     properties: {
// // //       title?: { type: 'title'; title: RichTextItemResponse[]; id: string };
// // //       thumbnailUrl?: {
// // //         type: 'files';
// // //         files: (
// // //           | {
// // //               type: 'file';
// // //               file: { url: string; expiry_time: string };
// // //               name: string;
// // //             }
// // //           | { type: 'external'; external: { url: string }; name: string }
// // //         )[];
// // //         id: string;
// // //       };
// // //       '\bthumbnailUrl'?: {
// // //         type: 'files';
// // //         files: (
// // //           | {
// // //               type: 'file';
// // //               file: { url: string; expiry_time: string };
// // //               name: string;
// // //             }
// // //           | { type: 'external'; external: { url: string }; name: string }
// // //         )[];
// // //         id: string;
// // //       };
// // //     };
// // //     created_time: string;
// // //   };
// // // }

// // //lib/notion/types/notionDataType.ts
// // export interface NotionPageItem {
// //   slug: string;
// //   post: {
// //     id: string;
// //     properties: {
// //       title?: { type: 'title'; title: RichTextItemResponse[]; id: string };
// //       thumbnailUrl?: {
// //         type: 'files';
// //         files: (
// //           | {
// //               type: 'file';
// //               file: { url: string; expiry_time: string };
// //               name: string;
// //             }
// //           | {
// //               type: 'external';
// //               external: { url: string };
// //               name: string;
// //             }
// //         )[];
// //         id: string;
// //       };
// //     };
// //     created_time: string;
// //   };
// // }

// // export interface SelectProperty {
// //   type: 'select';
// //   select: {
// //     name: string;
// //   } | null;
// // }

// // export interface NotionPage {
// //   properties: {
// //     category?: SelectProperty;
// //   };
// // }

// // /**
// //  * SelectColor 타입 정의
// //  */
// // export type SelectColor =
// //   | 'default'
// //   | 'gray'
// //   | 'brown'
// //   | 'orange'
// //   | 'yellow'
// //   | 'green'
// //   | 'blue'
// //   | 'purple'
// //   | 'pink'
// //   | 'red';

// // /**
// //  * PartialSelectResponse 타입 정의
// //  */
// // export type PartialSelectResponse = {
// //   id: string;
// //   name: string;
// //   color: SelectColor;
// // };

// // /**
// //  * SelectPropertyResponse 타입 정의
// //  */
// // export type SelectPropertyResponse = {
// //   id: string;
// //   type: 'select';
// //   select: PartialSelectResponse | null;
// // };

// // // export function isSelectProperty(
// // //   property: PageObjectResponse['properties'][string] | undefined
// // // ): property is {
// // //   id: string;
// // //   type: 'select';
// // //   select: PartialSelectResponse | null;
// // // } {
// // //   return property?.type === 'select';
// // // }

// // export function isSelectProperty(
// //   property:
// //     | PageObjectResponse['properties'][string]
// //     | SelectProperty
// //     | undefined
// // ): property is SelectProperty {
// //   // property가 select 타입이면 true 반환
// //   return property?.type === 'select';
// // }

// // // export function isCategoryProperty(result: PageObjectResponse): boolean {
// // //   const categoryProperty = result.properties.category;
// // //   return (
// // //     categoryProperty &&
// // //     categoryProperty.type === 'select' &&
// // //     !!categoryProperty.select?.name
// // //   );
// // // }

// // export function isCategoryProperty(result: PageObjectResponse): boolean {
// //   const categoryProperty = result.properties.category;
// //   return isSelectProperty(categoryProperty) && !!categoryProperty.select?.name;
// // }
// // export interface SelectPropertyWithId {
// //   type: 'select';
// //   select: PartialSelectResponse | null;
// //   id: string;
// // }

// // // 타입 가드: RichTextItemResponse가 TextRichTextItemResponse인지 확인
// // export function isTextRichTextItemResponse(
// //   item: unknown
// // ): item is TextRichTextItemResponse {
// //   return (
// //     typeof item === 'object' &&
// //     item !== null &&
// //     'type' in item &&
// //     item.type === 'text'
// //   );
// // }

// // export interface ApiResponse {
// //   id: string;
// //   slug: string;
// //   title: string;
// //   created_time: string;
// //   thumbnailUrl: string;
// // }

// // export function isValidPageObject(page: PageObjectResponse): boolean {
// //   return (
// //     page.properties &&
// //     'category' in page.properties &&
// //     'title' in page.properties &&
// //     'slug' in page.properties
// //   );
// // }

// // export interface Post {
// //   id: string;
// //   title: string;
// //   slug: string;
// //   created_time: string;
// // }

// // export interface RichTextBase {
// //   type: string; // 모든 서브타입에서 공통적으로 사용하는 type 속성
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
// // }

// // export interface TextRichText extends RichTextBase {
// //   type: 'text';
// //   text: {
// //     content: string;
// //     link: string | null;
// //   };
// // }

// // export interface MentionRichText extends RichTextBase {
// //   type: 'mention';
// //   mention: {
// //     type: string;
// //     user?: { id: string; name: string };
// //     page?: { id: string };
// //     database?: { id: string };
// //     date?: { start: string; end: string | null; time_zone: string | null };
// //   };
// // }

// // export interface EquationRichText extends RichTextBase {
// //   type: 'equation';
// //   equation: {
// //     expression: string;
// //   };
// // }

// import {
//   //BlockObjectResponse,
//   //BulletedListItemBlockObjectResponse,
//   //CodeBlockObjectResponse,
//   //ColumnBlockObjectResponse,
//   //ColumnListBlockObjectResponse,
//   RichTextItemResponse,
//   DatabaseObjectResponse,
//   //DividerBlockObjectResponse,
//   // FileBlockObjectResponse,
//   //Heading1BlockObjectResponse,
//   //Heading2BlockObjectResponse,
//   //Heading3BlockObjectResponse,
//   ImageBlockObjectResponse,
//   // NumberedListItemBlockObjectResponse,
//   PageObjectResponse,
//   // ParagraphBlockObjectResponse,
//   PartialDatabaseObjectResponse,
//   PartialPageObjectResponse,
//   QuoteBlockObjectResponse,
//   TextRichTextItemResponse,
//   //  UnsupportedBlockObjectResponse,
//   VideoBlockObjectResponse,
// } from '@notionhq/client/build/src/api-endpoints';

// import {
//   RichTextItemResponse as NotionRichTextItemResponse,
//   BlockObjectResponse as NotionBlockObjectResponse,
//   PageObjectResponse as NotionPageObjectResponse,
// } from '@notionhq/client/build/src/api-endpoints';

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
//   | 'rich_text';

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
//   | 'default'
//   | 'gray'
//   | 'brown'
//   | 'orange'
//   | 'yellow'
//   | 'green'
//   | 'blue'
//   | 'purple'
//   | 'pink'
//   | 'red'
//   | 'gray_background'
//   | 'brown_background'
//   | 'orange_background'
//   | 'yellow_background'
//   | 'green_background'
//   | 'blue_background'
//   | 'purple_background'
//   | 'pink_background'
//   | 'red_background';

// export interface NotionUser {
//   object: 'user';
//   id: string;
// }

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
//           | {
//               type: 'external';
//               external: { url: string };
//               name: string;
//             }
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

// //Block 관련

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

// export type NotionRichTextItemResponse = {
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
// };
// export interface RichTextBase {
//   type: string;
//   annotations: {
//     bold: boolean;
//     italic: boolean;
//     strikethrough: boolean;
//     underline: boolean;
//     code: boolean;
//     color: string;
//   };
//   plain_text: string;
//   href: string | null;
// }
// export interface TextRichText extends RichTextBase {
//   type: 'text';
//   text: {
//     content: string;
//     link: string | null;
//   };
// }

// export interface MentionRichText extends RichTextBase {
//   type: 'mention';
//   mention: {
//     type: string;
//     user?: { id: string; name: string };
//     page?: { id: string };
//     database?: { id: string };
//     date?: { start: string; end: string | null; time_zone: string | null };
//   };
// }

// export interface EquationRichText extends RichTextBase {
//   type: 'equation';
//   equation: {
//     expression: string;
//   };
// }
// ///TODO: 디버깅을 위해 임시로 타입선언함
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

// // export interface BlockWithChildren {
// //   id: string;
// //   type: string;
// //   has_children: boolean;
// //   children?: BlockWithChildren[];
// //   paragraph?: { rich_text: RichText[] };
// //   heading_1?: { rich_text: RichText[] };
// //   heading_2?: { rich_text: RichText[] };
// //   heading_3?: { rich_text: RichText[] };
// //   bulleted_list_item?: { rich_text: RichText[] };
// //   image?: {
// //     type: 'file' | 'external';
// //     file?: { url: string };
// //     external?: { url: string };
// //     caption?: RichText[];
// //   };
// //   video?: {
// //     type: 'file' | 'external';
// //     file?: { url: string };
// //     external?: { url: string };
// //   };
// // }

// export interface BlockWithChildren {
//   id: string;
//   type: string;
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

// // export type BlockWithChildren = (
// //   | ImageBlockObjectResponse
// //   | ParagraphBlockObjectResponse
// //   | Heading1BlockObjectResponse
// //   | Heading2BlockObjectResponse
// //   | Heading3BlockObjectResponse
// //   | BulletedListItemBlockObjectResponse
// //   | QuoteBlockObjectResponse
// //   | DividerBlockObjectResponse
// //   | CodeBlockObjectResponse
// //   | FileBlockObjectResponse
// //   | VideoBlockObjectResponse
// //   | ColumnBlockObjectResponse
// //   | ColumnListBlockObjectResponse
// //   | NumberedListItemBlockObjectResponse
// //   | ToDoBlockObjectResponse
// //   | UnsupportedBlockObjectResponse
// // ) & {
// //   children?: BlockWithChildren[];
// //   type: string;
// // };

// //페이지 관련
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

// //타입가드
// // 공통 타입 가드
// type Property =
//   PageObjectResponse['properties'][keyof PageObjectResponse['properties']];

// export function isPropertyOfType<T extends Property>(
//   property: Property | undefined,
//   type: T['type']
// ): property is T {
//   return property?.type === type;
// }

// // 블록 타입 가드
// export function isBlockOfType<T extends BlockObjectResponse['type']>(
//   block: BlockObjectResponse,
//   type: T
// ): block is BlockObjectResponse & { type: T } {
//   return block.type === type;
// }

// // 블록 타입 확인
// export function isParagraphBlock(
//   block: BlockObjectResponse
// ): block is BlockObjectResponse & { type: 'paragraph' } {
//   return isBlockOfType(block, 'paragraph');
// }

// export function isHeading1Block(
//   block: BlockObjectResponse
// ): block is BlockObjectResponse & { type: 'heading_1' } {
//   return isBlockOfType(block, 'heading_1');
// }

// export function isHeading2Block(
//   block: BlockObjectResponse
// ): block is BlockObjectResponse & { type: 'heading_2' } {
//   return isBlockOfType(block, 'heading_2');
// }
// export function isHeading3Block(
//   block: BlockObjectResponse
// ): block is BlockObjectResponse & { type: 'heading_3' } {
//   return isBlockOfType(block, 'heading_3');
// }

// export function isBulletedListItemBlock(
//   block: BlockObjectResponse
// ): block is BlockObjectResponse & {
//   bulleted_list_item: { rich_text: NotionRichTextItemResponse[] };
// } {
//   return block.type === 'bulleted_list_item' && 'bulleted_list_item' in block;
// }

// export function isQuoteBlock(
//   block: BlockWithChildren
// ): block is QuoteBlockObjectResponse {
//   return block.type === 'quote' && 'quote' in block;
// }

// export function isImageBlock(
//   block: BlockWithChildren
// ): block is ImageBlockObjectResponse {
//   return block.type === 'image' && !!block.image;
// }

// export function isVideoBlock(
//   block: BlockWithChildren
// ): block is VideoBlockObjectResponse {
//   return block.type === 'video' && !!block.video;
// }

// //유틸 함수
// // 페이지 객체 타입 확인
// export function isPageObjectResponse(
//   value:
//     | PageObjectResponse
//     | PartialPageObjectResponse
//     | PartialDatabaseObjectResponse
//     | DatabaseObjectResponse
// ): value is PageObjectResponse {
//   return value.object === 'page' && 'properties' in value && 'parent' in value;
// }

// export interface ToDoBlockObjectResponse {
//   type: 'to_do';
//   to_do: {
//     rich_text: NotionRichTextItemResponse[];
//     color: ApiColor;
//     checked: boolean;
//   };
//   has_children: boolean;
//   id: string;
// }

// export function isValidPageObject(page: PageObjectResponse): boolean {
//   return (
//     page.properties &&
//     'category' in page.properties &&
//     'title' in page.properties &&
//     'slug' in page.properties
//   );
// }

// // 선택 속성 확인
// export function isSelectProperty(
//   property:
//     | PageObjectResponse['properties'][string]
//     | SelectProperty
//     | undefined
// ): property is SelectProperty {
//   return property?.type === 'select';
// }

// // 카테고리 속성 확인
// export function isCategoryProperty(result: PageObjectResponse): boolean {
//   const categoryProperty = result.properties.category;
//   return isSelectProperty(categoryProperty) && !!categoryProperty.select?.name;
// }

// // 텍스트 리치 텍스트 확인
// export function isTextRichTextItemResponse(
//   item: unknown
// ): item is TextRichTextItemResponse {
//   return (
//     typeof item === 'object' &&
//     item !== null &&
//     'type' in item &&
//     item.type === 'text'
//   );
// }

//////진행중2
// Notion API의 타입을 가져와서 별도로 명명합니다.
import {
  RichTextItemResponse as NotionRichTextItemResponse,
  BlockObjectResponse as NotionBlockObjectResponse,
  PageObjectResponse as NotionPageObjectResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
export type { NotionRichTextItemResponse };

// Notion API 타입 (외부에서 가져온 타입)
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

// Notion API의 사용자 타입
export interface NotionUser {
  object: 'user';
  id: string;
}

// Notion 페이지 아이템 타입
export interface NotionPageItem {
  slug: string;
  post: {
    id: string;
    properties: {
      title?: {
        type: 'title';
        title: NotionRichTextItemResponse[];
        id: string;
      };
      thumbnailUrl?: {
        type: 'files';
        files: (
          | {
              type: 'file';
              file: { url: string; expiry_time: string };
              name: string;
            }
          | { type: 'external'; external: { url: string }; name: string }
        )[];
        id: string;
      };
    };
    created_time: string;
  };
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  created_time: string;
}

export interface ApiResponse {
  id: string;
  slug: string;
  title: string;
  created_time: string;
  thumbnailUrl: string;
}

// 블록 관련 타입
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
}

// 페이지 관련 타입
export interface NotionPage {
  properties: {
    category?: SelectProperty;
  };
}

export interface SelectProperty {
  type: 'select';
  select: {
    name: string;
  } | null;
}

export type PartialSelectResponse = {
  id: string;
  name: string;
  color: SelectColor;
};

export type SelectPropertyResponse = {
  id: string;
  type: 'select';
  select: PartialSelectResponse | null;
};

// 타입 가드
type Property =
  PageObjectResponse['properties'][keyof PageObjectResponse['properties']];

export function isPropertyOfType<T extends Property>(
  property: Property | undefined,
  type: T['type']
): property is T {
  return property?.type === type;
}

export function isBlockOfType<T extends NotionBlockObjectResponse['type']>(
  block: NotionBlockObjectResponse,
  type: T
): block is NotionBlockObjectResponse & { type: T } {
  return block.type === type;
}

export function isParagraphBlock(
  block: NotionBlockObjectResponse
): block is NotionBlockObjectResponse & { type: 'paragraph' } {
  return isBlockOfType(block, 'paragraph');
}

export function isHeading1Block(
  block: NotionBlockObjectResponse
): block is NotionBlockObjectResponse & { type: 'heading_1' } {
  return isBlockOfType(block, 'heading_1');
}

export function isHeading2Block(
  block: NotionBlockObjectResponse
): block is NotionBlockObjectResponse & { type: 'heading_2' } {
  return isBlockOfType(block, 'heading_2');
}

export function isHeading3Block(
  block: NotionBlockObjectResponse
): block is NotionBlockObjectResponse & { type: 'heading_3' } {
  return isBlockOfType(block, 'heading_3');
}

export function isBulletedListItemBlock(
  block: NotionBlockObjectResponse
): block is NotionBlockObjectResponse & {
  bulleted_list_item: { rich_text: NotionRichTextItemResponse[] };
} {
  return block.type === 'bulleted_list_item' && 'bulleted_list_item' in block;
}

export function isImageBlock(
  block: BlockWithChildren
): block is BlockWithChildren & {
  image: { caption: NotionRichTextItemResponse[] };
} {
  return block.type === 'image' && !!block.image;
}

export function isPageObjectResponse(
  value: unknown
): value is NotionPageObjectResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    'object' in value &&
    (value as { object: string }).object === 'page' &&
    'properties' in value &&
    'parent' in value
  );
}

export function isSelectProperty(
  property:
    | PageObjectResponse['properties'][string]
    | SelectProperty
    | undefined
): property is SelectProperty {
  return property?.type === 'select' && 'select' in property;
}

export function isCategoryProperty(result: NotionPageObjectResponse): boolean {
  const categoryProperty = result.properties.category;
  return isSelectProperty(categoryProperty) && !!categoryProperty.select?.name;
}
