'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, RefreshCw, TrendingUp, Headphones } from 'lucide-react';

export function PricingCalloutSection() {
  const { t } = useTranslation();

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-800/50 dark:via-slate-900/50 dark:to-slate-800/50">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('pricingCallout.title')}
          </h3>
          <p className="text-lg text-gray-700 dark:text-slate-300 max-w-3xl mx-auto">
            {t('pricingCallout.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800/60 rounded-xl border border-gray-200 dark:border-slate-700">
            <Shield className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
            <div>
              <div className="font-semibold text-sm text-gray-900 dark:text-white">
                {t('pricingCallout.noHidden')}
              </div>
              <div className="text-xs text-gray-600 dark:text-slate-400">
                {t('pricingCallout.noHiddenSub')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800/60 rounded-xl border border-gray-200 dark:border-slate-700">
            <RefreshCw className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div>
              <div className="font-semibold text-sm text-gray-900 dark:text-white">
                {t('pricingCallout.cancelAnytime')}
              </div>
              <div className="text-xs text-gray-600 dark:text-slate-400">
                {t('pricingCallout.cancelAnytimeSub')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800/60 rounded-xl border border-gray-200 dark:border-slate-700">
            <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0" />
            <div>
              <div className="font-semibold text-sm text-gray-900 dark:text-white">
                {t('pricingCallout.upgradeFree')}
              </div>
              <div className="text-xs text-gray-600 dark:text-slate-400">
                {t('pricingCallout.upgradeFreeSub')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800/60 rounded-xl border border-gray-200 dark:border-slate-700">
            <Headphones className="w-6 h-6 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
            <div>
              <div className="font-semibold text-sm text-gray-900 dark:text-white">
                {t('pricingCallout.support247')}
              </div>
              <div className="text-xs text-gray-600 dark:text-slate-400">
                {t('pricingCallout.support247Sub')}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/60 rounded-2xl p-6 md:p-8 border-2 border-blue-100 dark:border-blue-900/40">
          <h4 className="text-lg md:text-xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            {t('pricingCallout.setupIncludedTitle')}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
              <span className="text-gray-700 dark:text-slate-300 text-sm md:text-base">
                {t('pricingCallout.setupItem1')}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
              <span className="text-gray-700 dark:text-slate-300 text-sm md:text-base">
                {t('pricingCallout.setupItem2')}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
              <span className="text-gray-700 dark:text-slate-300 text-sm md:text-base">
                {t('pricingCallout.setupItem3')}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
              <span className="text-gray-700 dark:text-slate-300 text-sm md:text-base">
                {t('pricingCallout.setupItem4')}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
              <span className="text-gray-700 dark:text-slate-300 text-sm md:text-base">
                {t('pricingCallout.setupItem5')}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
              <span className="text-gray-700 dark:text-slate-300 text-sm md:text-base">
                {t('pricingCallout.setupItem6')}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700 text-center">
            <p className="text-sm text-gray-600 dark:text-slate-400">
              💡 <strong className="text-gray-800 dark:text-slate-200">{t('pricingCallout.setupNote')}</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
