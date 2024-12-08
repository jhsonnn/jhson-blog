import dotenv from 'dotenv';
import { Client } from '@notionhq/client';

// 환경 변수 로드
dotenv.config({ path: './.env.local' });

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  console.log("Testing Notion API...");
  console.log("NOTION_API_KEY:", process.env.NOTION_API_KEY);
  console.log("NOTION_DATABASE_ID:", process.env.NOTION_DATABASE_ID);
  try {

    // 데이터베이스 정보 가져오기
    const response = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID,
    });
    console.log('Notion Database Info:', response);
  } catch (error) {
    console.error('Notion API Test Error:', error);
  }
})();
