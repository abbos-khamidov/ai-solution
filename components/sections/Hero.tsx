'use client';

/**
 * Hero Section - Simplified AI Sales Solution Landing
 * Clean, focused message with single CTA
 */

import React, { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { useGSAPContext } from '@/components/animations/useGSAPContext';
import { HeroChatDemo } from '@/components/sections/HeroChatDemo';

// ─── Hero Component ──────────────────────────────────────────
export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgShapesRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Simplified entrance animation
  useGSAPContext(
    (gsap, container) => {
      // Background shapes fade in (decorative only, position:absolute — no layout impact)
      if (bgShapesRef.current) {
        const shapes = bgShapesRef.current.children;
        gsap.fromTo(
          shapes,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.4, stagger: 0.2, ease: 'power3.out' }
        );
      }

      // Grid fade in
      if (gridRef.current) {
        gsap.fromTo(gridRef.current, { opacity: 0 }, { opacity: 1, duration: 2, ease: 'power2.out' });
      }

      // Parallax on background shapes (scroll-based)
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
      {/* === BACKGROUND LAYER === */}
      <div
        className="absolute inset-0 bg-gradient-hero"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />

      {/* Subtle grid pattern */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-0"
        style={{
          zIndex: 1,
          backgroundImage: `
            linear-gradient(rgba(0,102,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,102,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Morphing gradient shapes */}
      <div
        ref={bgShapesRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      >
        <div
          className="absolute -top-20 -right-20 w-[600px] h-[600px] animate-morph opacity-0"
          style={{
            background:
              'radial-gradient(circle, rgba(0,102,255,0.08) 0%, rgba(0,102,255,0.02) 50%, transparent 70%)',
            filter: 'blur(40px)',
            transform: 'translate3d(0,0,0)',
          }}
        />
        <div
          className="absolute -bottom-32 -left-20 w-[500px] h-[500px] animate-morph animation-delay-2000 opacity-0"
          style={{
            background:
              'radial-gradient(circle, rgba(0,217,255,0.06) 0%, rgba(0,217,255,0.02) 50%, transparent 70%)',
            filter: 'blur(50px)',
            transform: 'translate3d(0,0,0)',
          }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-[300px] h-[300px] animate-morph animation-delay-4000 opacity-0"
          style={{
            background:
              'radial-gradient(circle, rgba(0,102,255,0.05) 0%, transparent 70%)',
            filter: 'blur(60px)',
            transform: 'translate3d(0,0,0)',
          }}
        />
      </div>

      {/* === CONTENT LAYER === */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_480px] gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            {/* Main Title */}
            <h1 className="text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.1] tracking-[-0.02em] font-bold text-[#0F1419] mb-6">
              Ваши менеджеры спят.<br />
              Ваш AI — <span className="text-gradient bg-gradient-to-r from-[#0066FF] to-[#00D9FF] bg-clip-text text-transparent">нет</span>.
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg sm:text-xl md:text-2xl text-[#4f6070] max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              30% клиентов уходят, не дождавшись ответа.<br />
              Наш AI отвечает за 30 секунд — днём и ночью.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start">
              <MagneticButton strength={0.3} radius={150}>
                <button
                  onClick={() => {
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00D9FF] shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-offset-2"
                >
                  Выбрать тариф
                  <ArrowDown className="w-5 h-5 shrink-0 animate-bounce" />
                </button>
              </MagneticButton>
            </div>
          </div>

          {/* Right: Chat Demo */}
          <div className="flex justify-center lg:justify-end">
            <HeroChatDemo />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-[#8899A6] opacity-60">
          <div className="w-6 h-10 rounded-full border-2 border-black/10 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-[#0066FF]/40 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
