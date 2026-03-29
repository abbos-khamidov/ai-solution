import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LandingHeroImage } from '@/components/shared/LandingHeroImage';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/ii-dlya-fitnes-klubov';
const TITLE = 'ИИ для фитнес-клубов и спортивных центров';
const DESCRIPTION =
  'ИИ для фитнес-клубов в Ташкенте и Узбекистане: запись на занятия 24/7, консультации по абонементам, напоминания. Разгрузка администрации, рост продаж.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'ии фитнес ташкент, бот для фитнес клуба узбекистан, запись в зал бот, автоматизация фитнес клуба ташкент',
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${SLUG}`, type: 'website', locale: 'ru_RU', siteName: 'AI Solution', images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  robots: { index: true, follow: true },
};

const faqItems = [
  { q: 'Сколько стоит ИИ-бот для фитнес-клуба в Ташкенте?', a: 'Запуск бота для записи на занятия и консультаций по абонементам — от $390 + $150/мес. С интеграцией с расписанием и учётной системой — от $1 000 за запуск + $300/мес. Смета после аудита.' },
  { q: 'Может ли бот записывать на групповые занятия и персональные тренировки?', a: 'Да. Настраиваем сценарий под ваше расписание: тип занятия, дата и время, тренер при необходимости. Бот фиксирует запись и при интеграции синхронизирует с вашей системой.' },
  { q: 'Можно ли напоминать клиентам о визите?', a: 'Да. Подключаем напоминания за день или за несколько часов до занятия — в мессенджере или по SMS, по вашему сценарию.' },
  { q: 'За сколько запускается?', a: 'Базовая запись и ответы по абонементам — 5–7 рабочих дней. С интеграцией расписания и учёта — 2–3 недели.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function IiDlyaFitnesKlubovPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Главная', url: '/' },
          { name: TITLE, url: `${SLUG}/` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="min-h-screen bg-background text-foreground pb-16">
        <section className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-[#93C5FD] mb-3">ИИ для фитнес-клубов</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">AI для фитнес-клубов в Ташкенте — запись на тренировки и продление абонементов</h1>
            <LandingHeroImage
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
              alt="AI для фитнес-клубов в Ташкенте — автозапись на тренировки и продление абонементов"
              title="AI автоматизация для фитнес-центров и спортивных клубов Ташкента"
            />
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg leading-relaxed">
              Фитнес-клубы и спортивные центры в Ташкенте и Узбекистане получают заявки на запись в зал, на групповые занятия и персональные тренировки. Администратор не успевает отвечать в нерабочее время — часть потенциальных клиентов уходит к конкурентам. ИИ для фитнес-клубов решает это: бот принимает запись на занятия 24/7, консультирует по абонементам и ценам, напоминает о визите и при необходимости передаёт сложные запросы менеджеру с контекстом. В результате вы не теряете лидов из-за задержки ответа и разгружаете ресепшен в часы пик.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full border border-[#3B82F6]/40 text-[#93C5FD]">Ташкент</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">Запись 24/7</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Как ИИ решает задачи фитнес-клубов</h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            ИИ-бот ведёт диалог в Telegram, Instagram или на сайте: уточняет цель визита (пробное занятие, абонемент, персональная тренировка), предлагает тип занятия и слот в расписании, фиксирует запись. Отвечает на вопросы о ценах, программах и тренерах. При интеграции с вашей системой учёта синхронизирует записи и может напоминать клиенту о визите. Сложные запросы (корпоративные абонементы, особые условия) передаёт менеджеру с резюме. Для фитнес-клубов в Ташкенте мы настраиваем сценарии под ваше расписание и тарифы. В результате запись на занятия доступна круглосуточно, первый ответ — за 30 секунд, администрация фокусируется на гостях в зале.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Что получает фитнес-клуб после внедрения</h2>
          <ul className="space-y-3 text-[#94A3B8]">
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Запись на занятия 24/7 без потерь.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Ответ за 30 секунд — меньше уходов к конкурентам.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Напоминания клиентам о визите — меньше неявок.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Разгрузка ресепшена от рутинных записей и консультаций.</li>
          </ul>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Стоимость и сроки</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Запуск ИИ для фитнес-клуба: от $390 (запись и консультации по абонементам) + $150/мес. С интеграцией расписания и напоминаниями — от $1 000 за запуск + от $300/мес. Срок базового запуска — 5–7 рабочих дней.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Частые вопросы</h2>
          <div className="space-y-4">
            {faqItems.map(({ q, a }) => (
              <details key={q} className="group rounded-xl border border-white/10 bg-white/[0.02] open:bg-white/[0.04] transition-colors">
                <summary className="cursor-pointer p-5 text-foreground font-semibold list-none flex items-center justify-between gap-4">{q}<span className="shrink-0 text-[#64748B] group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
                <p className="px-5 pb-5 text-[#94A3B8] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <div className="rounded-2xl p-7 border border-[#3B82F6]/30 bg-[#3B82F6]/10">
            <h2 className="text-2xl md:text-3xl font-bold">Получить бесплатный аудит</h2>
            <p className="mt-3 text-[#CFE2FF] max-w-3xl">Опишите форматы занятий и расписание — предложим сценарий бота под ваш клуб.</p>
            <Link href="/#contact" className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold">Обсудить проект</Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-xl font-bold text-foreground mb-4">Читайте также</h2>
          <ul className="space-y-2 text-[#94A3B8]">
            <li><Link href="/ii-dlya-klinik-tashkent" className="text-[#93C5FD] hover:underline">ИИ для клиник в Ташкенте</Link></li>
            <li><Link href="/ii-dlya-restoranov-tashkent" className="text-[#93C5FD] hover:underline">ИИ для ресторанов и кафе Ташкента</Link></li>
            <li><Link href="/tashkent" className="text-[#93C5FD] hover:underline">Автоматизация бизнеса в Ташкенте</Link></li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
