'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  BarChart3,
  LineChart,
  PieChart,
  FileText,
  LayoutGrid,
  Monitor,
  Activity,
  TrendingUp,
  Share2,
  Shield,
  Check,
  Users,
  ShieldCheck,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { BackButton } from '@/components/shared/BackButton';
import { FAQAccordion } from '@/components/shared/FAQAccordion';
import { PricingToggle } from '@/components/shared/PricingToggle';
import { CounterAnimation } from '@/components/shared/CounterAnimation';

// ─── Scroll-reveal hook ──────────────────────────────────────
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// ─── Constants ───────────────────────────────────────────────
const features = [
  {
    icon: BarChart3,
    title: 'Визуализация данных',
    description:
      'Интерактивные графики и диаграммы для наглядного представления ваших бизнес-данных. Поддержка Chart.js, D3 и Power BI.',
    benefits: [
      'Drag-and-drop конструктор графиков',
      'Более 30 типов визуализации',
      'Кастомные цветовые схемы',
    ],
  },
  {
    icon: FileText,
    title: 'Квартальная отчётность',
    description:
      'Автоматическая генерация отчётов по расписанию. Еженедельные, месячные и квартальные сводки с ключевыми метриками.',
    benefits: [
      'Автоматическая рассылка отчётов',
      'PDF и Excel экспорт',
      'Сравнение периодов',
    ],
  },
  {
    icon: LayoutGrid,
    title: 'Мультидепартаментные виды',
    description:
      'Настройте дашборды для каждого отдела: продажи, маркетинг, финансы, HR. Единая платформа — разные представления.',
    benefits: [
      'Ролевой доступ к данным',
      'Индивидуальные KPI для отделов',
      'Кросс-департаментная аналитика',
    ],
  },
  {
    icon: Monitor,
    title: 'Power BI интеграция',
    description:
      'Нативная интеграция с Microsoft Power BI, Tableau и Looker. Подключайте существующие источники данных без миграции.',
    benefits: [
      'Прямое подключение к Power BI',
      'Импорт существующих дашбордов',
      'Совместимость с Tableau',
    ],
  },
  {
    icon: Activity,
    title: 'Real-time мониторинг',
    description:
      'Отслеживайте метрики в реальном времени. Мгновенные уведомления при отклонении KPI от нормы.',
    benefits: [
      'Обновление данных каждые 5 секунд',
      'Push-уведомления об аномалиях',
      'Настраиваемые пороговые значения',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Прогнозная аналитика',
    description:
      'AI-модели прогнозирования на основе исторических данных. Планируйте бюджет и ресурсы с точностью до 95%.',
    benefits: [
      'ML-модели прогнозирования',
      'Сценарный анализ «что если»',
      'Автоматическое обнаружение трендов',
    ],
  },
  {
    icon: Share2,
    title: 'Экспорт и шеринг',
    description:
      'Делитесь дашбордами с коллегами и партнёрами. Гибкие настройки доступа и встраивание в сайт.',
    benefits: [
      'Публичные и приватные ссылки',
      'Embed-виджеты для сайта',
      'Экспорт в PNG, PDF, CSV',
    ],
  },
  {
    icon: Shield,
    title: 'Безопасный доступ',
    description:
      'Корпоративный уровень безопасности: SSO, двухфакторная аутентификация, аудит логов и шифрование данных.',
    benefits: [
      'SSO интеграция (SAML, OAuth)',
      '2FA аутентификация',
      'Полный аудит действий',
    ],
  },
];

const timelineSteps = [
  {
    title: 'Аудит метрик',
    description:
      'Анализируем текущие источники данных, KPI и бизнес-процессы. Определяем ключевые метрики для мониторинга.',
    duration: '3–5 дней',
  },
  {
    title: 'Проектирование дашборда',
    description:
      'Создаём wireframes и прототипы дашбордов. Согласовываем визуальный стиль и расположение виджетов.',
    duration: '5–7 дней',
  },
  {
    title: 'Подключение данных',
    description:
      'Настраиваем интеграции с вашими БД, CRM, ERP и другими системами. Создаём ETL-пайплайны.',
    duration: '7–10 дней',
  },
  {
    title: 'Кастомизация',
    description:
      'Разрабатываем кастомные визуализации, фильтры и drill-down функционал под ваши потребности.',
    duration: '5–7 дней',
  },
  {
    title: 'Тестирование',
    description:
      'Нагрузочное тестирование, проверка точности данных и UX-тестирование с вашей командой.',
    duration: '3–5 дней',
  },
  {
    title: 'Запуск и оптимизация',
    description:
      'Деплой в продакшен, обучение команды и постоянная оптимизация на основе обратной связи.',
    duration: '2–3 дня + ongoing',
  },
];

const pricingPlans = {
  basic: {
    name: 'Basic',
    price: '$3,000',
    priceAnnual: '$2,500',
    features: [
      'До 5 дашбордов',
      '3 источника данных',
      'Ежедневное обновление',
      'Email-отчёты',
      'Базовые визуализации',
      'Email поддержка',
    ],
  },
  advanced: {
    name: 'Advanced',
    price: '$8,000',
    priceAnnual: '$6,500',
    features: [
      'До 20 дашбордов',
      'Неограниченные источники данных',
      'Real-time обновление',
      'Power BI интеграция',
      'Прогнозная аналитика',
      'Кастомные визуализации',
      'Приоритетная поддержка 24/7',
      'SSO и 2FA',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    price: 'Custom',
    priceNote: 'Индивидуальный расчёт',
    features: [
      'Неограниченные дашборды',
      'Выделенная инфраструктура',
      'White-label решение',
      'On-premise установка',
      'SLA 99.99%',
      'Персональный менеджер',
      'Кастомные ML-модели',
      'Полный аудит и compliance',
    ],
  },
};

const caseStudies = [
  {
    client: 'RetailChain Co.',
    industry: 'Ритейл',
    challengeTitle: 'Проблема',
    challenge:
      'Крупная сеть из 120 магазинов тратила 3 дня на составление еженедельных отчётов. Данные из разных систем не синхронизировались, руководство принимало решения на основе устаревшей информации.',
    solutionTitle: 'Решение',
    solution:
      'Внедрили единый аналитический дашборд с real-time данными из POS-систем, складов и CRM. Настроили автоматические алерты при отклонении KPI.',
    resultsTitle: 'Результаты',
    metrics: [
      { value: 40, suffix: '%', label: 'Ускорение принятия решений', change: '+40%' },
      { value: 3, suffix: 'дня→2ч', label: 'Время подготовки отчёта', change: '-95%' },
      { value: 15, suffix: '%', label: 'Рост продаж', change: '+15%' },
      { value: 120, suffix: '', label: 'Магазинов на платформе', change: '100%' },
    ],
  },
  {
    client: 'SaaS Platform',
    industry: 'SaaS / IT',
    challengeTitle: 'Проблема',
    challenge:
      'SaaS-компания с 50,000 пользователей не могла эффективно отслеживать churn rate, LTV и unit-экономику. Отчёты формировались вручную в Excel.',
    solutionTitle: 'Решение',
    solution:
      'Создали интерактивный дашборд с автоматическим расчётом SaaS-метрик: MRR, ARR, churn, LTV, CAC. Подключили прогнозную аналитику для предсказания оттока.',
    resultsTitle: 'Результаты',
    metrics: [
      { value: 80, suffix: '%', label: 'Сокращение времени отчётности', change: '-80%' },
      { value: 25, suffix: '%', label: 'Снижение churn rate', change: '-25%' },
      { value: 2, suffix: 'x', label: 'Рост LTV', change: '+100%' },
      { value: 50, suffix: 'K', label: 'Пользователей на мониторинге', change: '100%' },
    ],
  },
];

const faqItems = [
  {
    question: 'Какие источники данных поддерживает дашборд?',
    answer:
      'Мы поддерживаем все популярные БД (PostgreSQL, MySQL, MongoDB, ClickHouse), CRM-системы (Salesforce, HubSpot, Bitrix24), ERP (1C, SAP), маркетинговые платформы (Google Analytics, Яндекс.Метрика) и любые API через REST/GraphQL.',
  },
  {
    question: 'Как быстро обновляются данные в реальном времени?',
    answer:
      'В тарифе Advanced и Enterprise данные обновляются каждые 5 секунд через WebSocket-соединение. В тарифе Basic — обновление каждые 15 минут. Для критичных метрик можно настроить push-уведомления.',
  },
  {
    question: 'Можно ли встроить дашборд в наш корпоративный сайт?',
    answer:
      'Да, мы предоставляем embed-виджеты с настраиваемыми правами доступа. Дашборд можно встроить через iframe или React-компонент с поддержкой SSO для бесшовной авторизации.',
  },
  {
    question: 'Какие технологии используются для визуализации?',
    answer:
      'Мы используем Chart.js и D3.js для кастомных визуализаций, Power BI Embedded для корпоративных клиентов, и собственный движок рендеринга для high-performance графиков с миллионами точек данных.',
  },
  {
    question: 'Как обеспечивается безопасность данных?',
    answer:
      'Все данные шифруются в транзите (TLS 1.3) и at rest (AES-256). Поддерживаем SSO через SAML/OAuth, двухфакторную аутентификацию, IP-whitelisting и полный аудит действий пользователей.',
  },
  {
    question: 'Сколько времени занимает внедрение дашборда?',
    answer:
      'Базовый дашборд — 3-4 недели от аудита до запуска. Комплексное решение с кастомными визуализациями и ML-моделями — 6-8 недель. Мы работаем по Agile и показываем промежуточные результаты каждую неделю.',
  },
  {
    question: 'Можно ли настроить автоматические отчёты?',
    answer:
      'Да, вы можете настроить автоматическую рассылку отчётов по email и в мессенджеры (Telegram, Slack). Поддерживается расписание: ежедневно, еженедельно, ежемесячно, а также триггерные отчёты при достижении пороговых значений.',
  },
  {
    question: 'Что включает поддержка после запуска?',
    answer:
      'Все тарифы включают техподдержку и обновления. Basic — email поддержка в рабочие часы. Advanced — приоритетная поддержка 24/7 с SLA ответа 1 час. Enterprise — персональный менеджер, ежемесячные ревью и оптимизация.',
  },
];

// ─── Form schema ─────────────────────────────────────────────
const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(5),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

// ─── Component ───────────────────────────────────────────────
export default function AnalyticsContent() {
  const [isAnnual, setIsAnnual] = useState(false);

  // Form
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, service: 'analytics' }),
      });
      if (!res.ok) throw new Error();
      toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
      reset();
    } catch {
      toast.error('Ошибка при отправке. Попробуйте ещё раз.');
    }
  };

  // Scroll reveals
  const featuresReveal = useScrollReveal(0.1);
  const timelineReveal = useScrollReveal(0.1);
  const pricingReveal = useScrollReveal(0.1);
  const casesReveal = useScrollReveal(0.1);

  return (
    <div className="min-h-screen bg-white">
      {/* ════════════════════════════════════════════════════════
          SECTION 1 — HERO
          ════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-500 to-teal-500 text-white min-h-[60vh] flex items-center overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 py-24 w-full">
          {/* Back button */}
          <BackButton
            href="/#solutions"
            label="← Назад к услугам"
            className="text-white/90 hover:text-white mb-8"
          />

          {/* Breadcrumb */}
          <Breadcrumb
            className="text-white/80 mb-8"
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Услуги' },
              { label: 'Бизнес-аналитика' },
            ]}
          />

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl leading-tight">
            Бизнес-аналитика и интерактивные дашборды
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed">
            Превращаем данные в решения. Real-time дашборды, прогнозная аналитика и автоматическая отчётность для вашего бизнеса.
          </p>

          {/* CTA */}
          <Link
            href="#cta-form"
            className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            Получить демо дашборд
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 mt-10 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>70+ компаний используют</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>99.9% uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Поддержка 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          DASHBOARD PREVIEW — Power BI style, one medium-sized block
          ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="bg-[#1e293b] rounded-2xl overflow-hidden border border-slate-600 shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-600 flex items-center justify-between">
              <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wide">Пример дашборда</p>
              <span className="text-xs text-slate-400">Real-time · Power BI Style</span>
            </div>
            <div className="p-6 space-y-6">
              {/* KPI row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: '2,4 млн ₽', label: 'Выручка (мес.)', change: '+12%', color: 'text-emerald-400' },
                  { value: '12 540', label: 'Сессии', change: '+8%', color: 'text-blue-400' },
                  { value: '4,2%', label: 'Конверсия', change: '+0,3%', color: 'text-amber-400' },
                  { value: '98', label: 'NPS', change: 'стабильно', color: 'text-purple-400' },
                ].map((kpi, i) => (
                  <div
                    key={i}
                    className="bg-slate-800/80 rounded-xl p-4 border border-slate-600 hover:border-slate-500 transition-colors group"
                    title={`${kpi.label}: ${kpi.value} (${kpi.change})`}
                  >
                    <p className={`text-2xl md:text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
                    <p className="text-slate-400 text-sm mt-1">{kpi.label}</p>
                    <p className="text-slate-500 text-xs mt-1 group-hover:text-slate-300">{kpi.change}</p>
                  </div>
                ))}
              </div>
              {/* Charts row — bar + line + pie areas with hover */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div
                  className="bg-slate-800/60 rounded-xl p-4 border border-slate-600 hover:border-emerald-500/50 transition-all min-h-[200px] flex flex-col"
                  title="Продажи по каналам"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-medium text-slate-300">Продажи по каналам</span>
                  </div>
                  <div className="flex items-end gap-2 flex-1 pt-2">
                    {[72, 58, 45, 88, 62, 95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-emerald-500/30 rounded-t hover:bg-emerald-500/60 transition-colors min-h-[8px]"
                        style={{ height: `${Math.max(12, h)}%` }}
                        title={`Канал ${i + 1}: ${h}%`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Наведите на столбец — детали</p>
                </div>
                <div
                  className="bg-slate-800/60 rounded-xl p-4 border border-slate-600 hover:border-blue-500/50 transition-all min-h-[200px] flex flex-col"
                  title="KPI тренды"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <LineChart className="w-5 h-5 text-blue-400" />
                    <span className="text-sm font-medium text-slate-300">KPI тренды</span>
                  </div>
                  <div className="flex-1 flex items-end gap-0.5 pt-2">
                    {[20, 35, 28, 55, 48, 70, 65, 82].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-blue-500/40 rounded-t hover:bg-blue-400/70 transition-colors min-h-[6px]"
                        style={{ height: `${Math.max(10, h)}%` }}
                        title={`Неделя ${i + 1}: ${h}%`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Real-time обновление</p>
                </div>
                <div
                  className="bg-slate-800/60 rounded-xl p-4 border border-slate-600 hover:border-purple-500/50 transition-all min-h-[200px] flex flex-col"
                  title="Распределение бюджета"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <PieChart className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-medium text-slate-300">Бюджет</span>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-2 pt-2">
                    {[
                      { label: 'Маркетинг', pct: 42, color: 'bg-purple-500/50 hover:bg-purple-500/80' },
                      { label: 'Продажи', pct: 28, color: 'bg-violet-500/50 hover:bg-violet-500/80' },
                      { label: 'R&D', pct: 18, color: 'bg-fuchsia-500/50 hover:bg-fuchsia-500/80' },
                      { label: 'Остальное', pct: 12, color: 'bg-slate-500/50 hover:bg-slate-400/80' },
                    ].map((s, i) => (
                      <div
                        key={i}
                        className={`rounded-lg p-2 border border-slate-600 ${s.color} transition-colors cursor-default`}
                        title={`${s.label}: ${s.pct}%`}
                      >
                        <p className="text-lg font-semibold text-white">{s.pct}%</p>
                        <p className="text-xs text-slate-400">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-3 bg-slate-800/40 border-t border-slate-600 text-center text-xs text-slate-500">
              В продакшене — реальные Power BI дашборды с вашими данными
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 2 — FEATURES DEEP DIVE
          ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            Возможности аналитической платформы
          </h2>

          <div
            ref={featuresReveal.ref}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12"
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="flex gap-5 transition-all duration-500"
                  style={{
                    opacity: featuresReveal.isVisible ? 1 : 0,
                    transform: featuresReveal.isVisible
                      ? 'translateY(0)'
                      : 'translateY(40px)',
                    transitionDelay: `${idx * 100}ms`,
                  }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.benefits.map((b, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-center gap-2 text-gray-600 text-sm"
                        >
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 3 — HOW IT WORKS TIMELINE
          ════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-[900px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-20 text-gray-900">
            Как мы внедряем аналитику
          </h2>

          <div ref={timelineReveal.ref} className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-10 top-0 bottom-0 w-1 bg-green-200 origin-top transition-transform duration-[1500ms] ease-out"
              style={{
                transform: timelineReveal.isVisible ? 'scaleY(1)' : 'scaleY(0)',
              }}
            />

            <div className="space-y-12">
              {timelineSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="relative flex items-start gap-8 pl-0"
                  style={{
                    opacity: timelineReveal.isVisible ? 1 : 0,
                    transform: timelineReveal.isVisible
                      ? 'translateY(0) scale(1)'
                      : 'translateY(20px) scale(0.95)',
                    transition: `all 500ms ease-out`,
                    transitionDelay: `${300 + idx * 200}ms`,
                  }}
                >
                  {/* Step circle */}
                  <div className="flex-shrink-0 w-20 h-20 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-green-500/20 z-10">
                    {idx + 1}
                  </div>

                  {/* Content */}
                  <div className="pt-3">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      {step.description}
                    </p>
                    <span className="inline-block text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                      {step.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 4 — PRICING
          ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Тарифные планы
          </h2>
          <p className="text-xl text-gray-600 text-center mb-8">
            Выберите план, который подходит вашему бизнесу
          </p>

          <PricingToggle
            isAnnual={isAnnual}
            onToggle={() => setIsAnnual(!isAnnual)}
            monthlyLabel="Ежемесячно"
            annualLabel="Ежегодно"
            discountText="Экономия до 20%"
          />

          <div
            ref={pricingReveal.ref}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {/* Basic */}
            <div
              className="bg-white border-2 border-gray-200 rounded-2xl p-8 transition-all duration-500"
              style={{
                opacity: pricingReveal.isVisible ? 1 : 0,
                transform: pricingReveal.isVisible ? 'scale(1)' : 'scale(0.95)',
                transitionDelay: '0ms',
              }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {pricingPlans.basic.name}
              </h3>
              <p className="text-5xl font-bold text-green-600 mb-1">
                {isAnnual ? pricingPlans.basic.priceAnnual : pricingPlans.basic.price}
              </p>
              <p className="text-gray-600 mb-6">в месяц</p>
              <ul className="space-y-3 mb-8">
                {pricingPlans.basic.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="#cta-form"
                className="block text-center w-full py-3 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-300"
              >
                Выбрать Basic
              </Link>
            </div>

            {/* Advanced (highlighted) */}
            <div
              className="relative bg-white border-4 border-green-600 rounded-2xl p-8 shadow-xl transition-all duration-500"
              style={{
                opacity: pricingReveal.isVisible ? 1 : 0,
                transform: pricingReveal.isVisible ? 'scale(1)' : 'scale(0.95)',
                transitionDelay: '150ms',
              }}
            >
              <span className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                Популярный
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {pricingPlans.advanced.name}
              </h3>
              <p className="text-5xl md:text-6xl font-bold text-green-600 mb-1">
                {isAnnual ? pricingPlans.advanced.priceAnnual : pricingPlans.advanced.price}
              </p>
              <p className="text-gray-600 mb-6">в месяц</p>
              <ul className="space-y-3 mb-8">
                {pricingPlans.advanced.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="#cta-form"
                className="block text-center w-full py-3 bg-gradient-to-r from-green-600 to-teal-500 text-white rounded-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Выбрать Advanced
              </Link>
            </div>

            {/* Enterprise */}
            <div
              className="bg-white border-2 border-gray-300 rounded-2xl p-8 transition-all duration-500"
              style={{
                opacity: pricingReveal.isVisible ? 1 : 0,
                transform: pricingReveal.isVisible ? 'scale(1)' : 'scale(0.95)',
                transitionDelay: '300ms',
              }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {pricingPlans.enterprise.name}
              </h3>
              <p className="text-5xl font-bold text-green-600 mb-1">
                {pricingPlans.enterprise.price}
              </p>
              <p className="text-gray-600 mb-6">{pricingPlans.enterprise.priceNote}</p>
              <ul className="space-y-3 mb-8">
                {pricingPlans.enterprise.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="#cta-form"
                className="block text-center w-full py-3 border-2 border-gray-400 text-gray-700 rounded-lg font-semibold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300"
              >
                Связаться с нами
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 5 — CASE STUDIES
          ════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            Кейсы клиентов
          </h2>

          <div ref={casesReveal.ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {caseStudies.map((cs, cIdx) => (
              <div
                key={cIdx}
                className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg transition-all duration-500"
                style={{
                  opacity: casesReveal.isVisible ? 1 : 0,
                  transform: casesReveal.isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${cIdx * 200}ms`,
                }}
              >
                {/* Client */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-[120px] h-10 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500 font-medium">
                    {cs.client}
                  </div>
                  <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded font-medium">
                    {cs.industry}
                  </span>
                </div>

                {/* Challenge */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {cs.challengeTitle}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {cs.challenge}
                </p>

                {/* Solution */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {cs.solutionTitle}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {cs.solution}
                </p>

                {/* Results */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {cs.resultsTitle}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {cs.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="bg-gray-50 rounded-xl p-4 text-center"
                    >
                      <CounterAnimation
                        target={m.value}
                        suffix={m.suffix}
                        className="text-3xl md:text-4xl font-bold text-green-600"
                      />
                      <p className="text-sm text-gray-600 mt-1">{m.label}</p>
                      <p className="text-xs text-green-600 font-medium mt-1 flex items-center justify-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {m.change}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 6 — FAQ
          ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[900px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Часто задаваемые вопросы
          </h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 7 — FINAL CTA
          ════════════════════════════════════════════════════════ */}
      <section
        id="cta-form"
        className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16 md:py-20"
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Готовы видеть свой бизнес в цифрах?
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-[800px] mx-auto mb-12">
            Получите персональный демо-дашборд с вашими данными. Бесплатная консультация и аудит метрик.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="max-w-[600px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <input
              {...register('name')}
              placeholder="Ваше имя"
              className="bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              className="bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              {...register('phone')}
              type="tel"
              placeholder="Телефон"
              className="bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <textarea
              {...register('message')}
              placeholder="Расскажите о вашем проекте"
              rows={4}
              className="sm:col-span-2 bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white resize-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="sm:col-span-2 bg-white text-green-600 w-full py-4 rounded-lg font-semibold hover:shadow-2xl transition-all duration-300 disabled:opacity-60"
            >
              {isSubmitting ? 'Отправка...' : 'Получить демо дашборд'}
            </button>
          </form>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-10 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>70+ компаний доверяют нам</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Гарантия качества</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Бесплатная консультация</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
