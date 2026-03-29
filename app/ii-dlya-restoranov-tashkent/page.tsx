import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LandingHeroImage } from '@/components/shared/LandingHeroImage';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/ii-dlya-restoranov-tashkent';
const TITLE = 'ИИ для ресторанов и кафе Ташкента';
const DESCRIPTION =
  'ИИ для ресторанов и кафе в Ташкенте: бронирование столов 24/7, приём заказов на доставку, ответы на вопросы. Разгрузка администратора, рост заказов.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'ии ресторан ташкент, бот для кафе ташкент, бронирование столов бот, доставка еды бот узбекистан',
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${SLUG}`, type: 'website', locale: 'ru_RU', siteName: 'AI Solution', images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  robots: { index: true, follow: true },
};

const faqItems = [
  { q: 'Сколько стоит ИИ-бот для ресторана или кафе в Ташкенте?', a: 'Запуск бота для бронирования столов и приёма заказов — от $390 (базовый сценарий) + $150/мес. С интеграцией с учётной системой и доставкой — от $1 000 за запуск + $300/мес. Смета после аудита.' },
  { q: 'Может ли бот принимать брони столов?', a: 'Да. Настраиваем сценарий: дата, время, количество гостей, контакт. Бот фиксирует бронь и при необходимости синхронизирует с вашей системой учёта столов.' },
  { q: 'Можно ли принимать заказы на доставку через бота?', a: 'Да. Бот может принимать заказы по меню (при подключении каталога), адрес доставки и контакт, передавать заказ в кухню или учётную систему.' },
  { q: 'За сколько запускается?', a: 'Базовое бронирование и ответы на FAQ — 5–7 рабочих дней. С интеграцией меню и учёта — 2–3 недели.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function IiDlyaRestoranovTashkentPage() {
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
            <p className="text-sm text-[#93C5FD] mb-3">ИИ для ресторанов в Ташкенте</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">AI-бот для ресторанов в Ташкенте — приём заказов и бронирование столов</h1>
            <LandingHeroImage
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
              alt="AI-бот для ресторанов в Ташкенте — автоматический приём заказов и бронирование"
              title="Автоматизация ресторанного бизнеса через AI в Ташкенте"
            />
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg leading-relaxed">
              Рестораны и кафе в Ташкенте получают заявки на бронирование столов и заказы на доставку в мессенджерах и по телефону. Администратор не успевает отвечать в пиковые часы и ночью — часть гостей выбирает другую точку. ИИ для ресторанов решает это: бот принимает брони столов 24/7, уточняет дату, время и количество гостей, при необходимости принимает заказы на доставку по меню и передаёт заявку в кухню или учётную систему. Отвечает на вопросы о меню, часах работы и адресе. В результате вы не теряете гостей из-за занятой линии и разгружаете администратора в часы пик.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full border border-[#3B82F6]/40 text-[#93C5FD]">Ташкент</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">Бронирование 24/7</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Как ИИ решает задачи ресторанов и кафе</h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            ИИ-бот ведёт диалог в Telegram, Instagram или на сайте: для брони стола уточняет дату, время, число гостей и контакт, фиксирует бронь и при интеграции передаёт данные в вашу систему учёта. Для доставки — уточняет блюда (по меню при подключении каталога), адрес и время, передаёт заказ. Одновременно отвечает на типовые вопросы: часы работы, адрес, наличие мест, акции. Сложные запросы (банкет, особые условия) передаёт администратору с контекстом. Для ресторанов в Ташкенте мы настраиваем сценарии под ваше меню и формат работы, при необходимости интегрируем с кассой или учётной системой. В результате брони и заказы принимаются круглосуточно, первый ответ гостю — за 30 секунд, администратор фокусируется на обслуживании в зале.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Что получает ресторан после внедрения</h2>
          <ul className="space-y-3 text-[#94A3B8]">
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Бронирование столов 24/7 без потерь из-за занятой линии.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Приём заказов на доставку при подключении меню.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Ответ гостю за 30 секунд — меньше уходов к конкурентам.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Разгрузка администратора в часы пик.</li>
          </ul>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Стоимость и сроки</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Запуск ИИ для ресторана или кафе: от $390 (бронирование и FAQ) + $150/мес. С приёмом заказов по меню и интеграцией с учётом — от $1 000 за запуск + от $300/мес. Срок базового запуска — 5–7 рабочих дней.
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
            <p className="mt-3 text-[#CFE2FF] max-w-3xl">Опишите формат работы (столы, доставка, меню) — предложим сценарий бота под ваше заведение.</p>
            <Link href="/#contact" className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold">Обсудить проект</Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-xl font-bold text-foreground mb-4">Читайте также</h2>
          <ul className="space-y-2 text-[#94A3B8]">
            <li><Link href="/ii-dlya-klinik-tashkent" className="text-[#93C5FD] hover:underline">ИИ для клиник в Ташкенте</Link></li>
            <li><Link href="/ii-chatbot-tashkent" className="text-[#93C5FD] hover:underline">ИИ чатбот для бизнеса в Ташкенте</Link></li>
            <li><Link href="/tashkent" className="text-[#93C5FD] hover:underline">Автоматизация бизнеса в Ташкенте</Link></li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
