import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { ClientLogos } from '@/components/sections/ClientLogos';
import { FaqSchema } from '@/components/seo/FaqSchema';
import { RoiCalculator } from '@/components/sections/RoiCalculator';

const SITE_URL = 'https://aisolution.uz';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ '@type': 'ListItem', position: 1, name: 'AI Solution', item: SITE_URL }],
};

export const metadata: Metadata = {
  title: 'Автоматизация бизнеса в Ташкенте — внедрение искусственного интеллекта',
  description:
    'AI Solution (aisolution.uz) — автоматизация бизнеса в Ташкенте и Узбекистане. Внедрение искусственного интеллекта: Telegram-боты, бот-менеджер, AI-аналитика, личный ассистент ИИ. Ответ клиентам за 30 секунд 24/7. Бесплатный аудит.',
  keywords: [
    // Brand variations
    'aisolution',
    'ai solution',
    'ai-solution',
    'aisolution.uz',
    'AI Solution Uzbekistan',
    'AI Solution Tashkent',
    'аисолюшн',
    'ай солюшн',
    'ai solutions',
    'solution ai',
    'aisolution uz',
    'ai solutions uz',
    // Core keywords
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

const ProblemSection = dynamic(() =>
  import('@/components/sections/ProblemSection').then((m) => m.ProblemSection)
);
const SolutionSection = dynamic(() =>
  import('@/components/sections/SolutionSection').then((m) => m.SolutionSection)
);
const ProductsSection = dynamic(() =>
  import('@/components/sections/ProductsSection').then((m) => m.ProductsSection)
);
const SocialProofSection = dynamic(() =>
  import('@/components/sections/SocialProofSection').then((m) => m.SocialProofSection)
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FaqSchema />
      <Header />
      <main>
        <Hero />
        <ClientLogos />
        <ProblemSection />
        <SolutionSection />
        <ProductsSection />
        <SocialProofSection />
        <SimplePricingSection />
        <RoiCalculator />
        <ContactSection />
        <section className="bg-[#05050A] px-4 md:px-6 py-6">
          <div className="max-w-6xl mx-auto rounded-2xl p-5 md:p-6 border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-lg font-semibold text-[#F8FAFC] text-center sm:text-left">
              Следите за нами в Telegram — кейсы, обзоры ИИ и автоматизации
            </p>
            <a
              href="https://t.me/aisolution_uz"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0088CC] hover:bg-[#0077B5] text-white font-semibold transition-colors"
            >
              Перейти в канал
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
