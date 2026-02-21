'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowDown, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ContactSection } from '@/components/sections/ContactSection';
import { PricingCards, PricingPlan } from '@/components/shared/PricingCards';

const ragSteps = [
  { icon: '📄', label: 'Ваши документы' },
  { icon: '🔄', label: 'Индексация' },
  { icon: '🤖', label: 'AI ищет в ваших данных' },
  { icon: '💬', label: 'Точный ответ' },
];

const features = [
  {
    emoji: '📋',
    title: 'База знаний для сотрудников',
    description:
      'HR-политики, регламенты, инструкции по продуктам. Новый сотрудник задаёт вопросы — AI отвечает как опытный коллега.',
    accentColor: '#3B82F6',
    glow: 'rgba(59,130,246,0.12)',
  },
  {
    emoji: '💼',
    title: 'Помощник для менеджеров по продажам',
    description:
      'Прайсы, характеристики, условия сделок. Менеджер спрашивает — AI находит нужное за секунду.',
    accentColor: '#06B6D4',
    glow: 'rgba(6,182,212,0.12)',
  },
  {
    emoji: '🔗',
    title: 'Интеграция с 1С / Bitrix24 / amoCRM',
    description:
      'AI работает с актуальными данными из ваших систем в реальном времени.',
    accentColor: '#7C3AED',
    glow: 'rgba(124,58,237,0.12)',
  },
  {
    emoji: '🔒',
    title: 'On-premise — данные остаются у вас',
    description:
      'Поднимаем сервер на вашем оборудовании или в вашем облаке. Ни один запрос не уходит к OpenAI или другим внешним сервисам.',
    accentColor: '#10B981',
    glow: 'rgba(16,185,129,0.12)',
  },
];

const corporatePlans: PricingPlan[] = [
  {
    name: 'Basic',
    setupPrice: '$1 000 – $1 500',
    monthlyPrice: '$500 – $800',
    description: 'Небольшая база документов, облако',
    highlighted: false,
    features: [
      'RAG на PDF и Word документах',
      'До 500 документов',
      'Веб-интерфейс для сотрудников',
      'Облачное размещение',
    ],
  },
  {
    name: 'Pro',
    badge: '⭐ Популярный',
    setupPrice: '$3 000 – $6 000',
    monthlyPrice: '$1 200 – $2 500',
    description: 'Большая база, интеграции, брендинг',
    highlighted: true,
    features: [
      'До 5 000 документов',
      'Интеграция с Bitrix24 / amoCRM / Google Drive',
      'Кастомный интерфейс под ваш бренд',
      'Аналитика запросов',
    ],
  },
  {
    name: 'Max',
    setupPrice: '$8 000 – $20 000+',
    monthlyPrice: '$3 000 – $8 000',
    description: 'On-premise, 1С, без ограничений',
    highlighted: false,
    features: [
      'On-premise — полностью на вашем сервере',
      'Интеграция с 1С',
      'Неограниченные документы',
      'Выделенный сервер и поддержка',
    ],
  },
];

export default function CorporateAIPage() {
  const { t } = useTranslation();
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[80vh] pt-28 pb-16 flex items-center overflow-hidden" style={{ background: '#05050A' }}>
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.1), transparent 70%)',
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
            <span className="text-[#F8FAFC]">Corporate AI (RAG)</span>
          </nav>

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[#7C3AED] mb-6"
            style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)' }}
          >
            🏢 Corporate AI (RAG)
          </div>

          <h1 className="text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.1] font-extrabold text-[#F8FAFC] tracking-[-0.03em] mb-6 max-w-3xl">
            Своя AI-база знаний —<br className="hidden sm:block" /> отвечает только по вашим документам
          </h1>

          <p className="text-lg md:text-xl text-[#94A3B8] max-w-2xl mb-10 leading-relaxed">
            Загружаете документы компании — регламенты, прайсы, инструкции. AI отвечает точно по вашим данным. Ничего не выдумывает. Данные не уходят в интернет.
          </p>

          <a
            href="#contact"
            className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white font-semibold text-lg shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
          >
            Обсудить Corporate AI
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </section>

      {/* How RAG works */}
      <section className="py-16 md:py-20" style={{ background: '#0D0D1A' }}>
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <ScrollReveal duration={0.6}>
            <div
              className="rounded-2xl p-8 md:p-12"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-8 text-center">
                Как это работает
              </h2>

              {/* RAG Steps */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                {ragSteps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                        style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)' }}
                      >
                        {step.icon}
                      </div>
                      <span className="text-sm text-[#94A3B8] font-medium max-w-[80px] leading-snug">{step.label}</span>
                    </div>
                    {idx < ragSteps.length - 1 && (
                      <div className="hidden sm:flex items-center text-[#64748B]">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div
                className="rounded-xl p-4 text-sm text-[#94A3B8] leading-relaxed text-center"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                В отличие от обычного ChatGPT — Corporate AI не выдумывает ответы.
                Если информации нет в ваших документах, он так и скажет.
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
              <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">Возможности системы</h2>
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.06), transparent 70%)', filter: 'blur(80px)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <ScrollReveal duration={0.6}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">
                Стоимость Corporate AI (RAG)
              </h2>
              <p className="text-lg text-[#64748B]">
                Выберите пакет под масштаб вашей организации
              </p>
            </div>
          </ScrollReveal>

          <PricingCards plans={corporatePlans} defaultCtaText="Обсудить" />

          <ScrollReveal duration={0.6} delay={0.4}>
            <div className="mt-10 text-center max-w-2xl mx-auto">
              <div
                className="rounded-xl p-5 text-sm text-[#94A3B8] leading-relaxed"
                style={{ background: 'rgba(59, 130, 246, 0.06)', border: '1px solid rgba(59, 130, 246, 0.15)' }}
              >
                💡 Точную стоимость считаем после бесплатного 60-минутного аудита — цена зависит от количества сценариев, каналов и интеграций.
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact */}
      <ContactSection />
    </main>
  );
}
