import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LandingHeroImage } from '@/components/shared/LandingHeroImage';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/ii-dlya-logistiki-uzbekistan';
const TITLE = 'ИИ автоматизация логистики в Узбекистане';
const DESCRIPTION =
  'ИИ для логистических компаний в Узбекистане: приём заказов 24/7, отслеживание грузов, ответы клиентам, разгрузка диспетчеров. Ташкент, цены, кейсы.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'автоматизация логистика узбекистан, ии для логистики ташкент, бот для грузоперевозок узбекистан, автоматизация диспетчеризации',
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${SLUG}`, type: 'website', locale: 'ru_RU', siteName: 'AI Solution', images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  robots: { index: true, follow: true },
};

const faqItems = [
  { q: 'Сколько стоит внедрение ИИ для логистической компании в Узбекистане?', a: 'Запуск бота для приёма заказов и ответов по статусу груза — от $1 000 + от $500/мес. С интеграцией с учётной системой и трекингом — от $2 000 за запуск. Смета после аудита.' },
  { q: 'Может ли бот сообщать клиенту статус груза?', a: 'Да. При интеграции с вашей системой учёта или API перевозчика бот может сообщать статус доставки по номеру заказа или трек-номеру.' },
  { q: 'В каких каналах работает?', a: 'Telegram, WhatsApp, виджет на сайте. Для логистики часто используют Telegram и WhatsApp — клиенты привыкли уточнять там детали заказа.' },
  { q: 'За сколько запускается?', a: 'Базовый приём заявок и типовые ответы — 5–7 рабочих дней. С интеграцией с учётом и трекингом — 2–3 недели.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function IiDlyaLogistikiUzbekistanPage() {
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
            <p className="text-sm text-[#93C5FD] mb-3">ИИ для логистики в Узбекистане</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">AI для логистических компаний Узбекистана — автоматизация заявок и уведомлений</h1>
            <LandingHeroImage
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
              alt="AI для логистики в Узбекистане — автоматизация заявок отслеживания и уведомлений"
              title="Внедрение AI в логистические компании Узбекистана"
            />
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg leading-relaxed">
              Логистические компании и службы доставки в Узбекистане получают десятки обращений в день: заказ перевозки, уточнение маршрута и стоимости, запрос статуса груза. Диспетчеры не успевают отвечать ночью и в выходные — часть заказов уходит к конкурентам или клиент остаётся без ответа. ИИ для логистики автоматизирует первый контакт: бот принимает заявку на перевозку 24/7, уточняет маршрут и тип груза, при интеграции с учётом сообщает статус доставки по номеру заказа и передаёт сложные запросы диспетчеру с контекстом. В результате вы не теряете заказы из-за задержки ответа и разгружаете диспетчерскую службу.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full border border-[#3B82F6]/40 text-[#93C5FD]">Узбекистан</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">Приём заказов 24/7</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Как ИИ решает задачи логистики</h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            ИИ-бот ведёт диалог с клиентом: уточняет направление (город, регион), тип груза, срочность и желаемые сроки. Сообщает ориентиры по стоимости и срокам доставки (на основе ваших правил или интеграции с тарифами). При подключении к учётной системе может показывать статус груза по номеру заказа или трек-номеру. Сложные запросы (нестандартный груз, особые условия) передаёт диспетчеру с кратким резюме. Для логистических компаний в Узбекистане мы настраиваем сценарии под ваши направления и тарифы, при необходимости интегрируем с внутренней системой учёта. В результате приём заказов и ответы по статусу доступны круглосуточно, диспетчеры фокусируются на координации, а не на первичных ответах.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Что получает логистическая компания после внедрения</h2>
          <ul className="space-y-3 text-[#94A3B8]">
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Приём заявок на перевозку 24/7 без потерь.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Ответ клиенту за 30 секунд — меньше уходов к конкурентам.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Информирование о статусе груза при интеграции с учётом.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Разгрузка диспетчеров от рутинных первых контактов.</li>
          </ul>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Стоимость и сроки</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Запуск ИИ для логистики — от $1 000 (приём заявок, типовые ответы) + от $500/мес. С интеграцией с учётной системой и статусом груза — от $2 000 за запуск. Срок базового запуска — 5–7 рабочих дней, с интеграциями — 2–3 недели.
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
            <p className="mt-3 text-[#CFE2FF] max-w-3xl">Опишите поток заявок и учётную систему — предложим сценарий автоматизации под вашу логистику.</p>
            <Link href="/#contact" className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold">Обсудить проект</Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-xl font-bold text-foreground mb-4">Читайте также</h2>
          <ul className="space-y-2 text-[#94A3B8]">
            <li><Link href="/biznes-avtomatizaciya-uzbekistan" className="text-[#93C5FD] hover:underline">Автоматизация бизнеса в Узбекистане</Link></li>
            <li><Link href="/ii-chatbot-tashkent" className="text-[#93C5FD] hover:underline">ИИ чатбот для бизнеса в Ташкенте</Link></li>
            <li><Link href="/crm-integraciya-tashkent" className="text-[#93C5FD] hover:underline">Интеграция ИИ с CRM в Ташкенте</Link></li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
