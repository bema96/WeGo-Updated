/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

export default {

  // Dev proxy til lokal backend
  async rewrites() {
    return isDev
      ? [{ source: "/api/:path*", destination: "http://localhost:4000/api/:path*" }]
      : [];
  },

  // Cloudinary inkl. SVG support
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  }
};
