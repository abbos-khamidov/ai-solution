'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export function ProblemSection() {
  const { t } = useTranslation();
  const problems = [
    {
      emoji: '💸',
      titleKey: 'problems.item1Title' as const,
      descKey: 'problems.item1Desc' as const,
      glowColor: 'rgba(239, 68, 68, 0.15)',
      accentColor: '#EF4444',
    },
    {
      emoji: '⏰',
      titleKey: 'problems.item2Title' as const,
      descKey: 'problems.item2Desc' as const,
      glowColor: 'rgba(245, 158, 11, 0.15)',
      accentColor: '#F59E0B',
    },
    {
      emoji: '💰',
      titleKey: 'problems.item3Title' as const,
      descKey: 'problems.item3Desc' as const,
      glowColor: 'rgba(124, 58, 237, 0.15)',
      accentColor: '#7C3AED',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#05050A]" id="about">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <ScrollReveal duration={0.6}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8FAFC] mb-4">
              {t('problems.title')}
            </h2>
            <p className="text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto">
              {t('problems.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {problems.map((problem, idx) => (
            <ScrollReveal
              key={idx}
              direction="up"
              duration={0.6}
              delay={idx * 0.1}
            >
              <div
                className="group relative p-6 md:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(20px)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${problem.accentColor}40`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                {/* Emoji with glow */}
                <div className="relative w-16 h-16 flex items-center justify-center mb-5">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ background: problem.glowColor, filter: 'blur(16px)' }}
                  />
                  <span className="relative text-4xl">{problem.emoji}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-[#F8FAFC] mb-3">
                  {t(problem.titleKey)}
                </h3>

                <p className="text-[#94A3B8] leading-relaxed">
                  {t(problem.descKey)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom stat */}
        <ScrollReveal duration={0.6} delay={0.4}>
          <div className="mt-12 text-center">
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
              style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
              }}
            >
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-base md:text-lg font-semibold text-[#F8FAFC]">
                {t('problems.stat')}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
