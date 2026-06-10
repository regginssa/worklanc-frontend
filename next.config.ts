import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["mammoth", "docx-preview", "react-pdf", "pdfjs-dist"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      // pdfjs-dist/webpack.mjs avoids "Object.defineProperty called on non-object" in Next dev.
      "pdfjs-dist": path.join(
        process.cwd(),
        "node_modules/pdfjs-dist/webpack.mjs"
      ),
    };

    return config;
  },
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.prod.website-files.com",
      "res.cloudinary.com",
      "www.upwork.com",
      "upwork-usw2-prod-agora-file-storage.s3.us-west-2.amazonaws.com",
      "assets.static-upwork.com",
    ],
  },
};

export default nextConfig;
