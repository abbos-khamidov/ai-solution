import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aisolution.uz';
  const now = new Date();

  // Single-domain i18n: all languages served from same paths
  const locales = ['ru', 'uz', 'en'] as const;
  const alternates = (path: string) => ({
    languages: Object.fromEntries(
      locales.map((lang) => [lang, `${baseUrl}${path}`])
    ) as Record<string, string>,
  });

  return [
    // Homepage
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: alternates('/'),
    },
    // Core product pages — highest conversion value
    {
      url: `${baseUrl}/products/customer-service`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.95,
      alternates: alternates('/products/customer-service'),
    },
    {
      url: `${baseUrl}/products/management-assistant`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.90,
      alternates: alternates('/products/management-assistant'),
    },
    {
      url: `${baseUrl}/products/corporate-ai`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.90,
      alternates: alternates('/products/corporate-ai'),
    },
    // Service pages — secondary importance
    {
      url: `${baseUrl}/services/telegram-bots`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
      alternates: alternates('/services/telegram-bots'),
    },
    {
      url: `${baseUrl}/services/ai-managers`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
      alternates: alternates('/services/ai-managers'),
    },
    {
      url: `${baseUrl}/services/ai-assistant`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.70,
      alternates: alternates('/services/ai-assistant'),
    },
    {
      url: `${baseUrl}/services/analytics`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.65,
      alternates: alternates('/services/analytics'),
    },
    {
      url: `${baseUrl}/services/software-development`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.65,
      alternates: alternates('/services/software-development'),
    },
    // Blog / SEO pages
    {
      url: `${baseUrl}/blog/vnedrenie-ii-v-biznes-tashkent`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    {
      url: `${baseUrl}/blog/ai-chatbot-dlya-biznesa-uzbekistan`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    {
      url: `${baseUrl}/blog/sozdat-chatgpt-dlya-kompanii`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/lichny-ii-bot-assistant`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/avtomatizaciya-prodazh-telegram`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/ai-dlya-internet-magazina-uzbekistan`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/vnedrenie-ii-centralnaya-aziya`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.70,
    },
    {
      url: `${baseUrl}/blog/kvalifikaciya-lidov-ai`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
  ];
}
