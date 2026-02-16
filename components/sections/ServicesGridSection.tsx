'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, Brain, Calendar, BarChart3, Code, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const cardIcons = [MessageCircle, Brain, Calendar, BarChart3, Code] as const;
const cardColors = [
  { text: 'text-blue-400', bg: 'bg-blue-500/10', badge: 'bg-blue-500/20 text-blue-300' },
  { text: 'text-purple-400', bg: 'bg-purple-500/10', badge: 'bg-purple-500/20 text-purple-300' },
  { text: 'text-emerald-400', bg: 'bg-emerald-500/10', badge: 'bg-emerald-500/20 text-emerald-300' },
  { text: 'text-amber-400', bg: 'bg-amber-500/10', badge: 'bg-amber-500/20 text-amber-300' },
  { text: 'text-cyan-400', bg: 'bg-cyan-500/10', badge: 'bg-cyan-500/20 text-cyan-300' },
] as const;

type ServiceItem = {
  title: string;
  description: string;
  price: string;
  href: string;
  poweredBy?: boolean;
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
              const color = cardColors[idx] ?? cardColors[0];
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="group block bg-slate-800/60 backdrop-blur-sm border border-slate-700/80 rounded-xl p-5 md:p-6 hover:bg-slate-800/80 hover:border-slate-600 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 flex flex-col relative focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 focus:rounded-xl"
                >
                  {/* Corner: setup fee badge */}
                  <div className="absolute top-4 right-4 text-xs font-medium text-slate-400 bg-slate-700/80 border border-slate-600/80 px-2.5 py-1 rounded-md transition-colors group-hover:border-slate-500/50">
                    {t('servicesGrid.deploymentPrice')}
                  </div>

                  <div
                    className={`w-12 h-12 rounded-lg ${color.bg} flex items-center justify-center mb-4 border border-slate-600/50`}
                  >
                    <Icon className={`w-6 h-6 ${color.text}`} />
                  </div>

                  <h3 className="text-lg md:text-xl font-semibold text-white mb-1 leading-snug pr-24">
                    {item.title}
                  </h3>

                  {/* Powered by — Sales Agent card only */}
                  {item.poweredBy && (
                    <p className="text-xs font-medium text-blue-400/90 mb-2">
                      {t('servicesGrid.poweredBy')}
                    </p>
                  )}

                  <p className="text-slate-400 text-sm mb-4 leading-relaxed flex-1 break-words">
                    {item.description}
                  </p>

                  {/* Bottom: price badge + hover hint */}
                  <div className="mt-auto pt-4 border-t border-slate-700 flex items-center justify-between gap-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${color.badge} border border-slate-600/50`}
                    >
                      {item.price}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200 ease-out">
                      {t('servicesGrid.hoverHint')}
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </span>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
}
