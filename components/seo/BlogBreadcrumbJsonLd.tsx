'use client';

import { usePathname } from 'next/navigation';
import { SITE_URL } from '@/lib/seo';

const BLOG_TITLES: Record<string, string> = {
  'kvalifikaciya-lidov-ai': 'Автоматическая квалификация лидов с помощью AI',
  'llm-bot-manager-telegram': 'LLM и бот-менеджер в Telegram',
  'analitika-dlya-kompaniy-tashkent': 'Аналитика для компаний на базе ИИ — Ташкент',
  'vnedrenie-ii-centralnaya-aziya': 'Внедрение ИИ в Центральной Азии',
  'ii-avtomatizaciya-biznesa-uzbekistan': 'ИИ автоматизация бизнеса в Узбекистане',
  'ai-dlya-internet-magazina-uzbekistan': 'AI для интернет-магазина в Узбекистане',
  'avtomatizaciya-prodazh-telegram': 'Автоматизация продаж через Telegram бот',
  'lichny-ii-bot-assistant': 'Личный AI бот-ассистент для руководителя',
  'sozdat-chatgpt-dlya-kompanii': 'Как создать свой ChatGPT для компании',
  'ai-chatbot-dlya-biznesa-uzbekistan': 'AI чат-бот для бизнеса в Узбекистане',
  'vnedrenie-ii-v-biznes-tashkent': 'Внедрение ИИ в бизнес в Ташкенте',
};

export function BlogBreadcrumbJsonLd() {
  const pathname = usePathname();

  if (!pathname?.startsWith('/blog/') || pathname === '/blog') {
    return null;
  }

  const slug = pathname.replace('/blog/', '');
  const title = BLOG_TITLES[slug] || slug;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Блог',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${SITE_URL}${pathname}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}
