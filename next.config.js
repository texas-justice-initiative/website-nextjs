/* eslint-disable global-require */

const withPlugins = require('next-compose-plugins');

const nextConfig = {
  // target: 'serverless',
  exportPathMap() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/about-the-data': { page: '/about-the-data' },
      '/data': { page: '/data' },
      '/related-organizations': { page: '/related-organizations' },
      '/publications': { page: '/publications' },
      '/publications/officer-involved-shootings-in-texas': {
        page: '/publications/officer-involved-shootings-in-texas',
      },
      '/publications/pre-conviction-deaths-in-texas-jails': {
        page: '/publications/pre-conviction-deaths-in-texas-jails',
      },
      '/publications/covid-deaths-in-texas': {
        page: '/publications/covid-deaths-in-texas',
      },
      '/publications/covid-law-enforcement-deaths': {
        page: '/publications/covid-law-enforcement-deaths',
      },
      '/contact': { page: '/contact' },
      '/donate': { page: '/donate' },
      '/thanks': { page: '/thanks' },
      '/disclaimer': { page: '/disclaimer' },
      '/volunteer': { page: '/volunteer' },
      '/news': { page: '/news' },
      '/blog': { page: '/blog' },
    };
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'frontmatter-markdown-loader',
    });
    return config;
  },
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/texas-justice-initiative',
  },
};

module.exports = nextConfig;
