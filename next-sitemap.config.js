/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ethnicsbyaravalli.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: [
    '/api/*',
    '/admin/*',
    '/private/*',
    '/404',
    '/500',
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://ethnicsbyaravalli.com/server-sitemap.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*',
          '/admin/*',
          '/private/*',
        ],
      },
    ],
  },
  transform: async (config, path) => {
    // Custom transform function to modify sitemap entries
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: path === '/' ? 1.0 : config.priority,
      lastmod: new Date().toISOString(),
    }
  },
} 