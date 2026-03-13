import { NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aisolution.uz';
const HOST = SITE_URL.replace(/\/$/, '');
const SITEMAP_URL = `${HOST}/sitemap.xml`;

/**
 * Generates a professional robots.txt (plain text).
 * Better than typical setups: Host, explicit crawler rules, Yandex Clean-param,
 * single sitemap, no redundant lines.
 */
function buildRobotsTxt(): string {
  const lines: string[] = [
    '# https://aisolution.uz — robots.txt',
    '# Generated for search engines. Allowed: public pages. Disallowed: API, internals.',
    '',
    `Host: ${HOST}`,
    '',
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /_next/',
    '',
    'User-agent: Googlebot',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /_next/',
    '',
    'User-agent: Googlebot-Image',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /_next/',
    '',
    'User-agent: Bingbot',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /_next/',
    '',
    'User-agent: Yandex',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /_next/',
    '# Ignore tracking params so ?utm_source=... does not create duplicate URLs in index',
    'Clean-param: utm_source&utm_medium&utm_campaign&utm_term&utm_content&ref&gclid&fbclid&yclid',
    '',
    `Sitemap: ${SITEMAP_URL}`,
    '',
  ];
  return lines.join('\n');
}

export function GET() {
  return new NextResponse(buildRobotsTxt(), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
