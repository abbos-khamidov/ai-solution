import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/ii-dlya-internet-magazina';
const TITLE = 'ИИ для интернет-магазина в Узбекистане';
const DESCRIPTION =
  'ИИ для интернет-магазина: консультации в мессенджерах 24/7, подбор товаров, статус заказа, снижение возвратов. Ташкент, Узбекистан.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'ии интернет магазин узбекистан, чатбот для интернет магазина ташкент, бот для онлайн магазина узбекистан',
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${SLUG}`, type: 'website', locale: 'ru_RU', siteName: 'AI Solution', images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  robots: { index: true, follow: true },
};

const faqItems = [
  { q: 'Сколько стоит внедрение ИИ для интернет-магазина в Узбекистане?', a: 'Запуск бота для консультаций и статуса заказа — от $1 000 + от $500/мес. С подбором товаров по каталогу и интеграцией с учётной системой — от $2 000 за запуск. Смета после аудита.' },
  { q: 'Может ли бот подбирать товары по запросу клиента?', a: 'Да. Подключаем каталог: клиент описывает потребность или категорию — бот уточняет и предлагает подходящие товары со ссылками. При необходимости передаёт лид менеджеру с контекстом.' },
  { q: 'Интегрируется ли с 1С или другой учётной системой?', a: 'Да. Интегрируем с 1С, учётными системами и маркетплейсами: актуальные остатки, статус заказа, уведомления клиенту.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function IiDlyaInternetMagazinaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="min-h-screen bg-background text-foreground pb-16">
        <section className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-[#93C5FD] mb-3">ИИ для интернет-магазина</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">ИИ для интернет-магазина в Узбекистане</h1>
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg leading-relaxed">
              Покупатели интернет-магазинов пишут в Telegram, Instagram и на сайт: «есть ли в наличии?», «когда доставка?», «какой размер подойдёт?». Пока менеджер не ответил, клиент может оформить заказ у конкурента или отказаться от покупки. ИИ для интернет-магазина отвечает за 30 секунд: консультирует по товарам, подбирает по критериям, сообщает статус заказа и сроки доставки. При сложных вопросах передаёт диалог менеджеру с контекстом. Так вы снижаете отказы из-за долгого ответа и разгружаете поддержку.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full border border-[#3B82F6]/40 text-[#93C5FD]">Узбекистан</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">Консультации 24/7</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Как ИИ решает задачи интернет-магазина</h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            ИИ-бот консультирует по ассортименту: «что подойдёт для подарка до 200 000?», «есть ли доставка в Самарканд?», «как обменять?». При подключении каталога подбирает товары по запросу и присылает ссылки. Может сообщать статус заказа по номеру и отвечать на типовые вопросы о доставке и оплате. Горячих лидов (готовых оформить заказ или уточнить детали) передаёт менеджеру с контекстом. Для магазинов в Узбекистане настраиваем сценарии под ваш каталог и учётную систему, при необходимости интегрируем с 1С и маркетплейсами. В результате конверсия из обращения в заказ растёт, нагрузка на поддержку падает, клиент получает ответ в любое время.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Что получает магазин после внедрения</h2>
          <ul className="space-y-3 text-[#94A3B8]">
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Ответ клиенту за 30 секунд — меньше отказов и уходов к конкурентам.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Консультации и подбор товаров 24/7.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Разгрузка поддержки от типовых вопросов.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Квалифицированные лиды с контекстом для менеджеров.</li>
          </ul>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Стоимость и сроки</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Запуск ИИ для интернет-магазина — от $1 000 (консультации и статус заказа) + от $500/мес. С подбором по каталогу и интеграцией с учётом — от $2 000 за запуск. Срок базового запуска — 5–7 рабочих дней, с интеграциями — 2–3 недели.
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
            <p className="mt-3 text-[#CFE2FF] max-w-3xl">Опишите каталог и каналы обращений — предложим сценарий ИИ под ваш магазин.</p>
            <Link href="/#contact" className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold">Обсудить проект</Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-xl font-bold text-foreground mb-4">Читайте также</h2>
          <ul className="space-y-2 text-[#94A3B8]">
            <li><Link href="/ii-chatbot-tashkent" className="text-[#93C5FD] hover:underline">ИИ чатбот для бизнеса в Ташкенте</Link></li>
            <li><Link href="/blog/ai-dlya-internet-magazina-uzbekistan" className="text-[#93C5FD] hover:underline">ИИ для интернет-магазина в Узбекистане — блог</Link></li>
            <li><Link href="/tashkent" className="text-[#93C5FD] hover:underline">Автоматизация бизнеса в Ташкенте</Link></li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
