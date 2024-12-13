import { PageObjectResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { notion } from "../client";

export const fetchTags = async(): Promise<string[]> => {
    try {
        const response: QueryDatabaseResponse = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID!,
        });

        const tags = response.results
            .filter((item): item is PageObjectResponse => "properties" in item)
            .flatMap((page) => {
                const tagProperty = page.properties.tags;
                
                if (
          tagProperty?.type === "multi_select" && 
          Array.isArray(tagProperty.multi_select)
        ) {
          //각 페이지 태그 목록 추출
          return tagProperty.multi_select.map(tag => tag.name);
        }
        return [];
      });
            
        //중복제거
        return [...new Set(tags)]
                
    } catch(error) {
        console.error("Error fetching tags:", error);
        throw error;
    }
}
