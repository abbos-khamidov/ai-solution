import type { Metadata } from 'next';
import { ProductJsonLd } from '@/components/seo/ProductJsonLd';
import { createAlternates } from '@/lib/seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aisolution.uz';

export const metadata: Metadata = {
  title: 'Customer Service Bot — AI чат-бот для Telegram, Instagram, WhatsApp | Узбекистан',
  description: 'Customer Service Bot для Ташкента и Узбекистана: отвечает 24/7, ускоряет лиды до сделки и снижает нагрузку на команду. Узнать стоимость →',
  keywords: [
    'AI чат-бот для бизнеса Узбекистан',
    'автоответчик в Telegram Instagram WhatsApp',
    'квалификация лидов автоматически',
    'чат-бот для интернет-магазина Узбекистан',
    'AI ассистент для Instagram WhatsApp',
    'автоматизация продаж Telegram бот',
    'AI менеджер по продажам',
    'чат-бот для бизнеса Ташкент',
    'умный чат-бот для сайта',
    'customer service bot',
    'AI chatbot Toshkent',
    'mijozlarga avtomatik javob berish',
    'AI yordamchi Telegram Instagram',
  ],
  alternates: createAlternates(`${SITE_URL}/products/customer-service`),
  openGraph: {
    title: 'Customer Service Bot — AI отвечает клиентам за 30 секунд',
    description: 'AI чат-бот для Telegram, Instagram, WhatsApp. Квалификация лидов Cold/Warm/Hot, антифрод, работает 24/7. От $1 000. Бизнес Узбекистан.',
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['uz_UZ'],
    siteName: 'AI Solution',
    url: `${SITE_URL}/products/customer-service`,
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Customer Service Bot — AI чат-бот для Telegram, Instagram, WhatsApp',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Customer Service Bot — AI за 30 секунд',
    description: 'AI чат-бот для Telegram, Instagram, WhatsApp. Квалификация лидов, антифрод, 24/7. От $1 000.',
    images: [{
      url: '/og-image.png',
      alt: 'Customer Service Bot — AI чат-бот для бизнеса в Узбекистане',
    }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProductJsonLd product="customer-service" />
      {children}
    </>
  );
}
