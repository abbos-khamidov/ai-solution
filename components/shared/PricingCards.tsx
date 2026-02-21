'use client';

import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export interface PricingPlan {
  name: string;
  badge?: string;
  setupPrice: string;
  monthlyPrice: string;
  description: string;
  features: string[];
  highlighted: boolean;
  ctaText?: string;
  ctaHref?: string;
}

interface PricingCardsProps {
  plans: PricingPlan[];
  defaultCtaHref?: string;
  defaultCtaText?: string;
}

export const MAIN_PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Basic',
    setupPrice: '$1 000 – $1 500',
    monthlyPrice: '$500 – $800',
    description: 'Быстрый старт, один продукт, простые сценарии',
    highlighted: false,
    features: [
      '1 канал (Telegram)',
      'До 500 диалогов в месяц',
      'Базовые сценарии ответов',
      'Квалификация Cold/Warm/Hot',
      'Настройка за 1 день',
      'Email поддержка',
    ],
  },
  {
    name: 'Pro',
    badge: '⭐ Популярный',
    setupPrice: '$3 000 – $6 000',
    monthlyPrice: '$1 200 – $2 500',
    description: 'Системное внедрение, команда 5–50 человек',
    highlighted: true,
    features: [
      '3 канала (Telegram + Instagram + WhatsApp)',
      'До 3 000 диалогов в месяц',
      'Интеграция с CRM',
      'Продвинутая аналитика и дашборд',
      'Антифрод модуль',
      'Приоритетная поддержка 24/7',
      'Настройка за 2 часа',
    ],
  },
  {
    name: 'Max',
    setupPrice: '$8 000 – $20 000+',
    monthlyPrice: '$3 000 – $8 000',
    description: 'Крупный бизнес, несколько отделов, свои требования',
    highlighted: false,
    features: [
      'Все каналы + API',
      'Неограниченные диалоги',
      'White-label решение',
      'On-premise вариант',
      'Выделенный менеджер',
      'SLA 99.9%',
      'Кастомная логика',
    ],
  },
];

export function PricingCards({
  plans,
  defaultCtaHref = '#contact',
  defaultCtaText,
}: PricingCardsProps) {
  const { t } = useTranslation();
  const ctaText = defaultCtaText ?? t('nav.discuss');
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
      {plans.map((plan, idx) => (
        <ScrollReveal key={idx} direction="up" duration={0.6} delay={idx * 0.1}>
          <div
            className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col ${
              plan.highlighted ? 'md:scale-[1.02]' : ''
            }`}
            style={
              plan.highlighted
                ? {
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    boxShadow:
                      '0 0 40px rgba(59, 130, 246, 0.12), 0 0 80px rgba(6, 182, 212, 0.06)',
                  }
                : {
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(20px)',
                  }
            }
          >
            {/* Gradient border for highlighted plan */}
            {plan.highlighted && (
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  padding: '1px',
                  background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
                  WebkitMask:
                    'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />
            )}

            {/* Badge */}
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white text-sm font-semibold shadow-lg shadow-blue-500/20 whitespace-nowrap">
                {plan.badge}
              </div>
            )}

            {/* Plan name */}
            <h3 className="text-xl font-bold text-[#F8FAFC] mb-5">{plan.name}</h3>

            {/* Dual pricing block */}
            <div
              className="rounded-xl p-4 mb-4 space-y-3"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div>
                <p className="text-[11px] text-[#64748B] uppercase tracking-widest mb-1">
                  {t('pricing.setupLabel')}
                </p>
                <p className="text-xl font-bold text-gradient">{plan.setupPrice}</p>
              </div>
              <div
                className="pt-3"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="text-[11px] text-[#64748B] uppercase tracking-widest mb-1">
                  {t('pricing.monthlyLabel')}
                </p>
                <p className="text-xl font-semibold text-[#F8FAFC]">{plan.monthlyPrice}</p>
              </div>
            </div>

            {/* Description */}
            <p
              className="text-sm text-[#64748B] italic mb-5 pb-5"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              {t('pricing.forWhom')} {plan.description}
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature, featureIdx) => (
                <li key={featureIdx} className="flex items-start gap-3">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#3B82F6]" />
                  <span className="text-sm leading-relaxed text-[#94A3B8]">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <MagneticButton strength={0.15} radius={80} className="w-full">
              <a
                href={plan.ctaHref || defaultCtaHref}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white hover:shadow-lg hover:shadow-blue-500/25'
                    : 'text-[#F8FAFC] hover:shadow-lg hover:shadow-blue-500/10'
                }`}
                style={
                  !plan.highlighted
                    ? {
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }
                    : undefined
                }
              >
                {plan.ctaText || ctaText}
                <ArrowRight className="w-4 h-4" />
              </a>
            </MagneticButton>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
