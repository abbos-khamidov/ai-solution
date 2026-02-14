'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Sparkles, ChevronDown, Cpu, Network, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { useRevealAnimation } from '@/motion/hooks';
import { analytics } from '@/lib/analytics';
import { useLanguage } from '@/lib/i18n/useLanguage';

export function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Hero animations - engineered and confident, not flashy
  // Total animation time: 0.8s (under 1.2s requirement)
  
  // 1. Headline reveal: 0s - 0.6s
  useRevealAnimation({
    ref: headlineRef,
    variant: 'fade-up',
    duration: 0.6,
    delay: 0,
    once: true
  });

  // 2. Subtext reveal: 0.2s - 0.7s (0.2s delay + 0.5s duration)
  useRevealAnimation({
    ref: subtitleRef,
    variant: 'fade-up',
    duration: 0.5,
    delay: 0.2,
    once: true
  });

  // 3. CTA buttons reveal: 0.4s - 0.8s (0.4s delay + 0.4s duration)
  useRevealAnimation({
    ref: buttonsRef,
    variant: 'fade-up',
    duration: 0.4,
    delay: 0.4,
    once: true
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-gradient"
    >
      {/* Background orbs - static, no animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-96 h-96 rounded-full bg-[#00D4FF] opacity-15 blur-[120px]" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-[#B829FF] opacity-15 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00FFB8] opacity-[0.08] blur-[100px]" />
        
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.8) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingIcon icon={<Cpu className="w-14 h-14" />} className="top-[18%] left-[12%]" />
        <FloatingIcon icon={<Network className="w-10 h-10" />} className="top-[28%] right-[18%]" />
        <FloatingIcon icon={<Zap className="w-12 h-12" />} className="bottom-[22%] left-[18%]" />
        <FloatingIcon icon={<Sparkles className="w-8 h-8" />} className="bottom-[32%] right-[12%]" />
      </div>

      {/* Subtle dark overlay behind hero text for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/20 pointer-events-none z-[5]" />

      {/* Hero content - renders instantly, animates on mount */}
      <div className="hero-content relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong mb-8 border border-[#00D4FF]/30">
          <Sparkles className="w-4 h-4 text-[#00D4FF]" />
          <span className="text-sm text-gray-300">{t('hero.badge')}</span>
        </div>

        {/* Headline - improved hierarchy for clarity */}
        <div ref={headlineRef} className="mb-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            {/* Main promise: what you do + for whom */}
            <span className="block mb-3">{t('hero.headline')}</span>
            {/* Technical credibility: platforms that prove expertise */}
            <span className="block text-gradient mt-2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
              {t('hero.subheadline')}
            </span>
          </h1>
        </div>

        {/* Value proposition - what result they get */}
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4"
        >
          {t('hero.description')}
          <span className="block mt-2 text-gray-300 font-medium">
            {t('hero.result')}
          </span>
        </p>

        {/* CTA buttons with microcopy - final reveal */}
        <div ref={buttonsRef} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center px-4">
            <a
              href="/#contact"
              onClick={() => analytics.ctaClick('hero-consultation')}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-full overflow-hidden bg-gradient-to-r from-[#00D4FF] to-[#B829FF] text-white font-medium hover:shadow-[0_0_25px_rgba(0,212,255,0.3)] transition-all duration-300 text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="text-sm sm:text-base">{t('hero.ctaPrimary')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </span>
            </a>
            <a
              href="/#cases"
              onClick={() => analytics.ctaClick('hero-cases')}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full glass-strong text-white font-medium border border-[#00D4FF]/50 hover:border-[#B829FF] transition-all duration-300 text-center text-sm sm:text-base"
            >
              {t('hero.ctaSecondary')}
            </a>
          </div>

          {/* Microcopy: what happens next - improved contrast */}
          <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto px-4">
            {t('hero.microcopy')}
          </p>

          {/* Authority strip: trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-8 gap-y-3 text-xs sm:text-sm text-gray-400 pt-4 px-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00FFB8] flex-shrink-0" />
              <span>{t('hero.trust1')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00FFB8] flex-shrink-0" />
              <span>{t('hero.trust2')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00FFB8] flex-shrink-0" />
              <span>{t('hero.trust3')}</span>
            </div>
          </div>
        </div>

        {/* Stats - static, no animation for Phase 4 */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto">
          <Link href="/keisy" className="glass rounded-2xl p-4 hover:glass-strong transition-all duration-300 group text-center">
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-1 group-hover:scale-110 transition-transform">60+</div>
            <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{t('hero.stat1')}</div>
          </Link>
          <div className="glass rounded-2xl p-4 hover:glass-strong transition-all duration-300 group text-center">
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-1 group-hover:scale-110 transition-transform">24/7</div>
            <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{t('hero.stat2')}</div>
          </div>
          <div className="glass rounded-2xl p-4 hover:glass-strong transition-all duration-300 group text-center">
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-1 group-hover:scale-110 transition-transform">3</div>
            <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{t('hero.stat3')}</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - static */}
      <a
        href="/#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-[#00D4FF] transition-colors cursor-pointer z-10"
        aria-label="Scroll to services"
      >
        <span className="text-sm">{t('hero.scrollDown')}</span>
        <ChevronDown className="w-6 h-6" />
      </a>

      <NeuralNetwork />
    </section>
  );
}

function FloatingIcon({ icon, className }: { icon: React.ReactNode; className?: string }) {
  return (
    <div className={`absolute text-[#00D4FF] opacity-20 animate-float ${className}`}>
      {icon}
    </div>
  );
}

function NeuralNetwork() {
  const lines = [
    [20, 30, 80, 70],
    [40, 20, 60, 80],
    [70, 40, 30, 60],
    [50, 50, 90, 50],
    [30, 70, 70, 30],
  ];
  return (
    <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden>
      <svg className="w-full h-full">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="50%" stopColor="#B829FF" />
            <stop offset="100%" stopColor="#00FFB8" />
          </linearGradient>
        </defs>
        {lines.map((coords, i) => (
          <line
            key={i}
            x1={`${coords[0]}%`}
            y1={`${coords[1]}%`}
            x2={`${coords[2]}%`}
            y2={`${coords[3]}%`}
            stroke="url(#lineGrad)"
            strokeWidth="0.5"
            className="opacity-30"
          />
        ))}
      </svg>
    </div>
  );
}
