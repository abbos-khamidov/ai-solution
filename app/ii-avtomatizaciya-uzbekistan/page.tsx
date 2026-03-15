import type { Metadata } from 'next';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';
import { MoneyLandingPage, type MoneyLandingConfig } from '@/components/seo/MoneyLandingPage';

const SLUG = '/ii-avtomatizaciya-uzbekistan';
const TITLE = 'ИИ автоматизация в Узбекистане — решения для бизнеса';
const DESCRIPTION =
  'ИИ автоматизация в Узбекистане для компаний: чат-боты, AI-менеджеры, аналитика, корпоративные ассистенты. Внедрение в Ташкенте и по всему Узбекистану.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'ИИ автоматизация Узбекистан',
    'автоматизация бизнеса Узбекистан',
    'внедрение ИИ в Узбекистане',
    'AI Uzbekistan',
    'автоматизация продаж Ташкент',
    'искусственный интеллект для компаний Узбекистан',
  ],
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${SLUG}`,
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['uz_UZ'],
    siteName: 'AI Solution',
    images: [{ url: DEFAULT_TWITTER_IMAGE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: DEFAULT_TWITTER_IMAGE }],
  },
  robots: { index: true, follow: true },
};

const config: MoneyLandingConfig = {
  slug: SLUG,
  pageTitle: 'ИИ автоматизация в Узбекистане',
  eyebrow: 'AI для компаний Узбекистана',
  title: 'Автоматизация бизнеса через ИИ в Узбекистане — внедрение за 10 дней',
  description:
    'Внедряем искусственный интеллект для компаний в Узбекистане: автоматизация заявок, клиентского сервиса, продаж и управленческой аналитики.',
  bullets: ['Ташкент', 'Самарканд', 'Фергана', 'Удаленный запуск'],
  sections: [
    {
      title: 'Для каких ниш подходит',
      text: 'Образование, медицина, ритейл, e-commerce, недвижимость, сервисные компании и B2B. Настраиваем под специфику и язык коммуникации.',
    },
    {
      title: 'Почему компании выбирают AI',
      text: 'ИИ позволяет отвечать клиентам быстрее, экономить ресурсы команды, повышать качество обработки заявок и принимать решения на основе данных.',
    },
  ],
  faq: [
    {
      q: 'Работаете только в Ташкенте?',
      a: 'Нет. Мы работаем по всему Узбекистану: Ташкент, Самарканд, Фергана, Андижан, Наманган, Бухара и другие города.',
    },
    {
      q: 'Можно внедрить AI без сложной инфраструктуры?',
      a: 'Да. Начать можно с одного канала и базовых сценариев, а затем поэтапно добавлять CRM, аналитику и новые процессы.',
    },
    {
      q: 'Есть ли поддержка после запуска?',
      a: 'Да, мы сопровождаем проект после релиза: оптимизируем сценарии, обновляем базу знаний и улучшаем конверсию.',
    },
  ],
  relatedLinks: [
    { href: '/tashkent', label: 'Локальная страница AI в Ташкенте' },
    { href: '/services/ai-managers', label: 'AI-менеджеры для продаж' },
    { href: '/services/ai-assistant', label: 'AI-ассистент для команды' },
    { href: '/blog/vnedrenie-ii-centralnaya-aziya', label: 'Рынок ИИ в Центральной Азии' },
  ],
};

export default function IIAvtomatizaciyaUzbekistanPage() {
  return <MoneyLandingPage config={config} />;
}
