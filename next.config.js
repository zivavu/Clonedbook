/** @type {import('next').NextConfig} */

// Set this to true to disable image optimization, false to enable it
const DISABLE_IMAGE_OPTIMIZATION = true;

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    emotion: true,
  },
  // Explicitly set environment variables
  env: {
    NEXT_PUBLIC_USE_EMULATOR: process.env.NEXT_PUBLIC_USE_EMULATOR || 'false',
  },
  images: {
    unoptimized: DISABLE_IMAGE_OPTIMIZATION,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.facebook.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
      },
      {
        protocol: 'https',
        hostname: 'static.xx.fbcdn.net',
      },
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
