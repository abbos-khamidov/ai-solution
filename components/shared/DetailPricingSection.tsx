'use client';

import React from 'react';
import Link from 'next/link';
import { Check, X, ArrowRight } from 'lucide-react';

export type DetailPricingTier = {
  name: string;
  price: string;
  period: string;
  setupNote: string;
  roi?: { payback: string; savings: string };
  tier3Label?: string;
  tier3Sub?: string;
  features: string[];
  minContract: string;
  popular?: boolean;
};

export type ComparisonRow = {
  label: string;
  values: [string | React.ReactNode, string | React.ReactNode, string | React.ReactNode];
};

type DetailPricingSectionProps = {
  title?: string;
  subtitle?: string;
  tiers: [DetailPricingTier, DetailPricingTier, DetailPricingTier];
  contactHref?: string;
  comparisonTable?: {
    headers: [string, string, string];
    rows: ComparisonRow[];
  };
};

const defaultTitle = 'Тарифные планы';
const defaultSubtitle = 'Выберите план, который подходит вашему бизнесу. Все планы включают базу данных, админ-панель и техподдержку.';
const defaultContactText = 'Нужен индивидуальный план для вашей компании?';
const defaultContactLink = 'Свяжитесь с нами для персонального предложения';

export function DetailPricingSection({
  title = defaultTitle,
  subtitle = defaultSubtitle,
  tiers,
  contactHref = '#cta-form',
  comparisonTable,
}: DetailPricingSectionProps) {
  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-slate-400 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`
                pricing-tier bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 flex flex-col
                border-2 transition-all
                ${tier.popular
                  ? 'border-blue-600 dark:border-blue-500 shadow-2xl scale-105 lg:scale-110 z-10 relative'
                  : 'border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg'
                }
              `}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                  ⭐ ПОПУЛЯРНЫЙ
                </div>
              )}

              <div className={`text-sm font-semibold uppercase tracking-wide mb-2 ${tier.popular ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-slate-400'}`}>
                {tier.name}
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                    {tier.price}
                  </span>
                  <span className="text-gray-600 dark:text-slate-400 text-lg">
                    {tier.period}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-slate-500 mt-2">
                  {tier.setupNote}
                </div>
              </div>

              {tier.roi && (
                <div className="mb-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800/50">
                  <div className="text-sm font-semibold text-green-700 dark:text-green-300">
                    💰 {tier.roi.payback}
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                    {tier.roi.savings}
                  </div>
                </div>
              )}

              {(tier.tier3Label || tier.tier3Sub) && (
                <div className="mb-6 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800/50">
                  <div className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                    💼 {tier.tier3Label}
                  </div>
                  {tier.tier3Sub && (
                    <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                      {tier.tier3Sub}
                    </div>
                  )}
                </div>
              )}

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-slate-300">
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={contactHref}
                className={`
                  block w-full py-4 rounded-lg font-semibold text-center transition-all
                  ${tier.popular
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-2xl transform hover:scale-105'
                    : 'border-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white'
                  }
                `}
              >
                {tier.popular ? 'Выбрать план →' : 'Выбрать план'}
              </Link>

              <div className="text-xs text-gray-500 dark:text-slate-500 text-center mt-4">
                📅 {tier.minContract}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-gray-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-slate-700 mb-12">
          <p className="text-lg text-gray-700 dark:text-slate-300 mb-4">
            {defaultContactText}
          </p>
          <Link
            href={contactHref}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            {defaultContactLink}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {comparisonTable && comparisonTable.rows.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-gray-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6 bg-gray-50 dark:bg-slate-800/80 border-b border-gray-200 dark:border-slate-700">
              <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900 dark:text-white">
                Сравнение тарифов
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">
                      Возможности
                    </th>
                    <th className="text-center p-4 font-semibold text-gray-700 dark:text-slate-300">
                      {comparisonTable.headers[0]}
                    </th>
                    <th className="text-center p-4 font-semibold bg-blue-50 dark:bg-blue-900/20 text-gray-900 dark:text-white">
                      {comparisonTable.headers[1]}
                    </th>
                    <th className="text-center p-4 font-semibold text-gray-700 dark:text-slate-300">
                      {comparisonTable.headers[2]}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="border-b border-gray-100 dark:border-slate-700/50">
                      <td className="p-4 text-gray-700 dark:text-slate-300">
                        {row.label}
                      </td>
                      <td className="text-center p-4 text-gray-600 dark:text-slate-400">
                        {row.values[0]}
                      </td>
                      <td className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 text-gray-800 dark:text-slate-200">
                        {row.values[1]}
                      </td>
                      <td className="text-center p-4 text-gray-600 dark:text-slate-400">
                        {row.values[2]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
