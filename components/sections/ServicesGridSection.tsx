'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, Send, Brain, BarChart3, Code, ArrowRight, Check, TrendingUp, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const cardIcons = [MessageCircle, Send, Brain, BarChart3, Code] as const;

type PricingShape = {
  monthly?: string | null;
  setup?: string;
  period?: string;
  minContract?: string;
  note?: string;
};

type RoiShape = {
  payback: string;
  savings: string;
};

type ServiceItem = {
  id?: string;
  tier?: string;
  badge?: string;
  title: string;
  description: string;
  href: string;
  pricing?: PricingShape;
  roi?: RoiShape;
  features?: string[];
  cta?: string;
  price?: string;
  setupFee?: string;
};

export function ServicesGridSection() {
  const { t } = useTranslation();
  const items = t('servicesGrid.items', { returnObjects: true }) as ServiceItem[];

  return (
    <section
      className="bg-slate-900 py-12 md:py-20 scroll-mt-24 border-t border-slate-800"
      id="solutions"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 leading-snug">
          {t('servicesGrid.title')}
        </h2>
        <p className="text-base md:text-xl text-slate-400 text-center mb-12 md:mb-16 max-w-3xl mx-auto break-words">
          {t('servicesGrid.subtitle')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {Array.isArray(items) &&
            items.map((item, idx) => {
              const Icon = cardIcons[idx] ?? MessageCircle;
              const pricing = item.pricing;
              const isNewShape = pricing && typeof pricing === 'object';
              const monthly = isNewShape ? pricing.monthly : null;
              const setup = isNewShape ? pricing.setup : item.setupFee;
              const period = isNewShape ? pricing.period : null;
              const minContract = isNewShape ? pricing.minContract : undefined;
              const note = isNewShape ? pricing.note : undefined;
              const priceDisplay = isNewShape
                ? (monthly || setup || '')
                : (item.pricing as string) ?? item.price ?? '';
              const features = Array.isArray(item.features) ? item.features : [];
              const roi = item.roi;
              const ctaText = item.cta ?? t('servicesGrid.learnMore');
              const href = item.href || '#';

              return (
                <div
                  key={idx}
                  className={`
                    service-card relative rounded-2xl p-6 md:p-8 border-2 transition-all duration-300 flex flex-col min-h-[620px]
                    bg-slate-800/60 backdrop-blur-sm border-slate-700/80
                    hover:bg-slate-800/80 hover:border-slate-600 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-2
                    ${item.badge ? 'border-blue-500 scale-105 shadow-xl' : ''}
                  `}
                >
                  {item.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {item.badge}
                    </div>
                  )}

                  {item.tier && (
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                      {item.tier}
                    </div>
                  )}

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4 border border-slate-600/50">
                    <Icon className="w-7 h-7 text-blue-400" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 min-h-[64px] leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 text-sm mb-6 min-h-[80px] leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mb-6 pb-6 border-b border-slate-700">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl md:text-4xl font-bold text-white">
                        {isNewShape ? (monthly || setup) : priceDisplay}
                      </span>
                      {period && (
                        <span className="text-slate-400 text-lg">{period}</span>
                      )}
                    </div>

                    {setup && monthly && (
                      <div className="text-sm text-slate-500 mt-2">
                        + {setup} настройка
                      </div>
                    )}

                    {note && (
                      <div className="text-sm text-slate-400 mt-2">{note}</div>
                    )}

                    {roi && (
                      <div className="mt-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                        <div className="flex items-center gap-2 text-sm">
                          <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span className="font-semibold text-emerald-300">
                            {roi.payback}
                          </span>
                        </div>
                        <div className="text-xs text-emerald-400/90 mt-1">
                          {roi.savings}
                        </div>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-6 flex-1">
                    {features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-slate-300"
                      >
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {minContract && (
                    <div className="text-xs text-slate-500 mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      {minContract}
                    </div>
                  )}

                  <Link
                    href={href}
                    className={`
                      block w-full py-3 rounded-lg font-semibold text-center transition-all mt-auto
                      ${item.badge
                        ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg hover:shadow-xl'
                        : 'border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white'
                      }
                    `}
                  >
                    {ctaText} →
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
