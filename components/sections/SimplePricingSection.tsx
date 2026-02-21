'use client';

import React from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { PricingCards, MAIN_PRICING_PLANS } from '@/components/shared/PricingCards';

export function SimplePricingSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden" id="pricing" style={{ background: '#0D0D1A' }}>
      {/* Background glow */}
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
              Прозрачные цены
            </h2>
            <p className="text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto">
              Выберите пакет под ваши задачи. Без скрытых платежей.
            </p>
          </div>
        </ScrollReveal>

        <PricingCards plans={MAIN_PRICING_PLANS} defaultCtaText="Обсудить" />

        {/* Bottom note */}
        <ScrollReveal duration={0.6} delay={0.4}>
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <div
              className="rounded-xl p-5 text-sm text-[#94A3B8] leading-relaxed"
              style={{
                background: 'rgba(59, 130, 246, 0.06)',
                border: '1px solid rgba(59, 130, 246, 0.15)',
              }}
            >
              💡 Точную стоимость считаем после бесплатного 60-минутного аудита —
              цена зависит от количества сценариев, каналов и интеграций.
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
