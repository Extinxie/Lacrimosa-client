import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.mp4": {
        type: "asset",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // разрешить все https-домены
      },
    ],
  },
};

export default nextConfig;
