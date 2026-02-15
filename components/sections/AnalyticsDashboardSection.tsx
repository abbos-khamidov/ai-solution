'use client';

import React from 'react';
import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  FileText,
  Globe,
  ArrowRight,
  Quote,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const featureIcons = [TrendingUp, FileText, Globe] as const;

export function AnalyticsDashboardSection() {
  const { t } = useTranslation();
  const features = t('services.analytics.features', {
    returnObjects: true,
  }) as { title: string; description: string }[];
  const testimonial = t('services.analytics.testimonial', {
    returnObjects: true,
  }) as { quote: string; name: string; company: string };

  return (
    <section className="bg-white py-12 md:py-20" id="analytics">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        {/* Eyebrow */}
        <p className="text-sm font-semibold tracking-wide uppercase text-blue-600 mb-4 text-center">
          {t('services.analytics.eyebrow')}
        </p>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          {t('services.analytics.title')}
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-[800px] mx-auto text-center">
          {t('services.analytics.subtitle')}
        </p>

        {/* Hero mockup */}
        <div className="h-[200px] md:h-[300px] bg-gradient-to-r from-gray-100 to-blue-50 rounded-2xl border border-gray-300 mb-12 flex items-center justify-center gap-4">
          <BarChart3 className="w-12 h-12 md:w-16 md:h-16 text-blue-600 opacity-50" />
          <span className="text-gray-500 font-medium text-lg hidden sm:inline">
            {t('services.analytics.mockupLabel')}
          </span>
        </div>

        {/* Three-column features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {Array.isArray(features) &&
            features.map((feature, idx) => {
              const Icon = featureIcons[idx] ?? TrendingUp;
              return (
                <div
                  key={idx}
                  className="p-6 border border-gray-200 rounded-xl bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
        </div>

        {/* Testimonial */}
        {testimonial && typeof testimonial === 'object' && (
          <div className="max-w-[800px] mx-auto text-center mb-12">
            <Quote className="w-8 h-8 text-blue-600/30 mx-auto mb-4" />
            <blockquote className="text-xl italic text-gray-700 mb-6 leading-relaxed">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              {/* Photo placeholder */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-cyan-50 flex items-center justify-center border border-blue-200">
                <span className="text-blue-600 font-bold text-lg">
                  {testimonial.name?.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500">
                  CEO, {testimonial.company}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Learn More CTA */}
        <div className="text-center">
          <Link
            href="/services/analytics"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            {t('services.analytics.learnMore')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
