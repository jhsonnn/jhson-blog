import { useQuery } from 'react-query';
import { fetchNotionDatabaseByCategory } from '@/lib/notion/api/fetchNotionDatabaseByCategory';

export const useFetchPosts = (category: string) => {
  return useQuery(
    ['posts', category],
    () => fetchNotionDatabaseByCategory(category),
    {
      staleTime: 1000 * 60 * 5,
    }
  );
};
