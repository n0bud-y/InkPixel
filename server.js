// Starts the built site on cPanel ("Setup Node.js App"), which runs a startup file instead of
// `next start`. Run `npm run build` first. Not used locally or on Vercel.
/* eslint-disable @typescript-eslint/no-require-imports -- plain Node.js (CommonJS), not bundled */
const { createServer } = require("node:http");
const next = require("next");

const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(process.env.PORT || 3000);
});
