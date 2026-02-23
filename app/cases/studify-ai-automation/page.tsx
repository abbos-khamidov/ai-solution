import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/cases/studify-ai-automation';
const TITLE = 'Кейс Studify: AI-автоматизация лидов в Ташкенте | AI Solution';
const DESCRIPTION =
  'Кейс Studify.uz: внедрение AI-автоматизации лидов и управленческой аналитики в Ташкенте. Сокращение времени ответа и рост качества квалификации.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['кейс studify ai', 'автоматизация лидов ташкент', 'ai внедрение ташкент'],
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${SLUG}`,
    type: 'article',
    locale: 'ru_RU',
    alternateLocale: ['uz_UZ'],
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

const caseStudySchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Кейс Studify: AI-автоматизация лидов в Ташкенте',
  description: DESCRIPTION,
  author: { '@type': 'Organization', name: 'AI Solution' },
  publisher: { '@id': `${SITE_URL}/#organization` },
  datePublished: '2026-02-24',
  dateModified: '2026-02-24',
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
};

export default function StudifyCasePage() {
  return (
    <main className="min-h-screen bg-[#05050A] text-white pt-28 pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />

      <section className="max-w-5xl mx-auto px-4 md:px-6">
        <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Главная</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/tashkent" className="hover:text-white transition-colors">Ташкент</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#F8FAFC]">Кейс Studify</span>
        </nav>

        <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
          <p className="text-sm text-[#93C5FD] mb-3">Кейс внедрения AI</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Studify.uz: AI-автоматизация лидов и управленческой аналитики
          </h1>
          <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg">
            Внедрили AI-контур для первичных диалогов, квалификации лидов и ежедневных управленческих
            сводок. Цель — сократить потери заявок и ускорить реакцию команды.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-sm text-[#93C5FD]">Цель</p>
            <p className="mt-2 text-[#CBD5E1]">Ускорить первичный ответ и повысить качество квалификации лидов.</p>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-sm text-[#93C5FD]">Решение</p>
            <p className="mt-2 text-[#CBD5E1]">AI-бот в Telegram/Instagram + сводки KPI для руководителя.</p>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-sm text-[#93C5FD]">Результат</p>
            <p className="mt-2 text-[#CBD5E1]">Быстрый ответ и более прозрачная воронка с ежедневным контролем.</p>
          </article>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-6 mt-12">
        <div className="rounded-2xl p-7 border border-[#3B82F6]/30 bg-[#3B82F6]/10">
          <h2 className="text-2xl md:text-3xl font-bold">Хотите похожее внедрение?</h2>
          <p className="mt-3 text-[#CFE2FF] max-w-3xl">
            Получите аудит вашей воронки и план запуска AI-автоматизации под KPI вашего бизнеса.
          </p>
          <Link
            href="/ai-dlya-biznesa#audit"
            className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold"
          >
            Получить аудит
          </Link>
        </div>
      </section>
    </main>
  );
}
