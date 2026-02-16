'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  ShoppingCart,
  CreditCard,
  LifeBuoy,
  Target,
  Megaphone,
  Link2,
  Calendar,
  BarChart3,
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
import { X } from 'lucide-react';
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
const featureIcons = [
  ShoppingCart,
  CreditCard,
  LifeBuoy,
  Target,
  Megaphone,
  Link2,
  Calendar,
  BarChart3,
];

const features = [
  {
    title: 'Каталог и заказы',
    description:
      'Полноценный каталог товаров прямо в Telegram. Пользователи выбирают, добавляют в корзину и оформляют заказ — без перехода на сайт.',
    benefits: [
      'Карточки товаров с фото и описанием',
      'Корзина и оформление заказа в чате',
      'Уведомления о статусе заказа',
    ],
  },
  {
    title: 'Обработка платежей',
    description:
      'Встроенные платежи через Telegram Payments, Stripe, ЮKassa и другие платёжные системы. Безопасные транзакции без сторонних сервисов.',
    benefits: [
      'Telegram Payments API',
      'Интеграция Stripe, ЮKassa, PayMe',
      'Автоматические чеки и подтверждения',
    ],
  },
  {
    title: 'FAQ и поддержка',
    description:
      'Бот мгновенно отвечает на частые вопросы клиентов 24/7. Сложные запросы автоматически перенаправляются живому оператору.',
    benefits: [
      'База знаний с автоответами',
      'Эскалация на оператора',
      'Мультиязычная поддержка',
    ],
  },
  {
    title: 'Генерация лидов',
    description:
      'Квалификация и сбор лидов через интерактивные сценарии. Бот задаёт вопросы, собирает контакты и передаёт горячих лидов в отдел продаж.',
    benefits: [
      'Квалификационные воронки',
      'Автоматический сбор контактов',
      'Скоринг и приоритизация лидов',
    ],
  },
  {
    title: 'Маркетинговые рассылки',
    description:
      'Персонализированные рассылки, акции и промо-кампании. Сегментация аудитории и A/B тестирование для максимальной конверсии.',
    benefits: [
      'Сегментация по поведению',
      'A/B тестирование сообщений',
      'Отложенные и триггерные рассылки',
    ],
  },
  {
    title: 'CRM интеграция',
    description:
      'Синхронизация данных с Bitrix24, amoCRM, HubSpot и другими CRM. Все заявки и контакты автоматически попадают в вашу систему.',
    benefits: [
      'Bitrix24, amoCRM, HubSpot',
      'Автоматическое создание сделок',
      'Двусторонняя синхронизация',
    ],
  },
  {
    title: 'Бронирование',
    description:
      'Запись на услуги, бронирование столиков, консультаций. Интеграция с Google Calendar и вашими системами расписания.',
    benefits: [
      'Календарь доступных слотов',
      'Автоматические напоминания',
      'Google Calendar синхронизация',
    ],
  },
  {
    title: 'Аналитика',
    description:
      'Детальная аналитика использования бота: воронки, конверсии, активность пользователей. Данные для принятия решений.',
    benefits: [
      'Дашборд в реальном времени',
      'Воронки и конверсии',
      'Экспорт отчётов',
    ],
  },
];

const steps = [
  {
    title: 'Анализ задач',
    description:
      'Изучаем ваш бизнес, определяем ключевые сценарии использования бота и формируем техническое задание.',
    duration: '2–3 дня',
  },
  {
    title: 'Проектирование',
    description:
      'Создаём архитектуру бота, проектируем диалоговые сценарии, UX и структуру меню.',
    duration: '3–5 дней',
  },
  {
    title: 'Разработка',
    description:
      'Программируем бот с нуля: логика, интеграции, база данных, административная панель.',
    duration: '2–3 недели',
  },
  {
    title: 'Интеграция платежей',
    description:
      'Подключаем платёжные системы, настраиваем безопасные транзакции и автоматические уведомления.',
    duration: '3–5 дней',
  },
  {
    title: 'Тестирование',
    description:
      'Полное тестирование всех сценариев, нагрузочные тесты, проверка безопасности и отказоустойчивости.',
    duration: '3–5 дней',
  },
  {
    title: 'Запуск',
    description:
      'Публикация бота, обучение вашей команды, настройка мониторинга и техническая поддержка.',
    duration: '1–2 дня',
  },
];

