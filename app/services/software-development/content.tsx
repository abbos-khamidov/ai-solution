'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Code,
  Smartphone,
  ShoppingCart,
  Building2,
  Webhook,
  Palette,
  GitBranch,
  TestTube2,
  Check,
  Users,
  ShieldCheck,
  Phone,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { BackButton } from '@/components/shared/BackButton';
import { FAQAccordion } from '@/components/shared/FAQAccordion';
import { DetailPricingSection } from '@/components/shared/DetailPricingSection';
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
const featureIcons = [Code, Smartphone, ShoppingCart, Building2, Webhook, Palette, GitBranch, TestTube2];

const features = [
  {
    title: 'Веб-приложения',
    description:
      'Разработка современных веб-приложений на React, Next.js, Vue.js с серверным рендерингом, оптимизацией SEO и высокой производительностью.',
    benefits: [
      'SPA и SSR приложения',
      'Адаптивный дизайн для всех устройств',
      'Интеграция с любыми API и сервисами',
    ],
  },
  {
    title: 'Мобильные приложения',
    description:
      'Кроссплатформенные и нативные мобильные приложения для iOS и Android. Flutter, React Native, Swift, Kotlin.',
    benefits: [
      'Единая кодовая база для iOS и Android',
      'Нативная производительность',
      'Push-уведомления и офлайн-режим',
    ],
  },
  {
    title: 'E-commerce',
    description:
      'Полнофункциональные интернет-магазины и маркетплейсы с платёжными системами, аналитикой и управлением заказами.',
    benefits: [
      'Интеграция платёжных систем',
      'Управление каталогом и складом',
      'Аналитика продаж в реальном времени',
    ],
  },
  {
    title: 'Корпоративное ПО',
    description:
      'CRM, ERP, системы управления проектами и внутренние инструменты для автоматизации бизнес-процессов.',
    benefits: [
      'Автоматизация бизнес-процессов',
      'Ролевой доступ и безопасность',
      'Интеграция с существующими системами',
    ],
  },
  {
    title: 'API разработка',
    description:
      'Проектирование и разработка RESTful и GraphQL API, микросервисная архитектура, интеграция сторонних сервисов.',
    benefits: [
      'REST и GraphQL API',
      'Микросервисная архитектура',
      'Документация и версионирование',
    ],
  },
  {
    title: 'UI/UX дизайн',
    description:
      'Проектирование пользовательских интерфейсов с фокусом на удобство, конверсию и современные дизайн-тренды.',
    benefits: [
      'Прототипирование в Figma',
      'Юзабилити-тестирование',
      'Дизайн-система и гайдлайны',
    ],
  },
  {
    title: 'DevOps и CI/CD',
    description:
      'Настройка инфраструктуры, контейнеризация, автоматизация деплоя и мониторинг приложений.',
    benefits: [
      'Docker и Kubernetes',
      'Автоматические пайплайны',
      'Мониторинг и алертинг',
    ],
  },
  {
    title: 'Тестирование и QA',
    description:
      'Комплексное тестирование: юнит-тесты, интеграционные, E2E, нагрузочное тестирование и аудит безопасности.',
    benefits: [
      'Автоматизированное тестирование',
      'Покрытие кода 80%+',
      'Аудит безопасности',
    ],
  },
];

const timelineSteps = [
  {
    title: 'Бриф и анализ',
    description:
      'Собираем требования, анализируем рынок и конкурентов, формируем техническое задание и дорожную карту проекта.',
    duration: '3-5 дней',
  },
  {
    title: 'Прототипирование',
    description:
      'Создаём интерактивные прототипы и вайрфреймы в Figma, согласовываем UX-сценарии и пользовательский путь.',
    duration: '1-2 недели',
  },
  {
    title: 'Разработка',
    description:
      'Итеративная разработка с еженедельными демо. Фронтенд, бэкенд, базы данных и интеграции — всё параллельно.',
    duration: '4-8 недель',
  },
  {
    title: 'Тестирование',
    description:
      'Ручное и автоматизированное тестирование на всех этапах. QA-инженеры проверяют каждый функционал.',
    duration: '1-2 недели',
  },
  {
    title: 'Деплой',
    description:
      'Настройка продакшн-инфраструктуры, CI/CD, мониторинг. Плавный запуск с нулевым простоем.',
    duration: '2-3 дня',
  },
  {
    title: 'Поддержка',
    description:
      'Техническая поддержка, обновления, мониторинг производительности и масштабирование по мере роста.',
    duration: 'Постоянно',
  },
];

