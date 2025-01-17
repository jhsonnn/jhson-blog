// /** @type {import('next').NextConfig} */

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
//         pathname: "/**",
//       },
//     ],
//   },
//   env: {
//     NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
//     NOTION_API_KEY: process.env.NOTION_API_KEY,
//     NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
//     NOTION_VIDEO_DB_ID: process.env.NOTION_VIDEO_DB_ID,
//     MY_TOKEN: process.env.MY_TOKEN,
//     REDIS_PASSWORD: process.env.REDIS_PASSWORD,
//     REDIS_HOST: process.env.REDIS_HOST,
//     REDIS_PORT: process.env.REDIS_PORT,
//   },
//   webpack: (config, { isServer }) => {
//     if (isServer) {
//       console.log("Webpack is running on the server...");
//     }

//     config.resolve.alias = {
//       ...config.resolve.alias,
//       "react-lazy-images": false,
//     };

//     config.resolve.fallback = {
//       ...config.resolve.fallback,
//       "react-lazy-images": false,
//     };

//     return config;
//   },

//    webpack: (config) => {
//     config.resolve.alias['framer-motion'] = require.resolve('framer-motion');
//     return config;
//   },
   
//    webpack: (config) => {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       '@emotion/react': require.resolve('@emotion/react'),
//       '@emotion/is-prop-valid': require.resolve('@emotion/is-prop-valid'),
//     };
//     return config;
//   },
// };

// module.exports = nextConfig;




/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    NOTION_VIDEO_DB_ID: process.env.NOTION_VIDEO_DB_ID,
    MY_TOKEN: process.env.MY_TOKEN,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
  },
  webpack: (config, { isServer }) => {
    // 서버에서 Webpack 실행 여부를 확인
    if (isServer) {
      console.log("Webpack is running on the server...");
    }

    // Framer Motion 및 Emotion 관련 alias 추가
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-lazy-images": false,
      "framer-motion": require.resolve("framer-motion"),
      "@emotion/react": require.resolve("@emotion/react"),
      "@emotion/is-prop-valid": require.resolve("@emotion/is-prop-valid"),
    };

    // Fallback 설정
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "react-lazy-images": false,
    };

    return config;
  },
};

module.exports = nextConfig;
