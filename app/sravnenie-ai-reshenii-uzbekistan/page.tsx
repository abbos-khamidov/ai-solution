import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/sravnenie-ai-reshenii-uzbekistan';
const TITLE = 'Сравнение AI-решений для бизнеса в Узбекистане';
const DESCRIPTION =
  'Сравнение AI-решений для бизнеса в Узбекистане: чатботы, бот-менеджер, корпоративный ИИ, аналитика. Что выбрать под ваши задачи, цены, кейсы.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'сравнение ai решений узбекистан, какой чатбот выбрать ташкент, ии для бизнеса сравнение узбекистан',
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${SLUG}`, type: 'website', locale: 'ru_RU', siteName: 'AI Solution', images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  robots: { index: true, follow: true },
};

const faqItems = [
  { q: 'Чем Customer Service Bot отличается от Management Assistant?', a: 'Customer Service Bot — это ИИ, который общается с клиентами в мессенджерах: отвечает на заявки, квалифицирует лидов, передаёт горячих менеджеру. Management Assistant — ИИ для руководителя: сводки по команде, KPI, финансы, отчёты в одном окне (часто в Telegram). Разные задачи: первый для продаж и поддержки, второй для управления.' },
  { q: 'Что выбрать малому бизнесу в Узбекистане?', a: 'Чаще всего начинают с бота для приёма заявок в одном канале (например Telegram): недорогой старт, быстрый результат. При росте потока подключают остальные каналы и CRM. Для руководства при необходимости добавляют Management Assistant или дашборды.' },
  { q: 'Сколько стоят разные AI-решения в Узбекистане?', a: 'Customer Service Bot — от $1 000 за запуск + от $500/мес. Management Assistant — от $3 000 + от $1 200/мес. Corporate AI (RAG) — от $8 000. AI-аналитика и дашборды — от $1 900. Точная смета под задачу — после бесплатного аудита.' },
  { q: 'Можно ли комбинировать несколько решений?', a: 'Да. Например: бот для клиентов (Customer Service) + дашборд для руководителя или Management Assistant. Интеграции позволяют видеть лиды и метрики в единой картине.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function SravnenieAiResheniiUzbekistanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="min-h-screen bg-[#05050A] text-white pt-28 pb-16">
        <section className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-[#93C5FD] mb-3">Сравнение AI-решений</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">Сравнение AI-решений для бизнеса в Узбекистане — что выбрать в 2026 году</h1>
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg leading-relaxed">
              Выбор AI-решения для бизнеса в Узбекистане зависит от задачи: приём заявок и продажи, управление и отчётность или корпоративная база знаний. Ниже — краткое сравнение продуктов AI Solution по целям, возможностям и ориентирам по стоимости, чтобы вы могли понять, что ближе вашей компании и с чего начать.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full border border-[#3B82F6]/40 text-[#93C5FD]">Узбекистан</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">Сравнение</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Customer Service Bot — для приёма заявок и продаж</h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            ИИ-бот в Telegram, Instagram и WhatsApp: отвечает клиентам за 30 секунд 24/7, квалифицирует лидов Cold/Warm/Hot и передаёт горячих менеджерам с контекстом. Подходит компаниям, у которых основной поток заявок идёт через мессенджеры и сайт. Ориентир: от $1 000 за запуск + от $500/мес. Подробнее — на странице <Link href="/products/customer-service" className="text-[#93C5FD] hover:underline">Customer Service Bot</Link>.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Management Assistant — для руководства и контроля</h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            ИИ-ассистент для руководителя: сводки по команде, KPI, финансовый трекер, еженедельные отчёты — часто в одном окне в Telegram. Подходит собственникам и топ-менеджерам, которые хотят видеть картину по бизнесу без ручной сводки от менеджеров. Ориентир: от $3 000 за запуск + от $1 200/мес. Подробнее — <Link href="/products/management-assistant" className="text-[#93C5FD] hover:underline">Management Assistant</Link>.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Corporate AI (RAG) — база знаний компании</h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            Корпоративная база знаний с ИИ: документы компании индексируются, сотрудники получают ответы из своей базы за секунды. По сути — свой ChatGPT на данных компании. Подходит организациям с большим объёмом внутренней документации и регламентов. Ориентир: от $8 000. Подробнее — <Link href="/products/corporate-ai" className="text-[#93C5FD] hover:underline">Corporate AI</Link>.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">AI-аналитика и дашборды</h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            Дашборды KPI в реальном времени, отчёты по продажам и маркетингу, алерты при просадках, AI-рекомендации. Интеграция с 1С, Bitrix24, рекламными кабинетами. Подходит тем, кому нужна единая картина по метрикам без ручного сбора. Ориентир: от $1 900 за запуск. Подробнее — <Link href="/products/ai-analytics" className="text-[#93C5FD] hover:underline">AI-аналитика</Link>.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Как выбрать под свою задачу</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Если главная боль — потеря заявок и долгий ответ клиенту: стартуйте с Customer Service Bot (или бота в одном канале). Если нужен контроль по команде и финансам — смотрите Management Assistant. Если сотрудники тратят часы на поиск по документам — Corporate AI. Если нужна аналитика и отчётность из разных систем — AI-аналитика. Часто комбинируют: бот для клиентов + дашборд или ассистент для руководителя. Мы проводим бесплатный аудит и предлагаем вариант под ваши цели и бюджет — можно оставить заявку на сайте или написать в Telegram @aisolution_uz.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Частые вопросы</h2>
          <div className="space-y-4">
            {faqItems.map(({ q, a }) => (
              <details key={q} className="group rounded-xl border border-white/10 bg-white/[0.02] open:bg-white/[0.04] transition-colors">
                <summary className="cursor-pointer p-5 text-[#F8FAFC] font-semibold list-none flex items-center justify-between gap-4">{q}<span className="shrink-0 text-[#64748B] group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
                <p className="px-5 pb-5 text-[#94A3B8] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <div className="rounded-2xl p-7 border border-[#3B82F6]/30 bg-[#3B82F6]/10">
            <h2 className="text-2xl md:text-3xl font-bold">Получить рекомендацию под вашу задачу</h2>
            <p className="mt-3 text-[#CFE2FF] max-w-3xl">Опишите цели и текущие процессы — предложим вариант решения и ориентир по стоимости.</p>
            <Link href="/#contact" className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold">Обсудить проект</Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-4">Читайте также</h2>
          <ul className="space-y-2 text-[#94A3B8]">
            <li><Link href="/ai-dlya-biznesa" className="text-[#93C5FD] hover:underline">AI для бизнеса в Ташкенте и Узбекистане</Link></li>
            <li><Link href="/tseny-na-chatboty-tashkent" className="text-[#93C5FD] hover:underline">Стоимость чатбота для бизнеса в Ташкенте</Link></li>
            <li><Link href="/blog/kak-vybrat-chatbot-dlya-biznesa" className="text-[#93C5FD] hover:underline">Как выбрать чатбот для бизнеса: полное руководство 2025</Link></li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
