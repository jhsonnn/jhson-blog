// app/page.tsx
export const revalidate = 60; //ISR, 60초마다 갱신됨

const Home = async () => {
  console.log(
    'Environment Variable NOTION_VIDEO_DB_ID:',
    process.env.NOTION_VIDEO_DB_ID
  );

  try {
    const response = await fetch('http://localhost:3000/api/category', {
      next: { revalidate: 60 }, //ISR설정
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
