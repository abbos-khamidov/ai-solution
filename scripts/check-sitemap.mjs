const targetUrl = process.argv[2] || 'http://localhost:3000/sitemap.xml';

async function main() {
  const response = await fetch(targetUrl);
  const contentType = response.headers.get('content-type') || '';
  const body = await response.text();
  const trimmed = body.trimStart();

  const hasXmlContentType =
    contentType.includes('application/xml') || contentType.includes('text/xml');
  const hasUrlset = trimmed.includes('<urlset');
  const hasLoc = trimmed.includes('<loc>');

  if (!response.ok) {
    throw new Error(`Sitemap request failed: HTTP ${response.status}`);
  }

  if (!hasXmlContentType) {
    throw new Error(`Invalid Content-Type for sitemap: ${contentType || 'missing'}`);
  }

  if (!hasUrlset || !hasLoc) {
    throw new Error('Sitemap XML must contain <urlset and <loc> tags');
  }

  console.log(`Sitemap check passed for ${targetUrl}`);
  console.log(`Content-Type: ${contentType}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
