import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 2026-10 renewal: old service URLs; PACE uses its standalone LP route.
      { source: "/service/youtube", destination: "/service/recruit-youtube", permanent: true },
      { source: "/service/media", destination: "/media", permanent: true },
      { source: "/pace", destination: "/lp/pace", permanent: true },
    ];
  },
  async rewrites() {
    return [{ source: "/lp/pace", destination: "/pace/index.html" }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
