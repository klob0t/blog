import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Wildcard for any hostname
      },
      {
        protocol: 'http',
        hostname: '**', // Also allow http sources
      }
    ]
  }
}

export default nextConfig;
