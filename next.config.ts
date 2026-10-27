import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The live site runs on cPanel (Node.js app): `next build` also writes a self-contained server
  // to .next/standalone (server.js and only the packages it needs), which is what gets uploaded.
  output: "standalone",
  // This folder is the project root (a package-lock.json in the user's home folder would
  // otherwise be taken for it, and the standalone folder would nest the whole path).
  outputFileTracingRoot: process.cwd(),
  // The site's sub-folder, when it doesn't sit at the root of its domain: "/projects/inkpixelstudio"
  // on the cPanel demo, set in that server's .env.local. Unset locally and on Vercel.
  basePath: process.env.BASE_PATH,
  // Whether search engines are blocked (src/lib/seo.ts `indexable`) is fixed at build time: pages
  // refreshed on the server later can't pick up a different setting from the server's environment
  // (a leftover BLOCK_INDEXING=true there put noindex on the live site, 27 Oct 2026).
  env: { BLOCK_INDEXING: process.env.BLOCK_INDEXING ?? "" },
  // No "X-Powered-By: Next.js" header.
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
    rules: {
      // Videos in src/assets/videos/ are imported like images: the import is the file's URL
      // (fingerprinted under /_next/static/media, cached long-term, basePath included).
      "*.mp4": { type: "asset" },
    },
  },
  // The same rule for Webpack builds (`next build --webpack`): the cPanel server's Linux is too old
  // for Turbopack (scripts/deploy-cpanel.sh). Each build writes the files into .next/static/media:
  // the server build from its own output folder, as Next.js's image loader does.
  webpack(config, { isServer, dev, nextRuntime }) {
    const prefix = !isServer ? "" : dev || nextRuntime === "edge" ? ".." : "../..";
    config.module.rules.push({
      test: /\.mp4$/,
      use: { loader: `${process.cwd()}/scripts/webpack-video-loader.cjs`, options: { prefix, basePath: process.env.BASE_PATH ?? "" } },
    });
    return config;
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
  // (/services/web-development → /services/development/web-development); the Terms page moved to
  // /terms-and-conditions (26 Oct 2026); /privacy is a shortcut to the Privacy Policy.
  async redirects() {
    return [
      { source: "/services/web-development", destination: "/services/development/web-development", permanent: true },
      { source: "/terms", destination: "/terms-and-conditions", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      // Terminal Gateway CRM is a product, not a case study (26 Oct 2026).
      { source: "/case-studies/crm-terminal-gateway", destination: "/products/terminal-gateway-crm", permanent: true },
    ];
  },
};

export default nextConfig;
