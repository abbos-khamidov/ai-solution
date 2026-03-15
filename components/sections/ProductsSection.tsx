'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bot, LayoutDashboard, Building2, LineChart, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { track } from '@/lib/analytics/gtag';

type Message = { from: 'user' | 'bot'; text: string };

const products = [
  {
    id: 'customer-service',
    tab: 'Customer Service Bot',
    icon: Bot,
    accentColor: '#3B82F6',
    glowColor: 'rgba(59,130,246,0.18)',
    titleKey: 'productsSection.product1Title',
    descKey: 'productsSection.product1Desc',
    featureKeys: ['productsSection.product1F1', 'productsSection.product1F2', 'productsSection.product1F3'],
    priceKey: 'productsSection.product1Price',
    href: '/products/customer-service',
    mockup: [
      { from: 'user', text: 'Добрый день! Хочу узнать о ценах' },
      { from: 'bot',  text: 'Привет! Рад помочь 👋 Что вас интересует?' },
      { from: 'user', text: 'Абонемент на месяц' },
      { from: 'bot',  text: '✅ Абонемент — 3 500 000 сум/мес. Оформляем?' },
    ] as Message[],
  },
  {
    id: 'management-assistant',
    tab: 'Management Assistant',
    icon: LayoutDashboard,
    accentColor: '#06B6D4',
    glowColor: 'rgba(6,182,212,0.18)',
    titleKey: 'productsSection.product2Title',
    descKey: 'productsSection.product2Desc',
    featureKeys: ['productsSection.product2F1', 'productsSection.product2F2', 'productsSection.product2F3'],
    priceKey: 'productsSection.product2Price',
    href: '/products/management-assistant',
    mockup: [
      { from: 'bot',  text: '📊 Отчёт за вчера: +12% продаж' },
      { from: 'bot',  text: '48 новых лидов · 6 горячих' },
      { from: 'user', text: 'Кто лучший менеджер?' },
      { from: 'bot',  text: '🏆 Алишер — 14 сделок, конверсия 68%' },
    ] as Message[],
  },
  {
    id: 'corporate-ai',
    tab: 'Corporate AI (RAG)',
    icon: Building2,
    accentColor: '#7C3AED',
    glowColor: 'rgba(124,58,237,0.18)',
    titleKey: 'productsSection.product3Title',
    descKey: 'productsSection.product3Desc',
    featureKeys: ['productsSection.product3F1', 'productsSection.product3F2', 'productsSection.product3F3'],
    priceKey: 'productsSection.product3Price',
    href: '/products/corporate-ai',
    mockup: [
      { from: 'user', text: 'Что в уставе о дивидендах?' },
      { from: 'bot',  text: '📄 §12.3: дивиденды выплачиваются ежеквартально...' },
      { from: 'user', text: 'KPI отдела за Q1' },
      { from: 'bot',  text: '📊 Q1: выполнение 94%, топ — отдел продаж' },
    ] as Message[],
  },
  {
    id: 'ai-analytics',
    tab: 'AI-аналитика',
    icon: LineChart,
    accentColor: '#0EA5E9',
    glowColor: 'rgba(14,165,233,0.18)',
    title: 'AI-аналитика и дашборды',
    desc: 'KPI-дашборды, отчёты и рекомендации руководителю',
    features: ['Дашборд KPI в реальном времени', 'AI-рекомендации руководителю', 'Алерты при просадках метрик'],
    price: 'от $1 900',
    href: '/products/ai-analytics',
    mockup: [
      { from: 'bot',  text: '⚠️ Конверсия упала на 8% вчера' },
      { from: 'user', text: 'Почему?' },
      { from: 'bot',  text: '📉 3 менеджера не отвечали >2 часов' },
      { from: 'bot',  text: '💡 Включить авто-напоминания?' },
    ] as Message[],
  },
];

