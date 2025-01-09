import { notion } from "../client";

export const fetchTags = async (): Promise<string[]> => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
    });

    const tags = response.results
      .filter((item) => "properties" in item)
      .flatMap((page) => {
        const tagProperty = page.properties.tags;

        if (
          tagProperty?.type === "multi_select" &&
          Array.isArray(tagProperty.multi_select)
        ) {
          return tagProperty.multi_select.map((tag) => tag.name);
        }
        return [];
      })
      .filter((tag) => tag.toLowerCase() !== "none");
    
    return [...new Set(tags)];
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
};
