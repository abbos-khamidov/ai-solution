import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LandingHeroImage } from '@/components/shared/LandingHeroImage';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/chatbot-dlya-instagram';
const TITLE = 'Чатбот для Instagram — автоответы 24/7';
const DESCRIPTION =
  'Чатбот для Instagram в Ташкенте: автоответы в Direct 24/7, квалификация лидов, приём заявок. Внедрение под ключ, цены, кейсы.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    'чатбот для инстаграм ташкент, бот для instagram бизнес, автоответы instagram узбекистан, чатбот инстаграм ташкент',
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
    q: 'Сколько стоит чатбот для Instagram в Ташкенте?',
    a: 'Внедрение ИИ-чатбота для Instagram (в связке с Telegram при необходимости) — от $1 000 (запуск) плюс от $500/мес. Стоимость зависит от сценария, объёма обучения и интеграций. Точную оценку даём после бесплатного аудита.',
  },
  {
    q: 'Чатбот отвечает в Direct сам или нужен человек?',
    a: 'ИИ-чатбот отвечает сам: приветствует, уточняет запрос, отвечает на частые вопросы, квалифицирует лидов. Горячих передаёт менеджеру с контекстом. Менеджер подключается только к нужным диалогам.',
  },
  {
    q: 'Можно ли подключить и Telegram, и Instagram к одному боту?',
    a: 'Да. Один ИИ ведёт диалоги в Telegram и Instagram (и при необходимости WhatsApp). Единая воронка, один контекст — без дублирования и потери истории.',
  },
  {
    q: 'За сколько запускается?',
    a: 'Базовый сценарий автоответов в Instagram — 5–7 рабочих дней. С квалификацией и интеграциями — 2–3 недели.',
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

export default function ChatbotDlyaInstagramPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="min-h-screen bg-background text-foreground pb-16">
        <section className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-[#93C5FD] mb-3">Чатбот для Instagram в Ташкенте</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Чат-бот для Instagram в Ташкенте — автоответы в директе и квалификация клиентов
            </h1>
            <LandingHeroImage
              src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80"
              alt="Чат-бот для Instagram в Ташкенте — автоответы в директе и квалификация клиентов"
              title="Instagram автоматизация через AI-бот для бизнеса в Узбекистане"
            />
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg leading-relaxed">
              Клиенты пишут в Direct в любое время — после поста, сторис или рекламы. Пока менеджер не онлайн, заявка
              может остыть или уйти к конкуренту. Чатбот для Instagram решает это: он отвечает в Direct за 30 секунд,
              уточняет запрос, отвечает на частые вопросы по ценам и срокам и при готовности клиента к сделке передаёт
              диалог менеджеру с контекстом. Так вы не теряете лиды из-за задержки ответа и держите единый стандарт
              общения 24/7. Мы внедряем чатботов для Instagram в Ташкенте и по всему Узбекистану, часто в связке с
              Telegram для единой воронки.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full border border-[#3B82F6]/40 text-[#93C5FD]">Ташкент</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">Direct 24/7</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Как чатбот решает задачи бизнеса в Instagram
          </h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            Чатбот в Direct приветствует пользователя, уточняет продукт или услугу, отвечает на вопросы из FAQ и при
            необходимости собирает контакт или записывает на консультацию. ИИ-версия ведёт естественный диалог,
            квалифицирует лидов и передаёт только горячих менеджеру. Всё это работает круглосуточно, без выходных.
            Для бизнеса в Ташкенте мы настраиваем сценарии под вашу нишу, обучаем бота на ваших ответах и при
            необходимости подключаем тот же ИИ к Telegram и WhatsApp — один бот, единая история диалогов. В результате
            первый ответ в Direct занимает до 30 секунд, конверсия из обращения в диалог растёт, а менеджеры не
            тонут в рутинных первых контактах.
          </p>
          <p className="text-[#94A3B8] leading-relaxed">
            Типичные сценарии: ответ на вопрос после сторис или поста, приём заявки на услугу или товар, запись на
            мероприятие или консультацию, сбор обратной связи. Чатбот можно связать с рекламой (переход в Direct из
            креатива) и с CRM для передачи лидов. Таким образом, чатбот для Instagram становится первой точкой контакта
            и разгружает команду, не подменяя живого общения там, где оно нужно.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Что получает бизнес после внедрения
          </h2>
          <ul className="space-y-3 text-[#94A3B8]">
            <li className="flex gap-2">
              <span className="text-[#3B82F6]">•</span>
              Ответ в Direct за 30 секунд — меньше потерь из-за долгого ожидания.
            </li>
            <li className="flex gap-2">
              <span className="text-[#3B82F6]">•</span>
              Работа 24/7: заявки ночью и в выходные не пропадают.
            </li>
            <li className="flex gap-2">
              <span className="text-[#3B82F6]">•</span>
              Квалификация лидов и передача только готовых к диалогу с контекстом.
            </li>
            <li className="flex gap-2">
              <span className="text-[#3B82F6]">•</span>
              Единая воронка с Telegram при подключении обоих каналов.
            </li>
          </ul>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Пример внедрения</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Компании в Ташкенте, с которыми мы работали, получали заявки и в Telegram, и в Instagram. После внедрения
            единого ИИ-чатбота время первого ответа сократилось до 30 секунд в обоих каналах, доля горячих лидов
            выросла. Подробнее — в кейсах <Link href="/cases/studify-ai-automation" className="text-[#93C5FD] hover:underline">Studify.uz</Link>
            {' '}и <Link href="/cases/marsit-lead-automation" className="text-[#93C5FD] hover:underline">Marsit.uz</Link>.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Стоимость и сроки</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Запуск чатбота для Instagram (в связке с Telegram при необходимости) — от $1 000 плюс от $500/мес. Срок
            базового сценария — 5–7 рабочих дней, с квалификацией и интеграциями — 2–3 недели.
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
              Расскажите о потоке заявок в Instagram — предложим сценарий чатбота и ориентир по стоимости.
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
              <Link href="/blog/ai-chatbot-dlya-biznesa-uzbekistan" className="text-[#93C5FD] hover:underline">AI-чатбот для бизнеса в Узбекистане</Link>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
