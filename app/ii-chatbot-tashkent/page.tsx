import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/ii-chatbot-tashkent';
const TITLE = 'ИИ чатбот для бизнеса в Ташкенте — автоответы 24/7';
const DESCRIPTION =
  'Внедрение ИИ чатбота для бизнеса в Ташкенте. Отвечает за 30 секунд, квалифицирует лиды, работает 24/7. Кейсы, цены, бесплатный аудит.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    'ии чатбот ташкент, chatbot для бизнеса узбекистан, ии бот ташкент, автоответы бизнес ташкент, чатбот для бизнеса ташкент',
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
    q: 'Сколько стоит ИИ-чатбот для бизнеса в Ташкенте?',
    a: 'Запуск чатбота для бизнеса в Ташкенте — от $1 000 (разработка и настройка) плюс от $500/мес на поддержку и обновления. Итоговая стоимость зависит от количества каналов (Telegram, Instagram, WhatsApp), интеграций с CRM и объёма обучения на ваших данных.',
  },
  {
    q: 'За сколько времени отвечает ИИ-чатбот?',
    a: 'ИИ-чатбот AI Solution отвечает клиенту в среднем за 30 секунд в любое время суток. Это в разы быстрее типичного ответа менеджера и существенно повышает конверсию из заявки в диалог.',
  },
  {
    q: 'Можно ли подключить чатбот к Telegram и Instagram одновременно?',
    a: 'Да. Мы внедряем единого ИИ-чатбота для Telegram, Instagram и (по запросу) WhatsApp. Один бот ведёт диалоги во всех каналах, квалифицирует лидов и передаёт горячих менеджеру с контекстом.',
  },
  {
    q: 'Как чатбот квалифицирует лидов?',
    a: 'Чатбот ведёт естественный диалог, уточняет потребность и бюджет, присваивает статус Cold / Warm / Hot. Горячие лиды мгновенно передаются менеджеру с кратким контекстом, остальные остаются в воронке для последующей обработки.',
  },
  {
    q: 'Как получить бесплатный аудит под чатбот?',
    a: 'Оставьте заявку на сайте или напишите в Telegram @aisolution_uz. Мы проведём бесплатный 60-минутный аудит: разберём входящий поток, цели и предложим сценарий внедрения ИИ-чатбота под ваш бизнес.',
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

export default function IiChatbotTashkentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="min-h-screen bg-background text-foreground pb-16">
        <section className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-[#93C5FD] mb-3">ИИ чатбот для бизнеса в Ташкенте</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              ИИ чатбот для бизнеса в Ташкенте
            </h1>
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg leading-relaxed">
              Клиенты пишут в мессенджеры и соцсети в любое время — но менеджеры не могут отвечать 24/7. В результате
              часть заявок теряется, часть приходит без квалификации, и руководитель не видит полной картины по лидам.
              ИИ чатбот в Ташкенте решает эту задачу: он отвечает за 30 секунд, выясняет потребность и бюджет,
              присваивает статус лиду и передаёт горячих менеджеру с готовым контекстом. Так вы не теряете заявки
              ночью и в выходные и получаете единую воронку по Telegram, Instagram и при необходимости WhatsApp.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full border border-[#3B82F6]/40 text-[#93C5FD]">Ташкент</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">Ответ за 30 сек</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">24/7</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Как ИИ-чатбот решает задачи бизнеса в Ташкенте
          </h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            ИИ чатбот не просто «отвечает на вопросы» — он ведёт диалог по сценарию продаж: приветствует клиента,
            уточняет задачу, продукт или услугу, бюджет и сроки. На основе ответов присваивает статус Cold, Warm или Hot
            и либо продолжает диалог, либо сразу передаёт лид менеджеру. Всё это работает в Telegram, Instagram и
            WhatsApp без дублирования: один бот, единая база диалогов. Для компаний в Ташкенте и Узбекистане мы
            настраиваем бота под вашу нишу, обучаем на FAQ и кейсах, подключаем уведомления в CRM или Telegram
            руководителю. В итоге первый ответ клиенту занимает до 30 секунд, а вы получаете прозрачную воронку и
            меньше потерянных заявок.
          </p>
          <p className="text-[#94A3B8] leading-relaxed">
            Типичные сценарии: приём заявок на услуги, запись на консультацию или пробное занятие, квалификация B2B-лидов,
            ответы на частые вопросы по ценам и срокам. Чатбот можно интегрировать с сайтом (виджет), с рекламой
            (переход в Telegram/Instagram) и с внутренними системами (1С, Bitrix24, amoCRM). Таким образом, ИИ чатбот
            в Ташкенте становится первым контактом с клиентом и разгружает менеджеров от рутины, не заменяя их там, где
            нужен живой диалог.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Что получает бизнес после внедрения ИИ-чатбота
          </h2>
          <ul className="space-y-3 text-[#94A3B8]">
            <li className="flex gap-2">
              <span className="text-[#3B82F6]">•</span>
              Ответ клиенту за 30 секунд вместо часов ожидания — рост конверсии из заявки в диалог.
            </li>
            <li className="flex gap-2">
              <span className="text-[#3B82F6]">•</span>
              Работа 24/7: заявки ночью и в выходные не теряются, все диалоги сохраняются.
            </li>
            <li className="flex gap-2">
              <span className="text-[#3B82F6]">•</span>
              Квалификация лидов Cold / Warm / Hot — менеджеры получают только готовых к диалогу клиентов с контекстом.
            </li>
            <li className="flex gap-2">
              <span className="text-[#3B82F6]">•</span>
              Единая воронка по Telegram, Instagram, WhatsApp без дублирования и потери контекста.
            </li>
            <li className="flex gap-2">
              <span className="text-[#3B82F6]">•</span>
              Сокращение нагрузки на менеджеров и возможность масштабировать приём заявок без пропорционального роста штата.
            </li>
          </ul>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Пример внедрения</h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            Образовательная платформа в Ташкенте получала десятки заявок в день в Telegram и на сайте. Менеджеры
            не успевали отвечать в первые минуты, часть клиентов уходила к конкурентам. Мы внедрили ИИ-чатбота:
            он приветствует пользователя, уточняет курс и формат обучения, отвечает на вопросы по ценам и расписанию.
            Горячих лидов (готовых записаться или оплатить) бот передаёт менеджеру с кратким контекстом. В результате
            время первого ответа сократилось до 30 секунд, доля «горячих» заявок выросла, а руководитель видит сводку
            по лидам в одном окне. Подробнее — в кейсе <Link href="/cases/studify-ai-automation" className="text-[#93C5FD] hover:underline">Studify.uz</Link>.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Стоимость и сроки</h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            Запуск ИИ-чатбота для бизнеса в Ташкенте: от $1 000 (разработка, настройка сценария, подключение одного-двух
            каналов). Абонентское обслуживание — от $500/мес (обновления, дообучение, мониторинг). При интеграции с CRM,
            обучении на большой базе FAQ или подключении дополнительных каналов стоимость уточняется после аудита.
            Срок запуска базового сценария — 5–7 рабочих дней; полный цикл с интеграциями и обучением — 2–3 недели.
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
              Расскажите о вашем бизнесе и входящих заявках — мы предложим сценарий внедрения ИИ-чатбота и ориентир по срокам и бюджету.
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
          <h2 className="text-xl font-bold text-foreground mb-4">Подробнее по теме</h2>
          <ul className="space-y-2 text-[#94A3B8]">
            <li>
              <Link href="/ai-bot-tashkent" className="text-[#93C5FD] hover:underline">
                AI-бот для бизнеса в Ташкенте — полное руководство
              </Link>
            </li>
            <li>
              <Link href="/tashkent" className="text-[#93C5FD] hover:underline">
                Автоматизация бизнеса в Ташкенте
              </Link>
            </li>
            <li>
              <Link href="/telegram-bot-dlya-biznesa" className="text-[#93C5FD] hover:underline">
                Telegram-бот для бизнеса
              </Link>
            </li>
            <li>
              <Link href="/blog/ai-chatbot-dlya-biznesa-uzbekistan" className="text-[#93C5FD] hover:underline">
                AI-чатбот для бизнеса в Узбекистане — блог
              </Link>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
