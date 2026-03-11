import type { Metadata } from 'next';
import AnalyticsContent from './content';
import { DEFAULT_TWITTER_IMAGE, createAlternates } from '@/lib/seo';

const SITE_URL = 'https://aisolution.uz';
const SLUG = '/services/analytics';
const TITLE = 'Аналитика для компаний и бизнес-дашборды';
const DESC = 'Аналитика для компаний в Ташкенте: AI-дашборды, KPI в реальном времени, бизнес-аналитика на основе ИИ. Интеграция с 1С, Bitrix24, Google Sheets. Узбекистан.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    'аналитика для компаний Ташкент',
    'бизнес аналитика Узбекистан',
    'AI аналитика Ташкент',
    'дашборд для бизнеса',
    'KPI отчёты в реальном времени',
    'аналитика продаж Ташкент',
    'бизнес отчёты AI',
    'Power BI Ташкент',
    'аналитика данных Узбекистан',
    'интеграция 1С аналитика',
    'AI аналитика Ташкент',
    'автоматизация бизнеса в Ташкенте',
    'внедрение ИИ Ташкент',
  ],
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${SITE_URL}${SLUG}`,
    type: 'website',
    locale: 'ru_RU',
    siteName: 'AI Solution',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: [{ url: DEFAULT_TWITTER_IMAGE }],
  },
  robots: { index: true, follow: true },
};

const faqItems = [
  { q: 'Что входит в AI-аналитику для компаний?', a: 'Дашборды KPI в реальном времени, отчёты по продажам и маркетингу, алерты при просадках, AI-рекомендации. Интеграция с 1С, Bitrix24, Google Sheets, рекламными кабинетами.' },
  { q: 'Сколько стоит внедрение дашбордов и аналитики?', a: 'От $1 900 за запуск с базовыми метриками. Сложные интеграции и кастомизация — по смете после аудита.' },
  { q: 'За сколько запускается дашборд?', a: 'Базовый дашборд — 2–3 недели. С несколькими источниками данных и алертами — 4–6 недель.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function AnalyticsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AnalyticsContent />
    </>
  );
}
