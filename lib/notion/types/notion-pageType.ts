import { NotionRichTextItemResponse, SelectColor } from './notion-apiType';

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
    date: string;
  };
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  category: { name: string; color: string };
  tags: { name: string; color: string }[];
  date?: string;
  // created_time: string;
  thumbnailUrl: string;
  originalThumbnailUrl: string;
  fallbackThumbnailUrl?: string;
  status: { name: string };
}

// export interface ApiResponse {
//   id: string;
//   slug: string;
//   title: string;
//   created_time: string;
//   thumbnailUrl: string;
// }

export interface ApiResponse {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  tags: string[];
}

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
