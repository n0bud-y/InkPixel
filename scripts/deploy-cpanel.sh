#!/usr/bin/env bash
# Deploys the live site on the cPanel server (Node.js app): pulls the latest code, installs the
# packages, builds, completes the self-contained server in .next/standalone (Next.js leaves the
# static files and public/ out of it), and restarts the app.
#
# Usage, in cPanel → Terminal:   bash ~/<application root>/scripts/deploy-cpanel.sh
# or just `git pull`, once the server runs it after each pull (git config core.hooksPath .githooks).
# One-time setup (docs/README.md → Deploying): .env.production with the Contentful keys in the
# application root, and the app's startup file set to .next/standalone/server.js.
set -euo pipefail
cd "$(dirname "$0")/.."
root="$PWD"

# The app's Node.js environment (cPanel's Setup Node.js App), unless one is already active.
if [ -z "${VIRTUAL_ENV:-}" ]; then
  activate=$(ls -d "$HOME/nodevenv/${root#"$HOME"/}"/*/bin/activate 2>/dev/null | sort -V | tail -1 || true)
  if [ -z "$activate" ]; then
    echo "Could not find this app's Node.js environment. Run the 'source .../activate' command shown in Setup Node.js App, then run this again." >&2
    exit 1
  fi
  # shellcheck disable=SC1090
  source "$activate"
fi

if [ ! -f .env.production ]; then
  echo "Missing .env.production (the Contentful keys the build needs). See docs/README.md → Deploying." >&2
  exit 1
fi

# SKIP_PULL=1: called by the post-merge hook (.githooks/), right after a `git pull`.
if [ -z "${SKIP_PULL:-}" ]; then
  echo "→ Pulling the latest code"
  git pull --ff-only
fi

echo "→ Installing packages"
npm install --no-audit --no-fund

echo "→ Building"
npm run build

echo "→ Completing the server folder (static files and public/)"
cp -r .next/static .next/standalone/.next/
cp -r public .next/standalone/

echo "→ Restarting the app"
mkdir -p tmp
touch tmp/restart.txt

echo "Done. If the site still shows the old version, click Restart in cPanel → Setup Node.js App."
