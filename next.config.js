/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.facebook.com',
        pathname: '/reaction/image/**',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        pathname: '/source.unsplash.com/collection/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/id/**',
      },
    ],
  },
};

module.exports = nextConfig;
