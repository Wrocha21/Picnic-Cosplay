import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-d88951fe307840d1b57dbfcbe1d494b0.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
export default nextConfig;
