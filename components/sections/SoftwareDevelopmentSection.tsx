'use client';

import React from 'react';
import Link from 'next/link';
import {
  Code,
  Smartphone,
  ShoppingCart,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const serviceIcons = [Code, Smartphone, ShoppingCart, Building2] as const;
const iconColors = [
  { text: 'text-blue-600', bg: 'bg-blue-50' },
  { text: 'text-cyan-600', bg: 'bg-cyan-50' },
  { text: 'text-purple-600', bg: 'bg-purple-50' },
  { text: 'text-orange-600', bg: 'bg-orange-50' },
] as const;

const portfolioTechBadges: Record<string, string[]> = {
  alpha: ['React', 'TypeScript', 'Node'],
  beta: ['Next.js', 'Tailwind'],
  gamma: ['Flutter', 'Firebase'],
};

export function SoftwareDevelopmentSection() {
  const { t } = useTranslation();
  const items = t('services.softwareDev.items', {
    returnObjects: true,
  }) as { title: string; description: string }[];

  return (
    <section className="bg-gray-50 py-12 md:py-20" id="software-development">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        {/* Eyebrow */}
        <p className="text-sm font-semibold tracking-wide uppercase text-blue-600 mb-4 text-center">
          {t('services.softwareDev.eyebrow')}
        </p>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          {t('services.softwareDev.title')}
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-[800px] mx-auto text-center">
          {t('services.softwareDev.subtitle')}
        </p>

        {/* 2x2 services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-10">
          {Array.isArray(items) &&
            items.map((item, idx) => {
              const Icon = serviceIcons[idx] ?? Code;
              const color = iconColors[idx] ?? iconColors[0];
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${color.bg} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${color.text}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
        </div>

        {/* Pricing note */}
        <p className="text-center text-gray-600 text-lg mb-10">
          {t('services.softwareDev.pricing')}
        </p>

        {/* Portfolio showcase */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          {(['alpha', 'beta', 'gamma'] as const).map((key) => (
            <div
              key={key}
              className="w-full sm:w-[200px] bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300"
            >
              {/* Placeholder client logo */}
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-50 mb-3 flex items-center justify-center">
                <Code className="w-5 h-5 text-blue-600 opacity-50" />
              </div>
              <p className="font-semibold text-gray-900 text-sm mb-2">
                {t(`services.softwareDev.portfolio.${key}`)}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {portfolioTechBadges[key]?.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/services/software-development"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-[#0066FF] to-[#00D9FF] shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
          >
            {t('services.softwareDev.ctaPrimary')}
          </Link>
          <Link
            href="/services/software-development"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            {t('services.softwareDev.ctaSecondary')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
