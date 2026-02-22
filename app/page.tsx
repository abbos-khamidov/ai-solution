import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { FaqSchema } from '@/components/seo/FaqSchema';

const SITE_URL = 'https://aisolution.uz';

export const metadata: Metadata = {
  title: 'AI Solution — ИИ автоматизация бизнеса в Ташкенте | Боты, LLM, Аналитика',
  description:
    'AI Solution — ИИ автоматизация для бизнеса в Ташкенте и Узбекистане. Telegram-боты, LLM-решения, бот-менеджер, аналитика для компаний, личный ассистент ИИ. Отвечаем за 30 секунд 24/7. Бесплатный аудит.',
  keywords: [
    'автоматизация бизнеса Ташкент',
    'ИИ автоматизация Узбекистан',
    'боты Телеграмм для бизнеса Ташкент',
    'аналитика для компаний Узбекистан',
    'LLM для бизнеса',
    'бот менеджер Telegram',
    'личный ассистент ИИ',
    'AI автоматизация Ташкент',
    'искусственный интеллект для компаний Узбекистан',
    'автоматизация продаж Ташкент',
    'Telegram бот для бизнеса',
    'ИИ бот Самарканд Фергана Андижан',
    'автоматизация Ташкент вилоятлари',
    'chatbot Toshkent',
    "sun'iy intellekt biznes Toshkent",
    'AI чат-бот для бизнеса Узбекистан',
    'внедрение ИИ в бизнес Ташкент',
    'корпоративный AI ассистент Ташкент',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'AI Solution — ИИ автоматизация бизнеса | Ташкент, Узбекистан',
    description:
      'Telegram-боты, LLM, бот-менеджер, аналитика для компаний. Отвечаем за 30 секунд 24/7. Офис в Ташкенте, работаем по всему Узбекистану.',
    url: SITE_URL,
    type: 'website',
    locale: 'ru_RU',
    siteName: 'AI Solution',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Solution — ИИ автоматизация бизнеса | Ташкент',
    description: 'Telegram-боты, LLM, бот-менеджер, аналитика для компаний. Ответ за 30 сек 24/7.',
  },
};

const WeAreSection = dynamic(() =>
  import('@/components/sections/WeAreSection').then((m) => m.WeAreSection)
);
const ProblemSection = dynamic(() =>
  import('@/components/sections/ProblemSection').then((m) => m.ProblemSection)
);
const SolutionSection = dynamic(() =>
  import('@/components/sections/SolutionSection').then((m) => m.SolutionSection)
);
const ProductsSection = dynamic(() =>
  import('@/components/sections/ProductsSection').then((m) => m.ProductsSection)
);
const SimplePricingSection = dynamic(() =>
  import('@/components/sections/SimplePricingSection').then((m) => m.SimplePricingSection)
);
const ContactSection = dynamic(() =>
  import('@/components/sections/ContactSection').then((m) => m.ContactSection)
);
const Footer = dynamic(() =>
  import('@/components/layout/Footer').then((m) => m.Footer)
);

export default function HomePage() {
  return (
    <>
      <FaqSchema />
      <Header />
      <main>
        <Hero />
        <WeAreSection />
        <ProblemSection />
        <SolutionSection />
        <ProductsSection />
        <SimplePricingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
