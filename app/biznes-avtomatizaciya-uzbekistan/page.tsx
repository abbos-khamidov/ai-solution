import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/biznes-avtomatizaciya-uzbekistan';
const TITLE = 'Автоматизация бизнеса в Узбекистане';
const DESCRIPTION =
  'Автоматизация бизнеса в Узбекистане: ИИ-боты, квалификация лидов, CRM, аналитика. Ташкент и регионы. Кейсы, цены, бесплатный аудит.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'бизнес автоматизация узбекистан, автоматизация бизнеса ташкент, ии автоматизация узбекистан, внедрение ии бизнес узбекистан',
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${SLUG}`, type: 'website', locale: 'ru_RU', siteName: 'AI Solution', images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  robots: { index: true, follow: true },
};

const faqItems = [
  { q: 'Что входит в автоматизацию бизнеса в Узбекистане?', a: 'ИИ-боты для приёма заявок и квалификации лидов в Telegram, Instagram, WhatsApp; интеграция с CRM; при необходимости — дашборды и аналитика. Объём зависит от задач: от одного канала до полного контура продаж и отчётности.' },
  { q: 'Сколько стоит автоматизация под ключ?', a: 'От $1 000 за запуск бота (один-два канала) + от $500/мес. С CRM, аналитикой и несколькими каналами — от $2 000 за запуск + от $700/мес. Точная смета после бесплатного аудита.' },
  { q: 'Работаете ли только в Ташкенте?', a: 'Офис в Ташкенте. Внедряем автоматизацию для компаний по всему Узбекистану (Самарканд, Фергана, Андижан, Наманган, Бухара и др.), а также в Казахстане, Кыргызстане и Таджикистане — в том числе удалённо.' },
  { q: 'За сколько запускается?', a: 'Базовый бот-менеджер — 5–7 рабочих дней. Полный цикл с CRM и аналитикой — 2–3 недели. Крупные проекты — по этапам.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function BiznesAvtomatizaciyaUzbekistanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="min-h-screen bg-[#05050A] text-white pt-28 pb-16">
        <section className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-[#93C5FD] mb-3">Автоматизация бизнеса в Узбекистане</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">Автоматизация бизнеса в Узбекистане</h1>
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg leading-relaxed">
              Компании в Узбекистане получают заявки из мессенджеров, с сайта и из рекламы. Ручная обработка создаёт задержки, потери в нерабочее время и разрозненную воронку. Автоматизация бизнеса с помощью ИИ объединяет каналы: бот отвечает за 30 секунд 24/7, квалифицирует лидов и передаёт горячих менеджерам с контекстом. При необходимости подключаем CRM, дашборды и отчёты — единая картина по продажам и лидам. Мы внедряем такие решения в Ташкенте и по всему Узбекистану: от малого бизнеса до отделов продаж с десятками менеджеров.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full border border-[#3B82F6]/40 text-[#93C5FD]">Узбекистан</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">Под ключ</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Из чего складывается автоматизация</h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            Первый уровень — ИИ-бот в одном или нескольких каналах (Telegram, Instagram, WhatsApp, сайт): приём заявок, ответы на FAQ, квалификация лидов Cold/Warm/Hot и передача горячих менеджерам. Второй — интеграция с CRM: лиды и диалоги в Bitrix24, amoCRM, 1С, уведомления в привычной системе. Третий — аналитика и отчётность: дашборды по лидам, конверсии, источникам; при необходимости управленческие сводки для руководства. Для бизнеса в Узбекистане мы подбираем контур под ваш масштаб: можно начать с одного канала и бота, затем добавить CRM и отчёты без потери накопленных данных.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Что получает бизнес после внедрения</h2>
          <ul className="space-y-3 text-[#94A3B8]">
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Ответ клиенту за 30 секунд 24/7 — меньше потерь лидов.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Единая воронка по каналам и квалификация лидов.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Интеграция с CRM — лиды и контекст в одной системе.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Прозрачная аналитика и при необходимости сводки для руководства.</li>
          </ul>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Кейсы в Узбекистане</h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            Образовательная платформа Studify.uz и IT-компания Marsit.uz внедрили ИИ-автоматизацию лидов в Ташкенте. В обоих случаях время первого ответа сократилось до 30 секунд, воронка стала прозрачной, доля качественных заявок выросла. Подробнее — в кейсах <Link href="/cases/studify-ai-automation" className="text-[#93C5FD] hover:underline">Studify.uz</Link> и <Link href="/cases/marsit-lead-automation" className="text-[#93C5FD] hover:underline">Marsit.uz</Link>.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Стоимость и сроки</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Запуск автоматизации: от $1 000 (бот в 1–2 каналах) + от $500/мес. С CRM и аналитикой — от $2 000 за запуск + от $700/мес. Срок базового запуска — 5–7 рабочих дней, полный цикл — 2–3 недели. Оценка под ваши задачи — после бесплатного аудита.
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
            <p className="mt-3 text-[#CFE2FF] max-w-3xl">Опишите процессы продаж и каналы заявок — предложим план автоматизации и ориентир по бюджету.</p>
            <Link href="/#contact" className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold">Обсудить проект</Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-4">Читайте также</h2>
          <ul className="space-y-2 text-[#94A3B8]">
            <li><Link href="/tashkent" className="text-[#93C5FD] hover:underline">Автоматизация бизнеса в Ташкенте</Link></li>
            <li><Link href="/ii-avtomatizaciya-uzbekistan" className="text-[#93C5FD] hover:underline">ИИ автоматизация в Узбекистане</Link></li>
            <li><Link href="/sravnenie-ai-reshenii-uzbekistan" className="text-[#93C5FD] hover:underline">Сравнение AI-решений для бизнеса в Узбекистане</Link></li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
