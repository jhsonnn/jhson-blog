# Next.js 포트폴리오 프로젝트

Next.js와 Notion API를 기반으로 제작한 **개인 블로그 및 포트폴리오 사이트**입니다.  
콘텐츠는 Notion DB로 관리되며 정적 사이트로 렌더링됩니다.  
Vercel을 통해 배포하였으며 ISR을 적용해 변경 사항이 실시간 반영됩니다.

### 🔗 [배포 링크](https://jhsonnn-blog.vercel.app/)

---

## ✨ 주요 기능

- 🔗 **Notion API 연동**: CMS 없이 콘텐츠 관리
- ⚡ **SSG + ISR 적용**: 빠른 초기 렌더링과 콘텐츠 최신화
- 🏷 **카테고리 & 태그 필터링**
- 🌙 **다크 모드 지원 (Tailwind 기반)**
- 🔍 **기본적인 SEO 메타 설정**

---

## 🧰 기술 스택
<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"/>
  <img src="https://img.shields.io/badge/Notion_API-2F2F2F?style=for-the-badge&logo=notion&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white"/>
</p>



---

## ⚙️ 로컬 실행 방법

### ✅ 요구사항

- Node.js v22.9.0
- Yarn

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

```
---
📝 라이선스
본 프로젝트는 MIT 라이선스를 따릅니다.
개인 포트폴리오 용도로 자유롭게 참고하셔도 됩니다.

🙋‍♂️ 만든 사람
GitHub: @jhsonnn
