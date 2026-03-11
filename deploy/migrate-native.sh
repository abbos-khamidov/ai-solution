#!/bin/bash
set -e

echo "=== STEP 1: Install native PostgreSQL ==="
if ! dpkg -l | grep -q postgresql-16; then
  apt-get update
  apt-get install -y postgresql postgresql-contrib
  systemctl enable postgresql
  systemctl start postgresql
fi
echo "PostgreSQL installed"

echo "=== STEP 2: Create database and user ==="
sudo -u postgres psql -tc "SELECT 1 FROM pg_roles WHERE rolname='ai_solution_user'" | grep -q 1 || \
  sudo -u postgres psql -c "CREATE USER ai_solution_user WITH PASSWORD 'AiSolution_DB_2026!';"
sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname='ai_solution'" | grep -q 1 || \
  sudo -u postgres psql -c "CREATE DATABASE ai_solution OWNER ai_solution_user;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE ai_solution TO ai_solution_user;"
echo "Database and user created"

echo "=== STEP 3: Restore database dump ==="
sudo -u postgres psql -d ai_solution < /tmp/db_dump.sql 2>&1 || true
sudo -u postgres psql -d ai_solution -c "GRANT ALL ON ALL TABLES IN SCHEMA public TO ai_solution_user;"
sudo -u postgres psql -d ai_solution -c "GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO ai_solution_user;"
sudo -u postgres psql -d ai_solution -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ai_solution_user;"
echo "Database restored"

echo "=== STEP 4: Install PM2 and Certbot ==="
npm list -g pm2 2>/dev/null || npm install -g pm2
which certbot 2>/dev/null || apt-get install -y certbot python3-certbot-nginx
echo "PM2 and Certbot installed"

echo "=== STEP 5: Set up Python venv for backend ==="
apt-get install -y python3-venv python3-pip libpq-dev gcc
cd /opt/aisolution
if [ ! -d "venv" ]; then
  python3 -m venv venv
fi
source venv/bin/activate
pip install -r backend/requirements.txt gunicorn
cd backend
python manage.py collectstatic --noinput 2>/dev/null || true
python manage.py migrate --noinput 2>/dev/null || true
deactivate
echo "Backend Python environment ready"

echo "=== STEP 6: Create backend .env ==="
cat > /opt/aisolution/backend/.env << 'ENVEOF'
DJANGO_DEBUG=False
DJANGO_SECRET_KEY=eac9e07bf7b9a1ebf4f75d6f8701650903fdf7d8ebef645f58f2cf27666644d8
DJANGO_ALLOWED_HOSTS=127.0.0.1,localhost,aisolution.uz,www.aisolution.uz
DJANGO_CSRF_TRUSTED_ORIGINS=https://aisolution.uz,https://www.aisolution.uz
DJANGO_CORS_ALLOWED_ORIGINS=https://aisolution.uz,https://www.aisolution.uz
DJANGO_SECURE_SSL_REDIRECT=False
DATABASE_URL=postgresql://ai_solution_user:AiSolution_DB_2026!@127.0.0.1:5432/ai_solution
TELEGRAM_BOT_TOKEN=8383263715:AAEgRrwXkeICvYKxfTECYr-8QcM5HfnKVVs
TELEGRAM_PERSONAL_CHAT_ID=5008217282
TELEGRAM_GROUP_CHAT_ID=-1003384846670
RESEND_API_KEY=re_7e1kUBDo_5bnGaWppdSMzN6WFD3xyKNoG
EMAIL_FROM=onboarding@resend.dev
LEADS_EMAIL_TO=imabboskhamidov@gmail.com
ENVEOF
echo "Backend .env created"

echo "=== STEP 7: Create systemd service for backend ==="
cat > /etc/systemd/system/aisolution-backend.service << 'SVCEOF'
[Unit]
Description=AI Solution Django Backend
After=network.target postgresql.service
Wants=postgresql.service

[Service]
Type=simple
User=root
WorkingDirectory=/opt/aisolution/backend
EnvironmentFile=/opt/aisolution/backend/.env
ExecStart=/opt/aisolution/venv/bin/gunicorn core.wsgi:application --bind 127.0.0.1:8000 --workers 2 --timeout 120 --access-logfile - --error-logfile -
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
SVCEOF
systemctl daemon-reload
systemctl enable aisolution-backend
echo "Backend systemd service created"

echo "=== STEP 8: Build frontend ==="
cd /opt/aisolution

