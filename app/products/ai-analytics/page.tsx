import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Filter, Table2, TrendingUp } from 'lucide-react';
import { AnalyticsDemoForm } from '@/components/sections/AnalyticsDemoForm';
import { AnalyticsHeroCta } from '@/components/sections/AnalyticsHeroCta';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/products/ai-analytics';
const TITLE = 'AI-аналитика и дашборды для бизнеса в Ташкенте | AI Solution';
const DESCRIPTION =
  'AI-аналитика для бизнеса в Ташкенте и Узбекистане: сбор данных из CRM, рекламы, мессенджеров и сайта. KPI-дашборды, алерты и AI-рекомендации для руководителя.';

const KEYWORDS = [
  'ai аналитика ташкент',
  'дашборд для бизнеса узбекистан',
  'внедрение ai аналитики',
  'kpi дашборд ташкент',
  'автоматизация аналитики бизнеса',
];

const dataSources = [
  {
    title: 'CRM: Bitrix24 / amoCRM',
    text: 'Сделки, этапы воронки, средний чек, скорость обработки лидов и эффективность менеджеров.',
  },
  {
    title: 'Google Ads / Meta Ads',
    text: 'Расход, CPL, ROMI, кампании и креативы, которые действительно приводят качественные лиды.',
  },
  {
    title: 'Telegram / WhatsApp / Instagram',
    text: 'Качество диалогов, скорость ответа, конверсия из переписки в целевое действие.',
  },
  {
    title: 'Сайт и формы',
    text: 'Точки входа, конверсия по страницам, потери на этапах формы и воронки.',
  },
  {
    title: 'Поисковики и публичные источники',
    text: 'Сигналы спроса, сезонность и внешние факторы для более точного планирования.',
  },
];

const outcomes = [
  {
    title: 'Адаптивный дашборд KPI',
    text: 'Вся ключевая аналитика в одном окне для руководителя, продаж и маркетинга.',
  },
  {
    title: 'Ежедневные и недельные отчеты',
    text: 'Автоматические сводки по метрикам без ручной сборки данных в таблицах.',
  },
  {
    title: 'Алерты при просадках',
    text: 'Система сигнализирует о падении конверсии, роста CPL и других критичных изменениях.',
  },
  {
    title: 'AI-рекомендации',
    text: 'Практические рекомендации: где подкрутить бюджет, где оптимизировать процесс и как вернуть рост.',
  },
];

const dashboardExamples = [
  {
    id: 'ceo',
    title: 'Где бизнес теряет деньги и как это исправить',
    text: 'Финансовая картина, ключевые риски и прогноз прибыли на 30 дней вперёд.',
  },
  {
    id: 'sales',
    title: 'Почему сделки теряются и кто тормозит продажи',
    text: 'Узкие места в воронке, эффективность менеджеров и реальные причины отказов.',
  },
  {
    id: 'marketing',
    title: 'Какие каналы реально приносят прибыль',
    text: 'Окупаемость рекламы, перераспределение бюджета и точки роста маркетинга.',
  },
];

