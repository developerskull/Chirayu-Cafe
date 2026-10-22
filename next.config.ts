import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // for static export / Vercel free tier
  },
  // Static export — remove if you need SSR features
  // output: "export",
};

export default nextConfig;
