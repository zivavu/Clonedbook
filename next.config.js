/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    emotion: true,
  },
  images: {
    domains: [
      'www.facebook.com',
      'firebasestorage.googleapis.com',
      'loremflickr.com',
      'source.unsplash.com',
      'picsum.photos',
      'cloudflare-ipfs.com',
      'static.xx.fbcdn.net',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
