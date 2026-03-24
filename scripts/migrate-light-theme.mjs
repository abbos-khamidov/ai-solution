/**
 * One-off: merge inline dark backgrounds into Tailwind semantic classes.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const f of fs.readdirSync(dir)) {
    if (f === 'node_modules' || f === '.next') continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, files);
    else if (/\.(tsx|ts)$/.test(f)) files.push(p);
  }
  return files;
}

const dirs = ['app', 'components', 'lib', 'motion'].map((d) => path.join(root, d));
const files = dirs.flatMap((d) => walk(d));

for (const file of files) {
  let c = fs.readFileSync(file, 'utf8');
  const orig = c;

  c = c.replace(/bg-\[#05050A\]/g, 'bg-background');
  c = c.replace(/focus:ring-offset-\[#05050A\]/g, 'focus:ring-offset-background');
  c = c.replace(/from-\[#05050A\]/g, 'from-background');

  c = c.replace(
    /className="([^"]*)"\s+style=\{\{\s*background:\s*'#05050A'\s*\}\}/g,
    'className="$1 bg-background"',
  );
  c = c.replace(
    /className="([^"]*)"\s+style=\{\{\s*background:\s*'#0D0D1A'\s*\}\}/g,
    'className="$1 bg-background-secondary"',
  );
  c = c.replace(
    /className="([^"]*)"\s+style=\{\{\s*background:\s*'#0D0D1A',\s*borderBottom:\s*'1px solid rgba\(255,255,255,0\.06\)'\s*\}\}/g,
    'className="$1 bg-background-secondary border-b border-border"',
  );

  if (c !== orig) fs.writeFileSync(file, c, 'utf8');
}

console.log('migrate-light-theme: done', files.length, 'files scanned');