const caseStudies = [
  {
    client: 'Fashion Brand',
    industry: 'E-commerce',
    challengeTitle: 'Проблема',
    challenge:
      'Устаревший интернет-магазин с низкой конверсией, долгой загрузкой страниц и отсутствием мобильной версии. Клиенты уходили к конкурентам.',
    solutionTitle: 'Решение',
    solution:
      'Разработали современный e-commerce на Next.js с headless CMS, оптимизацией производительности и полностью адаптивным дизайном. Интегрировали аналитику и A/B тестирование.',
    resultsTitle: 'Результаты',
    metrics: [
      { value: 3, suffix: 'x', label: 'Рост выручки', change: '+200%' },
      { value: 95, suffix: '/100', label: 'PageSpeed Score', change: 'с 34' },
      { value: 40, suffix: '%', label: 'Рост конверсии', change: '+40%' },
      { value: 2, suffix: 'с', label: 'Время загрузки', change: 'с 8с' },
    ],
  },
  {
    client: 'HealthTech Startup',
    industry: 'Мобильное приложение',
    challengeTitle: 'Проблема',
    challenge:
      'Стартапу нужно было быстро выйти на рынок с мобильным приложением для отслеживания здоровья. Ограниченный бюджет и жёсткие сроки.',
    solutionTitle: 'Решение',
    solution:
      'Создали кроссплатформенное приложение на Flutter с интеграцией носимых устройств, чатом с врачами и AI-рекомендациями. MVP за 6 недель.',
    resultsTitle: 'Результаты',
    metrics: [
      { value: 100, suffix: 'K', label: 'Скачиваний за 3 мес.', change: 'с нуля' },
      { value: 4.8, suffix: '★', label: 'Рейтинг в App Store', change: 'средний 4.8' },
      { value: 65, suffix: '%', label: 'Удержание (30д)', change: '+65%' },
      { value: 6, suffix: ' нед.', label: 'Время до запуска', change: 'MVP' },
    ],
  },
];

