import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Higgsfield CDN (see data/images.ts). Remove once images are self-hosted with `npm run fetch-images`.
    remotePatterns: [{ protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" }],
  },
};

export default nextConfig;
