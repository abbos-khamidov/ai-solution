import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { FaqSchema } from '@/components/seo/FaqSchema';
import { RoiCalculator } from '@/components/sections/RoiCalculator';
import { HomePageExtras } from '@/components/home/HomePageExtras';

const SITE_URL = 'https://aisolution.uz';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ '@type': 'ListItem', position: 1, name: 'AI Solution', item: SITE_URL }],
};

export const metadata: Metadata = {
  title: 'Автоматизация бизнеса в Ташкенте — внедрение искусственного интеллекта',
  description:
    'Внедряем AI-автоматизацию в Ташкенте и Узбекистане: больше заявок, ответ клиенту за 30 секунд, меньше рутины. Бесплатная консультация →',
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
    canonical: 'https://aisolution.uz/',
    languages: {
      ru: 'https://aisolution.uz/',
      'x-default': 'https://aisolution.uz/',
    },
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
const MarketBenchmarkSection = dynamic(() =>
  import('@/components/sections/MarketBenchmarkSection').then((m) => m.MarketBenchmarkSection)
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
      <main className="pt-0">
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <SocialProofSection />
        <ProductsSection />
        <MarketBenchmarkSection />
        <RoiCalculator />
        <SimplePricingSection />
        <ContactSection />
        <HomePageExtras />
      </main>
      <Footer />
    </>
  );
}
