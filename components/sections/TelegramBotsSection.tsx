'use client';

import React from 'react';
import Link from 'next/link';
import {
  Target,
  CreditCard,
  Headphones,
  Megaphone,
  Users2,
  Send,
  LifeBuoy,
  Calendar,
  Check,
  ArrowRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const benefitIcons = [Target, CreditCard, Headphones, Megaphone, Users2] as const;
const benefitColors = [
  'text-blue-600',
  'text-green-600',
  'text-purple-600',
  'text-orange-600',
  'text-cyan-600',
] as const;

const useCaseIcons = [Send, LifeBuoy, Calendar] as const;

export function TelegramBotsSection() {
  const { t } = useTranslation();
  const benefits = t('services.telegramBots.benefits', {
    returnObjects: true,
  }) as { label: string }[];
  const stats = t('services.telegramBots.stats', {
    returnObjects: true,
  }) as { value: string; label: string }[];
  const useCases = t('services.telegramBots.useCases', {
    returnObjects: true,
  }) as { title: string; description: string }[];
  const tiers = t('services.telegramBots.pricingTiers', {
    returnObjects: true,
  }) as Record<
    string,
    { name: string; price: string; popular?: string; features: string[] }
  >;

  return (
    <section className="bg-white py-12 md:py-20" id="telegram-bots">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        {/* Eyebrow */}
        <p className="text-sm font-semibold tracking-wide uppercase text-blue-600 mb-4 text-center">
          {t('services.telegramBots.eyebrow')}
        </p>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          {t('services.telegramBots.title')}
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-[800px] mx-auto text-center">
          {t('services.telegramBots.subtitle')}
        </p>

        {/* ── Benefits row ── */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-16">
          {Array.isArray(benefits) &&
            benefits.map((benefit, idx) => {
              const Icon = benefitIcons[idx] ?? Target;
              const color = benefitColors[idx] ?? 'text-blue-600';
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center w-[140px]"
                >
                  <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-3 border border-gray-100">
                    <Icon className={`w-7 h-7 ${color}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {benefit.label}
                  </span>
                </div>
              );
            })}
        </div>

        {/* ── Stats row ── */}
        <div className="flex flex-col md:flex-row justify-around items-center gap-8 mb-16 py-10 bg-gray-50 rounded-2xl border border-gray-100">
          {Array.isArray(stats) &&
            stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
        </div>

        {/* ── Use cases ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {Array.isArray(useCases) &&
            useCases.map((useCase, idx) => {
              const Icon = useCaseIcons[idx] ?? Send;
              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {useCase.description}
                  </p>
                  {/* Mockup placeholder */}
                  <div className="mt-4 h-24 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-gray-100" />
                </div>
              );
            })}
        </div>

        {/* ── Pricing tiers ── */}
        {tiers && typeof tiers === 'object' && (
          <div className="rounded-2xl border border-gray-200 overflow-hidden mb-12">
            {/* Header row */}
            <div className="grid grid-cols-1 md:grid-cols-3">
              {(['basic', 'advanced', 'enterprise'] as const).map((key) => {
                const tier = tiers[key];
                if (!tier) return null;
                const isPopular = key === 'advanced';
                return (
                  <div
                    key={key}
                    className={`p-6 md:p-8 ${
                      isPopular
                        ? 'bg-blue-600 text-white md:border-x-2 md:border-blue-600 relative'
                        : 'bg-white'
                    } ${key !== 'basic' ? 'border-t md:border-t-0' : ''}`}
                  >
                    {isPopular && tier.popular && (
                      <span className="absolute top-0 right-4 -translate-y-1/2 text-xs font-bold bg-yellow-400 text-gray-900 px-3 py-1 rounded-full">
                        {tier.popular}
                      </span>
                    )}
                    <h4
                      className={`text-lg font-bold mb-1 ${
                        isPopular ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {tier.name}
                    </h4>
                    <p
                      className={`text-3xl font-bold mb-4 ${
                        isPopular ? 'text-white' : 'text-blue-600'
                      }`}
                    >
                      {tier.price}
                    </p>
                    <ul className="space-y-2">
                      {Array.isArray(tier.features) &&
                        tier.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <Check
                              className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                                isPopular ? 'text-blue-200' : 'text-green-500'
                              }`}
                            />
                            <span
                              className={`text-sm ${
                                isPopular ? 'text-blue-100' : 'text-gray-600'
                              }`}
                            >
                              {feat}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Learn More CTA */}
        <div className="text-center">
          <Link
            href="/services/telegram-bots"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            {t('services.telegramBots.learnMore')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
