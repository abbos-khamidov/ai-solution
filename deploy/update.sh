#!/bin/bash
set -e

APP_DIR="/opt/aisolution"
cd "$APP_DIR"

echo "Pulling latest changes..."
git pull origin main

echo "Rebuilding and restarting..."
docker compose build
docker compose up -d

echo "Running migrations..."
docker compose exec backend python manage.py migrate --noinput

echo "Done! Site updated."
docker compose ps
