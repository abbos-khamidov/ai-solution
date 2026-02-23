'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Building2, LayoutDashboard, LineChart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { track } from '@/lib/analytics/gtag';

const productKeys = [
  {
    icon: Bot,
    titleKey: 'productsSection.product1Title',
    descKey: 'productsSection.product1Desc',
    featureKeys: ['productsSection.product1F1', 'productsSection.product1F2', 'productsSection.product1F3'],
    priceKey: 'productsSection.product1Price',
    href: '/products/customer-service',
    glowColor: 'rgba(59, 130, 246, 0.12)',
    accentColor: '#3B82F6',
  },
  {
    icon: LayoutDashboard,
    titleKey: 'productsSection.product2Title',
    descKey: 'productsSection.product2Desc',
    featureKeys: ['productsSection.product2F1', 'productsSection.product2F2', 'productsSection.product2F3'],
    priceKey: 'productsSection.product2Price',
    href: '/products/management-assistant',
    glowColor: 'rgba(6, 182, 212, 0.12)',
    accentColor: '#06B6D4',
  },
  {
    icon: Building2,
    titleKey: 'productsSection.product3Title',
    descKey: 'productsSection.product3Desc',
    featureKeys: ['productsSection.product3F1', 'productsSection.product3F2', 'productsSection.product3F3'],
    priceKey: 'productsSection.product3Price',
    href: '/products/corporate-ai',
    glowColor: 'rgba(124, 58, 237, 0.12)',
    accentColor: '#7C3AED',
  },
];

export function ProductsSection() {
  const { t } = useTranslation();
  return (
    <section className="py-16 md:py-24 bg-[#05050A]" id="products">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <ScrollReveal duration={0.6}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8FAFC] mb-4">
              {t('productsSection.title')}
            </h2>
            <p className="text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto">
              {t('productsSection.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {productKeys.map((product, idx) => (
            <ScrollReveal key={idx} direction="up" duration={0.6} delay={idx * 0.12}>
              <Link
                href={product.href}
                className="group relative p-6 md:p-8 rounded-2xl h-full flex flex-col transition-all duration-300 hover:-translate-y-1 block"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(20px)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${product.accentColor}40`;
                  el.style.boxShadow = `0 0 40px ${product.glowColor}`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  el.style.boxShadow = 'none';
                }}
              >
                <div className="relative w-16 h-16 flex items-center justify-center mb-5">
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: product.glowColor, filter: 'blur(12px)' }}
                  />
                  <div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${product.accentColor}20, ${product.accentColor}08)`,
                      border: `1px solid ${product.accentColor}30`,
                    }}
                  >
                    <product.icon className="w-7 h-7" style={{ color: product.accentColor }} />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#F8FAFC] mb-2 group-hover:text-gradient transition-all duration-300">
                  {t(product.titleKey)}
                </h3>

                <p className="text-sm text-[#94A3B8] mb-5 leading-relaxed">
                  {t(product.descKey)}
                </p>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {product.featureKeys.map((key, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="8" fill={`${product.accentColor}20`} />
                        <path
                          d="M5 8l2 2 4-4"
                          stroke={product.accentColor}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-sm text-[#94A3B8]">{t(key)}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className="flex items-center justify-between pt-4"
                  style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
                >
                  <span className="text-base font-bold text-gradient">{t(product.priceKey)}</span>
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5"
                    style={{ color: product.accentColor }}
                  >
                    {t('productsSection.more')}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}

          <ScrollReveal direction="up" duration={0.6} delay={0.36}>
            <article
              className="group relative p-6 md:p-8 rounded-2xl h-full flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <Link
                href="/products/ai-analytics"
                onClick={() =>
                  track('cta_click_product_card', {
                    product: 'ai_analytics',
                    location: 'home_products',
                  })
                }
                className="absolute inset-0 rounded-2xl"
                aria-label="AI-аналитика и дашборды"
              />

              <div className="relative w-16 h-16 flex items-center justify-center mb-5">
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: 'rgba(14,165,233,0.12)', filter: 'blur(12px)' }}
                />
                <div
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(14,165,233,0.08))',
                    border: '1px solid rgba(14,165,233,0.3)',
                  }}
                >
                  <LineChart className="w-7 h-7 text-sky-400" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#F8FAFC] mb-2">AI-аналитика и дашборды</h3>
              <p className="text-sm text-[#94A3B8] mb-6 leading-relaxed flex-1">
                KPI-дашборды, отчеты и рекомендации руководителю
              </p>

              <div
                className="flex items-center justify-between pt-4 relative z-10"
                style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
              >
                <span className="text-base font-bold text-gradient">от $2 000</span>
                <Link
                  href="/products/ai-analytics#demo"
                  onClick={(event) => {
                    event.stopPropagation();
                    track('cta_click_product_card', {
                      product: 'ai_analytics',
                      location: 'home_products',
                    });
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-all duration-300"
                >
                  Получить демо
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
