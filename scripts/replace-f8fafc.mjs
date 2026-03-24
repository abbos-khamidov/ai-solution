import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const roots = [path.join(__dirname, '..', 'components'), path.join(__dirname, '..', 'app')];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f === 'node_modules' || f === '.next') continue;
      walk(p, files);
    } else if (/\.tsx?$/.test(f)) files.push(p);
  }
  return files;
}

const allFiles = roots.flatMap((r) => walk(r));
for (const file of allFiles) {
  let c = fs.readFileSync(file, 'utf8');
  const o = c;
  c = c.replace(/text-\[#F8FAFC\]/g, 'text-foreground');
  c = c.replace(/hover:text-\[#F8FAFC\]/g, 'hover:text-foreground');
  /* Inline chart/label colors only in TSX objects (not OG gradients): */
  c = c.replace(/color: active \? '#F8FAFC'/g, "color: active ? '#0F172A'");
  c = c.replace(/color: '#F8FAFC'/g, "color: '#0F172A'");
  if (c !== o) fs.writeFileSync(file, c);
}
console.log('ok');
