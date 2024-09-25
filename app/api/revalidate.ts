import { NextApiRequest, NextApiResponse } from "next";
import { fetchNotionDatabase } from "@/utils/fetchNotionDatabase"; // 노션 API로 데이터베이스 가져오는 함수

const revalidateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.secret !== process.env.MY_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // /projects와 /resume 경로만 재생성
    await res.revalidate(`/projects`);
    await res.revalidate(`/resume`);

    // 모든 카테고리를 순회하며 확인 (여기서는 projects와 resume만 처리)
    const categories = ["projects", "resume"];
    for (const category of categories) {
      const items = await fetchNotionDatabase(category);
      console.log("Fetched items for category:", category, items);

      // 해당 카테고리 페이지만 revalidate (slug는 사용하지 않음)
      await res.revalidate(`/${category}`);
    }

    return res.json({ revalidated: true });
  } catch (error) {
    console.error("Error during revalidation:", error);
    return res.status(500).json({ message: "Revalidation failed!" });
  }
};

export default revalidateHandler;
