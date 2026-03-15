import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LandingHeroImage } from '@/components/shared/LandingHeroImage';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/ii-dlya-nedvizhimosti-tashkent';
const TITLE = 'ИИ для агентств недвижимости Ташкента';
const DESCRIPTION =
  'ИИ для риелторов и агентств недвижимости в Ташкенте: квалификация лидов 24/7, подбор объектов по запросу, запись на просмотр. Кейсы, цены, аудит.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'ии недвижимость ташкент, ии для риелторов, бот для агентства недвижимости ташкент, автоматизация недвижимость узбекистан',
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${SLUG}`, type: 'website', locale: 'ru_RU', siteName: 'AI Solution', images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [{ url: DEFAULT_TWITTER_IMAGE }] },
  robots: { index: true, follow: true },
};

const faqItems = [
  { q: 'Сколько стоит внедрение ИИ для агентства недвижимости в Ташкенте?', a: 'Запуск бота для приёма заявок и квалификации лидов — от $1 000 + от $500/мес. С подбором объектов по критериям и интеграцией с CRM — от $2 000 за запуск. Смета после аудита.' },
  { q: 'Может ли бот подбирать объекты по запросу клиента?', a: 'Да. Настраиваем сценарий: клиент описывает бюджет, район, тип жилья — бот уточняет детали и может показывать подходящие объекты из вашей базы или передавать запрос агенту с готовой квалификацией.' },
  { q: 'В каких каналах работает?', a: 'Telegram, Instagram, WhatsApp, виджет на сайте. Один ИИ ведёт диалоги во всех каналах, квалифицирует лидов и передаёт горячих агентам с контекстом.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function IiDlyaNedvizhimostiTashkentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="min-h-screen bg-[#05050A] text-white pt-28 pb-16">
        <section className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-[#93C5FD] mb-3">ИИ для недвижимости в Ташкенте</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">AI для агентств недвижимости в Ташкенте — квалификация покупателей автоматически</h1>
            <LandingHeroImage
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
              alt="AI для недвижимости в Ташкенте — автоматическая квалификация покупателей и арендаторов"
              title="Внедрение AI в агентства недвижимости Ташкента"
            />
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg leading-relaxed">
              Агентства недвижимости в Ташкенте получают десятки обращений в день: в мессенджерах, на сайте, по телефону. Пока агент не успевает ответить, клиент может уйти к конкуренту или потерять интерес. ИИ для недвижимости решает это: бот отвечает за 30 секунд, уточняет бюджет и критерии, квалифицирует лида (аренда/покупка, срочность) и либо подбирает объекты по базе, либо передаёт горячего клиента агенту с готовым контекстом. Запись на просмотр и ответы на типовые вопросы — круглосуточно, без потерь лидов.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full border border-[#3B82F6]/40 text-[#93C5FD]">Ташкент</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">Квалификация 24/7</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Как ИИ решает задачи агентств недвижимости</h2>
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            ИИ-бот ведёт диалог с клиентом: выясняет цель (покупка, аренда), бюджет, район, тип объекта и срочность. Отвечает на частые вопросы о документах, сроках и процедурах. На основе ответов присваивает статус лиду и либо предлагает подходящие объекты (если база подключена), либо передаёт квалифицированную заявку агенту с кратким резюме. Для агентств в Ташкенте мы настраиваем сценарии под ваши объекты и процессы, при необходимости интегрируем с CRM и каналами размещения. В результате первый контакт с клиентом не теряется, агенты получают только готовых к диалогу лидов, а воронка становится прозрачной.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Что получает агентство после внедрения</h2>
          <ul className="space-y-3 text-[#94A3B8]">
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Ответ клиенту за 30 секунд — меньше уходов к конкурентам.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Квалификация лидов: аренда/покупка, бюджет, срочность — агенты работают с готовым контекстом.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Приём заявок и запись на просмотр 24/7.</li>
            <li className="flex gap-2"><span className="text-[#3B82F6]">•</span>Разгрузка агентов от рутинных первых контактов.</li>
          </ul>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">Стоимость и сроки</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Запуск ИИ для агентства недвижимости — от $1 000 (базовый сценарий приёма и квалификации) + от $500/мес. С подбором объектов и интеграцией с CRM — от $2 000 за запуск. Срок базового запуска — 5–7 рабочих дней, с интеграциями — 2–3 недели.
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
            <h2 className="text-2xl md:text-3xl font-bold">Получить бесплатный аудит</h2>
            <p className="mt-3 text-[#CFE2FF] max-w-3xl">Опишите поток лидов и каналы — предложим сценарий ИИ под ваше агентство.</p>
            <Link href="/#contact" className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold">Обсудить проект</Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-4">Читайте также</h2>
          <ul className="space-y-2 text-[#94A3B8]">
            <li><Link href="/tashkent" className="text-[#93C5FD] hover:underline">Автоматизация бизнеса в Ташкенте</Link></li>
            <li><Link href="/avtomatizaciya-prodazh-tashkent" className="text-[#93C5FD] hover:underline">Автоматизация продаж в Ташкенте</Link></li>
            <li><Link href="/blog/ai-chatbot-dlya-biznesa-uzbekistan" className="text-[#93C5FD] hover:underline">AI чат-бот для бизнеса в Узбекистане</Link></li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
