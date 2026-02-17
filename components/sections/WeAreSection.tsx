'use client';

/**
 * We Are Section - Ultra-concise company intro
 * 6 words: Who we are
 * 12 words: What we do (more detail)
 */

import React from 'react';
import { Sparkles } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export function WeAreSection() {
  return (
    <section id="solutions" className="py-12 md:py-16 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
        <ScrollReveal duration={0.6}>
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          {/* Main tagline - ultra simple */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            AI-продажники работают 24/7
          </h2>

          {/* Description - what we provide */}
          <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed">
            Отвечаем клиентам моментально. Квалифицируем лиды. Передаём горячих менеджеру.
          </p>

          {/* Stats row */}
          <div className="mt-12 grid grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">30 сек</div>
              <div className="text-sm md:text-base text-white/80">Скорость ответа</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm md:text-base text-white/80">Без выходных</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">3x</div>
              <div className="text-sm md:text-base text-white/80">Больше конверсий</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
