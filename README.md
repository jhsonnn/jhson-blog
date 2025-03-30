# Next.js 포트폴리오 프로젝트

Next.js와 Notion API를 기반으로 제작한 **개인 블로그 및 포트폴리오 사이트**입니다.  
콘텐츠는 Notion DB로 관리되며 정적 사이트로 렌더링됩니다.  
Vercel을 통해 배포하였으며 ISR을 적용해 변경 사항이 실시간 반영됩니다.

### 🔗 [배포 링크](https://jhsonnn-blog.vercel.app/)

---

## 🖥️ 서비스 소개

| 메인 페이지 | 게시글 상세 페이지 | 카테고리 필터링 |
|:----------:|:-------------:|:-------------:|
| ![메인](https://your-image-url.com/main.png) | ![게시글](https://your-image-url.com/post.png) | ![카테고리](https://your-image-url.com/category.png) |

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

## ⚙️ 로컬 실행 방법

### 1️⃣ 사전 요구 사항
- **Node.js v22.9.0**
- **Yarn**

### 🧪 실행 절차

```bash
# 1. 프로젝트 클론
git clone https://github.com/jhsonnn/jhson-blog.git
cd jhson-blog

# 2. 의존성 설치
yarn install

# 3. 환경 변수 설정
cp .env.example .env.local
# .env.local 파일에 실제 값을 입력하세요

# 4. 개발 서버 실행
yarn dev

 -->
