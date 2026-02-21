#!/bin/bash
# ============================================================
#  AI Solution — одноразовая настройка сервера Ubuntu 22.04
#  Запускать от root: bash server-setup.sh yourdomain.com
# ============================================================
set -e

DOMAIN=${1:-"yourdomain.com"}
APP_DIR="/var/www/aisolution"
APP_USER="deploy"

echo "==> [1/7] Обновление системы..."
apt-get update -y && apt-get upgrade -y

echo "==> [2/7] Установка Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs git nginx certbot python3-certbot-nginx

echo "==> [3/7] Установка PM2..."
npm install -g pm2

echo "==> [4/7] Создание пользователя deploy..."
if ! id "$APP_USER" &>/dev/null; then
  adduser --disabled-password --gecos "" $APP_USER
  usermod -aG sudo $APP_USER
fi
mkdir -p /home/$APP_USER/.ssh
chmod 700 /home/$APP_USER/.ssh

echo "==> [5/7] Подготовка директории приложения..."
mkdir -p $APP_DIR
chown -R $APP_USER:$APP_USER $APP_DIR

echo "==> [6/7] Настройка Nginx..."
cat > /etc/nginx/sites-available/aisolution << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }

    # Статические файлы Next.js
    location /_next/static/ {
        alias $APP_DIR/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

ln -sf /etc/nginx/sites-available/aisolution /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "==> [7/7] Настройка PM2 автозапуска..."
su - $APP_USER -c "pm2 startup systemd -u $APP_USER --hp /home/$APP_USER" || true
env PATH=$PATH:/usr/bin pm2 startup systemd -u $APP_USER --hp /home/$APP_USER

echo ""
echo "====================================================="
echo "  Сервер готов!"
echo "  Домен: $DOMAIN"
echo "  Директория: $APP_DIR"
echo "  Пользователь: $APP_USER"
echo ""
echo "  СЛЕДУЮЩИЕ ШАГИ:"
echo "  1. Добавь SSH-ключ GitHub Actions (см. README)"
echo "  2. Загрузи .env.local на сервер:"
echo "     scp .env.local $APP_USER@$DOMAIN:$APP_DIR/.env.local"
echo "  3. Добавь SSL (после первого деплоя):"
echo "     certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo "====================================================="
