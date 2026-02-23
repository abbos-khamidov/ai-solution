import type { Metadata } from 'next';
import { ProductJsonLd } from '@/components/seo/ProductJsonLd';
import { createAlternates } from '@/lib/seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aisolution.uz';

export const metadata: Metadata = {
  title: 'Corporate AI (RAG) — Корпоративная база знаний с AI | Ташкент',
  description: 'Корпоративный AI-ассистент на базе RAG: база знаний компании, интеграция с 1С/Bitrix24/amoCRM, on-premise. Создать ChatGPT для своей компании. От $8 000. Ташкент, Узбекистан.',
  keywords: [
    'создать ChatGPT для своей компании',
    'корпоративный AI ассистент Ташкент',
    'внедрение искусственного интеллекта Узбекистан',
    'создать ИИ бот для компании',
    'AI для бизнеса Центральная Азия',
    'корпоративная база знаний AI',
    'RAG система Узбекистан',
    'интеграция 1С AI Ташкент',
    'Bitrix24 AI интеграция',
    'on-premise AI система',
    'corporate AI RAG Toshkent',
    'Toshkentda AI joriy etish',
    'sun\'iy intellekt biznesga',
  ],
  alternates: createAlternates(`${SITE_URL}/products/corporate-ai`),
  openGraph: {
    title: 'Corporate AI (RAG) — Своя база знаний компании с AI | AI Solution',
    description: 'Корпоративный AI на базе RAG. Отвечает только по вашим документам. Интеграция с 1С, Bitrix24, amoCRM. On-premise. От $8 000. Ташкент.',
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['uz_UZ'],
    siteName: 'AI Solution',
    url: `${SITE_URL}/products/corporate-ai`,
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Corporate AI (RAG) — корпоративная база знаний с AI для бизнеса',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corporate AI (RAG) — AI база знаний компании | AI Solution',
    description: 'Корпоративный AI: база знаний, интеграция с 1С/Bitrix24/amoCRM, on-premise. От $8 000.',
    images: [{
      url: '/og-image.png',
      alt: 'Corporate AI RAG — корпоративный AI ассистент в Узбекистане',
    }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProductJsonLd product="corporate-ai" />
      {children}
    </>
  );
}
