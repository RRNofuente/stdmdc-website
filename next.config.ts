import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [],
    deviceSizes: [320, 420, 768, 1024, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // ✅ Remove `swcMinify` as it is enabled by default
  reactStrictMode: true,
};

export default nextConfig;