const faqItems = [
  {
    question: 'Сколько стоит разработка программного обеспечения?',
    answer:
      'Стоимость зависит от сложности проекта. MVP стартует от $5,000, полноценный продукт — от $15,000. Для крупных enterprise-решений стоимость рассчитывается индивидуально. Мы всегда предоставляем детальную смету до начала работ.',
  },
  {
    question: 'Какие сроки разработки MVP?',
    answer:
      'Типичный MVP разрабатывается за 4-8 недель. Сроки зависят от количества функций, сложности интеграций и готовности дизайна. Мы работаем спринтами по 1-2 недели с регулярными демо.',
  },
  {
    question: 'Какой технологический стек вы используете?',
    answer:
      'Фронтенд: React, Next.js, Vue.js, Flutter, React Native. Бэкенд: Node.js, Python, Go. Базы данных: PostgreSQL, MongoDB, Redis. Облако: AWS, Google Cloud, Vercel. Выбор технологий зависит от задач проекта.',
  },
  {
    question: 'Как происходит процесс разработки?',
    answer:
      'Мы используем Agile/Scrum методологию. Работа делится на спринты по 1-2 недели. После каждого спринта — демо и обратная связь. Вы всегда видите прогресс и можете вносить корректировки.',
  },
  {
    question: 'Получу ли я исходный код?',
    answer:
      'Да, вы получаете полный исходный код проекта в собственность. Мы передаём все репозитории, документацию, доступы к инфраструктуре и инструкции по деплою.',
  },
  {
    question: 'Предоставляете ли вы поддержку после запуска?',
    answer:
      'Да, все тарифы включают бесплатный период поддержки (1-3 месяца). После этого доступны планы технической поддержки с SLA от $500/месяц. Мы также предлагаем выделенную команду для постоянного развития продукта.',
  },
  {
    question: 'Можете ли вы доработать существующий проект?',
    answer:
      'Конечно. Мы берёмся за доработку и рефакторинг существующих проектов. Сначала проводим аудит кода, составляем план улучшений и предоставляем оценку сроков и стоимости.',
  },
  {
    question: 'Как обеспечивается безопасность приложений?',
    answer:
      'Мы следуем best practices безопасности: шифрование данных, защита API, аутентификация OAuth2/JWT, регулярные аудиты, OWASP Top 10 проверки. Для enterprise-проектов проводим пентестинг.',
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
export default function SoftwareDevContent() {
  const { i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form
  const {
    register,
    handleSubmit,
    formState: { isSubmitting: formSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, service: 'software-development', language: i18n.language }),
      });
      if (!res.ok) throw new Error();
      toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
      reset();
    } catch {
      toast.error('Ошибка при отправке. Попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll reveals
  const featuresReveal = useScrollReveal(0.1);
  const timelineReveal = useScrollReveal(0.1);
  const casesReveal = useScrollReveal(0.1);

  return (
    <div className="min-h-screen bg-white">
      {/* ════════════════════════════════════════════════════════
          SECTION 1 — HERO
          ════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 text-white min-h-[60vh] flex items-center overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />

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
              { label: 'Разработка ПО' },
            ]}
          />

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl leading-tight">
            Разработка программного обеспечения под ключ
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed">
            От идеи до развёртывания. Веб-приложения, мобильные приложения, e-commerce и корпоративное ПО. React, Next.js, Flutter, iOS, Android.
          </p>

          {/* CTA */}
          <Link
            href="#cta-form"
            className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            Обсудить проект
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 mt-10 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>50+ проектов реализовано</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>MVP за 4-8 недель</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Бесплатная консультация</span>
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
            Наши направления разработки
          </h2>

          <div
            ref={featuresReveal.ref}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12"
          >
            {features.map((feature, idx) => {
              const Icon = featureIcons[idx] ?? Code;
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
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-orange-600" />
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
                          <Check className="w-4 h-4 text-orange-600 flex-shrink-0" />
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
            Как мы работаем
          </h2>

          <div ref={timelineReveal.ref} className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-10 top-0 bottom-0 w-1 bg-orange-200 origin-top transition-transform duration-[1500ms] ease-out"
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
                  <div className="flex-shrink-0 w-20 h-20 rounded-full bg-orange-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-orange-500/20 z-10">
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
                    <span className="inline-block text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
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
      <DetailPricingSection
        title="Тарифы и стоимость"
        subtitle="Прозрачное ценообразование. Без скрытых платежей. 50% аванс / 50% при сдаче."
        tiers={[
          { name: 'MVP', price: '$3,500', period: 'за проект', setupNote: '50% аванс / 50% при сдаче', features: ['Веб (React/Next.js)', 'До 5 основных экранов', 'Адаптивный дизайн', 'Базовая админ-панель', 'Исходный код в собственность'], minContract: '4-8 недель' },
          { name: 'FULL PRODUCT', price: '$7,000', period: 'за проект', setupNote: '50% аванс / 50% при сдаче', popular: true, roi: { payback: 'Готовность за 8-12 недель', savings: 'Веб + мобильные + поддержка' }, features: ['Всё из MVP', 'Мобильные (iOS/Android)', 'E-commerce платформы', 'API интеграции', '3 мес поддержки'], minContract: '8-12 недель' },
          { name: 'ENTERPRISE', price: '$15,000+', period: 'за проект', setupNote: 'Индивидуальный расчёт', tier3Label: 'Корпоративные системы', tier3Sub: 'Выделенная команда', features: ['Корпоративные системы', 'Выделенная команда', 'SLA и 24/7 поддержка', 'Масштабирование', 'Индивидуальный расчёт'], minContract: 'По запросу' },
        ]}
        contactHref="#cta-form"
        comparisonTable={{
          headers: ['MVP', 'Full Product ⭐', 'Enterprise'],
          rows: [
            { label: 'Экраны', values: ['До 5', <strong key="r1">До 20</strong>, 'Безлимит'] },
            { label: 'Платформы', values: ['Веб', 'Веб + мобильные', 'Все + кастом'] },
            { label: 'Срок', values: ['4-8 нед', '8-12 нед', 'По запросу'] },
            { label: 'Поддержка', values: ['1 мес', '3 мес', '24/7'] },
          ],
        }}
      />

      {/* ════════════════════════════════════════════════════════
          SECTION 5 — CASE STUDIES
          ════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            Кейсы и результаты
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
                  <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded font-medium">
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
                        className="text-3xl md:text-4xl font-bold text-orange-600"
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
            Частые вопросы
          </h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 7 — FINAL CTA
          ════════════════════════════════════════════════════════ */}
      <section
        id="cta-form"
        className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-16 md:py-20"
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Готовы начать свой проект?
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-[800px] mx-auto mb-12">
            Оставьте заявку — мы свяжемся с вами в течение 2 часов, обсудим детали и предложим оптимальное решение для вашего бизнеса.
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
              disabled={isSubmitting || formSubmitting}
              className="sm:col-span-2 bg-white text-orange-600 w-full py-4 rounded-lg font-semibold hover:shadow-2xl transition-all duration-300 disabled:opacity-60"
            >
              {isSubmitting || formSubmitting
                ? 'Отправляем...'
                : 'Получить бесплатную консультацию'}
            </button>
          </form>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-10 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>50+ реализованных проектов</span>
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
