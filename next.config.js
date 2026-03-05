/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cdn.shopify.com',
      'dreamscape-aquariums.myshopify.com'
    ],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig