'use client';

import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

export type PricingTier = {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
};

type PricingTableSectionProps = {
  title?: string;
  subtitle?: string;
  tiers: [PricingTier, PricingTier, PricingTier];
  setupNote?: string;
  contactHref?: string;
  contactText?: string;
  selectPlanLabel?: string;
};

const defaultTitle = 'Тарифные планы';
const defaultSubtitle = 'Выберите план, который подходит вашему бизнесу';
const defaultSetupNote = '+ $300 настройка';
const defaultSelectLabel = 'Выбрать план';
const defaultContactText = 'Нужен индивидуальный план?';
const defaultContactLink = 'Свяжитесь с нами';

export function PricingTableSection({
  title = defaultTitle,
  subtitle = defaultSubtitle,
  tiers,
  setupNote = defaultSetupNote,
  contactHref = '#contact',
  contactText = defaultContactText,
  selectPlanLabel = defaultSelectLabel,
}: PricingTableSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-center text-gray-600 mb-12">{subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-8 flex flex-col ${
                tier.popular
                  ? 'border-4 border-blue-600 shadow-xl scale-105 z-10 bg-white'
                  : 'border-2 border-gray-200 bg-white'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  ПОПУЛЯРНЫЙ
                </div>
              )}
              <div className="text-sm font-semibold text-gray-600 mb-2">
                {tier.name}
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">
                {tier.price}
              </div>
              <div className="text-gray-600 mb-6">{tier.period}</div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={contactHref}
                className={`block w-full py-3 text-center rounded-lg font-semibold transition ${
                  tier.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                }`}
              >
                {selectPlanLabel}
              </Link>

              {setupNote && (
                <div className="text-sm text-gray-500 text-center mt-4">
                  {setupNote}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 mt-12">
          {contactText}{' '}
          <Link href={contactHref} className="text-blue-600 hover:underline">
            {defaultContactLink}
          </Link>
        </p>
      </div>
    </section>
  );
}
