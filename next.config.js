/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 15 no longer needs experimental.appDir
  
  // Configure image domains for external photos
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Allow unoptimized images for base64 or other formats from Profiler API
    unoptimized: true,
  },
}

module.exports = nextConfig
