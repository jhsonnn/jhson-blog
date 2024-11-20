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
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  },
  webpack: (config) => {
    config.resolve.alias['react-lazy-images'] = false;
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'react-lazy-images': false,
    };

    return config;
  },
};

module.exports = nextConfig;
