'use client';

import React, { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { useGSAPContext } from '@/components/animations/useGSAPContext';
import { HeroChatDemo } from '@/components/sections/HeroChatDemo';

const floatingBadges = [
  { text: '🟢 Hot lead detected', delay: '0s', position: 'top-8 -left-4 lg:-left-12' },
  { text: '⚡ Ответ за 2 сек', delay: '1.5s', position: 'top-1/3 -right-4 lg:-right-10' },
  { text: '📊 Конверсия +34%', delay: '3s', position: 'bottom-20 -left-2 lg:-left-8' },
];

const STAT_VALUES = ['30 сек', '24/7', '3x', '500+'];

export function Hero() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: STAT_VALUES[0], label: t('heroNew.stats.speed') },
    { value: STAT_VALUES[1], label: t('heroNew.stats.nonstop') },
    { value: STAT_VALUES[2], label: t('heroNew.stats.conversion') },
    { value: STAT_VALUES[3], label: t('heroNew.stats.clients') },
  ];
  const bgShapesRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAPContext(
    (gsap, container) => {
      if (bgShapesRef.current) {
        const shapes = bgShapesRef.current.children;
        gsap.fromTo(
          shapes,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.4, stagger: 0.2, ease: 'power3.out' }
        );
      }

      if (gridRef.current) {
        gsap.fromTo(gridRef.current, { opacity: 0 }, { opacity: 1, duration: 2, ease: 'power2.out' });
      }

      if (bgShapesRef.current) {
        const shapes = Array.from(bgShapesRef.current.children);
        shapes.forEach((shape, i) => {
          gsap.to(shape, {
            y: (i + 1) * -50,
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        });
      }
    },
    { scope: sectionRef as React.RefObject<HTMLElement> }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen pt-20 md:pt-24 overflow-hidden flex items-center"
      style={{ zIndex: 'var(--z-content)' }}
    >
      {/* Dark background */}
      <div
        className="absolute inset-0 bg-[#05050A]"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />

      {/* Animated CSS grid pattern */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-0"
        style={{
          zIndex: 1,
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        aria-hidden="true"
      />

      {/* Glowing orbs */}
      <div
        ref={bgShapesRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      >
        {/* Primary orb behind headline */}
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] opacity-0"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)',
            filter: 'blur(80px)',
            transform: 'translate3d(0,0,0)',
          }}
        />
        {/* Secondary orb */}
        <div
          className="absolute -bottom-20 right-1/4 w-[500px] h-[500px] animate-morph animation-delay-2000 opacity-0"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)',
            filter: 'blur(60px)',
            transform: 'translate3d(0,0,0)',
          }}
        />
        {/* Purple accent */}
        <div
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] animate-morph animation-delay-4000 opacity-0"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.08), transparent 70%)',
            filter: 'blur(60px)',
            transform: 'translate3d(0,0,0)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8 py-12 md:py-0">
        <div className="grid lg:grid-cols-[1fr_480px] gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.1] tracking-[-0.03em] font-extrabold text-[#F8FAFC] mb-6">
              {t('heroNew.titleLine1')}<br />
              {t('heroNew.titleLine2')}{' '}
              <span className="text-gradient bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
                {t('heroNew.titleAccent')}
              </span>
              .
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-[#94A3B8] max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed whitespace-pre-line">
              {t('heroNew.subtitle')}
            </p>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start mb-12">
              <MagneticButton strength={0.3} radius={150}>
                <button
                  onClick={() => {
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#05050A]"
                >
                  {t('heroNew.cta')}
                  <ArrowDown className="w-5 h-5 shrink-0 animate-bounce" />
                </button>
              </MagneticButton>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`text-center px-4 py-2 ${
                    idx < stats.length - 1 ? 'sm:border-r sm:border-white/[0.08]' : ''
                  }`}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-gradient bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#64748B] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Chat Demo with floating badges */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Floating badges */}
            {floatingBadges.map((badge, idx) => (
              <div
                key={idx}
                className={`hidden lg:flex absolute ${badge.position} z-20 items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-[#F8FAFC] whitespace-nowrap`}
                style={{
                  background: 'rgba(13, 13, 26, 0.8)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  animation: `${idx % 2 === 0 ? 'float-badge' : 'float-badge-alt'} ${4 + idx}s ease-in-out infinite`,
                  animationDelay: badge.delay,
                }}
              >
                {badge.text}
              </div>
            ))}

            <HeroChatDemo />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 opacity-40">
          <div className="w-6 h-10 rounded-full border-2 border-white/10 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-[#3B82F6]/50 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
