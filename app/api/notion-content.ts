// /pages/api/notion-content.ts
import { NextApiRequest, NextApiResponse } from "next";
import { NotionAPI } from "notion-client";

const notion = new NotionAPI();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ error: "Invalid slug" });
  }

  try {
    const recordMap = await notion.getPage(slug);
    res.status(200).json(recordMap);
  } catch (error) {
    console.error(`Error fetching Notion page: ${error}`);
    res.status(500).json({ error: "Failed to fetch Notion page" });
  }
}
