// Webpack loader for the videos in src/assets/videos/ (Webpack builds only, `next build --webpack`
// on the cPanel server; Turbopack uses the "asset" rule in next.config.ts). Like Next.js's own
// image loader: the import is the file's URL, /_next/static/media/<name>.<hash>.mp4, and the
// file is written to .next/static/media. The videos are imported by server components, so the
// server build writes them too, from its own output folder (`prefix`, set in next.config.ts).
/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS: Webpack loads loaders with require() */
const { createHash } = require("node:crypto");
const path = require("node:path");

module.exports = function videoLoader(content) {
  const { prefix, basePath } = this.getOptions();
  const hash = createHash("sha256").update(content).digest("hex").slice(0, 8);
  const name = `static/media/${path.basename(this.resourcePath, ".mp4")}.${hash}.mp4`;
  this.emitFile(path.posix.join(prefix, name), content, null);
  return `export default ${JSON.stringify(`${basePath}/_next/${name}`)};`;
};
module.exports.raw = true;
