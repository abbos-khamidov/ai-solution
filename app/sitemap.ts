import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aisolution.uz';

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
      lastModified: new Date('2025-02-22'),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: alternates('/'),
    },
    // Core product pages
    {
      url: `${baseUrl}/products/customer-service`,
      lastModified: new Date('2025-02-22'),
      changeFrequency: 'monthly',
      priority: 0.95,
      alternates: alternates('/products/customer-service'),
    },
    {
      url: `${baseUrl}/products/management-assistant`,
      lastModified: new Date('2025-02-22'),
      changeFrequency: 'monthly',
      priority: 0.90,
      alternates: alternates('/products/management-assistant'),
    },
    {
      url: `${baseUrl}/products/corporate-ai`,
      lastModified: new Date('2025-02-22'),
      changeFrequency: 'monthly',
      priority: 0.90,
      alternates: alternates('/products/corporate-ai'),
    },
    // Service pages
    {
      url: `${baseUrl}/services/telegram-bots`,
      lastModified: new Date('2025-02-22'),
      changeFrequency: 'monthly',
      priority: 0.80,
      alternates: alternates('/services/telegram-bots'),
    },
    {
      url: `${baseUrl}/services/ai-managers`,
      lastModified: new Date('2025-02-22'),
      changeFrequency: 'monthly',
      priority: 0.80,
      alternates: alternates('/services/ai-managers'),
    },
    {
      url: `${baseUrl}/services/ai-assistant`,
      lastModified: new Date('2025-02-22'),
      changeFrequency: 'monthly',
      priority: 0.75,
      alternates: alternates('/services/ai-assistant'),
    },
    {
      url: `${baseUrl}/services/analytics`,
      lastModified: new Date('2025-02-22'),
      changeFrequency: 'monthly',
      priority: 0.75,
      alternates: alternates('/services/analytics'),
    },
    {
      url: `${baseUrl}/services/software-development`,
      lastModified: new Date('2025-02-22'),
      changeFrequency: 'monthly',
      priority: 0.70,
      alternates: alternates('/services/software-development'),
    },
    // Blog — existing
    {
      url: `${baseUrl}/blog/vnedrenie-ii-v-biznes-tashkent`,
      lastModified: new Date('2025-02-22'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/ai-chatbot-dlya-biznesa-uzbekistan`,
      lastModified: new Date('2025-02-20'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/sozdat-chatgpt-dlya-kompanii`,
      lastModified: new Date('2025-02-18'),
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    {
      url: `${baseUrl}/blog/lichny-ii-bot-assistant`,
      lastModified: new Date('2025-02-15'),
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    {
      url: `${baseUrl}/blog/avtomatizaciya-prodazh-telegram`,
      lastModified: new Date('2025-02-12'),
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    {
      url: `${baseUrl}/blog/ai-dlya-internet-magazina-uzbekistan`,
      lastModified: new Date('2025-02-10'),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/vnedrenie-ii-centralnaya-aziya`,
      lastModified: new Date('2025-02-08'),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/kvalifikaciya-lidov-ai`,
      lastModified: new Date('2025-02-05'),
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    // Blog — new SEO articles
    {
      url: `${baseUrl}/blog/ii-avtomatizaciya-biznesa-uzbekistan`,
      lastModified: new Date('2025-02-22'),
      changeFrequency: 'monthly',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/blog/analitika-dlya-kompaniy-tashkent`,
      lastModified: new Date('2025-02-22'),
      changeFrequency: 'monthly',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/blog/llm-bot-manager-telegram`,
      lastModified: new Date('2025-02-22'),
      changeFrequency: 'monthly',
      priority: 0.90,
    },
  ];
}
