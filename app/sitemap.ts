import fs from 'node:fs';
import path from 'node:path';
import type { MetadataRoute } from 'next';

type SitemapEntry = {
  path: string;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'always' | 'hourly' | 'never';
  priority: number;
};

const entries: SitemapEntry[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/tashkent', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ai-bot-tashkent', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-avtomatizaciya', changeFrequency: 'monthly', priority: 0.88 },
  { path: '/ii-avtomatizaciya-uzbekistan', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ai-agent-dlya-biznesa-tashkent', changeFrequency: 'monthly', priority: 0.88 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/products/customer-service', changeFrequency: 'monthly', priority: 0.95 },
  { path: '/products/management-assistant', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/products/corporate-ai', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/telegram-bots', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services/ai-managers', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services/ai-assistant', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/services/analytics', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/services/software-development', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/vnedrenie-ii-v-biznes-tashkent', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/blog/ai-chatbot-dlya-biznesa-uzbekistan', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/blog/sozdat-chatgpt-dlya-kompanii', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog/lichny-ii-bot-assistant', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog/avtomatizaciya-prodazh-telegram', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog/ai-dlya-internet-magazina-uzbekistan', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/blog/vnedrenie-ii-centralnaya-aziya', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/blog/kvalifikaciya-lidov-ai', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog/ii-avtomatizaciya-biznesa-uzbekistan', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/blog/analitika-dlya-kompaniy-tashkent', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/blog/llm-bot-manager-telegram', changeFrequency: 'monthly', priority: 0.9 },
];

const pageExtensions = ['tsx', 'ts', 'jsx', 'js', 'mdx'];

function pageExists(routePath: string): boolean {
  const segments = routePath === '/' ? [] : routePath.replace(/^\//, '').split('/');

  return pageExtensions.some((ext) =>
    fs.existsSync(path.join(process.cwd(), 'app', ...segments, `page.${ext}`))
  );
}

function getPageLastModified(routePath: string): string {
  const segments = routePath === '/' ? [] : routePath.replace(/^\//, '').split('/');

  for (const ext of pageExtensions) {
    const filePath = path.join(process.cwd(), 'app', ...segments, `page.${ext}`);
    if (fs.existsSync(filePath)) {
      return fs.statSync(filePath).mtime.toISOString();
    }
  }

  return new Date().toISOString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aisolution.uz';

  return entries
    .filter((entry) => pageExists(entry.path))
    .map((entry) => ({
      url: `${baseUrl}${entry.path}`,
      lastModified: getPageLastModified(entry.path),
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    }));
}
