import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { AiBusinessAuditForm } from '@/components/sections/AiBusinessAuditForm';
import { CasePreviewCard } from '@/components/sections/CasePreviewCard';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/ai-dlya-biznesa';
const TITLE = 'AI для бизнеса в Ташкенте и Узбекистане | AI Solution';
const DESCRIPTION =
  'Внедрение AI в Узбекистане: аудит процессов, автоматизация продаж и сервиса, LLM/RAG и аналитика. Запуск от 2 недель. Получите аудит бизнеса.';

const KEYWORDS = ['ai для бизнеса ташкент', 'внедрение ai узбекистан', 'автоматизация бизнеса ai'];

const solutions = [
  {
    title: 'Customer Service AI',
    text: 'Автоматизирует клиентский сервис и ускоряет ответы в основных каналах коммуникации.',
    href: '/products/customer-service',
  },
  {
    title: 'Management Assistant',
    text: 'AI-ассистент руководителя для контроля KPI, задач, отчётов и управленческих решений.',
    href: '/products/management-assistant',
  },
  {
    title: 'Corporate AI (LLM/RAG)',
    text: 'Корпоративный AI по базе компании: знания, регламенты, документы и поиск ответов.',
    href: '/products/corporate-ai',
  },
  {
    title: 'AI-аналитика и дашборды',
    text: 'KPI-дашборды, отчеты и AI-рекомендации руководителю на основе данных из CRM, рекламы и каналов коммуникаций.',
    href: '/products/ai-analytics',
  },
];

const rolloutStages = [
  'Диагностика бизнеса и поиск точек потерь',
  'Проектирование решения и KPI',
  'Разработка и интеграция с вашими системами',
  'Пилот и обучение команды',
  'Масштабирование и постоянная оптимизация',
];

