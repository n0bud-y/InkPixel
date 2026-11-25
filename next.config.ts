import type { NextConfig } from "next";

// Builds on the cPanel server (LOW_MEMORY_BUILD=1, set by scripts/deploy-cpanel.sh): the hosting
// caps an account's memory, and a build killed half-way leaves the site down (20 Nov 2026). These
// builds compile in Webpack's separate worker (off by default here because of the custom webpack
// config below), with its memory optimisations, no source maps, no disk cache, and no TypeScript
// check (run locally before each commit: npx tsc --noEmit). Other builds are unchanged.
const lowMemory = process.env.LOW_MEMORY_BUILD === "1";

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
    // Low-memory builds: Webpack keeps its cache in memory only (the docs' memory guide).
    if (lowMemory && config.cache && !dev) config.cache = Object.freeze({ type: "memory" as const });
    const prefix = !isServer ? "" : dev || nextRuntime === "edge" ? ".." : "../..";
    config.module.rules.push({
      test: /\.mp4$/,
      use: { loader: `${process.cwd()}/scripts/webpack-video-loader.cjs`, options: { prefix, basePath: process.env.BASE_PATH ?? "" } },
    });
    return config;
  },
  experimental: {
    // How many processes build the pages: one per CPU by default. The cPanel server has many CPUs
    // but caps the processes an account may start (spawn EAGAIN), so its build sets
    // NEXT_BUILD_CPUS=1 (scripts/deploy-cpanel.sh). Unset elsewhere.
    cpus: Number(process.env.NEXT_BUILD_CPUS) || undefined,
    ...(lowMemory && { webpackBuildWorker: true, webpackMemoryOptimizations: true, serverSourceMaps: false }),
  },
  ...(lowMemory && { enablePrerenderSourceMaps: false, typescript: { ignoreBuildErrors: true } }),
  images: {
    // Case-study and blog images come from Contentful's image server, from our space only.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        pathname: "/ksvziwcaomrx/**",
      },
      // YouTube video thumbnails (case-study video sections).
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
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
      // www → the main address, keeping the path (26 Nov 2026, for SEO: one address per page).
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.inkpixelstudios.com" }],
        destination: "https://inkpixelstudios.com/:path*",
        permanent: true,
      },
      { source: "/services/web-development", destination: "/services/development/web-development", permanent: true },
      { source: "/terms", destination: "/terms-and-conditions", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      // Terminal Gateway CRM is a product, not a case study (26 Oct 2026).
      { source: "/case-studies/crm-terminal-gateway", destination: "/products/terminal-gateway-crm", permanent: true },
    ];
  },
};

export default nextConfig;
