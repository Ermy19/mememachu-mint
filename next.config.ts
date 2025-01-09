import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {fs: false, net: false, tls: false};
    config.externals.push("pino-pretty", "lru-cache", "encoding", "lokijs");
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
