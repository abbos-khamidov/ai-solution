'use client';

import React from 'react';
import Link from 'next/link';
import {
  MessageCircle,
  MessageSquare,
  Instagram,
  ArrowRight,
  Check,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const platforms = [
  {
    icon: MessageCircle,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    hoverBorder: 'hover:border-blue-300',
    nameKey: 'services.aiManagers.telegram.name',
    featuresKey: 'services.aiManagers.telegram.features',
  },
  {
    icon: MessageSquare,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-50',
    hoverBorder: 'hover:border-green-300',
    nameKey: 'services.aiManagers.whatsapp.name',
    featuresKey: 'services.aiManagers.whatsapp.features',
  },
  {
    icon: Instagram,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50',
    hoverBorder: 'hover:border-purple-300',
    nameKey: 'services.aiManagers.instagram.name',
    featuresKey: 'services.aiManagers.instagram.features',
  },
] as const;

export function AIManagersSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-12 md:py-20" id="ai-managers">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        {/* Eyebrow */}
        <p className="text-sm font-semibold tracking-wide uppercase text-blue-600 mb-4 text-center">
          {t('services.aiManagers.eyebrow')}
        </p>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          {t('services.aiManagers.title')}
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-[800px] mx-auto text-center">
          {t('services.aiManagers.subtitle')}
        </p>

        {/* Three-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {platforms.map((platform, idx) => {
            const Icon = platform.icon;
            const features = t(platform.featuresKey, {
              returnObjects: true,
            }) as string[];

            return (
              <div
                key={idx}
                className={`bg-white border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${platform.hoverBorder}`}
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div
                    className={`w-20 h-20 rounded-full ${platform.iconBg} flex items-center justify-center`}
                  >
                    <Icon className={`w-10 h-10 ${platform.iconColor}`} />
                  </div>
                </div>

                {/* Platform name */}
                <h3 className="text-2xl font-bold text-center mb-4 text-gray-900">
                  {t(platform.nameKey)}
                </h3>

                {/* Features list */}
                <ul className="space-y-3">
                  {Array.isArray(features) &&
                    features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Learn More CTA */}
        <div className="text-center">
          <Link
            href="/services/ai-managers"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            {t('services.aiManagers.learnMore')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
