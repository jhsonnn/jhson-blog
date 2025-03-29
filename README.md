작업중
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


<!--
Next.js 포트폴리오 프로젝트
Next.js와 Notion API를 기반으로 구축한 정적 블로그/포트폴리오 사이트입니다.
콘텐츠는 Notion에서 직접 관리되며, ISR(Incremental Static Regeneration)을 통해 빌드 없이도 최신 콘텐츠가 반영됩니다.

🔗 배포 링크
✨ 주요 기능
Notion API 기반 CMS: Notion DB에 작성된 글을 정적으로 렌더링

정적 사이트 생성 (SSG + ISR): 성능 향상을 위한 정적 빌드 + 선택적 최신화

카테고리 및 태그 필터링: 콘텐츠 분류 및 필터링 기능 제공

다크 모드 지원: Tailwind 기반 다크 테마 토글

SEO 대응: 메타 태그 및 접근성 고려

🧰 기술 스택
프론트엔드
<div align="center"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"> <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/Notion_API-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"> </div>
협업 및 테스트
<div align="center"> <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"> <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> </div>
📁 디렉토리 구조
bash
복사
편집
├── app/                  # Next.js 13 App Router
├── components/           # 재사용 가능한 UI 컴포넌트
├── lib/                  # API 클라이언트 및 유틸 함수
├── styles/               # Tailwind 및 전역 스타일
├── types/                # TypeScript 타입 정의
├── public/               # 정적 파일
├── .eslintrc.json        # ESLint 설정
├── .gitignore
├── package.json
└── README.md
⚙️ 로컬 실행 방법
✅ 사전 요구사항
Node.js v22.9.0

Yarn (권장)

# 실행
# 1. 프로젝트 클론
git clone https://github.com/jhsonnn/jhson-blog.git

# 2. 디렉토리 이동
cd jhson-blog

# 3. 패키지 설치
yarn install

# 4. 환경 변수 설정
cp .env.example .env.local
# → .env.local 파일에서 Notion API 키 및 DB ID 등 입력

# 5. 개발 서버 실행
yarn dev
개발 서버는 http://localhost:3000에서 실행됩니다.

### 커밋 컨벤션
태그	설명
Feat	기능 추가
Fix	버그 수정
Docs	문서 수정
Style	코드 포맷팅, 세미콜론 등 비즈니스 로직 변화 없음
Refactor	코드 리팩토링
Test	테스트 코드 추가/수정
Chore	기타 설정 변경, 빌드 설정 등
### 코드 스타일
Prettier로 코드 포매팅 관리
ESLint를 통한 코드 컨벤션 검사

📄 라이선스
MIT License
개인 포트폴리오용으로 제작되었으며, 자유롭게 참고 가능합니다.



## Next.js 포트폴리오(블로그) 프로젝트

개인 블로그이자 포트폴리오 용도로 제작된 프로젝트입니다.  
**Next.js**와 **Notion API**를 활용하여 콘텐츠를 동적으로 렌더링하고, 정적 사이트로 배포할 수 있도록 구현했습니다.

### 🔗 [배포 링크](https://jhsonnn-blog.vercel.app/)

---

## 소개

### 🔹 주요 기능
- **Notion API 연동**: Notion을 CMS로 활용하여 블로그 콘텐츠를 동적으로 관리
- **정적 사이트 생성 (SSG + ISR)**: 성능 향상을 위한 정적 빌드 + 선택적 최신화
- **카테고리 및 태그 필터링**: 콘텐츠 분류 및 필터링 기능 제공
- **다크 모드 지원**: Tailwind CSS를 통한 다크 모드 적용
- **SEO 최적화**: 메타 태그 및 접근성 고려

---

## 사용 기술

<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
  <img src="https://img.shields.io/badge/Notion_API-000000?style=for-the-badge&logo=notion&logoColor=white">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white">
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
</div>


---

## 📑 설치 및 실행 방법

### 1️⃣ 사전 요구 사항
- **Node.js v22.9.0**
- **Yarn**

### 2️⃣ 로컬 실행

```sh
# 1. 레포지토리 클론
git clone https://github.com/jhsonnn/jhson-blog.git

# 2. 디렉터리 이동
cd jhson-blog

# 3. 패키지 설치
yarn install

# 4. 환경 변수 설정
cp .env.example .env.local
# .env.local 파일을 열어 값을 입력해주세요

# 5. 개발 서버 실행
yarn dev

 -->
