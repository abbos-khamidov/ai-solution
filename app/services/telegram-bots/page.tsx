import type { Metadata } from 'next';
import TelegramBotsContent from './content';
import { DEFAULT_TWITTER_IMAGE, createAlternates } from '@/lib/seo';

const SITE_URL = 'https://aisolution.uz';
const SLUG = '/services/telegram-bots';
const TITLE = 'Разработка Telegram ботов для бизнеса в Ташкенте | AI Solution';
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

export default function TelegramBotsPage() {
  return <TelegramBotsContent />;
}
