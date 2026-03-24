import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/cases/marsit-lead-automation';
const TITLE = 'Кейс MarsIT: AI-бот для квалификации лидов — с 4 часов до 30 секунд';
const DESCRIPTION =
  'Кейс MarsIT (IT-компания, Ташкент): внедрение AI-бота в Telegram. Время первого ответа сократилось с 4 часов до 30 секунд, конверсия лидов в сделку выросла на 35%.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['кейс marsit ai', 'автоматизация продаж ташкент', 'квалификация лидов ai', 'telegram бот для b2b'],
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
  headline: TITLE,
  description: DESCRIPTION,
  author: { '@type': 'Organization', name: 'AI Solution' },
  publisher: { '@id': `${SITE_URL}/#organization` },
  datePublished: '2026-02-24',
  dateModified: '2026-03-15',
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
};

const faqItems = [
  { q: 'Какой результат получил MarsIT после внедрения AI?', a: 'Время первого ответа клиенту сократилось с 4 часов до 30 секунд. Конверсия лидов в сделку выросла на 35%. Менеджеры теперь работают только с горячими, уже квалифицированными лидами.' },
  { q: 'Как работает квалификация лидов в кейсе MarsIT?', a: 'AI-бот в Telegram ведёт диалог, выясняет потребность, бюджет и готовность к сделке за 30 секунд. Горячих лидов передаёт менеджеру с кратким контекстом. Холодных греет автоматически через серию сообщений.' },
  { q: 'Сколько длилось внедрение?', a: 'Полный цикл внедрения — от аудита до запуска боta в продакшн — занял 2 недели. Включая настройку сценариев, интеграцию с Telegram и тестирование.' },
  { q: 'Сколько стоит похожее внедрение для B2B?', a: 'Зависит от каналов и интеграций. Ориентир: от $1 000 за запуск бота + от $500/мес. Точная смета после бесплатного 60-минутного аудита.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

const results = [
  { label: 'Время первого ответа', before: '4 часа', after: '30 секунд', color: '#3B82F6' },
  { label: 'Конверсия в сделку', before: 'базовый', after: '+35%', color: '#06B6D4' },
  { label: 'Пропущенные заявки ночью', before: 'регулярно', after: '0', color: '#34D399' },
];

export default function MarsitCasePage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumb */}
      <section className="max-w-5xl mx-auto px-4 md:px-6">
        <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Главная</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/cases" className="hover:text-foreground transition-colors">Кейсы</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground">MarsIT</span>
        </nav>

        {/* Hero */}
        <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#3B82F6]/10 text-[#93C5FD] border border-[#3B82F6]/20">
              Кейс внедрения AI
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/20">
              В работе
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            MarsIT: с&nbsp;4&nbsp;часов до&nbsp;30&nbsp;секунд
          </h1>
          <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg">
            IT-компания в Ташкенте теряла горячих лидов — менеджеры тратили 3–4 часа на обработку каждой
            заявки, а нецелевые обращения съедали всё рабочее время. Мы внедрили AI-бот в Telegram,
            который квалифицирует лид за 30 секунд и сам решает, что с ним делать дальше.
          </p>
        </div>
      </section>

      {/* Параметры кейса */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Клиент', value: 'MarsIT' },
            { label: 'Ниша', value: 'IT-компания, B2B' },
            { label: 'Канал', value: 'Telegram-бот' },
            { label: 'Срок внедрения', value: '2 недели' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-xs text-[#64748B] mb-1">{item.label}</p>
              <p className="text-sm font-semibold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Проблема */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 mt-10">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 md:p-9">
          <h2 className="text-xl font-bold text-foreground mb-4">Задача</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Входящие заявки в MarsIT обрабатывались вручную — менеджеры отвечали через 3–4 часа.
            За это время горячий лид остывал или уходил к конкурентам. Плюс значительная часть
            обращений оказывалась нецелевой: студенты, фрилансеры, нерелевантные запросы.
            Менеджеры тратили время на отсев вместо закрытия сделок.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: '⏱️', text: 'Ответ через 3–4 часа — лид уже остыл' },
              { icon: '🗑️', text: 'Нецелевые лиды занимали время менеджеров' },
              { icon: '🌙', text: 'Ночью и в выходные заявки терялись' },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.015] p-4">
                <span className="text-xl">{item.icon}</span>
                <p className="text-sm text-[#94A3B8]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Решение */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 mt-6">
        <div className="rounded-2xl border border-[#3B82F6]/20 bg-[#3B82F6]/5 p-7 md:p-9">
          <h2 className="text-xl font-bold text-foreground mb-4">Решение</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Разработали AI-бот в Telegram с трёхуровневой квалификацией лидов (Cold / Warm / Hot).
            Бот ведёт диалог, выясняет потребность и бюджет клиента, присваивает статус и действует
            по сценарию: горячих — немедленно передаёт менеджеру с контекстом диалога,
            холодных — греет автоматически через серию сообщений.
          </p>
          <div className="mt-6 space-y-3">
            {[
              { step: '01', text: 'Бот встречает клиента и задаёт квалификационные вопросы' },
              { step: '02', text: 'За 30 секунд определяет статус: Cold / Warm / Hot' },
              { step: '03', text: 'Hot-лид → уведомление менеджеру с контекстом диалога' },
              { step: '04', text: 'Cold/Warm-лид → автоматический nurturing-сценарий' },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-4 rounded-xl border border-[#3B82F6]/15 bg-white/[0.02] p-4">
                <span className="shrink-0 w-8 h-8 rounded-lg bg-[#3B82F6]/20 flex items-center justify-center text-xs font-bold text-[#93C5FD]">
                  {item.step}
                </span>
                <p className="text-sm text-[#CBD5E1]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Результаты */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 mt-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Результаты</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.map((r) => (
            <div
              key={r.label}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center"
            >
              <p className="text-xs text-[#64748B] mb-3">{r.label}</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-sm text-[#64748B] line-through">{r.before}</span>
                <span className="text-2xl font-bold" style={{ color: r.color }}>{r.after}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-[#94A3B8] text-sm leading-relaxed">
            Менеджеры MarsIT теперь работают только с горячими, уже подготовленными лидами.
            Время на квалификацию ушло к нулю — его забрал бот. Конверсия в сделку выросла
            на&nbsp;35% за первые 6 недель после запуска.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 mt-10">
        <h2 className="text-xl font-semibold text-foreground mb-4">Частые вопросы</h2>
        <div className="space-y-3">
          {faqItems.map(({ q, a }) => (
            <details key={q} className="rounded-xl border border-white/10 bg-white/[0.02] group">
              <summary className="cursor-pointer p-4 text-foreground font-medium list-none">{q}</summary>
              <p className="px-4 pb-4 text-[#94A3B8] text-sm leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 mt-10">
        <div className="rounded-2xl p-7 border border-[#3B82F6]/30 bg-[#3B82F6]/10">
          <h2 className="text-2xl md:text-3xl font-bold">Нужен такой же результат?</h2>
          <p className="mt-3 text-[#CFE2FF] max-w-3xl">
            Подготовим маршрут внедрения AI под ваш бизнес и запустим пилот с измеримыми KPI.
            Бесплатный аудит — 60 минут, без обязательств.
          </p>
          <Link
            href="/ai-dlya-biznesa#audit"
            className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold"
          >
            Получить бесплатный аудит
          </Link>
        </div>
      </section>
    </main>
  );
}
