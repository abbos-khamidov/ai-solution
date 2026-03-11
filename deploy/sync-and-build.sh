#!/bin/bash
set -e
cd /opt/aisolution

echo "=== Git pull ==="
git pull origin main

echo "=== Build ==="
NEXT_PUBLIC_SITE_URL=https://aisolution.uz npm run build 2>&1 | tail -15

pm2 restart aisolution-frontend
sleep 3
pm2 list

echo "=== Verify ==="
curl -I -sS --max-time 5 http://127.0.0.1:3000 2>&1 | head -3
echo "DEPLOY DONE"
