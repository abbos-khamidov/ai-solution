import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { CasePreviewCard } from '@/components/sections/CasePreviewCard';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/tashkent';
const TITLE = 'Автоматизация бизнеса в Ташкенте — внедрение искусственного интеллекта';
const DESCRIPTION =
  'Автоматизация бизнеса в Ташкенте: внедрение искусственного интеллекта, бот-менеджер продаж, ассистент руководителя, аудит-бот. ИИ в Ташкенте — кейсы Studify.uz и Marsit.uz.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'автоматизация бизнеса в Ташкенте',
    'внедрение искусственного интеллекта в Ташкенте',
    'ИИ в Ташкенте',
    'автоматизация бизнеса Ташкент',
    'внедрение ИИ Ташкент',
    'искусственный интеллект Ташкент',
    'автоматизация в Ташкенте',
    'бот менеджер продаж Ташкент',
    'ассистент руководителя AI Ташкент',
    'Studify uz кейс',
    'Marsit uz кейс',
    'Toshkentda biznes avtomatlashtirish',
    "sun'iy intellekt Toshkent",
  ],
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${SLUG}`,
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['uz_UZ'],
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

const caseStudies = [
  {
    title: 'Studify.uz',
    sector: 'Образование / EdTech',
    goal: 'Ускорить первичный ответ и улучшить квалификацию входящих лидов.',
    solution: 'AI-бот для коммуникаций + управленческие сводки по KPI.',
    result: 'Ответ клиентам за секунды и прозрачная воронка для руководителя.',
    href: '/cases/studify-ai-automation',
  },
  {
    title: 'Marsit.uz',
    sector: 'IT-услуги / B2B',
    goal: 'Не терять заявки в нерабочее время и повысить конверсию в звонок.',
    solution: 'AI-квалификация Cold/Warm/Hot и передача горячих лидов менеджеру.',
    result: 'Стабильный прием лидов 24/7 и рост доли качественных заявок.',
    href: '/cases/marsit-lead-automation',
  },
];

const faqItems = [
  {
    q: 'Сколько стоит внедрение AI-бота для бизнеса в Ташкенте?',
    a: 'Customer Service Bot — от $1 000 (запуск) + $500/мес. Management Assistant — от $3 000 + $1 200/мес. Точная цена определяется после бесплатного 60-минутного аудита.',
  },
  {
    q: 'За сколько дней запускается бот-менеджер?',
    a: 'Базовый бот-менеджер запускается за 5–7 рабочих дней. Полный пакет с CRM-интеграцией и обучением на данных компании — 2–3 недели.',
  },
  {
    q: 'Работаете ли вы за пределами Ташкента?',
    a: 'Да, AI Solution обслуживает компании по всему Узбекистану: Самарканд, Фергана, Андижан, Наманган, Бухара. Также работаем с клиентами из Казахстана, Кыргызстана и Таджикистана.',
  },
  {
    q: 'Можно ли начать только с одного канала — Telegram?',
    a: 'Да, большинство клиентов начинают именно с Telegram. Потом при необходимости подключаем Instagram и WhatsApp без потери данных и контекста диалогов.',
  },
  {
    q: 'Как AI-бот квалифицирует лидов?',
    a: 'Бот ведёт естественный диалог, выясняет потребности и бюджет, присваивает статус Cold/Warm/Hot. Горячие лиды мгновенно передаются менеджеру с контекстом.',
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'AI в Ташкенте', item: `${SITE_URL}${SLUG}` },
  ],
};

const localServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Автоматизация бизнеса и внедрение искусственного интеллекта в Ташкенте',
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: { '@type': 'City', name: 'Ташкент' },
  description: DESCRIPTION,
  url: `${SITE_URL}${SLUG}`,
  serviceType: 'AI Chatbot / Sales Automation',
};

export default function TashkentLocalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localServiceSchema) }} />
      <Header />
      <main className="min-h-screen bg-[#05050A] text-white pt-28 pb-16">
        <section className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-[#93C5FD] mb-3">Внедрение искусственного интеллекта в Ташкенте</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              AI-автоматизация бизнеса в Ташкенте — внедрение ботов и ИИ под ключ
            </h1>
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg">
              Внедрение искусственного интеллекта в Узбекистане: бот-менеджер продаж, ассистент
              руководителя, аудит-бот и AI-аналитика. Два кейса автоматизации в Ташкенте: Studify.uz и Marsit.uz.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full border border-[#3B82F6]/40 text-[#93C5FD]">Ташкент</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">Ответ за 30 секунд</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">Поддержка 24/7</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold">Кейсы автоматизации бизнеса в Ташкенте</h2>
          <p className="mt-2 text-[#94A3B8]">
            Практические сценарии внедрения искусственного интеллекта в продажах и управлении в Ташкенте.
          </p>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {caseStudies.map((item) => (
              <CasePreviewCard
                key={item.title}
                title={item.title}
                sector={item.sector}
                goal={item.goal}
                solution={item.solution}
                result={item.result}
                href={item.href}
              />
            ))}
          </div>
        </section>

        {/* Services for Tashkent */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold">Услуги автоматизации и внедрения ИИ в Ташкенте</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Бот-менеджер продаж', desc: 'Отвечает клиентам за 30 сек в Telegram, Instagram, WhatsApp. Квалификация лидов 24/7.', href: '/services/ai-managers', color: '#3B82F6' },
              { title: 'Ассистент руководителя', desc: 'Ежедневные сводки, KPI, финансовый трекер, контроль команды — всё в Telegram.', href: '/products/management-assistant', color: '#06B6D4' },
              { title: 'Telegram-боты', desc: 'Автоматизация продаж, поддержка клиентов, приём платежей. От $1 500.', href: '/services/telegram-bots', color: '#7C3AED' },
              { title: 'AI-аналитика', desc: 'Дашборды и KPI в реальном времени. Интеграция с 1С, Bitrix24, Google Sheets.', href: '/services/analytics', color: '#F59E0B' },
              { title: 'Личный AI-ассистент', desc: 'ChatGPT обученный на данных вашей компании. Экономит 15 часов в неделю.', href: '/services/ai-assistant', color: '#10B981' },
              { title: 'Разработка ПО', desc: 'React, Next.js, Flutter, iOS, Android. AI-интеграции. От $5 000.', href: '/services/software-development', color: '#EF4444' },
            ].map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                className="group block p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:-translate-y-0.5 transition-all"
              >
                <h3 className="font-bold text-[#F8FAFC] mb-1">{svc.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{svc.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <div className="rounded-2xl p-7 border border-[#3B82F6]/30 bg-[#3B82F6]/10">
            <h2 className="text-2xl md:text-3xl font-bold">AI решения для бизнеса в Ташкенте</h2>
            <p className="mt-3 text-[#CFE2FF] max-w-3xl">
              Нужна единая коммерческая страница по внедрению AI: с этапами, сроками, стоимостью,
              кейсами и формой аудита бизнеса.
            </p>
            <Link
              href="/ai-dlya-biznesa"
              className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold"
            >
              Перейти на страницу AI для бизнеса
            </Link>
          </div>
        </section>

        {/* FAQ */}
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

        {/* Geography */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">География</h2>
          <p className="text-[#94A3B8] max-w-3xl">
            Офис AI Solution находится в Ташкенте (ул. Афросиёб 35). Также работаем с компаниями
            из Самарканда, Ферганы, Андижана, Намангана, Бухары и других городов Узбекистана.
            Клиенты из Казахстана, Кыргызстана и Таджикистана — обслуживаем удалённо.
          </p>
        </section>

        {/* NAP */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <div className="rounded-2xl p-7 border border-white/10 bg-white/[0.02]">
            <h2 className="text-xl font-bold mb-4">Контакты в Ташкенте</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-[#64748B] mb-1">Телефоны</p>
                <a href="tel:+998770612200" className="block text-[#F8FAFC] font-medium hover:underline">+998 77 061 22 00</a>
                <a href="tel:+998950000065" className="block text-[#F8FAFC] font-medium hover:underline">+998 95 000 00 65</a>
                <a href="tel:+998939492000" className="block text-[#F8FAFC] font-medium hover:underline">+998 93 949 20 00</a>
              </div>
              <div>
                <p className="text-[#64748B] mb-1">Email</p>
                <a href="mailto:info@aisolution.uz" className="text-[#F8FAFC] font-medium hover:underline">info@aisolution.uz</a>
              </div>
              <div>
                <p className="text-[#64748B] mb-1">Адрес</p>
                <p className="text-[#F8FAFC]">ул. Афросиёб 35, Ташкент, 100000</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <div className="rounded-2xl p-7 border border-[#3B82F6]/30 bg-[#3B82F6]/10">
            <h2 className="text-2xl md:text-3xl font-bold">Следующий шаг</h2>
            <p className="mt-3 text-[#CFE2FF] max-w-3xl">
              Если хотите такой же формат внедрения для вашей компании в Ташкенте, начнем с
              бесплатного аудита процесса продаж и определим оптимальную связку AI-ботов.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold"
              >
                Обсудить проект
              </Link>
              <Link
                href="/services/ai-managers"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-white/20 text-[#F8FAFC] hover:bg-white/5 transition-colors"
              >
                Подробнее про бот-менеджера
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
