/* eslint-disable global-require */

const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

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
      '/contact': { page: '/contact' },
      '/donate': { page: '/donate' },
      '/thanks': { page: '/thanks' },
      '/disclaimer': { page: '/disclaimer' },
    };
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'frontmatter-markdown-loader',
    });
    return config;
  },
};

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        handleImages: ['jpeg', 'png', 'svg'],
        optimizeImagesInDev: true,
        responsive: {
          adapter: require('responsive-loader/sharp'),
          sizes: [180, 360, 600, 760, 1000],
        },
      },
    ],
  ],
  nextConfig
);
