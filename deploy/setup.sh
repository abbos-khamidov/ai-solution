#!/bin/bash
set -e

DOMAIN="aisolution.uz"
EMAIL="imabboskhamidov@gmail.com"
APP_DIR="/opt/aisolution"
REPO="https://github.com/abbos-khamidov/ai-solution.git"

echo "========================================="
echo " AI Solution VPS Setup"
echo " Domain: $DOMAIN"
echo "========================================="

# --- 1. System update & Docker install ---
echo "[1/7] Installing Docker..."
apt-get update -y
apt-get install -y ca-certificates curl gnupg lsb-release git ufw

if ! command -v docker &>/dev/null; then
    curl -fsSL https://get.docker.com | sh
fi

if ! command -v docker compose &>/dev/null; then
    apt-get install -y docker-compose-plugin
fi

systemctl enable docker
systemctl start docker

# --- 2. Firewall ---
echo "[2/7] Configuring firewall..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# --- 3. Clone repo ---
echo "[3/7] Cloning repository..."
if [ -d "$APP_DIR" ]; then
    cd "$APP_DIR"
    git pull origin main
else
    git clone "$REPO" "$APP_DIR"
    cd "$APP_DIR"
fi

# --- 4. Create .env for production ---
echo "[4/7] Setting up environment..."
if [ ! -f "$APP_DIR/.env.production" ]; then
    cat > "$APP_DIR/.env.production" <<'ENVEOF'
# === Database ===
DB_PASSWORD=AiSolution_DB_2026!

# === Django ===
DJANGO_SECRET_KEY=CHANGE_THIS_TO_RANDOM_50_CHARS
DJANGO_SECURE_SSL_REDIRECT=False

# === Telegram ===
TELEGRAM_BOT_TOKEN=8383263715:AAEgRrwXkeICvYKxfTECYr-8QcM5HfnKVVs
TELEGRAM_PERSONAL_CHAT_ID=5008217282
TELEGRAM_GROUP_CHAT_ID=-1003384846670
TELEGRAM_CHAT_ID=5008217282
TELEGRAM_GROUP_ID=-5051576749

# === Email ===
RESEND_API_KEY=re_7e1kUBDo_5bnGaWppdSMzN6WFD3xyKNoG
EMAIL_FROM=onboarding@resend.dev
LEADS_EMAIL_TO=imabboskhamidov@gmail.com

# === OpenAI ===
OPENAI_API_KEY=YOUR_OPENAI_KEY
CHAT_DEMO_API_KEY=YOUR_CHAT_DEMO_KEY
ENVEOF
    echo ""
    echo "  >>> IMPORTANT: Edit $APP_DIR/.env.production <<<"
    echo "  >>> Set DJANGO_SECRET_KEY and OPENAI keys <<<"
    echo ""
fi

# Symlink .env for docker-compose
ln -sf "$APP_DIR/.env.production" "$APP_DIR/.env"

# --- 5. Get SSL certificate ---
echo "[5/7] Setting up SSL..."

# Use init config first (HTTP only)
cp "$APP_DIR/deploy/nginx-init.conf" "$APP_DIR/deploy/nginx.conf.bak"
cp "$APP_DIR/deploy/nginx-init.conf" /tmp/nginx-init.conf

# Start minimal nginx for ACME challenge
docker compose -f "$APP_DIR/docker-compose.yml" down 2>/dev/null || true

# Run a temporary nginx for certbot
docker run -d --name nginx-certbot \
    -p 80:80 \
    -v "$APP_DIR/deploy/nginx-init.conf:/etc/nginx/conf.d/default.conf:ro" \
    -v certbot-webroot:/var/www/certbot \
    nginx:alpine 2>/dev/null || true

sleep 3

# Check if cert already exists
if [ ! -d "/var/lib/docker/volumes/$(basename $APP_DIR)_certbot-etc/_data/live/$DOMAIN" ] && \
   [ ! -d "/var/lib/docker/volumes/aisolution_certbot-etc/_data/live/$DOMAIN" ]; then
    echo "  Requesting SSL certificate from Let's Encrypt..."
    docker run --rm \
        -v certbot-etc:/etc/letsencrypt \
        -v certbot-var:/var/lib/letsencrypt \
        -v certbot-webroot:/var/www/certbot \
        certbot/certbot certonly \
        --webroot -w /var/www/certbot \
        -d "$DOMAIN" -d "www.$DOMAIN" \
        --email "$EMAIL" \
        --agree-tos --no-eff-email --force-renewal
else
    echo "  SSL certificate already exists, skipping..."
fi

# Stop temporary nginx
docker stop nginx-certbot 2>/dev/null || true
docker rm nginx-certbot 2>/dev/null || true

# Restore main nginx config
cp "$APP_DIR/deploy/nginx.conf.bak" "$APP_DIR/deploy/nginx.conf" 2>/dev/null || true

# --- 6. Run Django migrations ---
echo "[6/7] Building and starting services..."
cd "$APP_DIR"
docker compose build
docker compose up -d db
sleep 5
docker compose run --rm backend python manage.py migrate --noinput
docker compose run --rm backend python manage.py createsuperuser --noinput 2>/dev/null || true

# --- 7. Start everything ---
echo "[7/7] Starting all services..."
docker compose up -d

# --- SSL auto-renewal cron ---
CRON_CMD="0 3 * * * docker compose -f $APP_DIR/docker-compose.yml run --rm certbot renew --quiet && docker compose -f $APP_DIR/docker-compose.yml exec nginx nginx -s reload"
(crontab -l 2>/dev/null | grep -v certbot; echo "$CRON_CMD") | crontab -

echo ""
echo "========================================="
echo " DEPLOYMENT COMPLETE!"
echo "========================================="
echo ""
echo " Frontend:  https://$DOMAIN"
echo " Backend:   https://$DOMAIN/api/health"
echo " Admin:     https://$DOMAIN/admin/"
echo ""
echo " Useful commands:"
echo "   cd $APP_DIR"
echo "   docker compose logs -f          # view logs"
echo "   docker compose restart           # restart all"
echo "   docker compose down && docker compose up -d  # full restart"
echo "   docker compose pull && docker compose up -d --build  # update"
echo ""
echo " To update after git push:"
echo "   cd $APP_DIR && git pull && docker compose up -d --build"
echo ""
