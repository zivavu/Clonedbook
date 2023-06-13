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
};

module.exports = nextConfig;
