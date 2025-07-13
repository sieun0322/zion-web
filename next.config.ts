import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [], // 외부 URL 사용하는 경우만 필요
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // 기존 experimental 옵션 필요하면 여기에만 둠
  },
  turbopack: {}, // turbopack 사용 여부: 필요에 따라 true/false
  // 또는
  // turbopack: {
  //   // turbopack 설정 옵션들
  // },
  // appDir는 기본 활성화됨으로 삭제
};

export default nextConfig;
