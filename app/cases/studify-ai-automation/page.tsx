import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/cases/studify-ai-automation';
const TITLE = 'Кейс Studify: AI-бот для образовательного консалтинга — +40% записей на консультацию';
const DESCRIPTION =
  'Кейс Studify (образовательный консалтинг, Ташкент): AI-бот квалифицирует студентов и записывает на консультацию. Скорость ответа — 30 секунд, рост записей на 40%, 0 пропущенных заявок.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['кейс studify ai', 'автоматизация лидов ташкент', 'ai внедрение образование', 'чат-бот для учебного центра'],
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
  { q: 'Какой результат получил Studify после внедрения AI?', a: 'Скорость ответа на заявку сократилась с 2–3 часов до 30 секунд. Запись на консультацию выросла на 40%. Ни одна заявка больше не теряется ночью или в выходные — бот работает 24/7.' },
  { q: 'Как бот квалифицирует студентов?', a: 'Бот задаёт уточняющие вопросы: страна назначения, специальность, бюджет, сроки. По ответам определяет готовность студента и либо записывает на консультацию, либо отправляет в nurturing-сценарий до момента готовности.' },
  { q: 'В каких каналах работает бот?', a: 'Основные каналы — Instagram Direct и Telegram. Бот интегрируется с обоими и ведёт единую историю диалога для каждого студента.' },
  { q: 'Сколько стоит похожее внедрение для образовательного проекта?', a: 'Зависит от объёма каналов и интеграций. Ориентир: от $1 000 за запуск бота + от $500/мес. Точная смета после бесплатного аудита.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

const results = [
  { label: 'Скорость ответа', before: '2–3 часа', after: '30 сек', color: '#3B82F6' },
  { label: 'Запись на консультацию', before: 'базовый', after: '+40%', color: '#06B6D4' },
  { label: 'Пропущенные заявки', before: 'регулярно', after: '0', color: '#34D399' },
];

export default function StudifyCasePage() {
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
          <span className="text-foreground">Studify</span>
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
            Studify: +40% записей на консультацию
          </h1>
          <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg">
            Образовательный консалтинг в Ташкенте — студенты писали в Instagram и Telegram,
            но администратор не успевал отвечать. Горячие лиды терялись, особенно ночью и
            в выходные. Мы автоматизировали первичную квалификацию и запись на консультацию.
          </p>
        </div>
      </section>

      {/* Параметры кейса */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Клиент', value: 'Studify' },
            { label: 'Ниша', value: 'Образовательный консалтинг' },
            { label: 'Каналы', value: 'Instagram, Telegram' },
            { label: 'Срок внедрения', value: '10 дней' },
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
            Studify помогает студентам поступить в вузы за рубежом. Потенциальные клиенты писали
            одновременно в Instagram и Telegram, но один администратор не мог обработать поток.
            Среднее время ответа — 2–3 часа. К этому моменту студент уже мог обратиться к конкурентам.
            Ночью и в выходные заявки просто накапливались без ответа.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: '📱', text: 'Заявки из Instagram и Telegram без единой обработки' },
              { icon: '⏰', text: 'Ответ через 2–3 часа — студент уже выбрал другого' },
              { icon: '🌙', text: 'Ночью и в выходные — ноль ответов, потери лидов' },
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
            Разработали AI-бота, который работает в Instagram Direct и Telegram одновременно.
            Бот квалифицирует студента по ключевым параметрам: страна, бюджет, специальность, сроки.
            Если студент готов — автоматически записывает на консультацию и уведомляет менеджера.
            Если нет — запускает nurturing-сценарий.
          </p>
          <div className="mt-6 space-y-3">
            {[
              { step: '01', text: 'Бот принимает заявку в Instagram или Telegram — ответ за 30 секунд' },
              { step: '02', text: 'Квалификация: страна, специальность, бюджет, сроки' },
              { step: '03', text: 'Готовый студент → запись на консультацию + уведомление менеджеру' },
              { step: '04', text: 'Не готовый → серия обучающих сообщений до момента решения' },
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
            Администратор Studify больше не тратит время на первичные ответы — бот делает это
            мгновенно. К менеджеру приходит уже тёплый, квалифицированный студент с заполненной
            анкетой. Запись на консультацию выросла на 40% за первый месяц.
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
          <h2 className="text-2xl md:text-3xl font-bold">Хотите похожее внедрение?</h2>
          <p className="mt-3 text-[#CFE2FF] max-w-3xl">
            Получите аудит вашей воронки и план запуска AI-автоматизации под KPI вашего бизнеса.
            Бесплатно, без обязательств, за 60 минут.
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
