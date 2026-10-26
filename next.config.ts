import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site's sub-folder, when it doesn't sit at the root of its domain: "/projects/inkpixelstudio"
  // on the cPanel demo, set in that server's .env.local. Unset locally and on Vercel.
  basePath: process.env.BASE_PATH,
  // No "X-Powered-By: Next.js" header.
  poweredByHeader: false,
  turbopack: {
    rules: {
      // Videos in src/assets/videos/ are imported like images: the import is the file's URL
      // (fingerprinted under /_next/static/media, cached long-term, basePath included).
      "*.mp4": { type: "asset" },
    },
  },
  images: {
    // Case-study and blog images come from Contentful's image server, from our space only.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        pathname: "/ksvziwcaomrx/**",
      },
    ],
  },
  // Basic security headers on every response. No Content-Security-Policy yet (it needs testing
  // against GSAP, Contentful images, and video). X-Frame-Options must allow Contentful's web app
  // once Live Preview (draft mode, P3-04) frames the site.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
        ],
      },
    ];
  },
  // Old addresses. Service pages moved under their core service in October 2026
  // (/services/web-development → /services/development/web-development).
  async redirects() {
    return [
      { source: "/services/web-development", destination: "/services/development/web-development", permanent: true },
    ];
  },
};

export default nextConfig;
