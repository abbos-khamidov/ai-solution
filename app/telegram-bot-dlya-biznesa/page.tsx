import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LandingHeroImage } from '@/components/shared/LandingHeroImage';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/telegram-bot-dlya-biznesa';
const TITLE = 'Telegram-бот для бизнеса — автоматизация продаж';
const DESCRIPTION =
  'Разработка Telegram-бота для бизнеса в Узбекистане: приём заявок, квалификация лидов, автоответы 24/7. Цены, кейсы, бесплатный аудит.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    'телеграм бот для бизнеса узбекистан, telegram бот ташкент, бот для продаж телеграм, автоматизация телеграм узбекистан',
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
    q: 'Сколько стоит разработка Telegram-бота для бизнеса в Узбекистане?',
    a: 'Стоимость зависит от сценария: простой бот для приёма заявок — от $1 500, бот с ИИ и квалификацией лидов — от $2 500. Поддержка и доработки — от $300/мес. Точную оценку даём после бесплатного аудита.',
  },
  {
    q: 'Чем Telegram-бот отличается от чатбота в Instagram?',
    a: 'Один и тот же ИИ-движок может работать в Telegram, Instagram и WhatsApp. Telegram часто выбирают первым каналом: быстрый старт, удобный API, высокая вовлечённость аудитории в Узбекистане. Позже подключаем остальные каналы без потери контекста.',
  },
  {
    q: 'Можно ли подключить бота к CRM?',
    a: 'Да. Интегрируем Telegram-бота с Bitrix24, amoCRM, 1С и другими системами: лиды и диалоги синхронизируются, менеджеры видят контекст в своей CRM.',
  },
  {
    q: 'За сколько запускается бот?',
    a: 'Базовый сценарий приёма заявок — 1–2 недели. Бот с ИИ, квалификацией и интеграциями — 2–4 недели. Сроки уточняются после обсуждения задач.',
  },
  {
    q: 'Работает ли бот на узбекском языке?',
    a: 'Да. Настраиваем бота на русском, узбекском и английском языках. Один бот может вести диалог сразу на нескольких языках — определяет язык клиента автоматически.',
  },
  {
    q: 'Можно ли подключить к Instagram и WhatsApp?',
    a: 'Да. Один и тот же ИИ-движок работает в Telegram, Instagram Direct и WhatsApp одновременно. Клиент может написать в любом канале — бот отвечает с сохранением контекста.',
  },
  {
    q: 'Что если клиент задаст нестандартный вопрос?',
    a: 'AI отвечает на основе базы знаний о вашем бизнесе. Если вопрос за пределами базы — бот вежливо переключает на менеджера и передаёт контекст разговора.',
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

export default function TelegramBotDlyaBiznesaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="min-h-screen bg-[#05050A] text-white pt-28 pb-16">
        <section className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-[#93C5FD] mb-3">Telegram-бот для бизнеса в Узбекистане</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Telegram-бот для бизнеса в Ташкенте — квалификация лидов 24/7
            </h1>
            <LandingHeroImage
              src="https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80"
              alt="Telegram-бот для бизнеса в Ташкенте — квалификация лидов и автоответы клиентам"
              title="Создание Telegram-ботов для автоматизации продаж в Узбекистане"
            />
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg leading-relaxed">
              В Узбекистане Telegram остаётся одним из главных каналов общения с клиентами: заявки приходят в любое
              время, а ручная обработка съедает время менеджеров и создаёт задержки в ответах. Telegram-бот для бизнеса
              автоматизирует приём заявок, отвечает на частые вопросы, квалифицирует лидов и передаёт горячих
              менеджерам с готовым контекстом. Так вы не теряете клиентов из-за долгого ответа и масштабируете приём
              заявок без пропорционального роста штата. Мы разрабатываем ботов под ключ в Ташкенте и по всему Узбекистану.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full border border-[#3B82F6]/40 text-[#93C5FD]">Узбекистан</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">Продажи 24/7</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Для каких задач подходит Telegram-бот</h2>
          <ul className="space-y-3 text-[#94A3B8] mb-6">
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span><strong>Приём заявок 24/7</strong> — бот отвечает клиентам в нерабочее время, ночью и в выходные. В Узбекистане клиенты пишут после 22:00 — без бота эти заявки теряются.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span><strong>Квалификация лидов</strong> — система Cold/Warm/Hot автоматически определяет готовность к покупке. Менеджер получает только горячих с контекстом диалога.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span><strong>Ответы на частые вопросы</strong> — цены, сроки, условия, наличие. Бот отвечает мгновенно на 80% типовых запросов без участия менеджера.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span><strong>Интеграция с CRM</strong> — лиды из Telegram, Instagram, WhatsApp попадают в Bitrix24 или amoCRM автоматически, с тегами и историей переписки.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span><strong>Уведомления команде</strong> — горячий лид даёт мгновенный алерт менеджеру с кратким резюме: кто, что хочет, какой бюджет.</li>
          </ul>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">
            Как Telegram-бот решает задачи бизнеса
          </h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            Telegram-бот может принимать заявки по сценарию: приветствие, уточнение услуги или продукта, сбор контактов
            и передача лида менеджеру. Более продвинутый вариант — ИИ-бот, который ведёт естественный диалог,
            отвечает на вопросы из FAQ, квалифицирует лидов по холодным/тёплым/горячим и передаёт только готовых к
            сделке с кратким контекстом. В обоих случаях бот работает 24/7, снижает нагрузку на менеджеров и даёт
            руководителю прозрачную воронку. В Узбекистане мы настраиваем ботов под локальную специфику: русский и
            узбекский языки, интеграция с локальными CRM и рекламными кабинетами.
          </p>
          <p className="text-[#94A3B8] leading-relaxed">
            Типичные сценарии: запись на консультацию или услугу, приём заказов, ответы по ценам и срокам, сбор
            обратной связи. Бота можно подключить к рекламе (переход в Telegram из соцсетей или поиска), к сайту
            (виджет «Написать в Telegram») и к внутренним системам компании. Таким образом, Telegram-бот становится
            единой точкой входа для клиентов и разгружает отдел продаж от рутинных первых контактов.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">
            Что получает бизнес после внедрения
          </h2>
          <ul className="space-y-3 text-[#94A3B8]">
            <li className="flex gap-2">
              <span className="text-[#3B82F6]">•</span>
              Приём заявок в Telegram 24/7 без потерь из-за нерабочего времени.
            </li>
            <li className="flex gap-2">
              <span className="text-[#3B82F6]">•</span>
              Быстрый первый ответ — клиент не уходит к тем, кто ответил раньше.
            </li>
            <li className="flex gap-2">
              <span className="text-[#3B82F6]">•</span>
              Квалификация лидов и передача только релевантных заявок менеджерам.
            </li>
            <li className="flex gap-2">
              <span className="text-[#3B82F6]">•</span>
              Возможность позже подключить Instagram и WhatsApp к тому же ИИ без потери истории.
            </li>
          </ul>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Реальный результат: кейс MarsIT</h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            IT-компания в Ташкенте (MarsIT) обрабатывала входящие заявки вручную. Менеджеры отвечали через 3–4 часа — горячие лиды успевали уйти к конкурентам. Значительная часть обращений оказывалась нецелевой: студенты, фрилансеры, нерелевантные запросы. Менеджеры тратили время на отсев вместо закрытия сделок.
          </p>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            Мы внедрили AI-бот в Telegram с трёхуровневой квалификацией Cold/Warm/Hot. Бот ведёт диалог, выясняет потребность и бюджет, присваивает статус и действует по сценарию: горячих передаёт менеджеру с контекстом, холодных греет автоматически.
          </p>
          <ul className="space-y-2 text-[#94A3B8] mb-4">
            <li>Время первого ответа: с 4 часов → до 30 секунд</li>
            <li>Конверсия лидов в сделку: +35% за первые 6 недель</li>
            <li>Пропущенные заявки ночью: 0</li>
          </ul>
          <p>
            <Link href="/cases/marsit-lead-automation" className="text-[#93C5FD] hover:underline font-medium">Читать полный кейс MarsIT →</Link>
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Как проходит внедрение</h2>
          <ol className="space-y-3 text-[#94A3B8] list-decimal list-inside mb-6">
            <li><strong>Аудит и постановка задачи (день 1–2)</strong> — разбираем вашу воронку, определяем узкие места, составляем техзадание на сценарии бота.</li>
            <li><strong>Разработка сценариев (день 3–7)</strong> — пишем диалоги, настраиваем квалификационные вопросы, прописываем логику Cold/Warm/Hot.</li>
            <li><strong>Интеграция и тестирование (день 8–12)</strong> — подключаем к вашему Telegram/Instagram/WhatsApp, настраиваем CRM-интеграцию, тестируем 50+ сценариев.</li>
            <li><strong>Запуск и поддержка</strong> — запускаем в продакшн, первые 2 недели мониторим, дорабатываем по результатам. Затем — ежемесячная поддержка.</li>
          </ol>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Стоимость и сроки</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Простой Telegram-бот для приёма заявок — от $1 500. ИИ-бот с квалификацией лидов и интеграциями — от $2 500.
            Поддержка — от $300/мес. Срок запуска базового бота — 1–2 недели, с ИИ и интеграциями — 2–4 недели.
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
                <summary className="cursor-pointer p-5 text-[#F8FAFC] font-semibold list-none flex items-center justify-between gap-4">
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
              Опишите задачу — мы предложим сценарий бота и ориентир по стоимости и срокам.
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
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-4">Читайте также</h2>
          <ul className="space-y-2 text-[#94A3B8]">
            <li>
              <Link href="/" className="text-[#93C5FD] hover:underline">Главная — AI Solution</Link>
            </li>
            <li>
              <Link href="/ii-chatbot-tashkent" className="text-[#93C5FD] hover:underline">ИИ чатбот для бизнеса в Ташкенте</Link>
            </li>
            <li>
              <Link href="/blog/avtomatizaciya-prodazh-telegram" className="text-[#93C5FD] hover:underline">Автоматизация продаж в Telegram — блог</Link>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
