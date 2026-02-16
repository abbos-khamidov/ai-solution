'use client';

import React from 'react';
import { Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function SocialProofSection() {
  const { t } = useTranslation();
  const stats = t('socialProof.stats', { returnObjects: true }) as {
    value: string;
    label: string;
  }[];

  return (
    <section id="about" className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left: Stats grid ── */}
          <div className="grid grid-cols-2 gap-6 md:gap-8">
            {Array.isArray(stats) &&
              stats.map((stat, idx) => (
                <div key={idx} className="text-center lg:text-left">
                  <p className="text-4xl md:text-5xl font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-white/70 text-sm md:text-base">
                    {stat.label}
                  </p>
                </div>
              ))}
          </div>

          {/* ── Right: Testimonial ── */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
            <Quote className="w-8 h-8 text-white/30 mb-4" />
            <blockquote className="text-lg md:text-xl italic text-white/95 mb-6 leading-relaxed break-words">
              &ldquo;{t('socialProof.quote')}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
              {t('socialProof.quoteInitials') || (t('socialProof.quoteName') as string).charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-white">
                  {t('socialProof.quoteName')}
                </p>
                <p className="text-white/70 text-sm">
                  {t('socialProof.quoteRole')}, {t('socialProof.quoteCompany')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
