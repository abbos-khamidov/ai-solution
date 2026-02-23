'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowDown } from 'lucide-react';
import { RelatedArticles } from '@/components/seo/RelatedArticles';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ContactSection } from '@/components/sections/ContactSection';
import { PricingCards, PricingPlan } from '@/components/shared/PricingCards';

export default function CustomerServicePage() {
  const { t } = useTranslation();

  const stats = useMemo(() => [
    { value: t('productPages.cs.stat1Value'), label: t('productPages.cs.stat1Label') },
    { value: t('productPages.cs.stat2Value'), label: t('productPages.cs.stat2Label') },
    { value: '24/7', label: t('productPages.cs.stat3Label') },
    { value: 'Cold→Hot', label: t('productPages.cs.stat4Label') },
  ], [t]);

  const features = useMemo(() => [
    {
      emoji: '📨',
      title: t('productPages.cs.f1Title'),
      description: t('productPages.cs.f1Desc'),
      accentColor: '#3B82F6',
      glow: 'rgba(59,130,246,0.12)',
    },
    {
      emoji: '🎯',
      title: t('productPages.cs.f2Title'),
      description: t('productPages.cs.f2Desc'),
      accentColor: '#06B6D4',
      glow: 'rgba(6,182,212,0.12)',
    },
    {
      emoji: '🛡️',
      title: t('productPages.cs.f3Title'),
      description: t('productPages.cs.f3Desc'),
      accentColor: '#7C3AED',
      glow: 'rgba(124,58,237,0.12)',
    },
    {
      emoji: '⚡',
      title: t('productPages.cs.f4Title'),
      description: t('productPages.cs.f4Desc'),
      accentColor: '#F59E0B',
      glow: 'rgba(245,158,11,0.12)',
    },
  ], [t]);

  const csPricingPlans: PricingPlan[] = useMemo(() => [
    {
      name: 'Basic',
      setupPrice: '$1 000 – $1 500',
      monthlyPrice: '$500 – $800',
      description: t('pricing.basic.desc'),
      highlighted: false,
      features: [
        t('pricing.basic.f1'),
        t('pricing.basic.f2'),
        t('pricing.basic.f3'),
        t('pricing.basic.f4'),
        t('pricing.basic.f5'),
        t('pricing.basic.f6'),
      ],
    },
    {
      name: 'Pro',
      badge: t('pricing.popular'),
      setupPrice: '$3 000 – $6 000',
      monthlyPrice: '$1 200 – $2 500',
      description: t('pricing.pro.desc'),
      highlighted: true,
      features: [
        t('pricing.pro.f1'),
        t('pricing.pro.f2'),
        t('pricing.pro.f3'),
        t('pricing.pro.f4'),
        t('pricing.pro.f5'),
        t('pricing.pro.f6'),
        t('pricing.pro.f7'),
      ],
    },
    {
      name: 'Max',
      setupPrice: '$8 000 – $20 000+',
      monthlyPrice: '$3 000 – $8 000',
      description: t('pricing.max.desc'),
      highlighted: false,
      features: [
        t('pricing.max.f1'),
        t('pricing.max.f2'),
        t('pricing.max.f3'),
        t('pricing.max.f4'),
        t('pricing.max.f5'),
        t('pricing.max.f6'),
        t('pricing.max.f7'),
      ],
    },
  ], [t]);

  const whoIsItFor = useMemo(() => [
    t('productPages.cs.fw1'),
    t('productPages.cs.fw2'),
    t('productPages.cs.fw3'),
    t('productPages.cs.fw4'),
    t('productPages.cs.fw5'),
  ], [t]);

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[85vh] pt-28 pb-16 flex items-center overflow-hidden" style={{ background: '#05050A' }}>
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/3 left-1/3 w-[500px] h-[500px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)',
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
            <span className="text-[#F8FAFC]">Customer Service Bot</span>
          </nav>

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[#3B82F6] mb-6"
            style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}
          >
            🤖 Customer Service Bot
          </div>

          <h1 className="text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.1] font-extrabold text-[#F8FAFC] tracking-[-0.03em] mb-6 max-w-3xl">
            {t('productPages.cs.heroTitle')}
          </h1>

          <p className="text-lg md:text-xl text-[#94A3B8] max-w-2xl mb-10 leading-relaxed">
            {t('productPages.cs.heroSubtitle')}
          </p>

          <a
            href="#contact"
            className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold text-lg shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 mb-14"
          >
            {t('productPages.cs.heroCta')}
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`text-center px-4 py-2 ${idx < stats.length - 1 ? 'sm:border-r sm:border-white/[0.08]' : ''}`}
              >
                <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-[#64748B]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24" style={{ background: '#0D0D1A' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <ScrollReveal duration={0.6}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">{t('productPages.cs.featuresTitle')}</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <ScrollReveal key={idx} direction="up" duration={0.6} delay={idx * 0.1}>
                <div
                  className="group p-6 md:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
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

      {/* Who is it for */}
      <section className="py-16 md:py-20" style={{ background: '#05050A' }}>
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
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-6">
                {t('productPages.cs.forWhomTitle')}
              </h2>
              <ul className="space-y-4">
                {whoIsItFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#3B82F6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6l2.5 2.5 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-[#94A3B8] text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: '#0D0D1A' }}>
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06), transparent 70%)', filter: 'blur(80px)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <ScrollReveal duration={0.6}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">
                {t('productPages.cs.pricingTitle')}
              </h2>
              <p className="text-lg text-[#64748B]">
                {t('productPages.pricingSubtitle')}
              </p>
            </div>
          </ScrollReveal>

          <PricingCards plans={csPricingPlans} defaultCtaText={t('nav.discuss')} />

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
        { slug: 'ai-chatbot-dlya-biznesa-uzbekistan', title: 'AI чат-бот для бизнеса в Узбекистане — полное руководство' },
        { slug: 'kvalifikaciya-lidov-ai', title: 'Автоматическая квалификация лидов с помощью AI — система Cold/Warm/Hot' },
      ]} />

      {/* Contact */}
      <ContactSection />
    </main>
  );
}
