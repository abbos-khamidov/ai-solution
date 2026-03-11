import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/whatsapp-bot-dlya-biznesa';
const TITLE = 'WhatsApp-бот для бизнеса в Узбекистане';
const DESCRIPTION =
  'WhatsApp-бот для бизнеса в Узбекистане: приём заявок 24/7, квалификация лидов, автоответы. Внедрение под ключ, цены, кейсы.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'whatsapp бот узбекистан, whatsapp бот для бизнеса ташкент, бот whatsapp бизнес узбекистан',
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${SLUG}`, type: 'website', locale: 'ru_RU', siteName: 'AI Solution', images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  robots: { index: true, follow: true },
};

const faqItems = [
  { q: 'Сколько стоит WhatsApp-бот для бизнеса в Узбекистане?', a: 'Запуск ИИ-бота для WhatsApp (часто в связке с Telegram и Instagram) — от $1 000 + от $500/мес. Стоимость зависит от сценария и интеграций. Точная смета после бесплатного аудита.' },
  { q: 'Нужен ли WhatsApp Business API?', a: 'Для автоматизации с ИИ используем WhatsApp Business API или совместимые решения. Помогаем с подключением и настройкой под вашего оператора и политики платформы.' },
  { q: 'Можно ли использовать один бот в Telegram и WhatsApp?', a: 'Да. Один ИИ ведёт диалоги в Telegram, Instagram и WhatsApp. Единая воронка, один контекст — без дублирования.' },
  { q: 'За сколько запускается?', a: 'Базовый сценарий в WhatsApp — 5–7 рабочих дней. С квалификацией и интеграцией с другими каналами — 2–3 недели.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function WhatsAppBotDlyaBiznesaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="min-h-screen bg-[#05050A] text-white pt-28 pb-16">
        <section className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-[#93C5FD] mb-3">WhatsApp-бот для бизнеса</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">WhatsApp-бот для бизнеса в Узбекистане</h1>
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg leading-relaxed">
              В Узбекистане WhatsApp — один из основных каналов общения с клиентами: заявки, вопросы, подтверждение заказов. Ручная обработка создаёт задержки и потери. WhatsApp-бот для бизнеса автоматизирует первый контакт: отвечает за 30 секунд, уточняет запрос, квалифицирует лидов и передаёт горячих менеджерам с контекстом. Работает 24/7 вместе с Telegram и Instagram при едином ИИ — без дублирования диалогов. Мы внедряем WhatsApp-ботов в Ташкенте и по всему Узбекистану.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full border border-[#3B82F6]/40 text-[#93C5FD]">Узбекистан</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">24/7</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Как WhatsApp-бот решает задачи бизнеса</h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            ИИ-бот в WhatsApp приветствует клиента, уточняет потребность (заказ, консультация, запись), отвечает на частые вопросы по ценам и срокам и при готовности к сделке передаёт диалог менеджеру с кратким контекстом. Один и тот же бот может работать в Telegram и Instagram — единая база диалогов, единая квалификация. Для компаний в Узбекистане настраиваем сценарии под вашу нишу и политики WhatsApp, при необходимости подключаем интеграции с CRM. В результате первый ответ в WhatsApp занимает до 30 секунд, заявки не теряются в нерабочее время, менеджеры получают только квалифицированные обращения.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Что получает бизнес после внедрения</h2>
          <ul className="space-y-3 text-[#94A3B8]">
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Ответ в WhatsApp за 30 секунд 24/7.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Квалификация лидов и передача горячих с контекстом.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Единая воронка с Telegram и Instagram при подключении.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Разгрузка менеджеров от рутинных первых контактов.</li>
          </ul>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Стоимость и сроки</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Запуск WhatsApp-бота (часто в связке с Telegram/Instagram) — от $1 000 + от $500/мес. Срок базового сценария — 5–7 рабочих дней, с интеграциями — 2–3 недели.
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
            <h2 className="text-2xl md:text-3xl font-bold">Получить бесплатный аудит</h2>
            <p className="mt-3 text-[#CFE2FF] max-w-3xl">Опишите каналы обращений — предложим сценарий бота для WhatsApp и других мессенджеров.</p>
            <Link href="/#contact" className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold">Обсудить проект</Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-4">Читайте также</h2>
          <ul className="space-y-2 text-[#94A3B8]">
            <li><Link href="/telegram-bot-dlya-biznesa" className="text-[#93C5FD] hover:underline">Telegram-бот для бизнеса</Link></li>
            <li><Link href="/ii-chatbot-tashkent" className="text-[#93C5FD] hover:underline">ИИ чатбот для бизнеса в Ташкенте</Link></li>
            <li><Link href="/services/ai-managers" className="text-[#93C5FD] hover:underline">Бот-менеджер для Telegram, WhatsApp, Instagram</Link></li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
