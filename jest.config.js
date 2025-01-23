// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'jest-environment-jsdom',
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//   transform: {
//     '^.+\\.(ts|tsx)$': [
//       'ts-jest',
//       {
//         useESM: true,
//         tsconfig: '<rootDir>/tsconfig.json',
//        }, // ESM 지원 활성화
//     ],
//   },
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/$1', // 경로 별칭 처리
//     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//   },
//   extensionsToTreatAsEsm: ['.ts', '.tsx'], // ESM으로 처리할 확장자
//   transformIgnorePatterns: ['/node_modules/'],
// };



module.exports = {
  preset: 'ts-jest/presets/js-with-ts-esm', // ESM과 TypeScript 지원
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'ts-jest',
      {
        useESM: true, // ESM 지원 활성화
        tsconfig: '<rootDir>/tsconfig.json', // tsconfig 명시
      },
    ],
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // 경로 별칭 처리
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // CSS 파일 무시
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // ESM으로 처리할 확장자
};
