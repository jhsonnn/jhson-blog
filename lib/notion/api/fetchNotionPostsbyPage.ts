import { notionClient } from "../client";
import { isPageObjectResponse } from "../types";

export async function fetchNotionPostsByPage(page: number, pageSize: number) {
  const response = await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    page_size: pageSize,
    start_cursor: page > 1 ? `cursor-for-page-${page}` : undefined,
    filter: {
      property: "status",
      status: { equals: "public" },
    }
  });

  const posts = response.results
    .filter(isPageObjectResponse)
    .map((post) => ({
      id: post.id,
      title:
        post.properties.title?.type === "title"
          ? post.properties.title.title[0]?.plain_text || ""
          : "",
      slug:
        post.properties.slug?.type === "rich_text"
          ? post.properties.slug.rich_text[0]?.plain_text || ""
          : "",
      category:
        post.properties.category?.type === "select"
          ? post.properties.category.select?.name || ""
          : "",
      tags:
        post.properties.tags?.type === "multi_select"
          ? post.properties.tags.multi_select.map((tag) => tag.name)
          : [],
      thumbnailUrl:
        post.properties.thumbnailUrl?.type === 'files' &&
        Array.isArray(post.properties.thumbnailUrl.files) &&
        post.properties.thumbnailUrl.files.length > 0
          ? post.properties.thumbnailUrl.files[0]?.type === 'file'
            ? post.properties.thumbnailUrl.files[0]?.file?.url || '/default_image.png'
            : post.properties.thumbnailUrl.files[0]?.type === 'external'
            ? post.properties.thumbnailUrl.files[0]?.external?.url || '/default_image.png'
            : '/default_image.png'
          : '/default_image.png',
      date:
        post.properties.date?.type === "date" && post.properties.date.date?.start
          ? post.properties.date.date.start
          : "",
      status: 
          post.properties.status?.type === "status"
            ? { name: post.properties.status.status?.name }
            : { name: "private" }, 
    }));

  return { posts };
}
