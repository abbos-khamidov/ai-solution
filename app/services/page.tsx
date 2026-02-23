import type { Metadata } from 'next';
import Link from 'next/link';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';
const SLUG = '/services';
const TITLE = 'Автоматизация бизнеса в Ташкенте — услуги внедрения ИИ | AI Solution';
const DESCRIPTION =
  'Внедрение искусственного интеллекта в Ташкенте и Узбекистане: автоматизация бизнеса, Telegram-боты, AI-менеджеры, аналитика, личный ассистент ИИ. Работаем по всему Узбекистану.';

const serviceLinks = [
  { href: '/services/telegram-bots', title: 'Telegram Bots' },
  { href: '/services/ai-managers', title: 'AI Managers' },
  { href: '/services/ai-assistant', title: 'AI Assistant' },
  { href: '/services/analytics', title: 'Analytics' },
  { href: '/services/software-development', title: 'Software Development' },
];

const productLinks = [
  { href: '/products/customer-service', title: 'Customer Service AI' },
  { href: '/products/management-assistant', title: 'Management Assistant' },
  { href: '/products/corporate-ai', title: 'Corporate AI' },
];

const moneyQueryLinks = [
  { href: '/ai-bot-tashkent', title: 'ИИ бот в Ташкенте' },
  { href: '/ii-avtomatizaciya', title: 'ИИ автоматизация бизнеса' },
  { href: '/ii-avtomatizaciya-uzbekistan', title: 'ИИ автоматизация в Узбекистане' },
  { href: '/ai-agent-dlya-biznesa-tashkent', title: 'AI агент для бизнеса в Ташкенте' },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'автоматизация бизнеса в Ташкенте',
    'внедрение искусственного интеллекта Ташкент',
    'ИИ в Ташкенте',
    'автоматизация бизнеса Узбекистан',
    'внедрение ИИ в Узбекистане',
    'AI услуги Ташкент',
    'Telegram боты Ташкент',
    'искусственный интеллект для бизнеса Ташкент',
  ],
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${SLUG}`,
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['uz_UZ'],
    siteName: 'AI Solution',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: DEFAULT_TWITTER_IMAGE }],
  },
  robots: { index: true, follow: true },
};

export default function ServicesIndexPage() {
  return (
    <main className="min-h-screen bg-[#05050A] pt-28 pb-16 text-white">
      <section className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Services</h1>
        <p className="mt-3 text-[#94A3B8] max-w-2xl">
          AI Solution оказывает услуги в Ташкенте и по всему Узбекистану. Выберите направление:
          от Telegram-ботов и AI-менеджеров до аналитики и разработки ПО.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Service Pages</h2>
            <ul className="mt-4 space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#93C5FD] hover:text-white transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Product Pages</h2>
            <ul className="mt-4 space-y-3">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#93C5FD] hover:text-white transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold">Популярные запросы</h2>
          <p className="mt-2 text-sm text-[#94A3B8]">
            Подборки страниц под ключевые запросы по AI и автоматизации в Ташкенте и Узбекистане.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {moneyQueryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-[#93C5FD] hover:text-white transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
