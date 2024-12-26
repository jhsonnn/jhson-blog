// 포스트 데이터 API
import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import {
  isFileProperty,
  isExternalProperty,
  isPageObjectResponse,
  FileValue,
} from "@/lib/notion/types";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(
  _req: NextRequest,
  { params }: { params: { category?: string } }
) {
  const { category } = params;

  if (!category) {
    return NextResponse.json(
      { error: "Category parameter is missing or undefined." },
      { status: 400 }
    );
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "category",
        select: { equals: category },
      },
    });

    const posts = response.results
      .filter(isPageObjectResponse)
      .map((post) => {
        const properties = post.properties;
// 썸네일 처리
let thumbnailUrl = "/default-thumbnail.png";

if (
  properties.thumbnailUrl?.type === "files" &&
  properties.thumbnailUrl.files.length > 0
) {
  const fileItem = properties.thumbnailUrl.files[0] as FileValue;

  if (fileItem.type === "file" && isFileProperty(fileItem)) {
    thumbnailUrl = fileItem.file.url;
  } else if (fileItem.type === "external" && isExternalProperty(fileItem)) {
    thumbnailUrl = fileItem.external.url;
  }
}
        // Category 처리
        const postCategory =
          properties.category?.type === "select" &&
          properties.category.select?.name
            ? properties.category.select.name
            : "none";

        // Tags 처리
        const tags =
          properties.tags?.type === "multi_select"
            ? properties.tags.multi_select
                .filter((tag) => !!tag.name)
                .map((tag) => tag.name)
            : [];

        return {
          id: post.id,
          slug:
            properties.slug?.type === "rich_text" &&
            properties.slug.rich_text.length > 0
              ? properties.slug.rich_text[0].plain_text
              : "no-slug",
          title:
            properties.title?.type === "title" &&
            properties.title.title.length > 0
              ? properties.title.title[0].plain_text
              : "Untitled",
          category: postCategory,
          tags,
          created_time: post.created_time,
          thumbnailUrl,
        };
      })
      .filter((post) => post.category !== "none" && post.tags.length > 0); // 필터링: category "none"과 tags 비어있음 제거

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
