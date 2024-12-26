//카테고리만 필터링
import { PageObjectResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { notion } from "../client";

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response: QueryDatabaseResponse = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
    });

    const categories = response.results
      .filter((item): item is PageObjectResponse => "properties" in item)
      .map((page) => {
        const categoryProperty = page.properties.category;

        if (
          categoryProperty?.type === "select" &&
          categoryProperty.select?.name
        ) {
          return categoryProperty.select.name;
        }

        return null;
      })
      .filter((category): category is string => !!category) //null 제거
      .filter((category) => category !== "none"); //none인 카테고리 제외

    return [...new Set(categories)]; //중복 제거
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