const caseStudies = [
  {
    client: 'E-commerce Store',
    industry: 'E-commerce',
    challengeTitle: 'Проблема',
    challenge:
      'Онлайн-магазин терял клиентов из-за сложного процесса заказа на сайте. Конверсия составляла всего 2.1%, а менеджеры не успевали обрабатывать заявки.',
    solutionTitle: 'Решение',
    solution:
      'Разработали Telegram-бот с полным каталогом, корзиной, оплатой и автоматическими уведомлениями. Интегрировали с CRM и складской системой.',
    resultsTitle: 'Результаты',
    metrics: [
      { value: 70, suffix: '%', label: 'Заказов через бот', change: '+70%' },
      { value: 3.5, suffix: 'x', label: 'Рост конверсии', change: '+250%' },
      { value: 45, suffix: '%', label: 'Снижение нагрузки на менеджеров', change: '-45%' },
      { value: 12, suffix: 'K', label: 'Пользователей бота', change: 'за 6 мес' },
    ],
  },
  {
    client: 'Service Company',
    industry: 'Услуги',
    challengeTitle: 'Проблема',
    challenge:
      'Сервисная компания тратила 3-4 часа в день на ручную запись клиентов. Частые ошибки в расписании приводили к потере клиентов и негативным отзывам.',
    solutionTitle: 'Решение',
    solution:
      'Создали бот с системой бронирования, интеграцией Google Calendar, автоматическими напоминаниями и онлайн-оплатой.',
    resultsTitle: 'Результаты',
    metrics: [
      { value: 500, suffix: '', label: 'Бронирований в месяц', change: '+500/мес' },
      { value: 85, suffix: '%', label: 'Автоматизация записи', change: '+85%' },
      { value: 30, suffix: '%', label: 'Рост выручки', change: '+30%' },
      { value: 0, suffix: '', label: 'Ошибок в расписании', change: '-100%' },
    ],
  },
];