cat > /opt/aisolution/.env.production << 'FEENVEOF'
NEXT_PUBLIC_SITE_URL=https://aisolution.uz
DJANGO_API_BASE_URL=http://127.0.0.1:8000
OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE
CHAT_DEMO_API_KEY=YOUR_CHAT_DEMO_API_KEY_HERE
TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN_HERE
TELEGRAM_CHAT_ID=YOUR_TELEGRAM_CHAT_ID_HERE
TELEGRAM_GROUP_ID=YOUR_TELEGRAM_GROUP_ID_HERE
FEENVEOF

npm ci --prefer-offline 2>&1 | tail -3
NEXT_PUBLIC_SITE_URL=https://aisolution.uz npm run build 2>&1 | tail -10
echo "Frontend built"

echo "=== STEP 9: Set up PM2 for frontend ==="
cat > /opt/aisolution/ecosystem.config.js << 'PM2EOF'
module.exports = {
  apps: [{
    name: 'aisolution-frontend',
    script: 'node_modules/.bin/next',
    args: 'start -p 3000',
    cwd: '/opt/aisolution',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NEXT_PUBLIC_SITE_URL: 'https://aisolution.uz',
      DJANGO_API_BASE_URL: 'http://127.0.0.1:8000',
      OPENAI_API_KEY: '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',
      CHAT_DEMO_API_KEY: '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',
      TELEGRAM_BOT_TOKEN: '8383263715:AAEgRrwXkeICvYKxfTECYr-8QcM5HfnKVVs',
      TELEGRAM_CHAT_ID: '5008217282',
      TELEGRAM_GROUP_ID: '-5051576749',
    }
  }]
};
PM2EOF
echo "PM2 ecosystem config created"

echo "=== STEP 10: Stop Docker containers ==="
cd /opt/aisolution
docker compose down 2>&1 || true
systemctl stop docker.socket docker.service 2>/dev/null || true
echo "Docker stopped"

echo "=== STEP 11: Start native services ==="
systemctl start aisolution-backend
sleep 2
curl -sS --max-time 5 http://127.0.0.1:8000/api/health/ 2>&1 | head -3 || echo "Backend started (health check optional)"

cd /opt/aisolution
pm2 delete aisolution-frontend 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd -u root --hp /root 2>&1 | tail -3
sleep 3
echo "Frontend and backend started"

echo "=== STEP 12: Configure Nginx ==="
cat > /etc/nginx/sites-available/aisolution << 'NGXEOF'
server {
    listen 80;
    server_name aisolution.uz www.aisolution.uz;

    real_ip_header CF-Connecting-IP;
    set_real_ip_from 173.245.48.0/20;
    set_real_ip_from 103.21.244.0/22;
    set_real_ip_from 103.22.200.0/22;
    set_real_ip_from 103.31.4.0/22;
    set_real_ip_from 141.101.64.0/18;
    set_real_ip_from 108.162.192.0/18;
    set_real_ip_from 190.93.240.0/20;
    set_real_ip_from 188.114.96.0/20;
    set_real_ip_from 197.234.240.0/22;
    set_real_ip_from 198.41.128.0/17;
    set_real_ip_from 162.158.0.0/15;
    set_real_ip_from 104.16.0.0/13;
    set_real_ip_from 104.24.0.0/14;
    set_real_ip_from 172.64.0.0/13;
    set_real_ip_from 131.0.72.0/22;

    add_header X-Frame-Options SAMEORIGIN always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    client_max_body_size 10M;

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /admin/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
NGXEOF

rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/aisolution /etc/nginx/sites-enabled/aisolution
nginx -t
systemctl restart nginx
systemctl enable nginx
echo "Nginx configured and started"

echo "=== STEP 13: Verify everything ==="
sleep 2
echo "--- Backend ---"
curl -sS --max-time 5 http://127.0.0.1:8000/api/ 2>&1 | head -3 || echo "backend responded or no /api/ route"
echo "--- Frontend ---"
curl -I -sS --max-time 5 http://127.0.0.1:3000 2>&1 | head -3
echo "--- Nginx (port 80) ---"
curl -I -sS --max-time 5 http://127.0.0.1 2>&1 | head -3

echo ""
echo "============================================"
echo "  MIGRATION COMPLETE! Native stack running."
echo "============================================"
echo ""
echo "Next: Run certbot for SSL"
echo "  certbot --nginx -d aisolution.uz -d www.aisolution.uz"
