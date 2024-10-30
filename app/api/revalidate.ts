import { NextApiRequest, NextApiResponse } from "next";

const revalidateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.secret !== process.env.MY_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // /projects와 /resume 경로만 재생성
    await res.revalidate(`/projects`);
    await res.revalidate(`/resume`);

    const categories = ["projects", "resume"];
    for (const category of categories) {
      // const items = await fetchNotionDatabase(category);
      // console.log("Fetched items for category:", category, items);

      await res.revalidate(`/${category}`);
    }

    return res.json({ revalidated: true });
  } catch (error) {
    console.error("Error during revalidation:", error);
    return res.status(500).json({ message: "Revalidation failed!" });
  }
};

export default revalidateHandler;
