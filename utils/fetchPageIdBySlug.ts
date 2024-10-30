// // utils/fetchPageIdBySlug.ts

// import { Client } from '@notionhq/client';
// import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });


// export const fetchPageIdBySlug = async (slug: string): Promise<string | null> => {
//   try {
//     const response = await notion.databases.query({
//       database_id: process.env.NOTION_DATABASE_ID!,
//       filter: {
//         property: 'slug',
//         rich_text: { equals: slug },
//       },
//     });

//     console.log('Database Query Response:', JSON.stringify(response, null, 2));
    
//     if (response.results.length === 0) {
//       console.warn(`No page found for slug: ${slug}`);
//       return null;
//     }

//     const page = response.results[0] as PageObjectResponse;
//     console.log(`Fetched page ID for slug "${slug}": ${page.id}`);
//     return page.id;
//   } catch (error: any) {
//     console.error(`Error fetching page ID for slug "${slug}": ${error.message}`);
//     return null;
//   }
// };

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


