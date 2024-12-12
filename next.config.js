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
//     NOTION_API_KEY: process.env.NOTION_API_KEY,
//     NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
//   },
//   webpack: (config, { isServer }) => {
//     if (isServer) {
//       console.log('Webpack is running on the server...');
//     }
//     config.resolve.alias['react-lazy-images'] = false;
//     config.resolve.fallback = {
//       ...config.resolve.fallback,
//       'react-lazy-images': false,
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
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    NOTION_VIDEO_DB_ID: process.env.NOTION_VIDEO_DB_ID,
    MY_TOKEN: process.env.MY_TOKEN,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      console.log("Webpack is running on the server...");
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      "react-lazy-images": false,
    };

    config.resolve.fallback = {
      ...config.resolve.fallback,
      "react-lazy-images": false,
    };

    return config;
  },
};

module.exports = nextConfig;
