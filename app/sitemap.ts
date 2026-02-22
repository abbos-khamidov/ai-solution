import fs from 'node:fs';
import path from 'node:path';
import type { MetadataRoute } from 'next';

type SitemapEntry = {
  path: string;
  lastModified: string;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'always' | 'hourly' | 'never';
  priority: number;
};

const entries: SitemapEntry[] = [
  { path: '/', lastModified: '2025-02-22', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/services', lastModified: '2025-02-23', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/products/customer-service', lastModified: '2025-02-22', changeFrequency: 'monthly', priority: 0.95 },
  { path: '/products/management-assistant', lastModified: '2025-02-22', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/products/corporate-ai', lastModified: '2025-02-22', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/telegram-bots', lastModified: '2025-02-22', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services/ai-managers', lastModified: '2025-02-22', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services/ai-assistant', lastModified: '2025-02-22', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/services/analytics', lastModified: '2025-02-22', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/services/software-development', lastModified: '2025-02-22', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/vnedrenie-ii-v-biznes-tashkent', lastModified: '2025-02-22', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/blog/ai-chatbot-dlya-biznesa-uzbekistan', lastModified: '2025-02-20', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/blog/sozdat-chatgpt-dlya-kompanii', lastModified: '2025-02-18', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog/lichny-ii-bot-assistant', lastModified: '2025-02-15', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog/avtomatizaciya-prodazh-telegram', lastModified: '2025-02-12', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog/ai-dlya-internet-magazina-uzbekistan', lastModified: '2025-02-10', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/blog/vnedrenie-ii-centralnaya-aziya', lastModified: '2025-02-08', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/blog/kvalifikaciya-lidov-ai', lastModified: '2025-02-05', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog/ii-avtomatizaciya-biznesa-uzbekistan', lastModified: '2025-02-22', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/blog/analitika-dlya-kompaniy-tashkent', lastModified: '2025-02-22', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/blog/llm-bot-manager-telegram', lastModified: '2025-02-22', changeFrequency: 'monthly', priority: 0.9 },
];

const pageExtensions = ['tsx', 'ts', 'jsx', 'js', 'mdx'];

function pageExists(routePath: string): boolean {
  const segments = routePath === '/' ? [] : routePath.replace(/^\//, '').split('/');

  return pageExtensions.some((ext) =>
    fs.existsSync(path.join(process.cwd(), 'app', ...segments, `page.${ext}`))
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aisolution.uz';

  return entries
    .filter((entry) => pageExists(entry.path))
    .map((entry) => ({
      url: `${baseUrl}${entry.path}`,
      lastModified: new Date(entry.lastModified).toISOString(),
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    }));
}
