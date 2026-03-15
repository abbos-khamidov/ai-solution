import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LandingHeroImage } from '@/components/shared/LandingHeroImage';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/ii-dlya-obrazovaniya-tashkent';
const TITLE = 'ИИ для образовательных центров Ташкента';
const DESCRIPTION =
  'ИИ для учебных центров и образовательных проектов в Ташкенте: запись на курсы 24/7, консультации, квалификация лидов. Кейс Studify.uz, цены, аудит.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'ии образование ташкент, ии для учебного центра ташкент, бот запись на курсы ташкент, автоматизация образования узбекистан',
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${SLUG}`, type: 'website', locale: 'ru_RU', siteName: 'AI Solution', images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  robots: { index: true, follow: true },
};

const faqItems = [
  { q: 'Сколько стоит внедрение ИИ для учебного центра в Ташкенте?', a: 'Запуск бота для записи на курсы и консультаций — от $1 000 + от $500/мес. С квалификацией лидов и управленческими сводками — по смете после аудита. Реальный кейс: Studify.uz.' },
  { q: 'Может ли бот записывать на разные курсы и форматы?', a: 'Да. Настраиваем сценарий под ваши программы: курс, формат (очно/онлайн), дата старта. Бот уточняет запрос, предлагает варианты и фиксирует заявку или передаёт горячего лида менеджеру.' },
  { q: 'Какой результат у образовательных проектов после внедрения?', a: 'В кейсе Studify.uz время первого ответа сократилось до секунд, квалификация лидов стала прозрачной, руководитель получает сводки по KPI. Подробнее — на странице кейса.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function IiDlyaObrazovaniyaTashkentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="min-h-screen bg-[#05050A] text-white pt-28 pb-16">
        <section className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-[#93C5FD] mb-3">ИИ для образования в Ташкенте</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">AI для учебных центров в Ташкенте — запись студентов и ответы 24/7</h1>
            <LandingHeroImage
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80"
              alt="AI для учебных центров в Ташкенте — автоматическая запись студентов и ответы 24/7"
              title="AI автоматизация для образовательных учреждений Ташкента"
            />
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg leading-relaxed">
              Учебные центры и образовательные проекты в Ташкенте получают заявки в Telegram, на сайте и по телефону. Пока менеджер не ответил, абитуриент может выбрать другую школу или потерять интерес. ИИ для образования решает это: бот отвечает за 30 секунд, консультирует по курсам и форматам, записывает на пробное занятие или консультацию и квалифицирует лидов. Горячих передаёт менеджеру с контекстом. Руководитель при необходимости получает сводки по воронке. Реальный кейс — Studify.uz: ускорение ответа и прозрачная квалификация лидов.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full border border-[#3B82F6]/40 text-[#93C5FD]">Ташкент</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">Кейс Studify.uz</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Как ИИ решает задачи образовательных центров</h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            ИИ-бот консультирует по программам, форматам и ценам, уточняет цель (смена профессии, повышение квалификации, ребёнок) и бюджет. Записывает на пробный урок или консультацию, при необходимости напоминает о визите. Квалифицирует лидов и передаёт готовых к решению менеджеру с кратким контекстом. Для учебных центров в Ташкенте мы настраиваем сценарии под ваши курсы и воронку; при необходимости добавляем управленческие сводки для руководства. В результате первый ответ абитуриенту занимает до 30 секунд, воронка прозрачна, а менеджеры работают с квалифицированными лидами.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Что получает учебный центр после внедрения</h2>
          <ul className="space-y-3 text-[#94A3B8]">
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Ответ за 30 секунд — меньше потерь лидов из-за задержки.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Запись на курсы и консультации 24/7.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Квалификация лидов и передача горячих с контекстом.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Сводки по воронке для руководителя (при подключении).</li>
          </ul>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Пример внедрения</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Studify.uz — образовательная платформа в Ташкенте. Внедрили ИИ-бота для первичных диалогов, квалификации лидов и ежедневных управленческих сводок. Результат: время ответа клиенту — секунды, воронка прозрачна, руководитель видит KPI в одном окне. Подробнее — в <Link href="/cases/studify-ai-automation" className="text-[#93C5FD] hover:underline">кейсе Studify.uz</Link>.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Стоимость и сроки</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Запуск ИИ для учебного центра — от $1 000 (запись и консультации) + от $500/мес. С квалификацией и сводками для руководства — по смете после аудита. Срок базового запуска — 5–7 рабочих дней.
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
            <p className="mt-3 text-[#CFE2FF] max-w-3xl">Опишите воронку и каналы заявок — предложим сценарий ИИ под ваш центр.</p>
            <Link href="/#contact" className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold">Обсудить проект</Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-4">Читайте также</h2>
          <ul className="space-y-2 text-[#94A3B8]">
            <li><Link href="/cases/studify-ai-automation" className="text-[#93C5FD] hover:underline">Кейс Studify.uz: AI-автоматизация лидов</Link></li>
            <li><Link href="/ii-chatbot-tashkent" className="text-[#93C5FD] hover:underline">ИИ чатбот для бизнеса в Ташкенте</Link></li>
            <li><Link href="/tashkent" className="text-[#93C5FD] hover:underline">Автоматизация бизнеса в Ташкенте</Link></li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
