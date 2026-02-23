import type { Metadata } from 'next';
import AnalyticsContent from './content';
import { DEFAULT_TWITTER_IMAGE, createAlternates } from '@/lib/seo';

const SITE_URL = 'https://aisolution.uz';
const SLUG = '/services/analytics';
const TITLE = 'Аналитика для компаний и бизнес-дашборды | AI Solution Ташкент';
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

export default function AnalyticsPage() {
  return <AnalyticsContent />;
}
