import { NextConfig } from "next"

// next.config.js
const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    domains: ['mrwallpaper.com'], // Add 'mrwallpaper.com' here
  },
}

export default nextConfig