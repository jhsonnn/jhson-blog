// app/page.tsx
export const revalidate = 60; // ISR 설정 (60초마다 데이터 갱신)

const Home = async () => {
  // next.config.js 또는 _app.tsx에 추가
  console.log(
    'Environment Variable NOTION_VIDEO_DB_ID:',
    process.env.NOTION_VIDEO_DB_ID
  );

  try {
    const response = await fetch('http://localhost:3000/api/category', {
      next: { revalidate: 60 }, // ISR 설정
    });
    const categories: string[] = await response.json();

    return (
      <nav>
        <ul>
          {categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      </nav>
    );
  } catch (error) {
    console.error('[ERROR] Failed to fetch categories:', error);
    return <div>Error loading categories</div>;
  }
};

export default Home;
