import paramiko
import time

HOST = '84.238.132.83'
USER = 'root'
PASSWORD = 'BF3YAuxhzqQD5M'
DIR = '/var/www/aisolution'

def run(ssh, cmd, timeout=60):
    print(f'$ {cmd}')
    _, stdout, stderr = ssh.exec_command(cmd)
    stdout.channel.settimeout(timeout)
    stderr.channel.settimeout(timeout)
    try:
        out = stdout.read().decode('utf-8', errors='replace').strip()
    except Exception:
        out = ''
    try:
        err = stderr.read().decode('utf-8', errors='replace').strip()
    except Exception:
        err = ''
    if out: print(out.encode('ascii', errors='replace').decode('ascii'))
    if err: print('ERR:', err.encode('ascii', errors='replace').decode('ascii'))
    return out

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, username=USER, password=PASSWORD, timeout=15)
print('Connected to VPS')

run(ssh, f'cd {DIR} && git pull origin main', timeout=30)
run(ssh, f'cd {DIR} && npm install', timeout=120)

print('Starting build in background...')
run(ssh, f'nohup bash -c "cd {DIR} && npm run build > /tmp/build.log 2>&1 && pm2 restart aisolution && echo DONE >> /tmp/build.log" &', timeout=10)

print('Build started. Waiting...')
for i in range(24):
    time.sleep(15)
    log = run(ssh, 'tail -20 /tmp/build.log 2>/dev/null || echo "no log yet"', timeout=10)
    if 'DONE' in log:
        print('Build complete!')
        break
    if 'Error' in log or 'error' in log.lower():
        print('Possible error detected, check log above')
    print(f'[{(i+1)*15}s] still building...')
else:
    print('Timed out - check server manually')

status = run(ssh, 'pm2 list', timeout=10)
print('\nPM2 Status:\n', status)
ssh.close()
print('Done.')
