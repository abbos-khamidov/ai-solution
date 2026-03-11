#!/bin/bash
sleep 2
echo "=== HTTP 80 ==="
curl -I -sS --max-time 5 http://127.0.0.1 2>&1 | head -3
echo "=== HTTPS 443 ==="
curl -kI -sS --max-time 5 https://127.0.0.1 2>&1 | head -3
echo "=== Listening ports ==="
ss -tlnp | grep -E ':(80|443)'
echo "=== Docker status ==="
docker compose -f /opt/aisolution/docker-compose.yml ps nginx
echo "=== Nginx logs (last 5) ==="
docker compose -f /opt/aisolution/docker-compose.yml logs nginx --tail=5
