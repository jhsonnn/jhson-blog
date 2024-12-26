//전체 데이터베이스 조회
import { notion, NOTION_DATABASE_ID } from '../database';
import { QueryDatabaseResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const fetchNotionDatabase = async (): Promise<PageObjectResponse[]> => {
  try {
    const response: QueryDatabaseResponse = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
    });

    const results = response.results.filter(
      (item): item is PageObjectResponse => 'properties' in item
    );

    console.log('Fetched Notion database:', results);
    return results;
  } catch (error) {
    console.error('Error fetching Notion database:', error);
    throw error;
  }
};

