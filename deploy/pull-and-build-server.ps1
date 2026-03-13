# Run on server: git pull + build + pm2 restart
# Usage: .\deploy\pull-and-build-server.ps1
# You will be prompted for root password once.

$server = "root@84.238.132.83"
$cmd = "cd /var/www/aisolution && git pull origin main && bash deploy/sync-and-build.sh"
Write-Host "Connecting to $server ... (enter password when prompted)" -ForegroundColor Cyan
ssh -o StrictHostKeyChecking=accept-new $server $cmd
