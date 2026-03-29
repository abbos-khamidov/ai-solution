import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const appDir = path.join(root, 'app');

const skipDirs = new Set(['blog', 'services', 'products']);

const importLine = `import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';\n`;

function addImport(content, afterPattern) {
  if (content.includes("from '@/components/seo/BreadcrumbJsonLd'")) return content;
  const re = new RegExp(afterPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!re.test(content)) {
    // try after first @/lib/seo import
    return content.replace(
      /(import [^;]+ from '@\/lib\/seo';)/,
      `$1\n${importLine.trimEnd()}`
    );
  }
  return content.replace(re, (m) => `${m}\n${importLine.trimEnd()}`);
}

const crumb2 = (titleExpr, urlExpr) => `      <BreadcrumbJsonLd
        items={[
          { name: 'Главная', url: '/' },
          { name: ${titleExpr}, url: ${urlExpr} },
        ]}
      />
`;

const crumb3 = (midName, midUrl, titleExpr, urlExpr) => `      <BreadcrumbJsonLd
        items={[
          { name: 'Главная', url: '/' },
          { name: '${midName}', url: '${midUrl}' },
          { name: ${titleExpr}, url: ${urlExpr} },
        ]}
      />
`;

for (const name of fs.readdirSync(appDir, { withFileTypes: true })) {
  if (!name.isDirectory() || skipDirs.has(name.name)) continue;
  const pagePath = path.join(appDir, name.name, 'page.tsx');
  if (!fs.existsSync(pagePath)) continue;

  let s = fs.readFileSync(pagePath, 'utf8');
  if (s.includes('MoneyLandingPage')) continue;

  const slugM = s.match(/const SLUG = '(\/[^']+)'/);
  const titleM = s.match(/const TITLE = '([^']+)'/);
  if (!slugM || !titleM) continue;
  const SLUG = slugM[1];
  const TITLE = titleM[1];

  if (s.includes('BreadcrumbJsonLd')) continue;

  // Insert import after createAlternates or seo import line
  if (s.includes("from '@/lib/seo'")) {
    s = s.replace(
      /(import \{[^}]+\} from '@\/lib\/seo';)/,
      `${importLine.trimEnd()}\n$1`
    );
  } else {
    continue;
  }

  const urlTemplate = '`${SLUG}/`';

  let inject;
  if (name.name === 'cases') {
    inject = crumb3('Кейсы', '/cases/', 'TITLE', urlTemplate);
  } else {
    inject = crumb2('TITLE', urlTemplate);
  }

  // Wrong for cases - cases/page might have different structure
  if (name.name === 'cases') {
    inject = crumb3('Кейсы', '/cases/', 'TITLE', urlTemplate);
  }

  if (s.includes('breadcrumbSchema')) {
    s = s.replace(/\nconst breadcrumbSchema = \{[\s\S]*?\};\n\n/, '\n');
    s = s.replace(
      /\n\s*<script type="application\/ld\+json" dangerouslySetInnerHTML=\{\{ __html: JSON\.stringify\(breadcrumbSchema\) \}\} \/>/,
      ''
    );
  }

  if (s.match(/return \(\s*\n\s*<>\s*\n\s*<script type="application\/ld\+json"/)) {
    s = s.replace(
      /return \(\s*\n\s*<>\s*\n(\s*)<script type="application\/ld\+json"/,
      `return (\n    <>\n${inject}$1<script type="application/ld+json"`
    );
  } else if (s.match(/return \(\s*\n\s*<>\s*\n\s*<Header/)) {
    s = s.replace(
      /return \(\s*\n\s*<>\s*\n(\s*)<Header/,
      `return (\n    <>\n${inject}$1<Header`
    );
  } else {
    console.warn('skip return pattern:', name.name);
    continue;
  }

  fs.writeFileSync(pagePath, s);
  console.log('patched', name.name);
}
