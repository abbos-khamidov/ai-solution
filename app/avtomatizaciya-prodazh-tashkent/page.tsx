import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LandingHeroImage } from '@/components/shared/LandingHeroImage';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/avtomatizaciya-prodazh-tashkent';
const TITLE = 'Автоматизация продаж в Ташкенте с помощью ИИ';
const DESCRIPTION =
  'Автоматизация продаж в Ташкенте: ИИ-бот отвечает за 30 сек, квалифицирует лидов, работает 24/7. Внедрение под ключ, кейсы, цены.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    'автоматизация продаж ташкент, ии автоматизация продаж, бот менеджер продаж ташкент, автоматизация продаж узбекистан',
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${SLUG}`,
    type: 'website',
    locale: 'ru_RU',
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

const faqItems = [
  {
    q: 'Что входит в автоматизацию продаж с ИИ в Ташкенте?',
    a: 'Обычно: ИИ-бот в Telegram/Instagram/WhatsApp (первый ответ за 30 сек, квалификация лидов), настройка сценариев под ваш продукт, передача горячих лидов менеджерам с контекстом, при необходимости — интеграция с CRM и отчёты для руководителя.',
  },
  {
    q: 'Сколько стоит внедрение?',
    a: 'Запуск бота-менеджера для продаж — от $1 000 (базовый сценарий) плюс от $500/мес. Полный цикл с CRM и аналитикой — от $2 000 и от $700/мес. Точная сумма после бесплатного аудита.',
  },
  {
    q: 'За сколько времени запускается?',
    a: 'Базовый сценарий — 5–7 рабочих дней. С интеграциями и обучением на ваших данных — 2–3 недели.',
  },
  {
    q: 'Работаете ли только в Ташкенте?',
    a: 'Офис в Ташкенте, но внедряем автоматизацию для компаний по всему Узбекистану и в странах СНГ удалённо.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function AvtomatizaciyaProdazhTashkentPage() {
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
            <p className="text-sm text-[#93C5FD] mb-3">Автоматизация продаж в Ташкенте</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Автоматизация продаж в Ташкенте через AI — больше сделок без найма менеджеров
            </h1>
            <LandingHeroImage
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
              alt="Автоматизация продаж в Ташкенте через AI — рост конверсии без найма менеджеров"
              title="Автоматизация отдела продаж через искусственный интеллект в Ташкенте"
            />
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg leading-relaxed">
              Заявки приходят в мессенджеры и на сайт в любое время, но менеджеры не успевают отвечать мгновенно —
              часть клиентов уходит к конкурентам, часть заявок обрабатывается без единых правил квалификации.
              Автоматизация продаж в Ташкенте с помощью ИИ решает это: бот отвечает за 30 секунд, выясняет потребность
              и готовность к покупке, присваивает статус лиду и передаёт горячих менеджеру с контекстом. Воронка
              становится прозрачной, потери заявок снижаются, а отдел продаж фокусируется на сделках, а не на рутине.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full border border-[#3B82F6]/40 text-[#93C5FD]">Ташкент</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">Ответ за 30 сек</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Как ИИ решает задачи автоматизации продаж
          </h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            ИИ-бот ведёт диалог по сценарию продаж: приветствует клиента, уточняет продукт или услугу, бюджет и сроки,
            отвечает на типовые вопросы из FAQ. На основе ответов присваивает лиду статус Cold, Warm или Hot и либо
            продолжает диалог, либо сразу передаёт заявку менеджеру с кратким контекстом. Всё это работает в Telegram,
            Instagram и WhatsApp 24/7. Для компаний в Ташкенте мы настраиваем сценарии под вашу нишу, подключаем
            уведомления в CRM или в Telegram руководителю и при необходимости — дашборды по лидам. В результате первый
            ответ клиенту занимает до 30 секунд, воронка унифицирована, а менеджеры получают только квалифицированные заявки.
          </p>
          <p className="text-[#94A3B8] leading-relaxed">
            Дополнительно можно автоматизировать: напоминания клиентам, запись на встречу или звонок, сбор обратной
            связи после сделки. Интеграция с 1С, Bitrix24, amoCRM позволяет видеть лиды и историю диалогов в привычных
            системах. Таким образом, автоматизация продаж в Ташкенте охватывает не только «первый контакт», но и
            последующие этапы воронки при необходимости.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Что получает бизнес после внедрения
          </h2>
          <ul className="space-y-3 text-[#94A3B8]">
            <li className="flex gap-2">
              <span className="text-[#3B82F6]">•</span>
              Ответ клиенту за 30 секунд — рост конверсии из заявки в диалог.
            </li>
            <li className="flex gap-2">
              <span className="text-[#3B82F6]">•</span>
              Приём заявок 24/7 без потерь в нерабочее время.
            </li>
            <li className="flex gap-2">
              <span className="text-[#3B82F6]">•</span>
              Единая квалификация лидов и передача горячих с контекстом.
            </li>
            <li className="flex gap-2">
              <span className="text-[#3B82F6]">•</span>
              Прозрачная воронка для руководителя и возможность масштабировать продажи без линейного роста штата.
            </li>
          </ul>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Пример внедрения</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Образовательный проект и IT-компания в Ташкенте внедрили ИИ-бота для приёма и квалификации лидов.
            В обоих случаях время первого ответа сократилось до 30 секунд, доля горячих заявок выросла, руководители
            получили сводки по воронке. Подробнее — в кейсах{' '}
            <Link href="/cases/studify-ai-automation" className="text-[#93C5FD] hover:underline">Studify.uz</Link>
            {' '}и{' '}
            <Link href="/cases/marsit-lead-automation" className="text-[#93C5FD] hover:underline">Marsit.uz</Link>.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Стоимость и сроки</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Запуск автоматизации продаж с ИИ-ботом — от $1 000 (базовый сценарий) плюс от $500/мес. С интеграцией CRM
            и аналитикой — от $2 000 и от $700/мес. Срок запуска базового сценария — 5–7 рабочих дней, полный цикл — 2–3 недели.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Частые вопросы</h2>
          <div className="space-y-4">
            {faqItems.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-xl border border-white/10 bg-white/[0.02] open:bg-white/[0.04] transition-colors"
              >
                <summary className="cursor-pointer p-5 text-foreground font-semibold list-none flex items-center justify-between gap-4">
                  {q}
                  <span className="shrink-0 text-[#64748B] group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="px-5 pb-5 text-[#94A3B8] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <div className="rounded-2xl p-7 border border-[#3B82F6]/30 bg-[#3B82F6]/10">
            <h2 className="text-2xl md:text-3xl font-bold">Получить бесплатный аудит</h2>
            <p className="mt-3 text-[#CFE2FF] max-w-3xl">
              Опишите процесс продаж и входящие каналы — мы предложим план автоматизации и ориентир по бюджету.
            </p>
            <Link
              href="/#contact"
              className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold"
            >
              Обсудить проект
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-xl font-bold text-foreground mb-4">Читайте также</h2>
          <ul className="space-y-2 text-[#94A3B8]">
            <li>
              <Link href="/tashkent" className="text-[#93C5FD] hover:underline">Автоматизация бизнеса в Ташкенте</Link>
            </li>
            <li>
              <Link href="/ii-chatbot-tashkent" className="text-[#93C5FD] hover:underline">ИИ чатбот для бизнеса в Ташкенте</Link>
            </li>
            <li>
              <Link href="/blog/avtomatizaciya-prodazh-telegram" className="text-[#93C5FD] hover:underline">Автоматизация продаж в Telegram</Link>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
