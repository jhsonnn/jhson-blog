import { useQuery } from "react-query";
import { fetchNotionDatabase } from "@/utils/fetchNotionDatabase";

export const useFetchPosts = (category: string) => {
  return useQuery(["posts", category], () => fetchNotionDatabase(category), {
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
