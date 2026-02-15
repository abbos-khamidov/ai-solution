'use client';

/**
 * About Section - Company story with glassmorphism cards and 3D tilt (i18n enabled)
 */

import React from 'react';
import { Users, Target, Award, Globe2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { GlassCard } from '@/components/ui/GlassCard';

const valueKeys = [
  { key: 'mission', icon: Target, color: '#0066FF', bgColor: 'rgba(0,102,255,0.06)' },
  { key: 'human', icon: Users, color: '#00D9FF', bgColor: 'rgba(0,217,255,0.06)' },
  { key: 'excellence', icon: Award, color: '#0066FF', bgColor: 'rgba(0,102,255,0.06)' },
  { key: 'global', icon: Globe2, color: '#00D9FF', bgColor: 'rgba(0,217,255,0.06)' },
];

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <section className="relative section-container py-section bg-[#F0F2F5]" id="about">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <ScrollReveal direction="up" duration={0.7}>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-[#0066FF] tracking-wider uppercase mb-3">
              {t('about.label')}
            </p>
            <h2 className="text-display text-[#0F1419] mb-4">
              {t('about.title')}<br />
              <span className="text-gradient">{t('about.titleHighlight')}</span>
            </h2>
            <p className="text-body-lg text-[#536471] max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Values grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {valueKeys.map((value, index) => {
            const Icon = value.icon;
            return (
              <ScrollReveal
                key={value.key}
                direction="up"
                delay={index * 0.1}
                duration={0.7}
              >
                <GlassCard className="bg-white/80 p-8 h-full" tiltMax={5}>
                  <div className="flex items-start gap-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: value.bgColor }}
                    >
                      <Icon className="w-6 h-6" style={{ color: value.color }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#0F1419] mb-2">
                        {t(`about.values.${value.key}.title`)}
                      </h3>
                      <p className="text-body text-[#536471] leading-relaxed">
                        {t(`about.values.${value.key}.description`)}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Team highlight */}
        <ScrollReveal direction="up" delay={0.3} className="mt-16">
          <div className="glass-card bg-white/60 rounded-2xl p-8 md:p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <p className="text-xl md:text-2xl font-medium text-[#0F1419] leading-relaxed mb-6">
                &ldquo;{t('about.quote')}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00D9FF] flex items-center justify-center text-white font-bold text-xs tracking-tight">
                  ai
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-[#0F1419]">{t('about.quoteAuthor')}</p>
                  <p className="text-xs text-[#8899A6]">{t('about.quoteRole')}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
