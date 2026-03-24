'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ArrowRight, TrendingUp } from 'lucide-react';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export type PricingBillingMode = 'subscription' | 'onetime';

export interface PricingPlanOneTime {
  totalPrice: string;
  subline: string;
}

export interface PricingPlan {
  name: string;
  badge?: string;
  setupPrice: string;
  monthlyPrice: string;
  /** Разовый проект без абонплаты — для переключателя на главной */
  oneTime?: PricingPlanOneTime;
  description: string;
  problem?: string;
  result?: string;
  roi?: { label: string; detail: string };
  features: string[];
  whenNeeded?: string[];
  highlighted: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export interface PricingCardsLabels {
  primaryRow: string;
  secondaryRow: string;
  problem: string;
  result: string;
  whenNeeded: string;
}

interface PricingCardsProps {
  plans: PricingPlan[];
  defaultCtaHref?: string;
  defaultCtaText?: string;
  billingMode?: PricingBillingMode;
  cardLabels?: Partial<PricingCardsLabels>;
}

export function PricingCards({
  plans,
  defaultCtaHref = '#contact',
  defaultCtaText = 'Обсудить запуск',
  billingMode = 'subscription',
  cardLabels,
}: PricingCardsProps) {
  const { t } = useTranslation();
  const L: PricingCardsLabels = {
    primaryRow: cardLabels?.primaryRow ?? t('pricingCard.setup'),
    secondaryRow: cardLabels?.secondaryRow ?? t('pricingCard.monthly'),
    problem: cardLabels?.problem ?? t('pricingCard.problem'),
    result: cardLabels?.result ?? t('pricingCard.result'),
    whenNeeded: cardLabels?.whenNeeded ?? t('pricingCard.whenNeeded'),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
      {plans.map((plan, idx) => {
        const useOnetime = billingMode === 'onetime' && plan.oneTime;
        const primaryValue = useOnetime ? plan.oneTime!.totalPrice : plan.setupPrice;
        const secondaryValue = useOnetime ? plan.oneTime!.subline : plan.monthlyPrice;

        return (
        <ScrollReveal key={idx} direction="up" duration={0.6} delay={idx * 0.1}>
          <div
            className={`relative rounded-2xl p-7 md:p-8 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col ${
              plan.highlighted ? 'md:scale-[1.02]' : ''
            }`}
            style={
              plan.highlighted
                ? {
                    background: '#FFFFFF',
                    boxShadow:
                      '0 0 40px rgba(59, 130, 246, 0.12), 0 4px 24px rgba(15, 23, 42, 0.06)',
                  }
                : {
                    background: '#FFFFFF',
                    border: '1px solid rgba(15, 23, 42, 0.1)',
                    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)',
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

            <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>

            {plan.description && (
              <p className="text-sm text-[#64748B] mb-5">{plan.description}</p>
            )}

            <div className="rounded-xl p-4 mb-4 space-y-3 bg-slate-50 border border-slate-200/90">
              <div>
                <p className="text-[11px] text-[#64748B] uppercase tracking-widest mb-1">{L.primaryRow}</p>
                <p className="text-xl font-bold text-gradient">{primaryValue}</p>
              </div>
              <div className="pt-3 border-t border-slate-200/90">
                <p className="text-[11px] text-[#64748B] uppercase tracking-widest mb-1">{L.secondaryRow}</p>
                <p
                  className={
                    useOnetime
                      ? 'text-sm font-medium text-foreground leading-snug'
                      : 'text-xl font-semibold text-foreground'
                  }
                >
                  {secondaryValue}
                </p>
              </div>
            </div>

            {plan.roi && (
              <div
                className="rounded-xl p-3.5 mb-4 flex items-start gap-2.5 min-h-[5.25rem]"
                style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}
              >
                <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-emerald-800">{plan.roi.label}</p>
                  <p className="text-xs text-emerald-700/90 mt-0.5 leading-snug">{plan.roi.detail}</p>
                </div>
              </div>
            )}

            {plan.problem && (
              <p className="text-xs text-[#94A3B8] mb-1">
                <span className="text-[#64748B]">{L.problem}</span> {plan.problem}
              </p>
            )}
            {plan.result && (
              <p className="text-xs text-[#2563EB] mb-4">
                <span className="text-[#64748B]">{L.result}</span> {plan.result}
              </p>
            )}

            <ul className="space-y-3 flex-1">
              {plan.features.map((feature, featureIdx) => (
                <li key={featureIdx} className="flex items-start gap-3">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#3B82F6]" />
                  <span className="text-sm leading-relaxed text-[#334155]">{feature}</span>
                </li>
              ))}
            </ul>

            {plan.whenNeeded && plan.whenNeeded.length > 0 && (
              <div className="mt-5 pt-4 mb-6 border-t border-slate-200/90">
                <p className="text-[11px] text-[#64748B] uppercase tracking-widest mb-2">{L.whenNeeded}</p>
                <ul className="space-y-1.5">
                  {plan.whenNeeded.map((item, i) => (
                    <li key={i} className="text-xs text-[#94A3B8] flex items-start gap-2">
                      <span className="text-[#3B82F6] mt-px">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <MagneticButton strength={0.15} radius={80} className="w-full">
              <a
                href={plan.ctaHref || defaultCtaHref}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white hover:shadow-lg hover:shadow-blue-500/25'
                    : 'text-foreground hover:shadow-lg hover:shadow-blue-500/10'
                }`}
                style={
                  !plan.highlighted
                    ? {
                        background: 'rgb(248 250 252)',
                        border: '1px solid rgba(15, 23, 42, 0.12)',
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
        );
      })}
    </div>
  );
}
