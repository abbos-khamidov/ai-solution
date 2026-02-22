'use client';

import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { PricingCards, PricingPlan } from '@/components/shared/PricingCards';

export function SimplePricingSection() {
  const { t } = useTranslation();

  const plans: PricingPlan[] = useMemo(() => [
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

  return (
    <section className="relative py-16 md:py-24 overflow-hidden" id="pricing" style={{ background: '#0D0D1A' }}>
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
        <ScrollReveal duration={0.6}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8FAFC] mb-4">
              {t('pricingSection.title')}
            </h2>
            <p className="text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto">
              {t('pricingSection.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <PricingCards plans={plans} />

        <ScrollReveal duration={0.6} delay={0.4}>
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <div
              className="rounded-xl p-5 text-sm text-[#94A3B8] leading-relaxed"
              style={{
                background: 'rgba(59, 130, 246, 0.06)',
                border: '1px solid rgba(59, 130, 246, 0.15)',
              }}
            >
              💡 {t('pricingSection.auditNote')}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
