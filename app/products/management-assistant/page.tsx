'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowDown, AlertTriangle } from 'lucide-react';
import { RelatedArticles } from '@/components/seo/RelatedArticles';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ContactSection } from '@/components/sections/ContactSection';
import { PricingCards, PricingPlan } from '@/components/shared/PricingCards';

export default function ManagementAssistantPage() {
  const { t } = useTranslation();

  const features = useMemo(() => [
    {
      emoji: '👥',
      title: t('productPages.ma.f1Title'),
      description: t('productPages.ma.f1Desc'),
      accentColor: '#3B82F6',
      glow: 'rgba(59,130,246,0.12)',
    },
    {
      emoji: '📈',
      title: t('productPages.ma.f2Title'),
      description: t('productPages.ma.f2Desc'),
      accentColor: '#06B6D4',
      glow: 'rgba(6,182,212,0.12)',
    },
    {
      emoji: '💰',
      title: t('productPages.ma.f3Title'),
      description: t('productPages.ma.f3Desc'),
      accentColor: '#10B981',
      glow: 'rgba(16,185,129,0.12)',
    },
    {
      emoji: '🔍',
      title: t('productPages.ma.f4Title'),
      description: t('productPages.ma.f4Desc'),
      accentColor: '#F59E0B',
      glow: 'rgba(245,158,11,0.12)',
    },
  ], [t]);

  const managementPlans: PricingPlan[] = useMemo(() => [
    {
      name: 'Starter',
      setupPrice: '$490',
      monthlyPrice: '$200 / мес',
      description: 'Базовый контроль задач и отчётность',
      problem: 'Руководитель тратит часы на сбор отчётов вручную',
      result: 'Автоматические сводки каждый день без ручной работы',
      roi: {
        label: 'Окупается за 1–2 месяца',
        detail: 'Экономит 5–8 часов руководителя в неделю',
      },
      highlighted: false,
      features: [
        'Ежедневные сводки по KPI',
        'Контроль задач команды',
        'Уведомления о просрочках',
        'Telegram-бот для руководителя',
        'Запуск за 2–3 дня',
      ],
      ctaText: 'Попробовать за $490',
    },
    {
      name: 'Growth',
      badge: 'Популярный',
      setupPrice: '$3 200',
      monthlyPrice: '$1 100 / мес',
      description: 'Полный контроль бизнеса для руководителя',
      problem: 'Нет прозрачности: KPI разбросаны по чатам и таблицам',
      result: 'Единый дашборд — все метрики и задачи в одном месте',
      roi: {
        label: 'Заменяет 1 сотрудника на контроле',
        detail: 'Средний чек $4 500 · окупается за 2–3 месяца',
      },
      highlighted: true,
      features: [
        'Дашборд метрик в реальном времени',
        'Автоматические еженедельные отчёты',
        'Интеграция с CRM и финансами',
        'Контроль задач и дедлайнов',
        'AI-рекомендации руководителю',
        'Настройка за 5–7 дней',
      ],
      ctaText: 'Обсудить внедрение',
    },
    {
      name: 'Enterprise',
      setupPrice: 'от $8 000',
      monthlyPrice: 'от $2 800 / мес',
      description: 'AI-система управления для нескольких отделов',
      problem: 'Много отделов, данные в разных системах, решения вслепую',
      result: 'Полная прозрачность бизнеса: финансы, продажи, HR в одном дашборде',
      roi: {
        label: 'Экономит 1–3 зарплаты сотрудников',
        detail: 'Заменяет ручную аналитику и отчётность',
      },
      highlighted: false,
      features: [
        'Мульти-отдельный дашборд',
        'Финансовая аналитика и прогнозы',
        'Интеграция с 1С, ERP, CRM',
        'Кастомные метрики и KPI',
        'Выделенный менеджер + SLA',
        'On-premise вариант',
      ],
      ctaText: 'Запросить расчёт',
    },
  ], [t]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Что такое Management Assistant?', acceptedAnswer: { '@type': 'Answer', text: 'ИИ-ассистент для руководителя: сводки по команде, KPI, финансы, контроль задач в одном окне (часто в Telegram). Экономит 1–3 зарплаты на ручной аналитике.' } },
      { '@type': 'Question', name: 'Сколько стоит Management Assistant?', acceptedAnswer: { '@type': 'Answer', text: 'От $3 000 за запуск + от $1 200/мес. Enterprise — от $7 500 за запуск. Смета после бесплатного аудита.' } },
      { '@type': 'Question', name: 'С чем интегрируется?', acceptedAnswer: { '@type': 'Answer', text: '1С, ERP, CRM, рекламные кабинеты, мессенджеры. Данные стекаются в единый дашборд и отчёты.' } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main>
      {/* Hero */}
      <section className="relative min-h-[80vh] pt-28 pb-16 flex items-center overflow-hidden" style={{ background: '#05050A' }}>
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(rgba(6,182,212,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)',
            filter: 'blur(80px)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-8">
            <Link href="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>{t('nav.products')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#F8FAFC]">Management Assistant</span>
          </nav>

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[#06B6D4] mb-6"
            style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' }}
          >
            📊 Management Assistant
          </div>

          <h1 className="text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.1] font-extrabold text-[#F8FAFC] tracking-[-0.03em] mb-6 max-w-3xl">
            {t('productPages.ma.heroTitle')}
          </h1>

          <p className="text-lg md:text-xl text-[#94A3B8] max-w-2xl mb-10 leading-relaxed">
            {t('productPages.ma.heroSubtitle')}
          </p>

          <a
            href="#contact"
            className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold text-lg shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
          >
            {t('productPages.ma.heroCta')}
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </section>

      {/* Warning block */}
      <section className="py-10 md:py-16" style={{ background: '#0D0D1A' }}>
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <ScrollReveal duration={0.6}>
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: 'rgba(245, 158, 11, 0.05)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(245, 158, 11, 0.15)' }}
                >
                  <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <div>
                  <h3 className="text-[#F59E0B] font-bold text-lg mb-2">{t('productPages.ma.warningTitle')}</h3>
                  <p className="text-[#94A3B8] leading-relaxed">
                    {t('productPages.ma.warningText')}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20" style={{ background: '#05050A' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <ScrollReveal duration={0.6}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">{t('productPages.ma.featuresTitle')}</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <ScrollReveal key={idx} direction="up" duration={0.6} delay={idx * 0.1}>
                <div
                  className="p-6 md:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(20px)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = `${feature.accentColor}40`;
                    el.style.boxShadow = `0 0 30px ${feature.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <div className="relative w-14 h-14 flex items-center justify-center mb-4">
                    <div className="absolute inset-0 rounded-xl" style={{ background: feature.glow, filter: 'blur(10px)' }} />
                    <div
                      className="relative w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${feature.accentColor}20, ${feature.accentColor}08)`,
                        border: `1px solid ${feature.accentColor}30`,
                      }}
                    >
                      <span className="text-2xl">{feature.emoji}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#F8FAFC] mb-3">{feature.title}</h3>
                  <p className="text-[#94A3B8] leading-relaxed text-sm">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: '#0D0D1A' }}>
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.06), transparent 70%)', filter: 'blur(80px)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <ScrollReveal duration={0.6}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">
                {t('productPages.ma.pricingTitle')}
              </h2>
              <p className="text-lg text-[#64748B]">
                {t('productPages.pricingSubtitle')}
              </p>
            </div>
          </ScrollReveal>

          <PricingCards plans={managementPlans} defaultCtaText={t('nav.discuss')} />

          <ScrollReveal duration={0.6} delay={0.4}>
            <div className="mt-10 text-center max-w-2xl mx-auto">
              <div
                className="rounded-xl p-5 text-sm text-[#94A3B8] leading-relaxed"
                style={{ background: 'rgba(59, 130, 246, 0.06)', border: '1px solid rgba(59, 130, 246, 0.15)' }}
              >
                💡 {t('productPages.auditNote')}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <RelatedArticles articles={[
        { slug: 'lichny-ii-bot-assistant', title: 'Личный AI бот-ассистент для руководителя бизнеса' },
        { slug: 'llm-bot-manager-telegram', title: 'LLM и бот-менеджер в Telegram — что это и зачем бизнесу в 2025' },
      ]} />

      {/* Contact */}
      <ContactSection />
    </main>
    </>
  );
}
