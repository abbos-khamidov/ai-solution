const urls = process.argv.slice(2);

if (urls.length === 0) {
  console.error('Usage: node scripts/check-schema.mjs <url1> <url2> ...');
  process.exit(1);
}

const faqRegex = /"@type"\s*:\s*"FAQPage"/g;

async function checkUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${url} -> HTTP ${response.status}`);
  }

  const html = await response.text();
  const faqMatches = html.match(faqRegex) || [];
  const faqCount = faqMatches.length;

  if (faqCount > 1) {
    throw new Error(`${url} -> duplicate FAQPage detected (${faqCount})`);
  }

  console.log(`${url} -> FAQPage count: ${faqCount} (OK)`);
}

async function main() {
  for (const url of urls) {
    await checkUrl(url);
  }

  console.log('Schema check passed');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
