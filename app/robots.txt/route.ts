import { NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aisolution.uz';
const HOST = SITE_URL.replace(/\/$/, '');
const SITEMAP_URL = `${HOST}/sitemap.xml`;

function buildRobotsTxt(): string {
  const lines: string[] = ['User-agent: *', 'Allow: /', '', `Sitemap: ${SITEMAP_URL}`, ''];
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
