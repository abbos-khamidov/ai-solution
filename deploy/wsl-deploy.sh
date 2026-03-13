#!/bin/bash
set -e
# Run from WSL: wsl bash deploy/wsl-deploy.sh
# Or from project root in WSL: bash deploy/wsl-deploy.sh

# Path to project in WSL (Windows path: c:\Users\imabb\OneDrive\Desktop\aisolution\aisolution website)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="$(cd "$SCRIPT_DIR/.." && pwd)"
PW="${SSHPASS:-BF3YAuxhzqQD5M}"
DST="root@84.238.132.83"
REMOTE_DIR="/var/www/aisolution"

export SSHPASS="$PW"

echo "=== Source: $SRC ==="
echo "=== Syncing app/ ==="
sshpass -e scp -r -o StrictHostKeyChecking=no "$SRC/app" "$DST:$REMOTE_DIR/"

echo "=== Syncing components/ lib/ deploy/ ==="
sshpass -e scp -r -o StrictHostKeyChecking=no "$SRC/components" "$SRC/lib" "$SRC/deploy" "$DST:$REMOTE_DIR/"

echo "=== Syncing root config ==="
for f in package.json package-lock.json next.config.ts tsconfig.json; do
  [ -f "$SRC/$f" ] && sshpass -e scp -o StrictHostKeyChecking=no "$SRC/$f" "$DST:$REMOTE_DIR/"
done
[ -f "$SRC/.env" ] && sshpass -e scp -o StrictHostKeyChecking=no "$SRC/.env" "$DST:$REMOTE_DIR/"
[ -f "$SRC/.env.local" ] && sshpass -e scp -o StrictHostKeyChecking=no "$SRC/.env.local" "$DST:$REMOTE_DIR/"

echo "=== Build and restart on server ==="
sshpass -e ssh -o StrictHostKeyChecking=no "$DST" "cd $REMOTE_DIR && NEXT_PUBLIC_SITE_URL=https://aisolution.uz npm run build && pm2 restart aisolution-frontend"

echo "=== Done ==="
