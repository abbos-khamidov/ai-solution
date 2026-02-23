'use client';

import { ArrowDown } from 'lucide-react';
import { track } from '@/lib/analytics/gtag';

export function AnalyticsHeroCta() {
  return (
    <a
      href="#demo"
      onClick={() =>
        track('cta_click_analytics_hero', {
          location: 'analytics_hero',
          target: '/products/ai-analytics#demo',
        })
      }
      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold"
    >
      Получить демо
      <ArrowDown className="w-5 h-5 animate-bounce" />
    </a>
  );
}
