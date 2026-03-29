import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LandingHeroImage } from '@/components/shared/LandingHeroImage';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/crm-integraciya-tashkent';
const TITLE = 'Интеграция ИИ с CRM системами в Ташкенте';
const DESCRIPTION =
  'Интеграция ИИ-ботов с CRM в Ташкенте: Bitrix24, amoCRM, 1С. Лиды и диалоги в одной системе, уведомления менеджерам, прозрачная воронка.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'crm интеграция ии ташкент, ии bitrix24 ташкент, amocrm ии бот ташкент, интеграция чатбота с crm узбекистан',
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${SLUG}`, type: 'website', locale: 'ru_RU', siteName: 'AI Solution', images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  robots: { index: true, follow: true },
};

const faqItems = [
  { q: 'С какими CRM интегрируете ИИ-бота в Ташкенте?', a: 'Bitrix24, amoCRM, 1С и другие системы с API. Лиды из диалогов создаются или обновляются в CRM, диалоги привязываются к карточке, менеджеры получают уведомления о горячих лидах.' },
  { q: 'Сколько стоит интеграция ИИ-бота с CRM?', a: 'Зависит от CRM и объёма полей: от $500 за базовую интеграцию (создание лида, передача контекста) до $1 500 и выше при сложной синхронизации и кастомных полях. Оценка после аудита.' },
  { q: 'Сохраняется ли история диалогов в CRM?', a: 'Да. При интеграции диалоги сохраняются в карточке лида или сделки, менеджер видит контекст переписки без переключения между системами.' },
  { q: 'Можно ли передавать только горячих лидов в CRM?', a: 'Да. Настраиваем фильтр: например, только статус Hot попадает в CRM или создаёт сделку; холодные остаются в воронке бота до квалификации.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function CrmIntegraciyaTashkentPage() {
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
            <p className="text-sm text-[#93C5FD] mb-3">Интеграция ИИ с CRM в Ташкенте</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">Интеграция AI-бота с CRM в Ташкенте — Bitrix24, amoCRM, 1C</h1>
            <LandingHeroImage
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
              alt="CRM интеграция с AI-ботом в Ташкенте — Bitrix24 amoCRM 1C подключение"
              title="Интеграция AI-ботов с CRM системами в Узбекистане"
            />
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg leading-relaxed">
              ИИ-бот принимает заявки в Telegram, Instagram и на сайте, квалифицирует лидов и передаёт горячих менеджерам. Чтобы менеджеры не дублировали работу и видели полную картину, бота интегрируют с CRM: лиды и диалоги попадают в Bitrix24, amoCRM, 1С или другую систему. Менеджер получает уведомление с контекстом и сразу видит историю переписки в карточке лида. В Ташкенте и Узбекистане мы настраиваем интеграцию ИИ с популярными CRM под ваши процессы — единая воронка, без потери контекста и двойного ввода.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full border border-[#3B82F6]/40 text-[#93C5FD]">Ташкент</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">Bitrix24, amoCRM, 1С</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Как работает интеграция ИИ с CRM</h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            ИИ-бот ведёт диалог в мессенджерах или на сайте. При создании лида (или при присвоении статуса Hot) данные передаются в CRM: имя, контакт, источник, краткое резюме диалога. История переписки сохраняется в карточке лида или в комментариях. Менеджер получает уведомление (в CRM, в Telegram или по email) и открывает карточку с полным контекстом. Дополнительно можно синхронизировать этапы сделки: когда менеджер переводит лид в сделку или закрывает — бот может получать обратную связь для аналитики. Для компаний в Ташкенте мы настраиваем интеграцию под вашу CRM и поля: какие данные передавать, когда создавать лид, как помечать источник (Telegram, Instagram, сайт).
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Что получает бизнес после интеграции</h2>
          <ul className="space-y-3 text-[#94A3B8]">
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Единая воронка: все лиды из бота в CRM без ручного ввода.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Контекст диалога в карточке лида — менеджер не теряет историю.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Уведомления о горячих лидах в привычной системе.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Аналитика по источникам и конверсии в CRM.</li>
          </ul>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Стоимость и сроки</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Базовая интеграция ИИ-бота с CRM (создание лида, передача контекста, уведомление) — от $500. Сложная синхронизация полей, этапов и отчётов — от $1 000 и выше. Срок — от 1 до 3 недель в зависимости от CRM и объёма. Оценка после аудита вашей системы.
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
            <p className="mt-3 text-[#CFE2FF] max-w-3xl">Укажите вашу CRM и формат лидов — предложим вариант интеграции и ориентир по стоимости.</p>
            <Link href="/#contact" className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold">Обсудить проект</Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-xl font-bold text-foreground mb-4">Читайте также</h2>
          <ul className="space-y-2 text-[#94A3B8]">
            <li><Link href="/services/ai-managers" className="text-[#93C5FD] hover:underline">Бот-менеджер для Telegram, WhatsApp, Instagram</Link></li>
            <li><Link href="/avtomatizaciya-prodazh-tashkent" className="text-[#93C5FD] hover:underline">Автоматизация продаж в Ташкенте</Link></li>
            <li><Link href="/tashkent" className="text-[#93C5FD] hover:underline">Автоматизация бизнеса в Ташкенте</Link></li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
