'use client';

import React from 'react';
import { AlertCircle, Zap, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const cards = [
  { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', statColor: 'text-red-600', key: 'problem' },
  { icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50', statColor: 'text-blue-600', key: 'solution' },
  { icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', statColor: 'text-green-600', key: 'result' },
] as const;

export function ValuePropSection() {
  const { t } = useTranslation();

  return (
    <section id="process" className="bg-gray-50 py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 md:mb-16 leading-snug">
          {t('valueProp.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            const data = t(`valueProp.${card.key}`, { returnObjects: true }) as {
              title: string;
              description: string;
              stat: string;
              statLabel: string;
            };
            return (
              <div
                key={card.key}
                className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mb-5`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{data.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed break-words">{data.description}</p>
                <div className="border-t border-gray-100 pt-4">
                  <span className={`text-3xl md:text-4xl font-bold ${card.statColor}`}>
                    {data.stat}
                  </span>
                  <span className="text-gray-500 ml-2 text-sm">{data.statLabel}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
