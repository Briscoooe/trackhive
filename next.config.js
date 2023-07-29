/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['newjams-images.scdn.co'],
  }
}

module.exports = nextConfig
