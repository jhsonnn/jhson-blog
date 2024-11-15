// jest.config.js
module.exports = {
  preset: 'ts-jest', // ts-jest를 사용하여 TypeScript를 변환
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // TypeScript 파일을 ts-jest로 처리
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // CSS 모듈 무시 설정
  },
};
