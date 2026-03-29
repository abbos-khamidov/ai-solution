import type { MetadataRoute } from 'next';

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://aisolution.uz').replace(/\/$/, '');

const DISALLOW_ALL = ['/api/', '/_next/', '/confidential/', '/brand/', '/security/', '/admin/', '/*?*'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW_ALL,
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/blog/', '/sitemap.xml'],
        disallow: DISALLOW_ALL,
      },
      {
        userAgent: 'AhrefsBot',
        disallow: '/',
      },
      {
        userAgent: 'SemrushBot',
        disallow: '/',
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
