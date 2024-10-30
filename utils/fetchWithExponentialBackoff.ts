export default async function fetchWithExponentialBackoff(
    fetchFunction: () => Promise<any>, // 실제 API 호출 함수
    retries = 5,    // 최대 재시도 횟수 (기본값: 5회)
    delay = 1000    // 첫 대기 시간 (기본값: 1000ms = 1초)
  ): Promise<any> {
    try {
      // API 호출 시도
      return await fetchFunction();
    } catch (error: any) {
      // 429 에러가 아닐 경우나 재시도 횟수를 초과한 경우 에러를 반환
      if (retries === 0 || error.status !== 429) {
        console.error("최대 재시도 횟수에 도달했거나 다른 오류 발생:", error);
        throw error;
      }
  
      // 로그 출력 (디버깅용)
    //   console.log(`Rate limit hit. Retrying in ${delay}ms...`);
  
      // 지연 시간을 적용하여 대기
      await new Promise((resolve) => setTimeout(resolve, delay));
  
      // 다음 재시도 시 대기 시간을 2배로 증가
      return fetchWithExponentialBackoff(fetchFunction, retries - 1, delay * 2);
    }
  }
  