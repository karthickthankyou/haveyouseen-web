/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
  images: {
    domains: ['firebasestorage.googleapis.com', 'placehold.co'],
  },
}

module.exports = nextConfig