function DashboardWireframe({ id }: { id: 'ceo' | 'sales' | 'marketing' }) {
  if (id === 'ceo') {
    return (
      <div className="h-full rounded-lg border border-white/10 bg-[#0A1020] p-3">
        <div className="flex items-center justify-between text-[10px] text-[#8FA3C7] mb-2">
          <span className="inline-flex items-center gap-1"><Filter className="w-3 h-3" /> Период: 30 дней</span>
          <span className="inline-flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +18.4%</span>
        </div>
        <div className="h-16 rounded-md border border-white/10 bg-white/[0.02] p-2">
          <div className="flex items-end gap-1 h-full">
            {[24, 38, 29, 46, 52, 44, 57, 61, 54, 63].map((h, idx) => (
              <div key={idx} className="flex-1 rounded-sm bg-gradient-to-t from-[#3B82F6]/40 to-[#06B6D4]/70" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {[
            ['Выручка', '$128k'],
            ['ROMI', '3.2x'],
            ['Маржа', '24%'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-md bg-white/[0.03] border border-white/10 px-2 py-1.5">
              <p className="text-[10px] text-[#64748B]">{label}</p>
              <p className="text-xs font-semibold text-[#E2E8F0]">{value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (id === 'sales') {
    return (
      <div className="h-full rounded-lg border border-white/10 bg-[#0A1020] p-3">
        <div className="flex items-center justify-between text-[10px] text-[#8FA3C7] mb-2">
          <span className="inline-flex items-center gap-1"><Table2 className="w-3 h-3" /> Pipeline board</span>
          <span>SLA: 42 сек</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 mb-2">
          {[
            ['Лиды', '320'],
            ['КП', '148'],
            ['Переговоры', '74'],
            ['Сделки', '31'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-md border border-white/10 bg-white/[0.02] px-1.5 py-1.5">
              <p className="text-[9px] text-[#64748B]">{label}</p>
              <p className="text-[11px] font-semibold text-[#E2E8F0]">{value}</p>
            </div>
          ))}
        </div>
        <div className="space-y-1.5">
          {[
            ['Менеджер A', 92],
            ['Менеджер B', 84],
            ['Менеджер C', 76],
          ].map(([name, val]) => (
            <div key={name} className="text-[10px]">
              <div className="flex justify-between text-[#9FB3D8]"><span>{name}</span><span>{val}%</span></div>
              <div className="h-1.5 rounded bg-white/10 mt-1">
                <div className="h-1.5 rounded bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]" style={{ width: `${val}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full rounded-lg border border-white/10 bg-[#0A1020] p-3">
      <div className="flex items-center justify-between text-[10px] text-[#8FA3C7] mb-2">
        <span className="inline-flex items-center gap-1"><Filter className="w-3 h-3" /> Каналы / Кампании</span>
        <span>CPL $7.2</span>
      </div>
      <div className="rounded-md border border-white/10 bg-white/[0.02] px-2 py-1.5">
        {[
          ['Google Ads', '$5.8', '4.2x'],
          ['Meta Ads', '$8.4', '2.9x'],
          ['Organic', '$2.1', '7.8x'],
        ].map(([channel, cpl, romi]) => (
          <div key={channel} className="grid grid-cols-3 text-[10px] py-1 border-b last:border-b-0 border-white/10">
            <span className="text-[#C9D5EA]">{channel}</span>
            <span className="text-[#9FB3D8]">CPL {cpl}</span>
            <span className="text-[#9FE6C6]">ROMI {romi}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 rounded-md border border-[#3B82F6]/25 bg-[#3B82F6]/10 px-2 py-1.5">
        <p className="text-[10px] text-[#93C5FD]">AI recommendation</p>
        <p className="text-[10px] text-[#CFE2FF]">Перенести 15–20% бюджета в каналы с ROMI &gt; 4x.</p>
      </div>
    </div>
  );
}

const implementationSteps = [
  'Диагностика целей, KPI и текущих источников данных',
  'Проектирование структуры дашбордов и событийной модели',
  'Подключение источников и настройка автоматического сбора',
  'Запуск дашбордов, алертов и AI-рекомендаций',
  'Сопровождение, улучшения и масштабирование по отделам',
];

const miniCases = [
  {
    niche: 'B2B услуги',
    result: 'Снизили потери лидов на 33% и сократили время управленческого отчета с 4 часов до 20 минут в неделю.',
  },
  {
    niche: 'Образование / EdTech',
    result: 'Подняли конверсию из заявки в консультацию на 21% за счет алертов и корректировки скриптов.',
  },
  {
    niche: 'Ритейл / e-commerce',
    result: 'Снизили CPL на 18% и перераспределили бюджет в пользу каналов с лучшим ROMI.',
  },
];

const faqItems = [
  {
    q: 'Чем AI-аналитика отличается от обычного BI-дашборда?',
    a: 'Помимо визуализации метрик, AI-аналитика автоматически интерпретирует изменения и дает рекомендации по действиям.',
  },
  {
    q: 'Какие источники можно подключить в первую очередь?',
    a: 'Обычно начинаем с CRM, рекламных кабинетов и сайта. Далее подключаем мессенджеры и дополнительные системы.',
  },
  {
    q: 'Сколько времени занимает запуск?',
    a: 'Пилот с ключевыми KPI обычно запускается за 2–4 недели.',
  },
  {
    q: 'Нужно ли менять текущую CRM?',
    a: 'Нет, работаем с вашей текущей инфраструктурой и подключаем источники через API.',
  },
  {
    q: 'Можно ли настроить отчеты под разные роли?',
    a: 'Да, делаем отдельные представления для руководителя, продаж, маркетинга и финансов.',
  },
  {
    q: 'Как обеспечивается точность данных?',
    a: 'Настраиваем валидацию, единые правила атрибуции и регулярный контроль качества источников.',
  },
  {
    q: 'Работаете только в Ташкенте?',
    a: 'Нет, внедряем решения по всему Узбекистану, включая удаленный формат.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}${SLUG}#service`,
  name: 'AI-аналитика и дашборды для бизнеса в Ташкенте',
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: [
    { '@type': 'City', name: 'Ташкент' },
    { '@type': 'Country', name: 'Узбекистан' },
  ],
  url: `${SITE_URL}${SLUG}`,
  description: DESCRIPTION,
  serviceType: 'AI Analytics / KPI Dashboards',
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Продукты', item: `${SITE_URL}/products` },
    { '@type': 'ListItem', position: 3, name: 'AI-аналитика', item: `${SITE_URL}${SLUG}` },
  ],
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

export default function AiAnalyticsProductPage() {
  return (
    <main className="min-h-screen bg-[#05050A] text-white pt-28 pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="max-w-6xl mx-auto px-4 md:px-6">
        <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Главная</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-white transition-colors">Продукты</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#F8FAFC]">AI-аналитика</span>
        </nav>

        <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
          <p className="text-sm text-[#93C5FD] mb-3">AI Analytics Product</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            AI-аналитика и дашборды для бизнеса в Ташкенте
          </h1>
          <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg">
            AI собирает данные из CRM, рекламы, мессенджеров и сайта, показывает потери в
            воронке и дает руководителю рекомендации, что сделать прямо сейчас.
          </p>
          <div className="mt-6">
            <AnalyticsHeroCta />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
        <h2 className="text-2xl md:text-3xl font-bold">Источники данных</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {dataSources.map((item) => (
            <article key={item.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="font-semibold text-[#F8FAFC]">{item.title}</h3>
              <p className="mt-2 text-[#94A3B8]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
        <h2 className="text-2xl md:text-3xl font-bold">Что вы получаете</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {outcomes.map((item) => (
            <article key={item.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="font-semibold text-[#F8FAFC]">{item.title}</h3>
              <p className="mt-2 text-[#94A3B8]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
        <h2 className="text-2xl md:text-3xl font-bold">Для кого</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Руководитель', text: 'Единая картина бизнеса и контроль KPI без ручной отчетности.' },
            { title: 'Отдел продаж', text: 'Воронка, конверсия, потери и качество обработки лидов в одном интерфейсе.' },
            { title: 'Маркетинг', text: 'Эффективность каналов, креативов и бюджета с быстрыми гипотезами роста.' },
            { title: 'Финансы', text: 'Юнит-экономика, рентабельность каналов и прогноз по денежным потокам.' },
          ].map((item) => (
            <article key={item.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="font-semibold text-[#F8FAFC]">{item.title}</h3>
              <p className="mt-2 text-[#94A3B8] text-sm">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
        <h2 className="text-2xl md:text-3xl font-bold">Примеры дашбордов</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {dashboardExamples.map((item) => (
            <article key={item.title} className="h-full rounded-xl border border-white/10 bg-white/[0.02] p-5 md:p-6 flex flex-col">
              <div className="min-h-[190px] md:min-h-[200px]">
                <DashboardWireframe id={item.id as 'ceo' | 'sales' | 'marketing'} />
              </div>
              <h3 className="mt-4 font-semibold text-[#F8FAFC] leading-tight">{item.title}</h3>
              <p className="mt-2 text-[#94A3B8] text-sm leading-relaxed">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
        <h2 className="text-2xl md:text-3xl font-bold">Как внедряем</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {implementationSteps.map((step, idx) => (
            <article key={step} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <p className="text-sm text-[#93C5FD]">Этап {idx + 1}</p>
              <p className="mt-1 text-[#F8FAFC] font-medium">{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
        <h2 className="text-2xl md:text-3xl font-bold">Инвестиция в прозрачность бизнеса</h2>
        <p className="mt-2 text-[#94A3B8]">Дашборд окупается за счёт экономии на ручной аналитике и быстрых решений</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5 flex flex-col">
            <h3 className="font-bold text-[#F8FAFC] text-lg">Starter</h3>
            <p className="text-sm text-[#64748B] mt-1">Базовый дашборд для руководителя</p>
            <p className="text-2xl font-bold text-gradient mt-3">$1 900</p>
            <p className="text-sm text-[#94A3B8]">запуск + $500/мес</p>
            <div className="mt-3 rounded-lg p-2.5 text-xs" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <p className="text-emerald-300 font-semibold">Окупается за 1–2 месяца</p>
              <p className="text-emerald-400/80 mt-0.5">Экономит 5–8 часов на сбор отчётов в неделю</p>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-[#CBD5E1] flex-1">
              <li>• KPI-дашборд + 1 источник</li>
              <li>• Ежедневные сводки</li>
              <li>• Запуск за 2–3 недели</li>
            </ul>
          </article>
          <article className="rounded-xl border border-[#3B82F6]/30 bg-[#3B82F6]/5 p-5 flex flex-col relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white text-xs font-semibold">Популярный</span>
            <h3 className="font-bold text-[#F8FAFC] text-lg">Growth</h3>
            <p className="text-sm text-[#64748B] mt-1">Полная аналитика + AI-рекомендации</p>
            <p className="text-2xl font-bold text-gradient mt-3">$4 500</p>
            <p className="text-sm text-[#94A3B8]">запуск + $1 500/мес · средний чек $5 800</p>
            <div className="mt-3 rounded-lg p-2.5 text-xs" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <p className="text-emerald-300 font-semibold">Ускоряет решения на 40–60%</p>
              <p className="text-emerald-400/80 mt-0.5">Окупается за 2–4 месяца</p>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-[#CBD5E1] flex-1">
              <li>• CRM + реклама + мессенджеры</li>
              <li>• Алерты при просадках KPI</li>
              <li>• AI-рекомендации руководителю</li>
            </ul>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5 flex flex-col">
            <h3 className="font-bold text-[#F8FAFC] text-lg">Enterprise</h3>
            <p className="text-sm text-[#64748B] mt-1">Мульти-отдельная AI-аналитика</p>
            <p className="text-2xl font-bold text-gradient mt-3">от $12 000</p>
            <p className="text-sm text-[#94A3B8]">запуск + от $3 500/мес</p>
            <div className="mt-3 rounded-lg p-2.5 text-xs" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <p className="text-emerald-300 font-semibold">Экономит 2–4 зарплаты аналитиков</p>
              <p className="text-emerald-400/80 mt-0.5">Полная замена ручной отчётности</p>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-[#CBD5E1] flex-1">
              <li>• Все источники + ERP + 1С</li>
              <li>• Прогнозные модели</li>
              <li>• On-premise, SLA 99.9%</li>
            </ul>
          </article>
        </div>
        <p className="mt-6 text-sm text-[#94A3B8] text-center">
          Точную стоимость считаем после бесплатного аудита данных. Аудит ни к чему не обязывает.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
        <h2 className="text-2xl md:text-3xl font-bold">Кейсы и результаты</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {miniCases.map((item) => (
            <article key={item.niche} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <p className="text-sm text-[#93C5FD]">{item.niche}</p>
              <p className="mt-2 text-[#CBD5E1]">{item.result}</p>
            </article>
          ))}
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

      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
        <div className="rounded-2xl p-7 border border-[#3B82F6]/30 bg-[#3B82F6]/10">
          <h2 className="text-2xl md:text-3xl font-bold">Получите демо AI-аналитики под ваш бизнес</h2>
          <p className="mt-3 text-[#CFE2FF] max-w-3xl">
            Покажем, какие источники подключить в первую очередь и как быстро получить управленческий
            дашборд с AI-рекомендациями.
          </p>
          <div className="mt-6">
            <AnalyticsDemoForm />
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link href="/ai-dlya-biznesa" className="text-[#DBEAFE] underline underline-offset-4">AI для бизнеса</Link>
            <Link href="/tashkent" className="text-[#DBEAFE] underline underline-offset-4">AI в Ташкенте</Link>
            <Link href="/products/customer-service" className="text-[#DBEAFE] underline underline-offset-4">Customer Service Bot</Link>
            <Link href="/products/management-assistant" className="text-[#DBEAFE] underline underline-offset-4">Management Assistant</Link>
            <Link href="/products/corporate-ai" className="text-[#DBEAFE] underline underline-offset-4">Corporate AI</Link>
            <Link href="/services/analytics" className="text-[#DBEAFE] underline underline-offset-4">Сервис аналитики</Link>
            <Link href="/blog/analitika-dlya-kompaniy-tashkent" className="text-[#DBEAFE] underline underline-offset-4">Аналитика для компаний</Link>
            <Link href="/blog/vnedrenie-ii-v-biznes-tashkent" className="text-[#DBEAFE] underline underline-offset-4">Внедрение ИИ в бизнес</Link>
            <Link href="/blog/ii-avtomatizaciya-biznesa-uzbekistan" className="text-[#DBEAFE] underline underline-offset-4">ИИ-автоматизация в Узбекистане</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
