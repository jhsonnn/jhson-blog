import {
  BlockObjectResponse,
  BlockObjectResponse as NotionBlockObjectResponse,
  PageObjectResponse as NotionPageObjectResponse,
  RichTextItemResponse as NotionRichTextItemResponse,
  PageObjectResponse,
  PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { SelectProperty } from './notion-pageType';
import { BlockWithChildren } from './notion-blocksType';
import { ExternalObject, FileObject, FileValue } from './notion-apiType';

type Property = PageObjectResponse['properties'][keyof PageObjectResponse['properties']];

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
): block is BlockWithChildren & { type: 'image' } {
  return block.type === 'image' && !!block.image;
}

export function isVideoBlock(
  block: BlockWithChildren
): block is BlockWithChildren & { type: 'video' } {
  return block.type === 'video' && !!block.video;
}

export function isWebmVideo(block: BlockWithChildren): boolean {
  if (!block.video) return false;
  const url =
    block.video.type === 'file' ? block.video.file?.url : block.video.external?.url;
  return !!url && url.toLowerCase().endsWith('.webm');
}

export function isPageObjectResponse(value: unknown): value is NotionPageObjectResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    'object' in value &&
    (value as { object: string }).object === 'page' &&
    'properties' in value &&
    'parent' in value
  );
}

export function isBlockObjectResponse(
  block: PartialBlockObjectResponse | BlockObjectResponse
): block is BlockObjectResponse {
  return (
    'type' in block &&
    typeof block.type === 'string' &&
    'has_children' in block &&
    typeof block.has_children === 'boolean'
  );
}

export function isSelectProperty(
  property: PageObjectResponse['properties'][string] | SelectProperty | undefined
): property is SelectProperty {
  return property?.type === 'select' && 'select' in property;
}

export function isCategoryProperty(result: NotionPageObjectResponse): boolean {
  const categoryProperty = result.properties.category;
  return isSelectProperty(categoryProperty) && !!categoryProperty.select?.name;
}

export function isFileProperty(file: FileValue): file is FileObject {
  return (
    typeof file === 'object' &&
    file !== null &&
    file.type === 'file' &&
    file.file !== undefined &&
    typeof file.file.url === 'string'
  );
}

export function isExternalProperty(file: FileValue): file is ExternalObject {
  return (
    typeof file === 'object' &&
    file !== null &&
    file.type === 'external' &&
    file.external !== undefined &&
    typeof file.external.url === 'string'
  );
}
