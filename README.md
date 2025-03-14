<!-- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# jhson-blog -->



# 📖 블로그 프로젝트

> 🖋️ **기술 블로그** - 프론트엔드 개발 경험을 기록하는 개인 블로그

개인 블로그 프로젝트로 **Next.js**와 **Notion API**를 활용하여 동적 콘텐츠를 렌더링하고 정적 사이트로 배포할 수 있도록 구현했습니다.

---

## :link: 배포 링크

> ### [🖋 블로그 링크](https://jhsonnn-blog.vercel.app/)

---

## 🖥️ 서비스 소개

| 메인 페이지 | 게시글 상세 페이지 | 카테고리 필터링 |
|:----------:|:-------------:|:-------------:|
| ![메인](https://your-image-url.com/main.png) | ![게시글](https://your-image-url.com/post.png) | ![카테고리](https://your-image-url.com/category.png) |

### 🔹 주요 기능
- **Notion API 연동**: Notion을 CMS로 활용하여 블로그 게시글을 동적으로 관리
- **정적 사이트 생성(SSG)**: Next.js의 ISR을 활용한 성능 최적화
- **카테고리/태그 필터링**: 사용자 경험 향상을 위한 콘텐츠 분류 기능
- **다크 모드 지원**: Tailwind CSS의 다크 모드 적용
- **SEO 최적화**: Next.js의 기본 SEO 기능 활용

---

## 🧰 사용 기술

### 프론트엔드
<div align=center>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
  <img src="https://img.shields.io/badge/NotionAPI-000000?style=for-the-badge&logo=notion&logoColor=white">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
</div>

### 협업 및 테스트
<div align=center>
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white">
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
</div>

---

## 📑 설치 및 실행 방법

### 1️⃣ 사전 요구 사항
- **Node.js v22.9.0**
- **yarn**

### 2️⃣ 프로젝트 실행 방법

```sh
# 1. 프로젝트 클론
git clone https://github.com/jhsonnn/jhson-blog.git

# 2. 디렉토리 이동
cd blog

# 3. 패키지 설치
yarn install

# 4. 개발 서버 실행
yarn dev
```

개발 서버가 실행되면 `http://localhost:3000`에서 확인할 수 있습니다.

---

## 📌 Git 브랜치 전략

> - `main` / `develop` 브랜치 운영
> - 기능 개발 시 `feature/기능명` 브랜치 사용
> - PR 승인 후 `develop` → `main` 병합

## 📌 커밋 컨벤션

| 접두사 | 설명 |
|:------:|:-----|
| Feat | 새로운 기능 추가 |
| Fix | 버그 수정 |
| Docs | 문서 수정 |
| Style | 코드 스타일 변경 (로직 변경 없음) |
| Refactor | 코드 리팩토링 |
| Test | 테스트 코드 추가/수정 |
| Chore | 빌드, 설정 관련 변경 |

---

## 🛠️ 개발 규칙

### 코드 컨벤션
> - `ESLint`, `Prettier` 설정 유지
> - `TypeScript` 적용하여 명확한 타입 정의
> - 컴포넌트 네이밍은 PascalCase 적용

---