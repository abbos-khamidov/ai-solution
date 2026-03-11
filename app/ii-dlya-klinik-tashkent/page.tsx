import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/ii-dlya-klinik-tashkent';
const TITLE = 'ИИ для клиник и медицины в Ташкенте';
const DESCRIPTION =
  'Внедрение ИИ для клиник в Ташкенте: запись пациентов 24/7, автоответы на вопросы, разгрузка колл-центра. Цены, кейсы, бесплатный аудит.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'ии для медицины ташкент, ии для клиник ташкент, запись к врачу бот ташкент, автоматизация клиники узбекистан',
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${SLUG}`, type: 'website', locale: 'ru_RU', siteName: 'AI Solution', images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  robots: { index: true, follow: true },
};

const faqItems = [
  { q: 'Сколько стоит ИИ-бот для клиники в Ташкенте?', a: 'Запуск бота для записи пациентов и ответов на FAQ — от $390 (запуск) + $150/мес. С интеграцией с учётной системой и напоминаниями — от $1 000 за запуск + $300/мес. Точная смета после аудита.' },
  { q: 'Может ли бот записывать на приём к конкретному врачу?', a: 'Да. Настраиваем сценарий под расписание и специализации: пациент выбирает врача или услугу, видит свободные слоты и подтверждает запись. Уведомления приходят администратору и при необходимости в вашу систему учёта.' },
  { q: 'Соответствует ли решение требованиям конфиденциальности?', a: 'Работаем с учётом требований к персональным и медицинским данным: данные можно хранить на вашей инфраструктуре, не передавать в сторонние облака, настроить ограничение доступа.' },
  { q: 'За сколько запускается?', a: 'Базовый сценарий записи и FAQ — 5–7 рабочих дней. С интеграцией с вашей учётной системой — 2–3 недели.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function IiDlyaKlinikTashkentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="min-h-screen bg-[#05050A] text-white pt-28 pb-16">
        <section className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-[#93C5FD] mb-3">ИИ для клиник в Ташкенте</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">ИИ для клиник и медицины в Ташкенте</h1>
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg leading-relaxed">
              Клиники и медцентры в Ташкенте получают десятки звонков и сообщений в день: запись на приём, вопросы о услугах и ценах, напоминания. Администраторы не успевают обрабатывать заявки в нерабочее время, часть пациентов уходит к конкурентам. ИИ для клиник решает это: бот принимает запись 24/7, отвечает на частые вопросы по услугам и ценам, напоминает о визите и при необходимости передаёт сложные запросы оператору с контекстом. Так вы не теряете пациентов из-за занятой линии и разгружаете колл-центр.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full border border-[#3B82F6]/40 text-[#93C5FD]">Ташкент</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">Запись 24/7</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Как ИИ решает задачи клиник</h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            ИИ-бот ведёт диалог в Telegram, Instagram или на сайте: уточняет цель визита (консультация, анализы, процедура), предлагает специалиста или услугу, показывает свободные слоты и фиксирует запись. Одновременно отвечает на типовые вопросы: стоимость приёма, подготовка к анализам, адрес и режим работы. При необходимости передаёт диалог администратору с уже собранными данными. Для клиник в Ташкенте мы настраиваем сценарии под ваши услуги и расписание, при необходимости интегрируем с учётной системой и напоминаниями (SMS или мессенджер). В результате первый ответ пациенту занимает до 30 секунд, запись доступна круглосуточно, а колл-центр фокусируется на сложных обращениях.
          </p>
          <p className="text-[#94A3B8] leading-relaxed">
            Дополнительно можно автоматизировать напоминания о визите, сбор обратной связи после приёма, предзапись на повторный приём. Всё с учётом требований к конфиденциальности и локальному хранению данных при необходимости.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Что получает клиника после внедрения</h2>
          <ul className="space-y-3 text-[#94A3B8]">
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Запись пациентов 24/7 без потерь в нерабочее время.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Быстрый ответ на вопросы об услугах и ценах — меньше пропущенных звонков.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Разгрузка администраторов и колл-центра.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Меньше «неявок» при подключении напоминаний.</li>
          </ul>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Пример внедрения</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Медцентр в Ташкенте получал заявки на запись в Telegram и по телефону. В вечернее время и в выходные часть обращений терялась. Внедрили ИИ-бота: он принимает запись по слотам, отвечает на вопросы по услугам и ценам и передаёт сложные запросы администратору. Время первого ответа сократилось до 30 секунд, доля записей через бота выросла, нагрузка на колл-центр снизилась.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Стоимость и сроки</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Запуск ИИ-бота для клиники: от $390 (базовый сценарий записи и FAQ) + $150/мес. С интеграцией с учётной системой и напоминаниями — от $1 000 за запуск + от $300/мес. Срок базового запуска — 5–7 рабочих дней.
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
            <p className="mt-3 text-[#CFE2FF] max-w-3xl">Опишите поток записей и каналы обращений — предложим сценарий и ориентир по стоимости.</p>
            <Link href="/#contact" className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold">Обсудить проект</Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-4">Читайте также</h2>
          <ul className="space-y-2 text-[#94A3B8]">
            <li><Link href="/tashkent" className="text-[#93C5FD] hover:underline">Автоматизация бизнеса в Ташкенте</Link></li>
            <li><Link href="/ii-chatbot-tashkent" className="text-[#93C5FD] hover:underline">ИИ чатбот для бизнеса в Ташкенте</Link></li>
            <li><Link href="/tseny-na-chatboty-tashkent" className="text-[#93C5FD] hover:underline">Стоимость чатбота для бизнеса в Ташкенте</Link></li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
