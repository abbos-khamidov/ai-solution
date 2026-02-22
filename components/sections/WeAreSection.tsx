'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export function WeAreSection() {
  const { t } = useTranslation();
  return (
    <section id="solutions" className="relative py-16 md:py-24 overflow-hidden" style={{ background: '#0D0D1A' }}>
      <div className="absolute inset-0 opacity-40" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px]" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px]" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
        <ScrollReveal duration={0.6}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
            <Sparkles className="w-8 h-8 text-[#3B82F6]" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F8FAFC] mb-6 leading-tight">
            {t('weAre.title')}{' '}
            <span className="text-gradient">{t('weAre.titleHighlight')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-[#94A3B8] font-medium leading-relaxed max-w-2xl mx-auto">
            {t('weAre.subtitle')}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
