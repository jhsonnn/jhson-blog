/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: 'https://jhsonnn.info',
    generateRobotsTxt: true,
    changefreq: 'daily',
    sitemapSize: 7000,

  //동적 페이지
  transform: async (config, path) => {
    //[category]/[slug]
    if (/^\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+$/.test(path)) {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }
    
    //이력서 페이지
    if (path === '/resume') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

     //메인 페이지
     if (path === '/') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }

    //카테고리, 태그
    return {
      loc: path,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
  