// export async function fetchInitialTheme(): Promise<string | null> {
//   try {
//     const theme = await fetchThemeFromStorage();
//     return theme;
//   } catch {
//     return null;
//   }
// }

// async function fetchThemeFromStorage(): Promise<string | null> {
//   return new Promise((resolve) => {
//     if (typeof window !== 'undefined') {
//       //클라이언트에서 localStorage 읽기
//       const theme = localStorage.getItem('theme');
//       resolve(theme || null);
//     } else {
//       //서버에서는 기본값 사용
//       resolve('light');
//     }
//   });
// }

export async function fetchInitialTheme(): Promise<string> {
  if (typeof window !== 'undefined') {
    try {
      const theme = localStorage.getItem('theme');
      return theme || 'light'; // 저장된 값이 없으면 기본값으로 'light' 사용
    } catch (error) {
      console.error('Failed to fetch theme from storage:', error);
      return 'light';
    }
  }
  // 서버 환경에서는 기본값 반환
  return 'light';
}
