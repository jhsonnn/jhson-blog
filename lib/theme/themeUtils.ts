export async function fetchInitialTheme(): Promise<string | null> {
  try {
    const theme = await fetchThemeFromStorage();
    return theme;
  } catch {
    return null;
  }
}

async function fetchThemeFromStorage(): Promise<string | null> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined') {
      //클라이언트에서 localStorage 읽기
      const theme = localStorage.getItem('theme');
      resolve(theme || null);
    } else {
      //서버에서는 기본값 사용
      resolve('light');
    }
  });
}
