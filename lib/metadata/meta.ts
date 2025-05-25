import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
      default: '프론트엔드 개발자, 손지형의 포트폴리오',
      template: '%s | 프론트엔드 개발자, 손지형의 포트폴리오',
    },
    description:
      '프론트엔드 개발자로의 전향을 준비하며 만든 포트폴리오 및 블로그입니다. 프로젝트를 통해 개발 경험과 고민을 정리한 개인 공간입니다.',
    keywords: [
      '프론트엔드',
      '프론트',
      '프론트엔드 개발자',
      '신입 프론트엔드',
      '프론트엔드 포트폴리오',
      '프론트엔드 포폴',
      '프론트엔드 개발자 포트폴리오',
      '프론트엔드 개발자 포폴',
      '프론트 포트폴리오',
      '프론트 포폴',
      '웹 개발자 포트폴리오',
      '웹 개발자 포폴',
      '웹 포트폴리오',
      '웹 포폴',
      '포트폴리오',
      '포폴',
      '개발자 포트폴리오',
      '개발자 포폴',
      '개발자 블로그',
      'React',
      'Next.js',
    ],
    icons: {
      icon: '/favicon.ico',
    },
    openGraph: {
      title: '프론트엔드 개발자, 손지형의 포트폴리오',
      description: '프론트엔드 개발자 손지형의 포트폴리오 입니다.',
      url: 'https://jhsonnn.info',
      siteName: '손지형 포트폴리오',
      locale: 'ko_KR',
      type: 'website',
      images: [
        {
          url: 'https://jhsonnn.info/og-image.png',
          width: 1200,
          height: 630,
          alt: 'og-image',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: '프론트엔드 개발자, 손지형의 포트폴리오',
      description: '프론트엔드 개발자 손지형의 포트폴리오 입니다.',
      images: ['https://jhsonnn.info/og-image.png'],
    },
  };