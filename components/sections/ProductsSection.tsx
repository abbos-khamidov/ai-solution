'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

const products = [
  {
    emoji: '🤖',
    title: 'Customer Service Bot',
    description: 'Telegram + Instagram + WhatsApp. Квалификация лидов, антифрод, 24/7',
    features: [
      'Ответ за 30 секунд в любом канале',
      'Автоматическая квалификация Cold/Warm/Hot',
      'Антифрод фильтрация спама',
    ],
    priceHint: 'от $1 000',
    href: '/products/customer-service',
    glowColor: 'rgba(59, 130, 246, 0.12)',
    accentColor: '#3B82F6',
  },
  {
    emoji: '📊',
    title: 'Management Assistant',
    description: 'Контроль команды, финансовый трекер, еженедельные отчёты собственнику',
    features: [
      'Дашборд метрик в реальном времени',
      'Автоматические отчёты по KPI',
      'Контроль задач и дедлайнов',
    ],
    priceHint: 'от $3 000',
    href: '/products/management-assistant',
    glowColor: 'rgba(6, 182, 212, 0.12)',
    accentColor: '#06B6D4',
  },
  {
    emoji: '🏢',
    title: 'Corporate AI (RAG)',
    description: 'База знаний компании. Интеграция с 1С/CRM. On-premise вариант',
    features: [
      'RAG по вашей документации',
      'Интеграция с 1С, Bitrix24, amoCRM',
      'On-premise для полного контроля',
    ],
    priceHint: 'от $8 000',
    href: '/products/corporate-ai',
    glowColor: 'rgba(124, 58, 237, 0.12)',
    accentColor: '#7C3AED',
  },
];

export function ProductsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#05050A]" id="products">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <ScrollReveal duration={0.6}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8FAFC] mb-4">
              Наши продукты
            </h2>
            <p className="text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto">
              AI-решения для каждой задачи бизнеса
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, idx) => (
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
                {/* Icon with gradient glow */}
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
                    <span className="text-3xl">{product.emoji}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#F8FAFC] mb-2 group-hover:text-gradient transition-all duration-300">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#94A3B8] mb-5 leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5 mb-6 flex-1">
                  {product.features.map((feature, featureIdx) => (
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
                      <span className="text-sm text-[#94A3B8]">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer: price hint + CTA */}
                <div
                  className="flex items-center justify-between pt-4"
                  style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
                >
                  <span className="text-base font-bold text-gradient">{product.priceHint}</span>
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5"
                    style={{ color: product.accentColor }}
                  >
                    Подробнее
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
