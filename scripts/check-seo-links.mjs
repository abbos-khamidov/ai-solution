const urlsToCheck = [
  'https://aisolution.uz/',
  'https://aisolution.uz/services',
  'https://aisolution.uz/products/customer-service',
];

const canonicalByUrl = new Map([
  ['https://aisolution.uz/', 'https://aisolution.uz/'],
  ['https://aisolution.uz/services', 'https://aisolution.uz/services'],
  ['https://aisolution.uz/products/customer-service', 'https://aisolution.uz/products/customer-service'],
]);

function normalizeUrl(url) {
  const parsed = new URL(url);
  parsed.search = '';
  parsed.hash = '';
  const normalizedPath = parsed.pathname.replace(/\/+$/, '') || '/';
  parsed.pathname = normalizedPath;
  return parsed.toString();
}

function getCanonicalLinks(html) {
  const matches = [
    ...html.matchAll(
      /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/gi
    ),
  ];
  return matches.map((match) => match[1]);
}

function getHreflangLinks(html) {
  const matches = [
    ...html.matchAll(
      /<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["'][^>]*>/gi
    ),
  ];

  return matches.map((match) => ({ hreflang: match[1], href: match[2] }));
}

async function checkUrl(url) {
  const expectedCanonical = canonicalByUrl.get(url);
  if (!expectedCanonical) {
    throw new Error(`No expected canonical configured for ${url}`);
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${url} -> HTTP ${response.status}`);
  }

  const html = await response.text();
  const canonicalLinks = getCanonicalLinks(html);

  if (canonicalLinks.length !== 1) {
    throw new Error(
      `${url} -> expected exactly 1 canonical, found ${canonicalLinks.length}`
    );
  }

  const canonicalHref = canonicalLinks[0];

  if (!canonicalHref.startsWith('https://')) {
    throw new Error(`${url} -> canonical must be absolute HTTPS URL, got ${canonicalHref}`);
  }

  if (normalizeUrl(canonicalHref) !== normalizeUrl(expectedCanonical)) {
    throw new Error(
      `${url} -> canonical mismatch. Expected ${expectedCanonical}, got ${canonicalHref}`
    );
  }

  const hreflangLinks = getHreflangLinks(html);
  for (const hreflangLink of hreflangLinks) {
    if (!hreflangLink.href.startsWith('https://aisolution.uz/')) {
      throw new Error(
        `${url} -> invalid hreflang href for ${hreflangLink.hreflang}: ${hreflangLink.href}`
      );
    }
  }

  console.log(
    `${url} -> canonical OK, hreflang ${hreflangLinks.length === 0 ? 'absent' : `present (${hreflangLinks.length})`}`
  );
}

async function main() {
  for (const url of urlsToCheck) {
    await checkUrl(url);
  }

  console.log('SEO link checks passed');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
