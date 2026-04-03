import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { BreadcrumbSchema } from '@/components/schemas/BreadcrumbSchema';
import { FAQSchema } from '@/components/schemas/FAQSchema';
import { DEFAULT_TWITTER_IMAGE, SITE_URL } from '@/lib/seo';

const SLUG = '/biznes-avtomatizaciya-uzbekistan';
const TITLE = 'Автоматизация бизнеса в Узбекистане — ИИ-решения под ключ | AI Solution';
const DESCRIPTION =
  'Автоматизируем продажи, поддержку и бизнес-процессы с помощью ИИ. 120+ B2B компаний в Ташкенте и СНГ. Запуск от 10 дней. Бесплатный тест.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    'бизнес автоматизация узбекистан, автоматизация бизнеса ташкент, ии автоматизация узбекистан, внедрение ии бизнес узбекистан',
  alternates: { canonical: 'https://aisolution.uz/biznes-avtomatizaciya-uzbekistan/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${SLUG}/`,
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

const breadcrumbItems = [
  { name: 'Главная', url: 'https://aisolution.uz/' },
  { name: 'Автоматизация бизнеса в Узбекистане', url: 'https://aisolution.uz/biznes-avtomatizaciya-uzbekistan/' },
];

const faqItems = [
  {
    question: 'Сколько стоит автоматизация бизнеса с ИИ?',
    answer:
      'Стоимость зависит от задач. Простые боты — от $300. Комплексные ИИ-системы — от $1000. Все проекты начинаются с бесплатной консультации.',
  },
  {
    question: 'Для каких бизнесов подходит ИИ-автоматизация?',
    answer:
      'Для любого B2B и B2C бизнеса с потоком входящих запросов: торговля, логистика, образование, медицина, недвижимость, рестораны, юридические услуги.',
  },
  {
    question: 'Нужны ли технические знания для работы с ИИ-системой?',
    answer:
      'Нет. Мы настраиваем всё под ключ и обучаем команду. Управление через простой интерфейс без программирования.',
  },
  {
    question: 'Работает ли ИИ с узбекским языком?',
    answer:
      'Да, наши решения работают на русском, узбекском и английском языках с автоматическим определением языка клиента.',
  },
];

const stats = [
  { value: '120+', label: 'B2B компаний' },
  { value: '30 сек', label: 'время ответа ИИ' },
  { value: '10 дней', label: 'запуск проекта' },
  { value: '24/7', label: 'работает без выходных' },
];

const services = [
  { title: 'ИИ-бот для клиентского сервиса', href: '/products/customer-service/' },
  { title: 'ИИ-менеджер по продажам', href: '/services/ai-managers/' },
  { title: 'Telegram боты для бизнеса', href: '/telegram-bot-dlya-biznesa/' },
  { title: 'WhatsApp боты', href: '/whatsapp-bot-dlya-biznesa/' },
  { title: 'Корпоративный AI (RAG)', href: '/products/corporate-ai/' },
  { title: 'Аналитика с ИИ', href: '/products/ai-analytics/' },
];

const steps = [
  { title: 'Бесплатная консультация', text: 'Разбираем задачи бизнеса' },
  { title: 'Разработка', text: 'Создаём ИИ-решение под ваши процессы' },
  { title: 'Интеграция', text: 'Подключаем к CRM, мессенджерам, 1С' },
  { title: 'Запуск и поддержка', text: 'Сопровождаем после старта' },
];

const ctaClass =
  'inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold hover:opacity-90 transition-opacity';

export default function BiznesAvtomatizaciyaUzbekistanPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema items={faqItems} />
      <Header />
      <main className="min-h-screen bg-background text-foreground pb-16">
        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-6">
          <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-[#93C5FD] mb-3">Автоматизация бизнеса в Узбекистане</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Автоматизация бизнеса в Узбекистане с помощью ИИ
            </h1>
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg leading-relaxed">
              Внедряем искусственный интеллект в продажи, клиентский сервис и внутренние процессы. 120+ компаний уже
              работают с нами.
            </p>
            <Link href="/#contact" className={`mt-8 ${ctaClass}`}>
              Начать проект →
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center"
              >
                <p className="text-2xl md:text-3xl font-bold text-[#93C5FD]">{s.value}</p>
                <p className="mt-2 text-sm text-[#94A3B8]">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-14">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Что мы автоматизируем</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-[#3B82F6]/40 hover:bg-white/[0.04] transition-colors"
              >
                <span className="text-foreground font-semibold group-hover:text-[#93C5FD] transition-colors">
                  {item.title}
                </span>
                <span className="mt-2 block text-sm text-[#64748B]">Подробнее →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-14">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Как мы работаем</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3B82F6]/20 text-[#93C5FD] font-bold">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{step.title}</p>
                  <p className="mt-1 text-sm text-[#94A3B8] leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-14">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Кейсы автоматизации</h2>
          <p className="text-[#94A3B8] mb-4 max-w-3xl">
            Реальные проекты: рост продаж, квалификация лидов и автоматизация коммуникаций для B2B в Узбекистане и СНГ.
          </p>
          <Link href="/cases/" className="text-[#93C5FD] font-semibold hover:underline">
            Смотреть все кейсы →
          </Link>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Часто задаваемые вопросы</h2>
          <div className="space-y-4">
            {faqItems.map(({ question, answer }) => (
              <details
                key={question}
                className="group rounded-xl border border-white/10 bg-white/[0.02] open:bg-white/[0.04] transition-colors"
              >
                <summary className="cursor-pointer p-5 text-foreground font-semibold list-none flex items-center justify-between gap-4">
                  {question}
                  <span className="shrink-0 text-[#64748B] group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-[#94A3B8] leading-relaxed">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-14">
          <div className="rounded-2xl p-8 md:p-10 border border-[#3B82F6]/30 bg-[#3B82F6]/10">
            <h2 className="text-2xl md:text-3xl font-bold">Готовы автоматизировать бизнес?</h2>
            <p className="mt-3 text-[#CFE2FF] max-w-3xl">
              Расскажите о своей задаче — предложим решение и посчитаем стоимость бесплатно.
            </p>
            <Link href="/#contact" className={`mt-6 ${ctaClass}`}>
              Получить консультацию →
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-xl font-bold text-foreground mb-4">Читайте также</h2>
          <ul className="space-y-2 text-[#94A3B8]">
            <li>
              <Link href="/tashkent" className="text-[#93C5FD] hover:underline">
                Автоматизация бизнеса в Ташкенте
              </Link>
            </li>
            <li>
              <Link href="/ii-avtomatizaciya-uzbekistan" className="text-[#93C5FD] hover:underline">
                ИИ автоматизация в Узбекистане
              </Link>
            </li>
            <li>
              <Link href="/sravnenie-ai-reshenii-uzbekistan" className="text-[#93C5FD] hover:underline">
                Сравнение AI-решений для бизнеса в Узбекистане
              </Link>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
