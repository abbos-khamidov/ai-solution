import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/confidential/'],
    },
    sitemap: 'https://aisolution.uz/sitemap.xml',
  };
}
