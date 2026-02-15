'use client';

import React from 'react';
import Link from 'next/link';
import { Brain, Check, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function AIAssistantSection() {
  const { t } = useTranslation();
  const features = t('services.aiAssistant.features', {
    returnObjects: true,
  }) as string[];

  return (
    <section className="bg-gray-50 py-12 md:py-20" id="ai-assistant">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        {/* Eyebrow */}
        <p className="text-sm font-semibold tracking-wide uppercase text-blue-600 mb-4 text-center">
          {t('services.aiAssistant.eyebrow')}
        </p>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          {t('services.aiAssistant.title')}
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-[800px] mx-auto text-center">
          {t('services.aiAssistant.subtitle')}
        </p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* ── Left column: features & callout ── */}
          <div>
            {/* Intro */}
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {t('services.aiAssistant.intro')}
            </p>

            {/* Features grid 2-col */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {Array.isArray(features) &&
                features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800 text-sm">{feature}</span>
                  </div>
                ))}
            </div>

            {/* Callout box */}
            <div className="bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white rounded-xl p-6 mb-8">
              <p className="text-lg font-bold leading-snug">
                {t('services.aiAssistant.callout')}
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/services/ai-assistant"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-[#0066FF] to-[#00D9FF] shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
              >
                {t('services.aiAssistant.ctaDemo')}
              </Link>
              <Link
                href="/services/ai-assistant"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-lg border-2 border-white/80 text-blue-600 bg-white hover:bg-gray-50 transition-all duration-300"
              >
                {t('services.aiAssistant.ctaLearnMore')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* ── Right column: illustration placeholder ── */}
          <div className="min-h-[400px] bg-gradient-to-br from-blue-100 to-cyan-50 rounded-2xl flex items-center justify-center border border-blue-200/50">
            <Brain className="w-20 h-20 text-blue-600 opacity-40" />
          </div>
        </div>

        {/* Learn More bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/services/ai-assistant"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            {t('services.aiAssistant.learnMore')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
