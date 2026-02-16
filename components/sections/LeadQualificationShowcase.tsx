'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Snowflake, Sun, Flame, Bell, MessageSquare, Sparkles } from 'lucide-react';

const cases = [
  {
    key: 'cold' as const,
    icon: Snowflake,
    tagColor: 'text-blue-600',
    bgAccent: 'bg-blue-500/10',
    borderAccent: 'border-blue-200',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
  },
  {
    key: 'warm' as const,
    icon: Sun,
    tagColor: 'text-amber-600',
    bgAccent: 'bg-amber-500/10',
    borderAccent: 'border-amber-200',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
  },
  {
    key: 'hot' as const,
    icon: Flame,
    tagColor: 'text-emerald-600',
    bgAccent: 'bg-emerald-500/10',
    borderAccent: 'border-emerald-200',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
    isHot: true,
  },
] as const;

export function LeadQualificationShowcase() {
  const { t } = useTranslation();
  const base = 'leadQualificationShowcase';

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Subtle gradient background for "admin" feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0, 102, 255, 0.04) 0%, transparent 50%),
            linear-gradient(180deg, var(--background-secondary) 0%, var(--background) 100%)
          `,
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-4 md:px-6">
        <header className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {t(`${base}.title`)}
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {t(`${base}.subtitle`)}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {cases.map((c) => {
            const Icon = c.icon;
            const isHot = 'isHot' in c && c.isHot;

            return (
              <div
                key={c.key}
                className={`relative rounded-2xl border bg-white/80 backdrop-blur-xl shadow-sm transition-all duration-300 ${isHot ? 'group' : ''} ${
                  isHot
                    ? 'border-emerald-200/80 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/15 hover:ring-2 hover:ring-emerald-400/40 hover:scale-[1.02]'
                    : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
                } ${c.borderAccent}`}
              >
                {/* Glass card inner */}
                <div className="p-5 md:p-6 flex flex-col h-full min-h-[200px]">
                  {/* Tag row: icon + label */}
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${c.bgAccent}`}
                    >
                      <Icon className={`w-4 h-4 ${c.tagColor}`} />
                    </div>
                    <span
                      className={`text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${c.badgeBg} ${c.badgeText}`}
                    >
                      {t(`${base}.${c.key}.label`)}
                    </span>
                    {isHot && (
                      <div className="ml-auto relative" title={t(`${base}.hot.notification`)}>
                        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping opacity-75" />
                        <Bell className="w-5 h-5 text-emerald-600" />
                      </div>
                    )}
                  </div>

                  {/* Client message (chat bubble style) */}
                  <div className="flex gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="rounded-xl rounded-tl-none bg-gray-100 border border-gray-100 px-3 py-2.5 text-sm text-gray-700 flex-1">
                      {t(`${base}.${c.key}.message`)}
                    </div>
                  </div>

                  {/* AI action */}
                  <div className="flex items-start gap-2 mt-auto">
                    <Sparkles className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-700">{t(`${base}.${c.key}.action`)}</span>
                    </p>
                  </div>

                  {/* Status footer */}
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <p
                      className={`text-xs font-medium ${
                        isHot ? 'text-emerald-600' : 'text-gray-500'
                      }`}
                    >
                      {t(`${base}.${c.key}.status`)}
                    </p>
                  </div>
                </div>

                {/* "Notification" popup for Hot — visible on hover */}
                {isHot && (
                  <div
                    className="absolute -top-2 right-4 md:right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10"
                    aria-hidden
                  >
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 px-3 py-2 flex items-center gap-2 whitespace-nowrap">
                      <Bell className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-medium text-gray-700">
                        {t(`${base}.hot.notification`)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* "Admin UI" footnote — could be localized later */}
        <p className="text-center text-xs text-gray-400 mt-8">
          {t('leadQualificationShowcase.footnote')}
        </p>
      </div>
    </section>
  );
}
