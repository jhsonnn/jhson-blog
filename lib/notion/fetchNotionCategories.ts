import { notion } from "@/lib/notion/client";

interface PartialSelectResponse {
  name: string;
  id: string;
  color: string;
}

function isPartialSelectResponse(
  select: unknown
): select is PartialSelectResponse {
  return (
    typeof select === "object" &&
    select !== null &&
    "name" in select &&
    "id" in select &&
    "color" in select
  );
}

export async function fetchNotionCategories(): Promise<string[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  });

  const categories = response.results
    .map((page) => {
      if ("properties" in page && page.properties?.category) {
        const categoryProperty = page.properties.category;
        if (
          categoryProperty.type === "select" &&
          isPartialSelectResponse(categoryProperty.select)
        ) {
          return categoryProperty.select.name;
        }
      }
      return null;
    })
    .filter((category): category is string => Boolean(category)); // null 제거

  return [...new Set(categories)]; //중복 제거
}
