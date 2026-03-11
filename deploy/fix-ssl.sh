#!/bin/bash
set -e

mkdir -p /opt/aisolution/deploy/ssl

openssl req -x509 -nodes -days 3650 \
  -newkey rsa:2048 \
  -keyout /opt/aisolution/deploy/ssl/origin.key \
  -out /opt/aisolution/deploy/ssl/origin.crt \
  -subj "/CN=aisolution.uz"

ls -la /opt/aisolution/deploy/ssl/

echo "SSL cert created successfully"
