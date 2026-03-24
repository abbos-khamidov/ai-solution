'use client';

import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { PricingCards, PricingBillingMode, PricingPlan } from '@/components/shared/PricingCards';

const PLAN_KEYS = ['starter', 'growth', 'enterprise'] as const;

export function SimplePricingSection() {
  const { t } = useTranslation();
  const [billingMode, setBillingMode] = useState<PricingBillingMode>('subscription');

  const plans: PricingPlan[] = useMemo(() => {
    return PLAN_KEYS.map((key) => {
      const badgeRaw = t(`homeSimplePricing.plans.${key}.badge`);
      const features = t(`homeSimplePricing.plans.${key}.features`, { returnObjects: true }) as string[];
      const whenNeeded = t(`homeSimplePricing.plans.${key}.whenNeeded`, { returnObjects: true }) as string[];

      return {
        name: t(`homeSimplePricing.plans.${key}.name`),
        badge: badgeRaw.trim() ? badgeRaw : undefined,
        setupPrice: t(`homeSimplePricing.plans.${key}.setupSub`),
        monthlyPrice: t(`homeSimplePricing.plans.${key}.monthlySub`),
        oneTime: {
          totalPrice: t(`homeSimplePricing.plans.${key}.onceTotal`),
          subline: t(`homeSimplePricing.plans.${key}.onceNote`),
        },
        description: t(`homeSimplePricing.plans.${key}.description`),
        problem: t(`homeSimplePricing.plans.${key}.problem`),
        result: t(`homeSimplePricing.plans.${key}.result`),
        roi: {
          label: t(`homeSimplePricing.plans.${key}.roiLabel`),
          detail: t(`homeSimplePricing.plans.${key}.roiDetail`),
        },
        highlighted: key === 'growth',
        features: Array.isArray(features) ? features : [],
        whenNeeded: Array.isArray(whenNeeded) ? whenNeeded : [],
        ctaText:
          billingMode === 'subscription'
            ? t(`homeSimplePricing.plans.${key}.ctaSub`)
            : t(`homeSimplePricing.plans.${key}.ctaOnce`),
      };
    });
  }, [t, billingMode]);

  const cardLabels = useMemo(
    () =>
      billingMode === 'subscription'
        ? {
            primaryRow: t('homeSimplePricing.labels.setupSub'),
            secondaryRow: t('homeSimplePricing.labels.monthlySub'),
            problem: t('homeSimplePricing.labels.problem'),
            result: t('homeSimplePricing.labels.result'),
            whenNeeded: t('homeSimplePricing.labels.whenNeeded'),
          }
        : {
            primaryRow: t('homeSimplePricing.labels.projectOnce'),
            secondaryRow: t('homeSimplePricing.labels.afterOnce'),
            problem: t('homeSimplePricing.labels.problem'),
            result: t('homeSimplePricing.labels.result'),
            whenNeeded: t('homeSimplePricing.labels.whenNeeded'),
          },
    [t, billingMode]
  );

  return (
    <section className="relative py-12 md:py-14 overflow-hidden bg-background-secondary" id="pricing">
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.06), transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal duration={0.3}>
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t('homeSimplePricing.title')}
            </h2>
            <p className="text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto">{t('homeSimplePricing.subtitle')}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal duration={0.35} delay={0.05}>
          <div className="flex flex-col items-center gap-4 mb-10 md:mb-12">
            <p className="text-sm md:text-base font-medium text-foreground text-center max-w-xl">
              {t('homeSimplePricing.toggleHint')}
            </p>
            <div
              role="group"
              aria-label={t('homeSimplePricing.toggleGroupLabel')}
              className="inline-flex flex-wrap justify-center gap-1 p-1 rounded-2xl bg-slate-100/90 border border-slate-200/90 shadow-sm"
            >
              <button
                type="button"
                aria-pressed={billingMode === 'subscription'}
                onClick={() => setBillingMode('subscription')}
                className={`relative px-4 md:px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  billingMode === 'subscription'
                    ? 'bg-white text-foreground shadow-md shadow-slate-200/80 ring-1 ring-slate-200/80'
                    : 'text-[#64748B] hover:text-foreground'
                }`}
              >
                {t('homeSimplePricing.withSubscription')}
              </button>
              <button
                type="button"
                aria-pressed={billingMode === 'onetime'}
                onClick={() => setBillingMode('onetime')}
                className={`relative px-4 md:px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  billingMode === 'onetime'
                    ? 'bg-white text-foreground shadow-md shadow-slate-200/80 ring-1 ring-slate-200/80'
                    : 'text-[#64748B] hover:text-foreground'
                }`}
              >
                {t('homeSimplePricing.withoutSubscription')}
              </button>
            </div>
          </div>
        </ScrollReveal>

        <PricingCards
          plans={plans}
          billingMode={billingMode}
          cardLabels={cardLabels}
          defaultCtaHref="#contact"
        />

        <ScrollReveal duration={0.3} delay={0.4}>
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <div
              className="rounded-xl p-5 text-sm text-[#94A3B8] leading-relaxed"
              style={{
                background: 'rgba(59, 130, 246, 0.06)',
                border: '1px solid rgba(59, 130, 246, 0.15)',
              }}
            >
              {t('homeSimplePricing.footnote')}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
