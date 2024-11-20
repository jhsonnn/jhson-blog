import { isHttpError } from 'http-errors';

export default async function fetchWithExponentialBackoff<T>(
  fetchFunction: () => Promise<T>, // API 호출 함수 (제네릭 타입 사용)
  retries = 5, // 최대 재시도 횟수 (기본값: 5회)
  delay = 1000 // 첫 대기 시간 (기본값: 1000ms = 1초)
): Promise<T> {
  try {
    // API 호출 시도
    return await fetchFunction();
  } catch (error: unknown) {
    
    if (retries === 0) {
      console.error("최대 재시도 횟수에 도달했거나 다른 오류 발생:", error);
      throw error;
    }

     if (isHttpError(error) && error.status === 429) {
      // 로그 출력 (디버깅용)
      console.warn(`Rate limit hit. Retrying in ${delay}ms...`);

      // 지연 시간을 적용하여 대기
      await new Promise((resolve) => setTimeout(resolve, delay));

      // 다음 재시도 시 대기 시간을 2배로 증가
      return fetchWithExponentialBackoff(fetchFunction, retries - 1, delay * 2);
    }

    // 다른 에러는 재시도하지 않고 그대로 던짐
    console.error("비정상적인 HTTP 상태 코드로 인해 재시도 중단:", error);
    throw error;
  }
}

  