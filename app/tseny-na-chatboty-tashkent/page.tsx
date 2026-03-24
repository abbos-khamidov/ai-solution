import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LandingHeroImage } from '@/components/shared/LandingHeroImage';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/tseny-na-chatboty-tashkent';
const TITLE = 'Стоимость чатбота для бизнеса в Ташкенте';
const DESCRIPTION =
  'Цены на чатбот для бизнеса в Ташкенте: от $1 000 запуск, от $500/мес. Что входит, сроки, кейсы. Бесплатный аудит и смета.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    'стоимость чатбота ташкент, цены на чатбот для бизнеса, сколько стоит чатбот узбекистан, цена ии бот ташкент',
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${SLUG}`,
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

const faqItems = [
  {
    q: 'Сколько стоит внедрить чатбот для бизнеса в Ташкенте?',
    a: 'Запуск ИИ-чатбота — от $1 000 (разработка, настройка сценария, один-два канала). Абонентское обслуживание — от $500/мес. При интеграции с CRM, обучении на большой базе FAQ или нескольких каналах стоимость уточняется после аудита.',
  },
  {
    q: 'Что входит в стоимость запуска?',
    a: 'Обычно: сценарий диалога под ваш продукт, настройка квалификации лидов, подключение Telegram и/или Instagram, базовое обучение на FAQ, тестирование и запуск. При необходимости — интеграция с CRM и уведомления для менеджеров.',
  },
  {
    q: 'Есть ли скрытые платежи?',
    a: 'Нет. Стоимость запуска и абонента оговариваются до старта. Дополнительные каналы (например, WhatsApp), сложные интеграции или большой объём дообучения оцениваются отдельно по запросу.',
  },
  {
    q: 'Можно ли начать с минимального бюджета?',
    a: 'Да. Можно запустить простой сценарий приёма заявок в одном канале (например, только Telegram) и расширять функционал по мере результата. Минимальный старт — от $1 000 за запуск.',
  },
  {
    q: 'Как получить точную смету?',
    a: 'Оставьте заявку на сайте или напишите в Telegram @aisolution_uz. Мы проведём бесплатный 60-минутный аудит: разберём задачи, каналы и объём работы и предложим смету и сроки.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function TsenyNaChatbotyTashkentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="min-h-screen bg-background text-foreground pb-16">
        <section className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-[#93C5FD] mb-3">Цены на чатбот для бизнеса в Ташкенте</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Цены на AI-ботов в Ташкенте — тарифы от $150/мес, внедрение от $390
            </h1>
            <LandingHeroImage
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
              alt="Цены на AI-ботов и чат-боты в Ташкенте — тарифы и стоимость внедрения"
              title="Стоимость разработки и внедрения AI-ботов для бизнеса в Ташкенте"
            />
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg leading-relaxed">
              Решение внедрить чатбот часто упирается в вопрос бюджета: сколько стоит разработка, что входит в поддержку
              и когда окупится. В Ташкенте и Узбекистане мы предлагаем прозрачную модель: фиксированный старт за
              запуск и ежемесячное обслуживание без скрытых платежей. Запуск ИИ-чатбота для бизнеса — от $1 000,
              абонент — от $500/мес. В эту стоимость входит настройка сценария, подключение каналов (Telegram,
              Instagram, при необходимости WhatsApp), квалификация лидов и передача горячих менеджерам. Ниже — детали
              по тарифам, срокам и тому, как получить точную смету под вашу задачу.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full border border-[#3B82F6]/40 text-[#93C5FD]">Ташкент</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">Прозрачные цены</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Из чего складывается стоимость чатбота
          </h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            Стоимость внедрения чатбота для бизнеса в Ташкенте зависит от трёх факторов: сложности сценария (простой
            приём заявок или полноценная квалификация с ИИ), количества каналов (Telegram, Instagram, WhatsApp) и
            интеграций (CRM, уведомления, дашборды). Базовый пакет включает сценарий под ваш продукт, обучение на
            типовых вопросах, подключение одного-двух каналов и передачу лидов менеджерам. Расширенный — ИИ-квалификацию,
            интеграцию с CRM, отчёты для руководителя. Абонентское обслуживание покрывает обновления сценария,
            дообучение на новых вопросах, мониторинг и техническую поддержку. Таким образом, вы платите за результат
            и масштаб, а не за «часы разработки» с неочевидным итогом.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ориентиры по ценам и срокам
          </h2>
          <ul className="space-y-3 text-[#94A3B8]">
            <li className="flex gap-2">
              <span className="text-[#3B82F6]">•</span>
              Запуск базового чатбота (один канал, приём заявок) — от $1 000, срок 5–7 рабочих дней.
            </li>
            <li className="flex gap-2">
              <span className="text-[#3B82F6]">•</span>
              ИИ-чатбот с квалификацией лидов, 2 канала — от $1 500 за запуск, 2–3 недели.
            </li>
            <li className="flex gap-2">
              <span className="text-[#3B82F6]">•</span>
              С интеграцией CRM и отчётами — от $2 000 за запуск, срок по согласованию.
            </li>
            <li className="flex gap-2">
              <span className="text-[#3B82F6]">•</span>
              Абонент: от $500/мес (базовый), от $700/мес при интеграциях и расширенной поддержке.
            </li>
          </ul>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Пример: во что обходится типовой проект</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Образовательная платформа и IT-компания в Ташкенте запустили ИИ-чатбота для приёма и квалификации лидов
            в Telegram (и при необходимости в других каналах). В обоих случаях бюджет уложился в рамки от $1 000 за
            запуск и от $500/мес на поддержку. В результате время первого ответа сократилось до 30 секунд, доля
            горячих заявок выросла. Подробнее — в кейсах{' '}
            <Link href="/cases/studify-ai-automation" className="text-[#93C5FD] hover:underline">Studify.uz</Link>
            {' '}и{' '}
            <Link href="/cases/marsit-lead-automation" className="text-[#93C5FD] hover:underline">Marsit.uz</Link>.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Частые вопросы</h2>
          <div className="space-y-4">
            {faqItems.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-xl border border-white/10 bg-white/[0.02] open:bg-white/[0.04] transition-colors"
              >
                <summary className="cursor-pointer p-5 text-foreground font-semibold list-none flex items-center justify-between gap-4">
                  {q}
                  <span className="shrink-0 text-[#64748B] group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="px-5 pb-5 text-[#94A3B8] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <div className="rounded-2xl p-7 border border-[#3B82F6]/30 bg-[#3B82F6]/10">
            <h2 className="text-2xl md:text-3xl font-bold">Получить бесплатный аудит и смету</h2>
            <p className="mt-3 text-[#CFE2FF] max-w-3xl">
              Опишите задачу и каналы — мы предложим вариант чатбота и точную смету под ваш бюджет.
            </p>
            <Link
              href="/#contact"
              className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold"
            >
              Обсудить проект
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-xl font-bold text-foreground mb-4">Читайте также</h2>
          <ul className="space-y-2 text-[#94A3B8]">
            <li>
              <Link href="/ii-chatbot-tashkent" className="text-[#93C5FD] hover:underline">ИИ чатбот для бизнеса в Ташкенте</Link>
            </li>
            <li>
              <Link href="/tashkent" className="text-[#93C5FD] hover:underline">Автоматизация бизнеса в Ташкенте</Link>
            </li>
            <li>
              <Link href="/services/ai-managers" className="text-[#93C5FD] hover:underline">Бот-менеджер для Telegram, WhatsApp, Instagram</Link>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
