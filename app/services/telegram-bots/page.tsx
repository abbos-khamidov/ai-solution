import type { Metadata } from 'next';
import Link from 'next/link';
import TelegramBotsContent from './content';
import { buildCanonical, DEFAULT_TWITTER_IMAGE } from '@/lib/seo';

const SITE_URL = 'https://aisolution.uz';
const SLUG = '/services/telegram-bots';
const TITLE = 'Разработка Telegram ботов для бизнеса в Ташкенте';
const DESC = 'Создаём Telegram-боты для бизнеса в Ташкенте и Узбекистане: автоматизация продаж, поддержка клиентов 24/7, интеграция с CRM, приём платежей. От $1 500. Бесплатный аудит.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    'Telegram бот для бизнеса Ташкент',
    'разработка Telegram бота Узбекистан',
    'боты Телеграмм Ташкент',
    'Telegram бот для продаж',
    'автоматизация Telegram Ташкент',
    'создать бота Telegram Узбекистан',
    'Telegram bot Toshkent',
    'телеграм бот для магазина',
    'бот для WhatsApp Ташкент',
    'автоответчик Telegram',
    'автоматизация бизнеса Ташкент',
    'Telegram бот Ташкент',
    'внедрение искусственного интеллекта Узбекистан',
  ],
  alternates: {
    canonical: buildCanonical('/telegram-bot-dlya-biznesa/'),
    languages: { ru: buildCanonical('/telegram-bot-dlya-biznesa/'), uz: buildCanonical('/telegram-bot-dlya-biznesa/'), en: buildCanonical('/telegram-bot-dlya-biznesa/'), 'x-default': buildCanonical('/telegram-bot-dlya-biznesa/') },
  },
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
  { q: 'Сколько стоит разработка Telegram-бота для бизнеса в Ташкенте?', a: 'Простой бот для приёма заявок — от $1 500, ИИ-бот с квалификацией лидов — от $2 500. Поддержка от $300/мес. Точная оценка после бесплатного аудита.' },
  { q: 'За сколько запускается Telegram-бот?', a: 'Базовый сценарий — 1–2 недели. Бот с ИИ и интеграциями — 2–4 недели.' },
  { q: 'Можно ли подключить бота к CRM?', a: 'Да. Интегрируем с Bitrix24, amoCRM, 1С и другими системами.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function TelegramBotsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <TelegramBotsContent />
      <section className="bg-gray-50 py-10 px-4 md:px-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Подробнее по теме</h2>
          <p>
            <Link href="/telegram-bot-dlya-biznesa" className="text-blue-600 hover:underline font-medium">
              Telegram-бот для бизнеса в Ташкенте — полное руководство с кейсами и ценами →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
