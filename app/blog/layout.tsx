import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';
import { BlogBreadcrumbJsonLd } from '@/components/seo/BlogBreadcrumbJsonLd';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Блог AI Solution — AI и автоматизация бизнеса',
  description:
    'Экспертные статьи AI Solution по внедрению ИИ в бизнес в Ташкенте и Узбекистане: Telegram-боты, LLM, аналитика, автоматизация продаж.',
  keywords: [
    'автоматизация бизнеса Ташкент блог',
    'ИИ в Ташкенте статьи',
    'внедрение искусственного интеллекта Узбекистан',
    'автоматизация бизнеса в Узбекистане',
    'AI блог Ташкент',
    'Telegram бот руководство',
    'искусственный интеллект для бизнеса',
  ],
  alternates: createAlternates(`${SITE_URL}/blog`),
  openGraph: {
    title: 'Блог AI Solution — AI и автоматизация бизнеса',
    description:
      'Практические руководства по внедрению AI в бизнес: Telegram-боты, LLM, аналитика, автоматизация продаж.',
    url: `${SITE_URL}/blog`,
    type: 'website',
    locale: 'ru_RU',
    siteName: 'AI Solution',
    images: [{ url: DEFAULT_TWITTER_IMAGE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Блог AI Solution',
    description:
      'Практические материалы по AI-автоматизации бизнеса в Ташкенте и Узбекистане.',
    images: [{ url: DEFAULT_TWITTER_IMAGE }],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <BlogBreadcrumbJsonLd />
      {children}
      <Footer />
    </>
  );
}
