import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const fetchPageIdBySlug = async (slug: string) => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: { property: 'slug', rich_text: { equals: slug } },
    });

    if (response.results.length === 0) return null;
    return response.results[0].id;
  } catch (error) {
    console.error('Error fetching page ID:', error);
    return null;
  }
};


