import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 2026-10 renewal: old service URLs and the retired PACE LP.
      { source: "/service/youtube", destination: "/service/recruit-youtube", permanent: true },
      { source: "/service/media", destination: "/works#undo-job", permanent: true },
      { source: "/lp/pace", destination: "/", permanent: true },
      { source: "/pace/:path*", destination: "/", permanent: true },
    ];
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
