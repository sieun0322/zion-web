import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [], // 외부 URL 사용하는 경우만 필요
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Docker 빌드 최적화
  output: 'standalone',

  experimental: {
    // 메모리 사용량 최적화
    optimizePackageImports: ['framer-motion', 'react-icons'],
  },
  
  // 개발 환경에서만 turbopack 사용
  ...(process.env.NODE_ENV === 'development' && {
    turbopack: {}
  }),
};

export default nextConfig;
