import fs from 'node:fs';
import path from 'node:path';
import type { MetadataRoute } from 'next';

const PAGE_EXTENSIONS = ['tsx', 'ts', 'jsx', 'js', 'mdx'] as const;

type ChangeFreq = MetadataRoute.Sitemap[number]['changeFrequency'];
type SitemapEntry = {
  path: string;
  changeFrequency: ChangeFreq;
  priority: number;
};

/**
 * Sitemap entries grouped by section.
 * Only routes with an existing app page are included in the output.
 * All URLs are emitted with trailing slash (canonical format).
 */
const SITEMAP_ENTRIES: SitemapEntry[] = [
  // ——— Home ———
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },

  // ——— Company & legal ———
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/brand', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/confidential', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/security', changeFrequency: 'yearly', priority: 0.7 },

  // ——— Services ———
  { path: '/services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services/telegram-bots', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services/ai-managers', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services/ai-assistant', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/services/analytics', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/services/software-development', changeFrequency: 'monthly', priority: 0.7 },

  // ——— Products ———
  { path: '/products/customer-service', changeFrequency: 'monthly', priority: 0.95 },
  { path: '/products/ai-analytics', changeFrequency: 'monthly', priority: 0.92 },
  { path: '/products/management-assistant', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/products/corporate-ai', changeFrequency: 'monthly', priority: 0.9 },

  // ——— Cases ———
  { path: '/cases', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/cases/studify-ai-automation', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/cases/marsit-lead-automation', changeFrequency: 'monthly', priority: 0.8 },

  // ——— Blog ———
  { path: '/blog', changeFrequency: 'weekly', priority: 0.85 },
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
  { path: '/blog/kak-vybrat-chatbot-dlya-biznesa', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/blog/roi-ot-ii-avtomatizacii', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/blog/telegram-bot-prodazhi-uzbekistan', changeFrequency: 'monthly', priority: 0.85 },

  // ——— Landing pages (by topic) ———
  { path: '/tashkent', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-chatbot-tashkent', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/telegram-bot-dlya-biznesa', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/avtomatizaciya-prodazh-tashkent', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/chatbot-dlya-instagram', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/tseny-na-chatboty-tashkent', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-dlya-klinik-tashkent', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-dlya-nedvizhimosti-tashkent', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-dlya-internet-magazina', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-dlya-obrazovaniya-tashkent', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/whatsapp-bot-dlya-biznesa', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-dlya-yuridicheskih-uslug', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-dlya-logistiki-uzbekistan', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-dlya-restoranov-tashkent', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-dlya-fitnes-klubov', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/crm-integraciya-tashkent', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/biznes-avtomatizaciya-uzbekistan', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/sravnenie-ai-reshenii-uzbekistan', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/chatgpt-dlya-biznesa-uzbekistan', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ai-bot-tashkent', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-avtomatizaciya', changeFrequency: 'monthly', priority: 0.88 },
  { path: '/ii-avtomatizaciya-uzbekistan', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ai-agent-dlya-biznesa-tashkent', changeFrequency: 'monthly', priority: 0.88 },
  { path: '/ai-dlya-biznesa', changeFrequency: 'monthly', priority: 0.9 },
];

function pageExists(routePath: string): boolean {
  const segments = routePath === '/' ? [] : routePath.replace(/^\//, '').split('/');
  return PAGE_EXTENSIONS.some((ext) =>
    fs.existsSync(path.join(process.cwd(), 'app', ...segments, `page.${ext}`))
  );
}

function getLastModified(routePath: string): string {
  const segments = routePath === '/' ? [] : routePath.replace(/^\//, '').split('/');
  for (const ext of PAGE_EXTENSIONS) {
    const filePath = path.join(process.cwd(), 'app', ...segments, `page.${ext}`);
    if (fs.existsSync(filePath)) {
      return fs.statSync(filePath).mtime.toISOString();
    }
  }
  return new Date().toISOString();
}

function toAbsoluteUrl(baseUrl: string, routePath: string): string {
  const base = baseUrl.replace(/\/$/, '');
  return routePath === '/' ? `${base}/` : `${base}${routePath}/`;
}

/**
 * Generates the sitemap for search engines (server-side only, no DOM).
 * - Only includes routes that have a corresponding page in app/
 * - URLs use trailing slash (canonical)
 * - lastModified from file mtime (ISO 8601)
 * Note: <script> tags in /sitemap.xml when viewed in browser come from Chrome extensions, not from this code.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aisolution.uz';

  return SITEMAP_ENTRIES.filter((entry) => pageExists(entry.path)).map((entry) => ({
    url: toAbsoluteUrl(baseUrl, entry.path),
    lastModified: getLastModified(entry.path),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
