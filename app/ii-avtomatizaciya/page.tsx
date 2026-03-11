import type { Metadata } from 'next';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';
import { MoneyLandingPage, type MoneyLandingConfig } from '@/components/seo/MoneyLandingPage';

const SLUG = '/ii-avtomatizaciya';
const TITLE = 'ИИ автоматизация бизнеса — внедрение под ключ';
const DESCRIPTION =
  'ИИ автоматизация бизнеса: автоматизация продаж, поддержки, аналитики и внутренних процессов. Внедрение искусственного интеллекта под ключ в Ташкенте и Узбекистане.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'ИИ автоматизация',
    'автоматизация бизнеса ИИ',
    'внедрение искусственного интеллекта',
    'AI автоматизация процессов',
    'автоматизация продаж ИИ',
    'AI automation Uzbekistan',
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
  pageTitle: 'ИИ автоматизация бизнеса',
  eyebrow: 'Внедрение искусственного интеллекта',
  title: 'ИИ автоматизация бизнеса под ключ',
  description:
    'Помогаем внедрить AI-автоматизацию в ключевые процессы компании: продажи, клиентский сервис, аналитика и управление. Работаем в Ташкенте и по всему Узбекистану.',
  bullets: ['Продажи', 'Поддержка', 'Аналитика', 'Управление'],
  sections: [
    {
      title: 'Какие процессы автоматизируем',
      text: 'Входящие заявки, квалификация лидов, ответы на типовые вопросы, отчеты руководителю, контроль KPI и повторяющиеся операционные задачи.',
    },
    {
      title: 'Как проходит внедрение',
      text: 'Сначала аудит и карта процессов, затем запуск пилота, измерение результатов и масштабирование на остальные каналы и отделы.',
    },
  ],
  faq: [
    {
      q: 'Что дает ИИ автоматизация бизнесу?',
      a: 'Снижение потерь лидов, рост скорости обработки запросов, уменьшение рутины для команды и более точная аналитика для руководителя.',
    },
    {
      q: 'Нужна ли отдельная ИТ-команда?',
      a: 'Нет, мы можем внедрить решение под ключ. От вашей команды требуется только доступ к данным и участие в согласовании сценариев.',
    },
    {
      q: 'Сколько длится внедрение?',
      a: 'Пилот обычно запускается за 1-3 недели. Полный этап зависит от объема интеграций и числа бизнес-процессов.',
    },
  ],
  relatedLinks: [
    { href: '/services', label: 'Все услуги AI Solution' },
    { href: '/services/analytics', label: 'AI-аналитика и KPI-дашборды' },
    { href: '/products/management-assistant', label: 'Management Assistant для собственника' },
    { href: '/blog/ii-avtomatizaciya-biznesa-uzbekistan', label: 'Руководство по AI-автоматизации в Узбекистане' },
  ],
};

export default function IIAvtomatizaciyaPage() {
  return <MoneyLandingPage config={config} />;
}
