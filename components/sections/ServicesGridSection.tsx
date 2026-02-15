'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, Brain, BarChart3, Code, Send, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const cardIcons = [MessageCircle, Brain, BarChart3, Code, Send] as const;
const cardColors = [
  { text: 'text-blue-600', bg: 'bg-blue-50', badge: 'bg-blue-100 text-blue-700' },
  { text: 'text-purple-600', bg: 'bg-purple-50', badge: 'bg-purple-100 text-purple-700' },
  { text: 'text-green-600', bg: 'bg-green-50', badge: 'bg-green-100 text-green-700' },
  { text: 'text-orange-600', bg: 'bg-orange-50', badge: 'bg-orange-100 text-orange-700' },
  { text: 'text-cyan-600', bg: 'bg-cyan-50', badge: 'bg-cyan-100 text-cyan-700' },
] as const;

export function ServicesGridSection() {
  const { t } = useTranslation();
  const items = t('servicesGrid.items', { returnObjects: true }) as {
    title: string;
    description: string;
    price: string;
    href: string;
  }[];

  return (
    <section className="bg-white py-12 md:py-20" id="services">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4 leading-snug">
          {t('servicesGrid.title')}
        </h2>
        <p className="text-base md:text-xl text-gray-600 text-center mb-12 md:mb-16 max-w-3xl mx-auto break-words">
          {t('servicesGrid.subtitle')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {Array.isArray(items) &&
            items.map((item, idx) => {
              const Icon = cardIcons[idx] ?? MessageCircle;
              const color = cardColors[idx] ?? cardColors[0];
              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className={`w-12 h-12 rounded-lg ${color.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${color.text}`} />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1 break-words">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${color.badge}`}>
                      {item.price}
                    </span>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {t('servicesGrid.learnMore')}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
