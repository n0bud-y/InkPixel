#!/usr/bin/env bash
# Updates the cPanel demo (designesagency.com/projects/inkpixelstudio) to the latest code on
# GitHub. On the server, in this folder, run: bash deploy.sh
set -eo pipefail
cd "$(dirname "$0")"

# The Node.js version that cPanel's "Setup Node.js App" set up for this folder.
source "$(ls -d "$HOME/nodevenv/${PWD#"$HOME"/}"/*/bin/activate | tail -n 1)"

before=$(git rev-parse HEAD)
git pull --ff-only

# Packages are installed again only when they changed (or on the first run).
if [ ! -d node_modules/next ] || ! git diff --quiet "$before" HEAD -- package-lock.json; then
  npm ci --include=dev
fi

npm run build

# The site restarts on its next visit when this file changes.
mkdir -p tmp
touch tmp/restart.txt

echo "Done: now running $(git log -1 --format='%h %s')"
