import { statSync } from 'fs';
import { join } from 'path';
import type { MetadataRoute } from 'next';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://aisolution.uz').replace(/\/$/, '');

type ChangeFreq = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

type SitemapRow = {
  /** URL path без завершающего слэша; `/` для главной */
  path: string;
  /** Путь к `page.tsx` от корня репозитория */
  file: string;
  changeFrequency: ChangeFreq;
  priority: number;
};

function getLastMod(filePath: string): string {
  try {
    return statSync(join(process.cwd(), filePath)).mtime.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function toAbsoluteUrl(routePath: string): string {
  return routePath === '/' ? `${SITE_URL}/` : `${SITE_URL}${routePath}/`;
}

/**
 * Все маршруты с явным `app/.../page.tsx` и приоритетами/changefreq по SEO-политике.
 * Исключены: /confidential/, /brand/, /security/
 *
 * URL в выдаче: 60 (все существующие page.tsx на 2026-03).
 * +1 когда появится app/blog/ii-agent-dlya-b2b-prodazh/page.tsx
 */
const SITEMAP_ROWS: SitemapRow[] = [
  { path: '/', file: 'app/page.tsx', changeFrequency: 'weekly', priority: 1.0 },

  { path: '/about', file: 'app/about/page.tsx', changeFrequency: 'monthly', priority: 0.8 },

  { path: '/services', file: 'app/services/page.tsx', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/services/telegram-bots', file: 'app/services/telegram-bots/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/ai-managers', file: 'app/services/ai-managers/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/ai-assistant', file: 'app/services/ai-assistant/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/analytics', file: 'app/services/analytics/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/software-development', file: 'app/services/software-development/page.tsx', changeFrequency: 'monthly', priority: 0.9 },

  { path: '/products', file: 'app/products/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/products/customer-service', file: 'app/products/customer-service/page.tsx', changeFrequency: 'monthly', priority: 0.95 },
  { path: '/products/ai-analytics', file: 'app/products/ai-analytics/page.tsx', changeFrequency: 'monthly', priority: 0.95 },
  { path: '/products/management-assistant', file: 'app/products/management-assistant/page.tsx', changeFrequency: 'monthly', priority: 0.95 },
  { path: '/products/corporate-ai', file: 'app/products/corporate-ai/page.tsx', changeFrequency: 'monthly', priority: 0.95 },

  { path: '/cases', file: 'app/cases/page.tsx', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/cases/studify-ai-automation', file: 'app/cases/studify-ai-automation/page.tsx', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/cases/marsit-lead-automation', file: 'app/cases/marsit-lead-automation/page.tsx', changeFrequency: 'monthly', priority: 0.8 },

  { path: '/blog', file: 'app/blog/page.tsx', changeFrequency: 'weekly', priority: 0.8 },

  // Блог: коммерческий intent + новые статьи — priority 0.85
  { path: '/blog/ii-avtomatizaciya-biznesa-uzbekistan', file: 'app/blog/ii-avtomatizaciya-biznesa-uzbekistan/page.tsx', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/blog/analitika-dlya-kompaniy-tashkent', file: 'app/blog/analitika-dlya-kompaniy-tashkent/page.tsx', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/blog/llm-bot-manager-telegram', file: 'app/blog/llm-bot-manager-telegram/page.tsx', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/blog/kak-vybrat-chatbot-dlya-biznesa', file: 'app/blog/kak-vybrat-chatbot-dlya-biznesa/page.tsx', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/blog/roi-ot-ii-avtomatizacii', file: 'app/blog/roi-ot-ii-avtomatizacii/page.tsx', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/blog/telegram-bot-prodazhi-uzbekistan', file: 'app/blog/telegram-bot-prodazhi-uzbekistan/page.tsx', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/blog/ai-chatbot-dlya-biznesa-uzbekistan', file: 'app/blog/ai-chatbot-dlya-biznesa-uzbekistan/page.tsx', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/blog/kvalifikaciya-lidov-ai', file: 'app/blog/kvalifikaciya-lidov-ai/page.tsx', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/blog/ii-analitik-vs-shtatnyy-analitik', file: 'app/blog/ii-analitik-vs-shtatnyy-analitik/page.tsx', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/blog/ii-agent-dlya-nayma-sotrudnikov', file: 'app/blog/ii-agent-dlya-nayma-sotrudnikov/page.tsx', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/blog/ii-menedzher-vs-crm', file: 'app/blog/ii-menedzher-vs-crm/page.tsx', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/blog/ii-agent-dlya-b2b-prodazh', file: 'app/blog/ii-agent-dlya-b2b-prodazh/page.tsx', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/blog/pochemu-chat-bot-ne-rabotaet', file: 'app/blog/pochemu-chat-bot-ne-rabotaet/page.tsx', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/blog/otdel-prodazh-na-ii', file: 'app/blog/otdel-prodazh-na-ii/page.tsx', changeFrequency: 'monthly', priority: 0.85 },

  // Остальные статьи блога — 0.8
  { path: '/blog/vnedrenie-ii-v-biznes-tashkent', file: 'app/blog/vnedrenie-ii-v-biznes-tashkent/page.tsx', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog/sozdat-chatgpt-dlya-kompanii', file: 'app/blog/sozdat-chatgpt-dlya-kompanii/page.tsx', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog/lichny-ii-bot-assistant', file: 'app/blog/lichny-ii-bot-assistant/page.tsx', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog/avtomatizaciya-prodazh-telegram', file: 'app/blog/avtomatizaciya-prodazh-telegram/page.tsx', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog/ai-dlya-internet-magazina-uzbekistan', file: 'app/blog/ai-dlya-internet-magazina-uzbekistan/page.tsx', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog/vnedrenie-ii-centralnaya-aziya', file: 'app/blog/vnedrenie-ii-centralnaya-aziya/page.tsx', changeFrequency: 'monthly', priority: 0.8 },

  // Коммерческие лендинги и услуги — 0.9, monthly
  { path: '/tashkent', file: 'app/tashkent/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-chatbot-tashkent', file: 'app/ii-chatbot-tashkent/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/telegram-bot-dlya-biznesa', file: 'app/telegram-bot-dlya-biznesa/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/avtomatizaciya-prodazh-tashkent', file: 'app/avtomatizaciya-prodazh-tashkent/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/chatbot-dlya-instagram', file: 'app/chatbot-dlya-instagram/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/tseny-na-chatboty-tashkent', file: 'app/tseny-na-chatboty-tashkent/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-dlya-klinik-tashkent', file: 'app/ii-dlya-klinik-tashkent/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-dlya-nedvizhimosti-tashkent', file: 'app/ii-dlya-nedvizhimosti-tashkent/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-dlya-internet-magazina', file: 'app/ii-dlya-internet-magazina/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-dlya-obrazovaniya-tashkent', file: 'app/ii-dlya-obrazovaniya-tashkent/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/whatsapp-bot-dlya-biznesa', file: 'app/whatsapp-bot-dlya-biznesa/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-dlya-yuridicheskih-uslug', file: 'app/ii-dlya-yuridicheskih-uslug/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-dlya-logistiki-uzbekistan', file: 'app/ii-dlya-logistiki-uzbekistan/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-dlya-restoranov-tashkent', file: 'app/ii-dlya-restoranov-tashkent/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-dlya-fitnes-klubov', file: 'app/ii-dlya-fitnes-klubov/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/crm-integraciya-tashkent', file: 'app/crm-integraciya-tashkent/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/biznes-avtomatizaciya-uzbekistan', file: 'app/biznes-avtomatizaciya-uzbekistan/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/sravnenie-ai-reshenii-uzbekistan', file: 'app/sravnenie-ai-reshenii-uzbekistan/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/chatgpt-dlya-biznesa-uzbekistan', file: 'app/chatgpt-dlya-biznesa-uzbekistan/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ai-bot-tashkent', file: 'app/ai-bot-tashkent/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-avtomatizaciya', file: 'app/ii-avtomatizaciya/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ii-avtomatizaciya-uzbekistan', file: 'app/ii-avtomatizaciya-uzbekistan/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ai-agent-dlya-biznesa-tashkent', file: 'app/ai-agent-dlya-biznesa-tashkent/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ai-dlya-biznesa', file: 'app/ai-dlya-biznesa/page.tsx', changeFrequency: 'monthly', priority: 0.9 },
];

function fileExists(rel: string): boolean {
  try {
    statSync(join(process.cwd(), rel));
    return true;
  } catch {
    return false;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  const unique: SitemapRow[] = [];
  for (const row of SITEMAP_ROWS) {
    if (seen.has(row.path)) continue;
    seen.add(row.path);
    unique.push(row);
  }

  return unique
    .filter((row) => fileExists(row.file))
    .map((row) => ({
      url: toAbsoluteUrl(row.path),
      lastModified: getLastMod(row.file),
      changeFrequency: row.changeFrequency,
      priority: row.priority,
    }));
}
