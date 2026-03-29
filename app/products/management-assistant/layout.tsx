import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { ProductJsonLd } from '@/components/seo/ProductJsonLd';
import { createAlternates } from '@/lib/seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aisolution.uz';

export const metadata: Metadata = {
  title: 'Management Assistant — AI-помощник для управления бизнесом | Ташкент',
  description: 'Management Assistant для Ташкента и Узбекистана: контроль KPI, задач и финансов в одном окне, решения быстрее каждый день. Узнать стоимость →',
  keywords: [
    'корпоративный AI ассистент Ташкент',
    'AI менеджер по продажам',
    'автоматизация клиентского сервиса СНГ',
    'внедрение ИИ в бизнес Ташкент',
    'AI для бизнеса Центральная Азия',
    'управление командой AI',
    'финансовый трекер AI Ташкент',
    'KPI дашборд Узбекистан',
    'management assistant bot',
    'biznes uchun AI Toshkent',
    'sun\'iy intellekt biznesga joriy etish',
  ],
  alternates: createAlternates(`${SITE_URL}/products/management-assistant`),
  openGraph: {
    title: 'Management Assistant — Контроль бизнеса в одном окне',
    description: 'AI-ассистент для собственника: контроль команды, финансовый трекер, KPI отчёты в Telegram. Автоматизация управления. От $3 000. Узбекистан.',
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['uz_UZ'],
    siteName: 'AI Solution',
    url: `${SITE_URL}/products/management-assistant`,
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Management Assistant — AI контроль бизнеса для собственника',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Management Assistant — AI контроль бизнеса',
    description: 'AI-помощник для собственника: команда, финансы, KPI, отчёты в Telegram. От $3 000.',
    images: [{
      url: '/og-image.png',
      alt: 'Management Assistant — AI для управления бизнесом в Узбекистане',
    }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Главная', url: '/' },
          { name: 'Продукты', url: '/products/' },
          { name: 'Management Assistant', url: '/products/management-assistant/' },
        ]}
      />
      <ProductJsonLd product="management-assistant" />
      {children}
    </>
  );
}
