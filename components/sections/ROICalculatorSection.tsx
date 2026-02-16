'use client';

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const AI_COST_MONTHLY = 59;

export function ROICalculatorSection() {
  const { t } = useTranslation();
  const [leadsLost, setLeadsLost] = useState<number>(50);
  const [avgCheck, setAvgCheck] = useState<number>(200);

  const { lostRevenue, savings, paybackText } = useMemo(() => {
    const lost = leadsLost * avgCheck;
    const savings = Math.max(0, lost - AI_COST_MONTHLY);
    let payback = t('roiCalculator.paybackWeek');
    if (savings > 0) {
      const months = AI_COST_MONTHLY / savings;
      if (months < 0.25) payback = t('roiCalculator.paybackWeek');
      else if (months <= 1) payback = 'менее месяца';
      else payback = `~${Math.ceil(months)} мес`;
    }
    return {
      lostRevenue: lost,
      savings,
      paybackText: payback,
    };
  }, [leadsLost, avgCheck, t]);

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
          {t('roiCalculator.title')}
        </h2>
        <p className="text-center text-gray-600 dark:text-slate-400 mb-12">
          {t('roiCalculator.subtitle')}
        </p>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl p-8 border border-blue-100 dark:border-slate-700">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                {t('roiCalculator.leadsLabel')}
              </label>
              <input
                type="number"
                min={0}
                value={leadsLost}
                onChange={(e) => setLeadsLost(Number(e.target.value) || 0)}
                placeholder={t('roiCalculator.leadsPlaceholder')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                {t('roiCalculator.checkLabel')}
              </label>
              <input
                type="number"
                min={0}
                value={avgCheck}
                onChange={(e) => setAvgCheck(Number(e.target.value) || 0)}
                placeholder={t('roiCalculator.checkPlaceholder')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/80 rounded-xl p-6 border-2 border-blue-600 dark:border-blue-500">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 dark:text-slate-400">{t('roiCalculator.lostPerMonth')}</span>
              <span className="text-2xl font-bold text-red-600">${lostRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 dark:text-slate-400">{t('roiCalculator.aiCost')}</span>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">${AI_COST_MONTHLY}/мес</span>
            </div>
            <div className="border-t border-gray-200 dark:border-slate-600 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-gray-900 dark:text-white">{t('roiCalculator.savingsPerMonth')}</span>
                <span className="text-3xl font-bold text-green-600">${savings.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-slate-400 mt-2">
                {t('roiCalculator.payback')} <strong>{paybackText}</strong>
              </p>
            </div>
          </div>

          <Link
            href="#contact"
            className="block w-full mt-6 py-4 bg-blue-600 text-white text-center rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {t('roiCalculator.cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
