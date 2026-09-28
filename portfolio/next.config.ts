import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Velora demo images on the Higgsfield CDN (see demos/velora/IMAGES.md).
    remotePatterns: [{ protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" }],
  },
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: false },
      { source: "/demos/velora", destination: "/demos/velora/en", permanent: false },
    ];
  },
};

export default nextConfig;
