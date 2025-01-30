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
