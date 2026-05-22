import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["mammoth", "docx-preview"],
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.prod.website-files.com",
      "res.cloudinary.com",
      "www.upwork.com",
    ],
  },
};

export default nextConfig;
