#!/bin/bash
# Run on server: cd /var/www/aisolution && bash deploy/server-pull-build.sh
# One-time for git pull: git remote set-url origin https://YOUR_TOKEN@github.com/abbos-khamidov/ai-solution.git
set -e
cd /var/www/aisolution

echo "=== Git pull ==="
if ! git pull origin main; then
  echo "Pull failed (настрой remote с токеном для следующего раза). Продолжаем сборку с текущим кодом."
fi

echo "=== Clean and install ==="
rm -rf node_modules .next
npm install

echo "=== Build ==="
NEXT_PUBLIC_SITE_URL=https://aisolution.uz npm run build

echo "=== PM2 restart ==="
pm2 restart aisolution-frontend 2>/dev/null || pm2 start npm --name "aisolution-frontend" -- start
sleep 2
pm2 list

echo "=== Done ==="
