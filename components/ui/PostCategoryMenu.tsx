import { fetchNotionDatabaseByCategory } from '@/lib/notion/fetchNotionDatabase';
import { useQueryClient } from 'react-query';

interface PostCategoryMenuProps {
  onCategorySelect: (category: string) => void;
}

const PostCategoryMenu: React.FC<PostCategoryMenuProps> = ({
  onCategorySelect,
}) => {
  const categories = ['projects', 'resume'];
  const queryClient = useQueryClient();

  return (
    <nav>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => {
            // 미리 캐싱된 데이터가 있는지 확인하고 없으면 새로 로드
            queryClient.prefetchQuery(['notionData', category], () =>
              fetchNotionDatabaseByCategory(category)
            );
            onCategorySelect(category);
          }}
        >
          {category}
        </button>
      ))}
    </nav>
  );
};

export default PostCategoryMenu;
