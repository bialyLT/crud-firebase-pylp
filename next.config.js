/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  // Disable static page generation for all pages
  experimental: {
    // This forces all pages to be server-rendered
  },
  // Skip build-time type checking and linting (to avoid Firebase initialization errors during build)
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