export function ProductsSection() {
  const { t } = useTranslation();
  const [activeIdx, setActiveIdx] = useState(0);
  const product = products[activeIdx];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tp = product as any;
  const title    = tp.titleKey    ? t(tp.titleKey)                          : tp.title    ?? '';
  const desc     = tp.descKey     ? t(tp.descKey)                           : tp.desc     ?? '';
  const features = tp.featureKeys ? (tp.featureKeys as string[]).map((k: string) => t(k as never)) : (tp.features as string[]) ?? [];
  const price    = tp.priceKey    ? t(tp.priceKey)                          : tp.price    ?? '';

  return (
    <section className="py-12 md:py-14 bg-[#05050A]" id="products">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        <ScrollReveal duration={0.25}>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8FAFC] mb-4">
              {t('productsSection.title')}
            </h2>
            <p className="text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto">
              {t('productsSection.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal duration={0.25} delay={0.08}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {products.map((p, idx) => {
              const Icon = p.icon;
              const isActive = activeIdx === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveIdx(idx)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap"
                  style={isActive ? {
                    background: `linear-gradient(135deg, ${p.accentColor}22, ${p.accentColor}10)`,
                    border: `1px solid ${p.accentColor}55`,
                    color: p.accentColor,
                    boxShadow: `0 0 16px ${p.glowColor}`,
                  } : {
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#94A3B8',
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {p.tab}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Tab content */}
        <div
          key={activeIdx}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          {/* Left: product info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${product.accentColor}22, ${product.accentColor}08)`,
                  border: `1px solid ${product.accentColor}30`,
                  boxShadow: `0 0 28px ${product.glowColor}`,
                }}
              >
                <product.icon className="w-8 h-8" style={{ color: product.accentColor }} />
              </div>
              <div className="pt-1">
                <h3 className="text-2xl font-bold text-[#F8FAFC]">{title}</h3>
                <p className="text-[#64748B] text-sm mt-1.5 leading-relaxed">{desc}</p>
              </div>
            </div>

            <ul className="space-y-3">
              {features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="10" fill={`${product.accentColor}20`} />
                    <path
                      d="M6 10l3 3 5-5"
                      stroke={product.accentColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm text-[#CBD5E1]">{feat}</span>
                </li>
              ))}
            </ul>

            <div
              className="flex items-center justify-between pt-5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              <span className="text-xl font-bold" style={{ color: product.accentColor }}>
                {price}
              </span>
              <Link
                href={product.href}
                onClick={() => track('cta_click_product_tab', { product: product.id })}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: `linear-gradient(135deg, ${product.accentColor}, ${product.accentColor}bb)` }}
              >
                Подробнее
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: chat mockup */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="w-full max-w-[340px] rounded-2xl p-px"
              style={{
                background: `linear-gradient(135deg, ${product.accentColor}40, rgba(255,255,255,0.06))`,
              }}
            >
              <div className="rounded-2xl overflow-hidden" style={{ background: '#080812' }}>
                {/* Chat header */}
                <div
                  className="flex items-center gap-2.5 px-4 py-3"
                  style={{
                    background: `${product.accentColor}12`,
                    borderBottom: `1px solid ${product.accentColor}20`,
                  }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: product.accentColor, boxShadow: `0 0 6px ${product.accentColor}` }}
                  />
                  <span className="text-xs font-semibold" style={{ color: product.accentColor }}>
                    AI Solution Bot
                  </span>
                  <span className="ml-auto text-[11px] text-[#34D399]">● онлайн</span>
                </div>

                {/* Messages */}
                <div className="p-4 space-y-2.5 min-h-[196px]">
                  {product.mockup.map((msg, i) => (
                    <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className="max-w-[85%] px-3 py-2 text-[12px] leading-relaxed"
                        style={msg.from === 'user' ? {
                          background: `${product.accentColor}28`,
                          border: `1px solid ${product.accentColor}40`,
                          color: '#F8FAFC',
                          borderRadius: '12px 12px 3px 12px',
                        } : {
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: '#CBD5E1',
                          borderRadius: '12px 12px 12px 3px',
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input bar */}
                <div
                  className="flex items-center gap-2 px-3 py-3"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="flex-1 h-8 rounded-lg px-3 flex items-center text-[11px] text-[#475569]"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    Написать сообщение...
                  </div>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: product.accentColor }}
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