const faqItems = [
  {
    question: 'Сколько стоит разработка Telegram-бота?',
    answer:
      'Стоимость зависит от функциональности. Базовый бот с каталогом и FAQ — от $1,500. Продвинутый бот с платежами, CRM и рассылками — от $5,000. Для сложных проектов рассчитываем индивидуально.',
  },
  {
    question: 'Сколько времени занимает разработка?',
    answer:
      'Базовый бот — 3-4 недели. Продвинутый бот с интеграциями — 5-8 недель. Enterprise решения — от 2 месяцев. Точные сроки определяем после анализа требований.',
  },
  {
    question: 'Какие платёжные системы можно подключить?',
    answer:
      'Поддерживаем Telegram Payments, Stripe, ЮKassa, PayMe, Click, Payme и другие. Можем подключить любую платёжную систему с открытым API.',
  },
  {
    question: 'Можно ли интегрировать бот с нашей CRM?',
    answer:
      'Да, интегрируем с Bitrix24, amoCRM, HubSpot, Salesforce и любой CRM с API. Данные синхронизируются в обе стороны автоматически.',
  },
  {
    question: 'Бот работает с группами и каналами?',
    answer:
      'Да, бот может работать как в личных сообщениях, так и в группах и каналах. Модерация, автоответы, публикация контента — всё настраивается.',
  },
  {
    question: 'Как обеспечивается безопасность данных?',
    answer:
      'Шифрование данных, защита от DDoS, безопасное хранение платёжных данных по стандарту PCI DSS. Регулярные аудиты безопасности и бэкапы.',
  },
  {
    question: 'Предоставляете ли вы поддержку после запуска?',
    answer:
      'Да, от 1 до 12 месяцев поддержки в зависимости от тарифа. Включает исправление багов, обновления, мониторинг и консультации.',
  },
  {
    question: 'Можно ли добавить ИИ в Telegram-бот?',
    answer:
      'Да, интегрируем GPT, Claude и другие ИИ-модели для умных ответов, генерации контента, обработки естественного языка и персонализации.',
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
export default function TelegramBotsContent() {
  const { i18n } = useTranslation();

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
        body: JSON.stringify({ ...data, consent: true, source: 'telegram-bots-page', service: 'telegram-bots', language: i18n.language, website: '' }),
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
  const casesReveal = useScrollReveal(0.1);

  return (
    <div className="min-h-screen bg-white">
      {/* ════════════════════════════════════════════════════════
          SECTION 1 — HERO
          ════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-cyan-600 via-cyan-500 to-blue-500 text-white min-h-[60vh] flex items-center overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />

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
              { label: 'Telegram боты' },
            ]}
          />

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl leading-tight">
            Разработка Telegram ботов для бизнеса
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed">
            Автоматизируйте продажи, поддержку и маркетинг с помощью мощных Telegram-ботов.
            Платежи, CRM интеграция, рассылки — всё в одном решении.
          </p>

          {/* CTA */}
          <Link
            href="#cta-form"
            className="inline-flex items-center gap-2 bg-white text-cyan-600 px-8 py-4 rounded-lg font-semibold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            Обсудить проект
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 mt-10 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>50+ ботов запущено</span>
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
          SECTION 2 — FEATURES DEEP DIVE
          ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            Возможности Telegram-ботов
          </h2>

          <div
            ref={featuresReveal.ref}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12"
          >
            {features.map((feature, idx) => {
              const Icon = featureIcons[idx] ?? ShoppingCart;
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
                    <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-cyan-600" />
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
                          <Check className="w-4 h-4 text-cyan-600 flex-shrink-0" />
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
              className="absolute left-10 top-0 bottom-0 w-1 bg-cyan-200 origin-top transition-transform duration-[1500ms] ease-out"
              style={{
                transform: timelineReveal.isVisible ? 'scaleY(1)' : 'scaleY(0)',
              }}
            />

            <div className="space-y-12">
              {steps.map((step, idx) => (
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
                  <div className="flex-shrink-0 w-20 h-20 rounded-full bg-cyan-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-cyan-500/20 z-10">
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
                    <span className="inline-block text-sm bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full font-medium">
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
        title="Тарифные планы"
        subtitle="Выберите план, который подходит вашему бизнесу. Все планы включают базу данных, админ-панель и техподдержку."
        tiers={[
          { name: 'БАЗОВЫЙ', price: '$49', period: '/месяц', setupNote: '+ $297 настройка', roi: { payback: 'Окупается за 7 дней', savings: 'Экономия ~$400/мес' }, features: ['До 500 сообщений/мес', '1 Telegram бот', 'Базовые Q&A ответы', 'Админ-панель', 'Поддержка в Telegram'], minContract: 'Минимум 3 месяца' },
          { name: 'РОСТ', price: '$97', period: '/месяц', setupNote: '+ $497 настройка', popular: true, roi: { payback: 'Окупается за 4 дня', savings: 'Экономия ~$800/мес' }, features: ['До 3,000 сообщений/мес', '3 канала (TG/WA/IG)', 'ИИ-квалификация лидов', 'CRM интеграция', 'Приоритетная поддержка'], minContract: 'Минимум 6 месяцев' },
          { name: 'БИЗНЕС', price: '$197', period: '/месяц', setupNote: '+ $997 настройка', tier3Label: 'Для растущих компаний', tier3Sub: 'Все возможности + кастом', features: ['Безлимитные сообщения', 'Все каналы + кастом', 'Продвинутая ИИ-логика', 'API доступ', '24/7 поддержка + менеджер'], minContract: 'Минимум 6 месяцев' },
        ]}
        contactHref="#cta-form"
        comparisonTable={{
          headers: ['Базовый', 'Рост ⭐', 'Бизнес'],
          rows: [
            { label: 'Сообщений в месяц', values: ['500', <strong key="r1">3,000</strong>, 'Безлимит'] },
            { label: 'Каналы', values: ['1 (TG)', <strong key="r2">3 (TG/WA/IG)</strong>, 'Все + кастом'] },
            { label: 'ИИ-квалификация', values: [<X key="x1" className="w-5 h-5 text-red-500 mx-auto" />, <Check key="c1" className="w-5 h-5 text-green-600 mx-auto" />, <Check key="c2" className="w-5 h-5 text-green-600 mx-auto" />] },
            { label: 'CRM интеграция', values: [<X key="x2" className="w-5 h-5 text-red-500 mx-auto" />, <Check key="c3" className="w-5 h-5 text-green-600 mx-auto" />, <Check key="c4" className="w-5 h-5 text-green-600 mx-auto" />] },
            { label: 'Поддержка', values: ['Email', 'Приоритетная', '24/7 + менеджер'] },
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
                  <span className="text-sm bg-cyan-100 text-cyan-700 px-3 py-1 rounded font-medium">
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
                        className="text-3xl md:text-4xl font-bold text-cyan-600"
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
        className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-16 md:py-20"
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Готовы автоматизировать бизнес с Telegram-ботом?
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-[800px] mx-auto mb-12">
            Оставьте заявку — мы обсудим ваш проект и предложим оптимальное решение. Бесплатная консультация.
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
              className="sm:col-span-2 bg-white text-cyan-600 w-full py-4 rounded-lg font-semibold hover:shadow-2xl transition-all duration-300 disabled:opacity-60"
            >
              {isSubmitting ? 'Отправляем...' : 'Получить бесплатную консультацию'}
            </button>
          </form>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-10 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>50+ довольных клиентов</span>
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
