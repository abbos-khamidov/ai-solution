import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { FaqSchema } from '@/components/seo/FaqSchema';

const SITE_URL = 'https://aisolution.uz';

export const metadata: Metadata = {
  title: 'Автоматизация бизнеса в Ташкенте — внедрение искусственного интеллекта | AI Solution',
  description:
    'Автоматизация бизнеса в Ташкенте и Узбекистане. Внедрение искусственного интеллекта: Telegram-боты, бот-менеджер, AI-аналитика, личный ассистент ИИ. Ответ клиентам за 30 секунд 24/7. Бесплатный аудит.',
  keywords: [
    'автоматизация бизнеса в Ташкенте',
    'автоматизация бизнеса Ташкент',
    'ИИ в Ташкенте',
    'внедрение искусственного интеллекта в Ташкенте',
    'внедрение искусственного интеллекта Узбекистан',
    'внедрение ИИ в Узбекистане',
    'автоматизация бизнеса в Узбекистане',
    'AI автоматизация Ташкент',
    'искусственный интеллект для бизнеса Ташкент',
    'автоматизация продаж Ташкент',
    'Telegram бот для бизнеса Ташкент',
    'бот менеджер Ташкент',
    'AI аналитика для компаний Узбекистан',
    'корпоративный AI ассистент Ташкент',
    'внедрение ИИ в бизнес Ташкент',
    'ИИ бот Самарканд Фергана Андижан',
    "sun'iy intellekt Toshkent",
    'Toshkentda biznes avtomatlashtirish',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Автоматизация бизнеса в Ташкенте — внедрение ИИ в Узбекистане',
    description:
      'Внедрение искусственного интеллекта в Ташкенте. Автоматизация бизнеса: Telegram-боты, бот-менеджер, аналитика. Ответ за 30 сек 24/7.',
    url: SITE_URL,
    type: 'website',
    locale: 'ru_RU',
    siteName: 'AI Solution',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Автоматизация бизнеса в Ташкенте — ИИ для компаний Узбекистана',
    description: 'Внедрение искусственного интеллекта в Ташкенте и Узбекистане. Автоматизация, Telegram-боты, аналитика.',
    images: [{ url: '/og-image.png' }],
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
        <section className="bg-[#05050A] px-4 md:px-6 py-6">
          <div className="max-w-6xl mx-auto rounded-2xl p-6 md:p-8 border border-[#3B82F6]/30 bg-[#3B82F6]/10">
            <p className="text-xl md:text-2xl font-bold text-white">
              Хотите понять, где бизнес теряет деньги? Получите AI-аудит.
            </p>
            <Link
              href="/ai-dlya-biznesa"
              className="mt-4 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold"
            >
              Перейти к AI-аудиту
            </Link>
          </div>
        </section>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
