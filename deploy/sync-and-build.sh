#!/bin/bash
set -e
cd /var/www/aisolution

echo "=== Git pull ==="
git pull origin main

echo "=== Build ==="
NEXT_PUBLIC_SITE_URL=https://aisolution.uz npm run build 2>&1 | tail -15

echo "=== Sharp for standalone (image optimization) ==="
(cd .next/standalone && npm install sharp --no-save 2>/dev/null) || true

pm2 restart aisolution-frontend
sleep 3
pm2 list

echo "=== Verify ==="
curl -I -sS --max-time 5 http://127.0.0.1:3000 2>&1 | head -3
echo "DEPLOY DONE"
