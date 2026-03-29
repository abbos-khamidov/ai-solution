import type { Metadata } from 'next';
import AIManagersContent from './content';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { DEFAULT_TWITTER_IMAGE, createAlternates } from '@/lib/seo';

const SITE_URL = 'https://aisolution.uz';
const SLUG = '/services/ai-managers';
const TITLE = 'Бот-менеджер для Telegram, WhatsApp, Instagram';
const DESC = 'Бот-менеджер — ИИ который отвечает клиентам в Telegram, WhatsApp и Instagram за 30 секунд 24/7. Квалификация лидов, интеграция CRM, рост конверсии ×3. Ташкент, Узбекистан.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    'бот менеджер Telegram Ташкент',
    'ИИ менеджер для бизнеса Узбекистан',
    'автоматический менеджер WhatsApp',
    'AI менеджер по продажам Ташкент',
    'автоматизация мессенджеров Узбекистан',
    'менеджер бот Instagram',
    'ответы клиентам автоматически',
    'квалификация лидов AI',
    'CRM интеграция Ташкент',
    'бот для продаж Узбекистан',
    'автоматизация бизнеса в Ташкенте',
    'ИИ менеджер продаж Ташкент',
    'внедрение ИИ в Узбекистане',
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
  { q: 'Сколько стоит бот-менеджер для Telegram и Instagram?', a: 'Запуск от $1 000 (базовый сценарий) + от $500/мес. С CRM и несколькими каналами — от $2 000 за запуск. Точная смета после бесплатного аудита.' },
  { q: 'За сколько времени отвечает бот-менеджер?', a: 'В среднем за 30 секунд в любое время суток. Работает 24/7 в Telegram, Instagram и при необходимости WhatsApp.' },
  { q: 'Как бот квалифицирует лидов?', a: 'Ведёт диалог, выясняет потребность и бюджет, присваивает статус Cold/Warm/Hot. Горячих передаёт менеджеру с контекстом.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function AIManagersPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Главная', url: '/' },
          { name: 'Услуги', url: '/services/' },
          { name: TITLE, url: `${SLUG}/` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AIManagersContent />
    </>
  );
}
