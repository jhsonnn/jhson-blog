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

// types/notionBlock.ts

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
  | 'rich_text';

export interface NotionUser {
  object: 'user';
  id: string;
}

export interface RichText {
  type: 'text';
  text: {
    content: string;
    link: string | null;
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
  href: string | null;
}

export interface Heading2Block {
  type: 'heading_2';
  heading_2: {
    rich_text: RichText[];
    color: string;
    is_toggleable: boolean;
  };
}

export interface NotionBlock {
  object: 'block';
  id: string;
  parent: {
    type: 'page_id';
    page_id: string;
  };
  created_time: string;
  last_edited_time: string;
  created_by: NotionUser;
  last_edited_by: NotionUser;
  has_children: boolean;
  archived: boolean;
  in_trash: boolean;
  type: NotionBlockType;
  heading_2?: Heading2Block['heading_2'];
  rich_text?: RichText[];
}

import {
  BlockObjectResponse,
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialBlockObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';

// 타입 가드에 사용할 공통 타입
type Property =
  PageObjectResponse['properties'][keyof PageObjectResponse['properties']];

/**
 * 공통 타입 가드 함수: 주어진 property가 특정 type인지 확인합니다.
 */
function isPropertyOfType<T extends Property>(
  property: Property | undefined,
  type: T['type']
): property is T {
  return property?.type === type;
}

export function isFullPageObjectResponse(
  value:
    | PageObjectResponse
    | PartialPageObjectResponse
    | PartialDatabaseObjectResponse
): value is PageObjectResponse {
  return 'properties' in value;
}

// Title property 타입 가드
export function isTitleProperty(property: Property | undefined): property is {
  id: string;
  type: 'title';
  title: RichTextItemResponse[];
} {
  return isPropertyOfType(property, 'title');
}

// Number property 타입 가드
export function isNumberProperty(property: Property | undefined): property is {
  id: string;
  type: 'number';
  number: number | null;
} {
  return isPropertyOfType(property, 'number');
}

// Files property 타입 가드
export function isFilesProperty(property: Property | undefined): property is {
  id: string;
  type: 'files';
  files: Array<
    | { file: { url: string; expiry_time: string }; name: string; type: 'file' }
    | { external: { url: string }; name: string; type: 'external' }
  >;
} {
  return isPropertyOfType(property, 'files');
}

// PageObjectResponse 타입가드
export function isPageObjectResponse(
  value:
    | PageObjectResponse
    | PartialPageObjectResponse
    | PartialDatabaseObjectResponse
    | DatabaseObjectResponse
): value is PageObjectResponse {
  return value.object === 'page' && 'properties' in value && 'parent' in value;
}
// Rich text property 타입 가드
export function isRichTextProperty(
  property: Property | undefined
): property is {
  id: string;
  type: 'rich_text';
  rich_text: RichTextItemResponse[];
} {
  return isPropertyOfType(property, 'rich_text');
}

// 타입 가드: 블록이 'BlockObjectResponse' 타입인지 확인
// function isFullBlockResponse(
//   block: BlockObjectResponse | PartialBlockObjectResponse
// ): block is BlockObjectResponse {
//   return block.object === "block";
// }

// 타입 가드: 블록이 'paragraph' 타입인지 확인
export function isParagraphBlock(
  block: BlockObjectResponse
): block is BlockObjectResponse & { type: 'paragraph' } {
  return block.type === 'paragraph';
}

// 타입 가드: 블록이 'heading_1' 타입인지 확인
export function isHeading1Block(
  block: BlockObjectResponse
): block is BlockObjectResponse & { type: 'heading_1' } {
  return block.type === 'heading_1';
}

// 블록이 완전한 BlockObjectResponse인지 확인
export function isFullBlockResponse(
  block: BlockObjectResponse | PartialBlockObjectResponse
): block is BlockObjectResponse {
  return 'type' in block && 'id' in block;
}

//

// block이 children을 포함하는지 확인
export function hasChildren(
  block: BlockObjectResponse
): block is BlockObjectResponse & { children: BlockObjectResponse[] } {
  return 'children' in block;
}

// // NotionPageItem 타입
// export interface NotionPageItem {
//   slug: string;
//   post: {
//     id: string;
//     properties: {
//       title?: { type: "title"; title: RichTextItemResponse[]; id: string };
//       thumbnailUrl?: {
//         type: "files";
//         files: (
//           | { type: "file"; file: { url: string; expiry_time: string }; name: string }
//           | { type: "external"; external: { url: string }; name: string }
//         )[];
//         id: string;
//       };
//     };
//     created_time: string;
//   };
// }

// NotionPageItem 타입
export interface NotionPageItem {
  slug: string;
  post: {
    id: string;
    properties: {
      title?: { type: 'title'; title: RichTextItemResponse[]; id: string };
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
      '\\bthumbnailUrl'?: {
        // 백슬래시를 포함한 동적 키 추가
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
