import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/chatgpt-dlya-biznesa-uzbekistan';
const TITLE = 'ChatGPT для бизнеса в Узбекистане — интеграция';
const DESCRIPTION =
  'ChatGPT для бизнеса в Узбекистане: интеграция в мессенджеры, обучение на данных компании, RAG. Ташкент, цены, отличия от публичного ChatGPT.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'chatgpt для бизнеса узбекистан, интеграция chatgpt ташкент, свой chatgpt для компании узбекистан, llm для бизнеса ташкент',
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${SLUG}`, type: 'website', locale: 'ru_RU', siteName: 'AI Solution', images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  robots: { index: true, follow: true },
};

const faqItems = [
  { q: 'Чем ChatGPT для бизнеса отличается от обычного ChatGPT?', a: 'Публичный ChatGPT не знает ваших данных, не интегрирован с мессенджерами и CRM. «Свой» ChatGPT для бизнеса — это ИИ, обученный или дополненный вашей базой знаний (RAG), работающий в Telegram/Instagram/на сайте и при необходимости интегрированный с CRM. Он отвечает в контексте вашей компании и процессов.' },
  { q: 'Сколько стоит внедрение ChatGPT для бизнеса в Узбекистане?', a: 'Зависит от формата: бот с обучением на ваших FAQ и сценариях — от $1 000 за запуск + от $500/мес. Корпоративная база знаний (RAG) с поиском по документам — от $8 000. Интеграция в мессенджеры и CRM — по смете. Оценка после аудита задач.' },
  { q: 'Можно ли подключить к Telegram и сайту?', a: 'Да. ИИ на базе LLM (в т.ч. совместимых с ChatGPT) подключается к Telegram, Instagram, WhatsApp и виджету на сайте. Один движок — единые ответы и контекст во всех каналах.' },
  { q: 'Где хранятся данные компании?', a: 'Настраивается под ваши требования: облако с ограничением доступа или on-premise (ваш сервер). Обучение на ваших данных не означает передачу их в публичные сервисы OpenAI — можно использовать развёрнутые у себя или в доверенном облаке модели.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function ChatgptDlyaBiznesaUzbekistanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="min-h-screen bg-[#05050A] text-white pt-28 pb-16">
        <section className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-[#93C5FD] mb-3">ChatGPT для бизнеса в Узбекистане</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">ChatGPT для бизнеса в Узбекистане — корпоративный AI-ассистент под ваши задачи</h1>
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg leading-relaxed">
              Публичный ChatGPT удобен для личных задач, но не знает ваших продуктов, цен и процессов и не встроен в мессенджеры и CRM. ChatGPT для бизнеса — это интеграция возможностей больших языковых моделей (LLM) под вашу компанию: ИИ обучается на ваших данных или получает доступ к базе знаний (RAG), работает в Telegram, на сайте и при необходимости в других каналах, квалифицирует лидов и передаёт их в CRM. В Узбекистане мы внедряем такие решения в Ташкенте и по всей стране: от чатбота для продаж до корпоративной базы знаний.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full border border-[#3B82F6]/40 text-[#93C5FD]">Узбекистан</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">Интеграция</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Зачем бизнесу свой ChatGPT</h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            Свой ChatGPT для компании решает несколько задач. Первая — общение с клиентами в контексте вашего продукта: цены, условия, услуги, доставка. Вторая — квалификация лидов и передача горячих менеджерам с контекстом. Третья — внутреннее использование: поиск по документам, ответы на вопросы сотрудников из базы знаний (регламенты, инструкции, контракты). Всё это возможно при обучении модели на ваших данных или подключении RAG (retrieval-augmented generation): модель дополняет ответы информацией из вашей базы документов. Данные при этом могут оставаться на вашей инфраструктуре.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Варианты внедрения в Узбекистане</h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            Лёгкий вариант — чатбот для мессенджеров и сайта, обученный на ваших FAQ и сценариях продаж. Клиенты получают ответы в духе ChatGPT, но в контексте вашей компании. Средний — тот же бот плюс интеграция с CRM и аналитикой. Продвинутый — корпоративная база знаний (RAG): сотрудники и при необходимости клиенты задают вопросы по вашим документам, ИИ находит релевантные фрагменты и формирует ответ. В AI Solution мы реализуем все три уровня: от быстрого запуска бота до развёртывания RAG на ваших серверах при необходимости.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Стоимость и сроки</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Чатбот с возможностями LLM для клиентов — от $1 000 за запуск + от $500/мес. Корпоративная база знаний (RAG) — от $8 000. Интеграция с мессенджерами, CRM и кастомная настройка — по смете после аудита. Срок запуска бота — 5–7 рабочих дней, RAG — от 2–4 недель.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Частые вопросы</h2>
          <div className="space-y-4">
            {faqItems.map(({ q, a }) => (
              <details key={q} className="group rounded-xl border border-white/10 bg-white/[0.02] open:bg-white/[0.04] transition-colors">
                <summary className="cursor-pointer p-5 text-[#F8FAFC] font-semibold list-none flex items-center justify-between gap-4">{q}<span className="shrink-0 text-[#64748B] group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
                <p className="px-5 pb-5 text-[#94A3B8] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <div className="rounded-2xl p-7 border border-[#3B82F6]/30 bg-[#3B82F6]/10">
            <h2 className="text-2xl md:text-3xl font-bold">Обсудить интеграцию ChatGPT под ваш бизнес</h2>
            <p className="mt-3 text-[#CFE2FF] max-w-3xl">Опишите задачу: общение с клиентами, база знаний или оба направления — предложим вариант и смету.</p>
            <Link href="/#contact" className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold">Обсудить проект</Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-4">Читайте также</h2>
          <ul className="space-y-2 text-[#94A3B8]">
            <li><Link href="/ai-bot-tashkent" className="text-[#93C5FD] hover:underline">AI-бот для бизнеса в Ташкенте</Link></li>
            <li><Link href="/products/corporate-ai" className="text-[#93C5FD] hover:underline">Corporate AI (RAG) — база знаний компании</Link></li>
            <li><Link href="/blog/sozdat-chatgpt-dlya-kompanii" className="text-[#93C5FD] hover:underline">Как создать ChatGPT для компании — блог</Link></li>
            <li><Link href="/sravnenie-ai-reshenii-uzbekistan" className="text-[#93C5FD] hover:underline">Сравнение AI-решений для бизнеса в Узбекистане</Link></li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
