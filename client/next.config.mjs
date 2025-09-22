/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

const nextConfig = {
  // Proxy KUN lokalt. På Netlify kører redirects.
  async rewrites() {
    if (!isDev) return [];
    return [
      { source: "/api/:path*",    destination: "http://localhost:4000/api/:path*" },
      { source: "/images/:path*", destination: "http://localhost:4000/images/:path*" },
    ];
  },

  // Tillad Cloudinary-billeder
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "wego-production.up.railway.app" },
    ],
  },
};

export default nextConfig;