const faqItems = [
  {
    q: 'Сколько стоит внедрение AI для бизнеса в Узбекистане?',
    a: 'Пилот обычно стартует от $1 500, более комплексные решения с интеграциями — от $8 000.',
  },
  {
    q: 'За сколько можно запустить первый AI-сценарий?',
    a: 'Базовый пилот запускается за 2–4 недели после аудита и согласования KPI.',
  },
  {
    q: 'Вы работаете только в Ташкенте?',
    a: 'Нет, внедряем AI-решения по всему Узбекистану и сопровождаем проекты удалённо.',
  },
  {
    q: 'Можно начать с одного отдела?',
    a: 'Да, обычно начинаем с одного процесса, после подтверждения результата расширяем на другие отделы.',
  },
  {
    q: 'Интегрируете ли вы AI с CRM и внутренними системами?',
    a: 'Да, подключаем CRM, ERP, таблицы и другие источники через API и безопасные коннекторы.',
  },
  {
    q: 'Как вы считаете ROI после внедрения?',
    a: 'Фиксируем KPI до старта и сравниваем после запуска: скорость ответа, конверсия, экономия часов и стоимость заявки.',
  },
  {
    q: 'Какие данные нужны для старта проекта?',
    a: 'Достаточно описания процесса, текущих метрик и доступа к рабочим каналам. Остальное донастроим на этапе аудита.',
  },
  {
    q: 'Как обеспечивается безопасность данных компании?',
    a: 'Используем разграничение доступов, изолированные контуры и правила хранения данных под требования бизнеса.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}${SLUG}#service`,
  name: 'AI для бизнеса в Ташкенте и Узбекистане',
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: [
    { '@type': 'City', name: 'Ташкент' },
    { '@type': 'Country', name: 'Узбекистан' },
  ],
  description: DESCRIPTION,
  url: `${SITE_URL}${SLUG}`,
  serviceType: 'AI Automation / LLM / RAG / Business Analytics',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
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

export default function AiDlyaBiznesaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="min-h-screen bg-[#05050A] text-white pt-28 pb-16">
        <section className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-[#93C5FD] mb-3">AI внедрение для B2B-компаний</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              AI для бизнеса в Ташкенте и Узбекистане
            </h1>
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg">
              AI анализирует бизнес, находит потери, автоматизирует процессы и помогает команде
              работать быстрее. Внедряем чат-ботов, LLM/RAG, аналитику и управленческие
              ассистенты под ваши KPI.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full border border-[#3B82F6]/40 text-[#93C5FD]">Аудит 45–60 минут</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">Первые гипотезы за 48 часов</span>
              <span className="px-3 py-1 rounded-full border border-white/15 text-[#CBD5E1]">Пилот от 2 недель</span>
            </div>
            <div className="mt-6">
              <a
                href="#audit-form"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold"
              >
                Получить аудит бизнеса
              </a>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold">Что делает AI для бизнеса</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="font-semibold text-[#F8FAFC]">Анализ продаж и маркетинга</h3>
              <p className="mt-2 text-[#94A3B8]">
                Выявляет, где теряются лиды, какие каналы дают слабый ROI и какие шаги увеличат
                конверсию.
              </p>
            </article>
            <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="font-semibold text-[#F8FAFC]">Автоматизация коммуникаций</h3>
              <p className="mt-2 text-[#94A3B8]">
                Отвечает клиентам 24/7, квалифицирует входящие заявки и передаёт команде горячие
                лиды с контекстом.
              </p>
            </article>
            <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="font-semibold text-[#F8FAFC]">Управление задачами</h3>
              <p className="mt-2 text-[#94A3B8]">
                Сокращает рутину, контролирует сроки, формирует сводки и помогает руководителю
                видеть статус задач в одном окне.
              </p>
            </article>
            <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="font-semibold text-[#F8FAFC]">Прогнозирование и рекомендации</h3>
              <p className="mt-2 text-[#94A3B8]">
                Строит прогноз спроса и нагрузки, предлагает оптимальные действия для роста и
                экономии ресурсов.
              </p>
            </article>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold">Решения для внедрения</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {solutions.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:bg-white/[0.04] transition-colors"
              >
                <h3 className="font-semibold text-[#F8FAFC]">{item.title}</h3>
                <p className="mt-2 text-[#94A3B8]">{item.text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold">Как проходит внедрение</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {rolloutStages.map((stage, idx) => (
              <article key={stage} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-sm text-[#93C5FD]">Этап {idx + 1}</p>
                <p className="mt-1 text-[#F8FAFC] font-medium">{stage}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold">Реальные внедрения в Ташкенте</h2>
          <p className="mt-2 text-[#94A3B8]">
            Два практических кейса внедрения AI с измеримыми результатами для бизнеса.
          </p>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CasePreviewCard
              title="Studify.uz"
              sector="Образование / EdTech"
              goal="Ускорить первичный ответ и улучшить квалификацию входящих лидов."
              solution="AI-бот для коммуникаций + управленческие сводки по KPI."
              result="Ответ клиентам за секунды и прозрачная воронка для руководителя."
              href="/cases/studify-ai-automation"
            />
            <CasePreviewCard
              title="Marsit.uz"
              sector="IT-услуги / B2B"
              goal="Не терять заявки в нерабочее время и повысить конверсию в звонок."
              solution="AI-квалификация Cold/Warm/Hot и передача горячих лидов менеджеру."
              result="Стабильный прием лидов 24/7 и рост доли качественных заявок."
              href="/cases/marsit-lead-automation"
            />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold">Сроки и стоимость</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="font-semibold text-[#F8FAFC]">Ориентировочные сроки</h3>
              <ul className="mt-3 space-y-2 text-[#CBD5E1]">
                <li>- Пилот: 2–4 недели</li>
                <li>- Внедрение 1–2 процессов: 4–8 недель</li>
                <li>- Комплексная трансформация: 2–4 месяца</li>
              </ul>
            </article>
            <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="font-semibold text-[#F8FAFC]">Диапазон инвестиций</h3>
              <ul className="mt-3 space-y-2 text-[#CBD5E1]">
                <li>- Коммуникации и квалификация лидов: от $1 500</li>
                <li>- AI-ассистент + интеграции: $3 000–$8 000</li>
                <li>- Корпоративный LLM/RAG и аналитика: от $8 000</li>
              </ul>
              <p className="mt-4 text-sm text-[#94A3B8]">
                Цена зависит от количества процессов, объёма данных, глубины интеграций и SLA.
              </p>
            </article>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold">Кейсы и результаты</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <p className="text-3xl font-bold text-[#93C5FD]">+29%</p>
              <p className="mt-2 text-[#CBD5E1]">Рост конверсии из первого контакта во встречу</p>
            </article>
            <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <p className="text-3xl font-bold text-[#93C5FD]">-41%</p>
              <p className="mt-2 text-[#CBD5E1]">Снижение потерь входящих заявок</p>
            </article>
            <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <p className="text-3xl font-bold text-[#93C5FD]">32 ч/мес</p>
              <p className="mt-2 text-[#CBD5E1]">Экономия времени команды на рутинных операциях</p>
            </article>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold">Ключевые блоки на узбекском (qisqa)</h2>
          <div className="mt-6 rounded-2xl p-6 border border-white/10 bg-white/[0.02]">
            <p className="text-[#F8FAFC] font-medium">Toshkent va O&apos;zbekistonda biznes uchun AI</p>
            <p className="mt-3 text-[#CBD5E1]">
              AI biznesingizni tahlil qiladi, yo&apos;qotishlarni topadi va jarayonlarni
              avtomatlashtiradi.
            </p>
            <p className="mt-3 text-[#CBD5E1]">
              Bosqichlar: Diagnostika, loyihalash, integratsiya, pilot, masshtablash.
            </p>
            <p className="mt-3 text-[#CBD5E1]">CTA: Biznes auditi olish.</p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">FAQ</h2>
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

        <section id="audit-form" className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
          <div className="rounded-2xl p-7 border border-[#3B82F6]/30 bg-[#3B82F6]/10">
            <h2 className="text-2xl md:text-3xl font-bold">Получите персональный AI-аудит бизнеса</h2>
            <p className="mt-3 text-[#CFE2FF] max-w-3xl">
              Покажем точки потерь, подготовим план внедрения и оценим ожидаемый ROI под вашу
              бизнес-модель.
            </p>
            <div className="mt-6">
              <AiBusinessAuditForm />
            </div>
            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <Link href="/tashkent" className="text-[#DBEAFE] underline underline-offset-4">
                Страница по Ташкенту
              </Link>
              <Link href="/blog" className="text-[#DBEAFE] underline underline-offset-4">
                Полезные статьи в блоге
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
