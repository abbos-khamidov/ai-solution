'use client';

import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { SITE_URL } from '@/lib/seo';
import { useTranslation } from 'react-i18next';
import { normalizeLanguage } from '@/lib/i18n';

const posts = [
  { slug: 'otdel-prodazh-na-ii', title: 'Отдел продаж без менеджеров: реально ли это и как выглядит на практике', description: 'Отдел продаж на ИИ: автоматизация отдела продаж Узбекистан, ии вместо менеджеров, стек и роли. Автоматические продажи Ташкент — честно про окупаемость.', date: '2026-03-29' },
  { slug: 'pochemu-chat-bot-ne-rabotaet', title: 'Чат-бот не работает: 5 причин и чем ИИ-агент лучше', description: 'Почему чат бот не работает, чат бот vs ии агент, плохой чат бот на сайте. Умный бот для бизнеса Узбекистан и ии агент вместо бота.', date: '2026-03-29' },
  { slug: 'ii-menedzher-vs-crm', title: 'CRM есть, продажи не растут: чем ИИ-менеджер полезнее CRM', description: 'ИИ менеджер для бизнеса, crm vs ии агент, автоматизация продаж Узбекистан и CRM Ташкент — как не терять лиды.', date: '2026-03-29' },
  { slug: 'ii-agent-dlya-nayma-sotrudnikov', title: 'ИИ-агент для найма: как закрывать вакансии за 3 дня без HR', description: 'ИИ агент для найма, автоматизация найма узбекистан: подбор персонала бот, HR автоматизация в Ташкенте и бот для собеседований.', date: '2026-03-29' },
  { slug: 'ii-analitik-vs-shtatnyy-analitik', title: 'ИИ-аналитик vs штатный аналитик: что дешевле и эффективнее в Узбекистане', description: 'Сравнение по скорости, стоимости и точности: ии аналитик для бизнеса, автоматизация аналитики и штатный аналитик данных в Ташкенте.', date: '2026-03-29' },
  { slug: 'kvalifikaciya-lidov-ai', title: 'Автоматическая квалификация лидов с помощью AI — система Cold/Warm/Hot', description: 'Как AI автоматически квалифицирует лидов по системе Cold/Warm/Hot и увеличивает конверсию продаж.', date: '2026-03-15' },
  { slug: 'llm-bot-manager-telegram', title: 'LLM и бот-менеджер в Telegram — что это и зачем бизнесу в 2025', description: 'LLM — это мозг вашего бот-менеджера в Telegram. Как LLM-боты заменяют менеджеров и автоматизируют продажи.', date: '2026-03-15' },
  { slug: 'analitika-dlya-kompaniy-tashkent', title: 'Аналитика для компаний на базе ИИ — Ташкент 2025', description: 'Как настроить аналитику для компании в Ташкенте с помощью ИИ: дашборды, KPI, отчёты в реальном времени.', date: '2026-03-15' },
  { slug: 'vnedrenie-ii-centralnaya-aziya', title: 'Внедрение ИИ в Центральной Азии — рынок 2025', description: 'Состояние рынка искусственного интеллекта в Центральной Азии: Узбекистан, Казахстан, Кыргызстан, Таджикистан.', date: '2026-03-15' },
  { slug: 'ii-avtomatizaciya-biznesa-uzbekistan', title: 'ИИ автоматизация бизнеса в Узбекистане — полное руководство 2025', description: 'Что такое ИИ автоматизация бизнеса и как внедрить её в Ташкенте. Реальные примеры, стоимость, сроки.', date: '2026-03-15' },
  { slug: 'ai-dlya-internet-magazina-uzbekistan', title: 'AI для интернет-магазина в Узбекистане — автоматизация продаж', description: 'Как AI чат-бот решает главные проблемы интернет-магазина в Узбекистане: поддержка 24/7, брошенные корзины.', date: '2026-03-15' },
  { slug: 'avtomatizaciya-prodazh-telegram', title: 'Автоматизация продаж через Telegram бот — руководство для бизнеса', description: 'Как Telegram-бот с AI автоматизирует продажи в Узбекистане: квалификация лидов, работа 24/7, интеграция с CRM.', date: '2026-03-15' },
  { slug: 'lichny-ii-bot-assistant', title: 'Личный AI бот-ассистент для руководителя бизнеса', description: 'Как личный AI-ассистент помогает собственнику контролировать команду, финансы и задачи в Telegram.', date: '2026-03-15' },
  { slug: 'sozdat-chatgpt-dlya-kompanii', title: 'Как создать свой ChatGPT для компании — корпоративный AI', description: 'Пошаговое руководство по созданию корпоративного AI-ассистента на базе RAG. Интеграция с 1С и Bitrix24.', date: '2026-03-15' },
  { slug: 'ai-chatbot-dlya-biznesa-uzbekistan', title: 'AI чат-бот для бизнеса в Узбекистане — полное руководство', description: 'Что такое AI чат-бот и как он увеличивает продажи бизнеса в Узбекистане. Telegram, Instagram, WhatsApp.', date: '2025-01-25' },
  { slug: 'vnedrenie-ii-v-biznes-tashkent', title: 'Внедрение ИИ в бизнес в Ташкенте — руководство 2025', description: 'Пошаговое руководство по внедрению искусственного интеллекта в бизнес в Ташкенте. Реальные кейсы и ROI.', date: '2025-01-20' },
];

function formatDate(dateStr: string, locale: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
}

const copyByLang = {
  ru: {
    eyebrow: 'AI Solution Blog',
    title: 'Блог',
    subtitle:
      'Практические руководства по внедрению AI в бизнес: Telegram-боты, LLM, аналитика, автоматизация продаж в Ташкенте и Узбекистане.',
    schemaName: 'Блог AI Solution',
    schemaDescription: 'Экспертные статьи по AI-автоматизации бизнеса в Ташкенте и Узбекистане.',
    dateLocale: 'ru-RU',
  },
  uz: {
    eyebrow: 'AI Solution Blog',
    title: 'Blog',
    subtitle:
      "Biznesga AI joriy etish bo'yicha amaliy qo'llanmalar: Telegram-botlar, LLM, analitika va Toshkent hamda O'zbekistonda savdolarni avtomatlashtirish.",
    schemaName: 'AI Solution Blog',
    schemaDescription: "Toshkent va O'zbekistonda biznesni AI yordamida avtomatlashtirish bo'yicha amaliy maqolalar.",
    dateLocale: 'uz-UZ',
  },
};

export default function BlogIndexPage() {
  const { i18n } = useTranslation();
  const lang = normalizeLanguage(i18n.language);
  const copy = copyByLang[lang];
  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: copy.schemaName,
    description: copy.schemaDescription,
    url: `${SITE_URL}/blog`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/blog/${post.slug}/`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Главная', url: '/' },
          { name: copy.title, url: '/blog/' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />

      <main className="min-h-screen bg-background pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="mb-12">
            <p className="text-sm text-[#3B82F6] font-medium mb-3">{copy.eyebrow}</p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              {copy.title}
            </h1>
            <p className="mt-4 text-lg text-[#94A3B8] max-w-2xl">
              {copy.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-xl p-6 border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-foreground group-hover:text-[#93C5FD] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-[#94A3B8] line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                  <time
                    dateTime={post.date}
                    className="text-xs text-[#64748B] whitespace-nowrap pt-1"
                  >
                    {formatDate(post.date, copy.dateLocale)}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
