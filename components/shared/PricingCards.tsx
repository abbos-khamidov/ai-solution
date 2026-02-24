'use client';

import React from 'react';
import { Check, ArrowRight, TrendingUp } from 'lucide-react';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export interface PricingPlan {
  name: string;
  badge?: string;
  setupPrice: string;
  monthlyPrice: string;
  description: string;
  problem?: string;
  result?: string;
  roi?: { label: string; detail: string };
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

export function PricingCards({
  plans,
  defaultCtaHref = '#contact',
  defaultCtaText = 'Обсудить запуск',
}: PricingCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
      {plans.map((plan, idx) => (
        <ScrollReveal key={idx} direction="up" duration={0.6} delay={idx * 0.1}>
          <div
            className={`relative rounded-2xl p-7 md:p-8 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col ${
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

            {plan.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white text-sm font-semibold shadow-lg shadow-blue-500/20 whitespace-nowrap">
                {plan.badge}
              </div>
            )}

            <h3 className="text-xl font-bold text-[#F8FAFC] mb-1">{plan.name}</h3>

            {plan.description && (
              <p className="text-sm text-[#64748B] mb-5">{plan.description}</p>
            )}

            <div
              className="rounded-xl p-4 mb-4 space-y-3"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div>
                <p className="text-[11px] text-[#64748B] uppercase tracking-widest mb-1">Запуск</p>
                <p className="text-xl font-bold text-gradient">{plan.setupPrice}</p>
              </div>
              <div className="pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[11px] text-[#64748B] uppercase tracking-widest mb-1">Ежемесячно</p>
                <p className="text-xl font-semibold text-[#F8FAFC]">{plan.monthlyPrice}</p>
              </div>
            </div>

            {plan.roi && (
              <div
                className="rounded-xl p-3.5 mb-4 flex items-start gap-2.5"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}
              >
                <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-emerald-300">{plan.roi.label}</p>
                  <p className="text-xs text-emerald-400/80 mt-0.5">{plan.roi.detail}</p>
                </div>
              </div>
            )}

            {plan.problem && (
              <p className="text-xs text-[#94A3B8] mb-1">
                <span className="text-[#64748B]">Проблема:</span> {plan.problem}
              </p>
            )}
            {plan.result && (
              <p className="text-xs text-[#93C5FD] mb-4">
                <span className="text-[#64748B]">Результат:</span> {plan.result}
              </p>
            )}

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature, featureIdx) => (
                <li key={featureIdx} className="flex items-start gap-3">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#3B82F6]" />
                  <span className="text-sm leading-relaxed text-[#94A3B8]">{feature}</span>
                </li>
              ))}
            </ul>

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
                {plan.ctaText || defaultCtaText}
                <ArrowRight className="w-4 h-4" />
              </a>
            </MagneticButton>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
