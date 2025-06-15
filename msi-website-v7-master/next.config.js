/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [{
      protocol: 'https',
      //hostname: 'https://d1dc40k4xbphr.cloudfront.net',
      hostname:'d1dc40k4xbphr.cloudfront.net',
      pathname: '/images/**',
    }],
  },
};

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

module.exports = withMDX(nextConfig);
