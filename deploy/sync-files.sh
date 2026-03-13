#!/bin/bash
set -e

PW="BF3YAuxhzqQD5M"
DST="root@84.238.132.83:/var/www/aisolution"
SRC="/mnt/c/Users/imabb/OneDrive/Desktop/adams ai/website"

FILES=(
  "components/shared/PricingCards.tsx"
  "components/sections/SimplePricingSection.tsx"
  "components/sections/ProductsSection.tsx"
  "app/products/customer-service/page.tsx"
  "app/products/management-assistant/page.tsx"
  "app/products/corporate-ai/page.tsx"
  "app/ai-dlya-biznesa/page.tsx"
  "app/products/ai-analytics/page.tsx"
  "app/sitemap.ts"
  "locales/ru.json"
  "locales/en.json"
  "locales/uz.json"
  "locales/zh.json"
)

for f in "${FILES[@]}"; do
  echo "Syncing $f..."
  sshpass -p "$PW" scp "$SRC/$f" "$DST/$f"
done

echo "All files synced successfully"
