import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { DEFAULT_TWITTER_IMAGE, SITE_URL } from '@/lib/seo';

const SLUG = '/cases';
const TITLE = 'Кейсы внедрения ИИ — Реальные результаты клиентов | AI Solution';
const DESCRIPTION =
  'Реальные кейсы автоматизации бизнеса с помощью ИИ: рост продаж, снижение нагрузки на операторов, автоматическая квалификация лидов. Цифры и скриншоты.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['кейсы AI Solution', 'внедрение AI Ташкент', 'кейс telegram бот бизнес', 'автоматизация лидов узбекистан'],
  alternates: { canonical: 'https://aisolution.uz/cases/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${SLUG}/`,
    type: 'website',
    locale: 'ru_RU',
    siteName: 'AI Solution',
    images: [{ url: DEFAULT_TWITTER_IMAGE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: DEFAULT_TWITTER_IMAGE }],
  },
  robots: { index: true, follow: true },
};

const cases = [
  {
    href: '/cases/marsit-lead-automation',
    company: 'MarsIT',
    tag: 'B2B · IT',
    title: 'AI-бот для квалификации лидов',
    teaser: 'Ответ с 4 часов до 30 секунд, рост конверсии в сделку.',
  },
  {
    href: '/cases/studify-ai-automation',
    company: 'Studify',
    tag: 'EdTech',
    title: 'AI-автоматизация лидов и отчётность',
    teaser: 'Мгновенные ответы ученикам и прозрачная воронка для руководства.',
  },
];

export default function CasesIndexPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Главная', url: '/' },
          { name: 'Кейсы', url: '/cases/' },
        ]}
      />
      <Header />
      <main className="min-h-screen bg-background text-foreground pb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">
              Главная
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">Кейсы</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Кейсы внедрения AI
          </h1>
          <p className="text-lg text-[#94A3B8] max-w-2xl mb-12">
            Подборка проектов AI Solution: как компании в Ташкенте и Узбекистане сокращают время ответа,
            квалифицируют лиды и увеличивают конверсию.
          </p>

          <ul className="space-y-4">
            {cases.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 hover:border-[#3B82F6]/40 hover:bg-white/[0.04] transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#3B82F6]/10 text-[#93C5FD] border border-[#3B82F6]/20">
                          {c.company}
                        </span>
                        <span className="text-xs text-[#64748B]">{c.tag}</span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-[#93C5FD] transition-colors">
                        {c.title}
                      </h2>
                      <p className="mt-2 text-[#94A3B8]">{c.teaser}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] shrink-0">
                      Читать кейс
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-2xl border border-[#3B82F6]/20 bg-[#3B82F6]/5 p-6 md:p-8 text-center">
            <p className="text-[#94A3B8] mb-4">Хотите похожий результат в вашей компании?</p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold text-sm hover:opacity-95 transition-opacity"
            >
              Получить бесплатный аудит
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
