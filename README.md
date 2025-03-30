# Next.js 포트폴리오 프로젝트

Next.js와 Notion API를 기반으로 제작한 **개인 블로그 및 포트폴리오 사이트**입니다.  
콘텐츠는 Notion DB로 관리되며 정적 사이트로 렌더링됩니다.  
Vercel을 통해 배포되었으며, ISR을 적용해 변경 사항이 실시간으로 반영됩니다.

### 🔗 [배포 링크](https://jhsonnn-blog.vercel.app/)

---

### 🔹 주요 기능
- **Notion API 연동**: Notion을 CMS로 활용하여 블로그 게시글을 동적으로 관리
- **정적 사이트 생성 (SSG + ISR)**: Next.js의 ISR을 활용한 성능 최적화
- **카테고리/태그 필터링**: 사용자 경험 향상을 위한 콘텐츠 분류 기능
- **다크 모드 지원**: Tailwind CSS의 다크 모드 적용
- **SEO 최적화**: Next.js의 기본 SEO 기능 활용

---

## 🧰 기술 스택

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"/>
  <img src="https://img.shields.io/badge/Notion_API-2F2F2F?style=for-the-badge&logo=notion&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white"/>
</p>

---

## ⚙️ 로컬 실행 방법

### 1️⃣ 사전 요구 사항
- **Node.js v22.9.0**
- **Yarn**

### 2️⃣ 실행 절차

```bash
# 1. 프로젝트 클론
git clone https://github.com/jhsonnn/jhson-blog.git
cd jhson-blog

# 2. 의존성 설치
yarn install

# 3. 환경 변수 설정
cp .env.example .env.local
# → .env.local 파일을 열어 실제 값을 입력하세요

# 4. 개발 서버 실행
yarn dev
```

# 📝 LICENSE

This project is licensed under the MIT License.  
You are free to use, modify, and distribute it for both personal and commercial purposes.
이 프로젝트는 MIT 라이센스 하에 배포됩니다.
개인적 혹은 상업적인 목적으로 자유롭게 사용, 수정, 배포할 수 있습니다.

See the [LICENSE](./LICENSE) file for more details.

# 🙋‍♂️ Author
- GitHub: [@jhsonnn](https://github.com/jhsonnn)
- Email: jihyeongson13@gmail.com