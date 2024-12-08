// lib/notion/fetchDatabaseDebug.ts
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function fetchDatabase() {
  const databaseId = process.env.NOTION_DATABASE_ID || ''; // 기본값 제공

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    console.log('API Response:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Error fetching database:', error);
  }
}

fetchDatabase();
