/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

export default {
  async rewrites() {
    // Lokal proxy til backend. (Kun dev.)
    return isDev ? [{ source: "/api/:path*", destination: "http://localhost:4000/api/:path*" }] : [];
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};
