'use client';

/**
 * Stats Section - Counter animations triggered on scroll (i18n enabled)
 * Numbers count from 0 to target with pulse on hover
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { CounterAnimation } from '@/components/animations/CounterAnimation';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export function StatsSection() {
  const { t } = useTranslation();

  const stats = [
    {
      target: 150,
      suffix: '+',
      label: t('stats.items.models.label'),
      description: t('stats.items.models.description'),
    },
    {
      target: 99.9,
      suffix: '%',
      decimals: 1,
      label: t('stats.items.uptime.label'),
      description: t('stats.items.uptime.description'),
    },
    {
      target: 3,
      suffix: 'x',
      label: t('stats.items.growth.label'),
      description: t('stats.items.growth.description'),
    },
    {
      target: 50,
      suffix: 'M+',
      label: t('stats.items.api.label'),
      description: t('stats.items.api.description'),
    },
  ];

  return (
    <section className="relative section-container py-section bg-white" id="stats">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal direction="up" duration={0.6}>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-[#0066FF] tracking-wider uppercase mb-3">
              {t('stats.label')}
            </p>
            <h2 className="text-display text-[#0F1419]">
              {t('stats.title')}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <ScrollReveal
              key={stat.label}
              direction="up"
              delay={index * 0.1}
              duration={0.6}
            >
              <div className="text-center group">
                <div className="mb-3">
                  <CounterAnimation
                    target={stat.target}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                    duration={2.5}
                    ease="power2.out"
                    className="text-display-lg text-[#0F1419] font-bold tracking-tight"
                    pulseOnHover
                  />
                </div>
                <h3 className="text-base font-semibold text-[#0F1419] mb-1">
                  {stat.label}
                </h3>
                <p className="text-sm text-[#8899A6]">
                  {stat.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
