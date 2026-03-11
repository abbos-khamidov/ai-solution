import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/ii-dlya-yuridicheskih-uslug';
const TITLE = 'ИИ для юридических компаний';
const DESCRIPTION =
  'ИИ для юристов и юридических компаний в Узбекистане: первичная консультация 24/7, запись на приём, квалификация обращений. Ташкент, конфиденциальность.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'ии юристы узбекистан, ии для юридических компаний ташкент, бот для юрфирмы, автоматизация юруслуг узбекистан',
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${SLUG}`, type: 'website', locale: 'ru_RU', siteName: 'AI Solution', images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  robots: { index: true, follow: true },
};

const faqItems = [
  { q: 'Сколько стоит внедрение ИИ для юридической компании в Ташкенте?', a: 'Запуск бота для первичного приёма обращений и записи на консультацию — от $1 000 + от $500/мес. С учётом требований к конфиденциальности и локальному хранению данных — по смете после аудита.' },
  { q: 'Соответствует ли решение требованиям конфиденциальности?', a: 'Да. Настраиваем хранение данных на вашей инфраструктуре, без передачи в сторонние облака. Доступ к диалогам ограничивается по вашим правилам.' },
  { q: 'Может ли бот только записывать на консультацию, без консультаций?', a: 'Да. Можно ограничить сценарий: сбор контакта, тема обращения, запись на приём. Юрист получает только подготовленную заявку.' },
  { q: 'В каких каналах работает?', a: 'Telegram, Instagram, WhatsApp, виджет на сайте. Один бот ведёт диалоги во всех каналах; для юруслуг часто стартуют с Telegram или сайта.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function IiDlyaYuridicheskihUslugPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="min-h-screen bg-[#05050A] text-white pt-28 pb-16">
        <section className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-[#93C5FD] mb-3">ИИ для юридических компаний</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">ИИ для юридических компаний</h1>
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg leading-relaxed">
              Юридические фирмы и адвокаты в Ташкенте и Узбекистане получают обращения в любое время: запросы на консультацию, уточнение темы дела, запись на приём. Пока секретарь или юрист не ответил, клиент может обратиться к другому специалисту. ИИ для юридических компаний решает это: бот принимает обращение 24/7, уточняет тему (семейное, трудовое, корпоративное право и т.д.), записывает на консультацию и передаёт подготовленную заявку юристу с контекстом. Конфиденциальность соблюдается за счёт настройки хранения данных и доступа. В результате вы не теряете клиентов из-за задержки ответа и разгружаете приём первичных обращений.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full border border-[#3B82F6]/40 text-[#93C5FD]">Узбекистан</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">Конфиденциальность</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Как ИИ решает задачи юридических компаний</h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            ИИ-бот ведёт диалог в мессенджерах или на сайте: уточняет суть обращения (без разглашения деталей дела при необходимости), направление права, срочность и записывает на консультацию к нужному специалисту. Отвечает на типовые вопросы: стоимость первичной консультации, документы, режим работы офиса. Сложные или конфиденциальные запросы передаёт юристу с кратким резюме. Для юридических компаний в Узбекистане мы настраиваем сценарии с учётом этики и конфиденциальности: данные можно хранить на вашей инфраструктуре, логи ограничивать по доступу. В результате первый контакт с клиентом не теряется, юристы получают подготовленные заявки, а приём первичных обращений работает круглосуточно.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Что получает юркомпания после внедрения</h2>
          <ul className="space-y-3 text-[#94A3B8]">
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Приём обращений и запись на консультацию 24/7.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Ответ клиенту за 30 секунд — меньше уходов к конкурентам.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Подготовленные заявки с темой и контекстом для юриста.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Соблюдение конфиденциальности при правильной настройке хранения и доступа.</li>
          </ul>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Стоимость и сроки</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Запуск ИИ для юридической компании — от $1 000 (приём обращений, запись на консультацию) + от $500/мес. С требованиями к on-premise или особым политикам данных — по смете после аудита. Срок базового запуска — 5–7 рабочих дней.
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
            <p className="mt-3 text-[#CFE2FF] max-w-3xl">Опишите поток обращений и требования к конфиденциальности — предложим сценарий под вашу компанию.</p>
            <Link href="/#contact" className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold">Обсудить проект</Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-4">Читайте также</h2>
          <ul className="space-y-2 text-[#94A3B8]">
            <li><Link href="/tashkent" className="text-[#93C5FD] hover:underline">Автоматизация бизнеса в Ташкенте</Link></li>
            <li><Link href="/ii-chatbot-tashkent" className="text-[#93C5FD] hover:underline">ИИ чатбот для бизнеса в Ташкенте</Link></li>
            <li><Link href="/crm-integraciya-tashkent" className="text-[#93C5FD] hover:underline">Интеграция ИИ с CRM в Ташкенте</Link></li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
