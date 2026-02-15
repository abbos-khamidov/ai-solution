'use client';

/**
 * Process Section - Vertical timeline with progressive line drawing (i18n enabled)
 * SVG line draws as user scrolls, steps reveal sequentially
 */

import React, { useRef } from 'react';
import { Search, Lightbulb, Code2, Rocket, ChartBar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useGSAPContext } from '@/components/animations/useGSAPContext';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

const stepKeys = [
  { key: 'discovery', icon: Search, number: '01' },
  { key: 'strategy', icon: Lightbulb, number: '02' },
  { key: 'development', icon: Code2, number: '03' },
  { key: 'deployment', icon: Rocket, number: '04' },
  { key: 'optimization', icon: ChartBar, number: '05' },
];

export function ProcessSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Progressive line drawing animation
  useGSAPContext(
    (gsap) => {
      const section = sectionRef.current;
      const line = lineRef.current;
      if (!section || !line) return;

      // Get the line total length
      const lineLength = line.getTotalLength();
      
      // Set initial state - line is invisible
      gsap.set(line, {
        strokeDasharray: lineLength,
        strokeDashoffset: lineLength,
      });

      // Draw line as user scrolls
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1.5,
        },
      });

      // Animate step dots
      const dots = section.querySelectorAll('.process-dot');
      dots.forEach((dot, i) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    },
    { scope: sectionRef as React.RefObject<HTMLElement> }
  );

  return (
    <section
      ref={sectionRef}
      className="relative section-container py-section bg-white"
      id="process"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <ScrollReveal direction="up" duration={0.7} className="text-center mb-20">
          <p className="text-sm font-semibold text-[#0066FF] tracking-wider uppercase mb-3">
            {t('process.label')}
          </p>
          <h2 className="text-display text-[#0F1419] mb-4">
            {t('process.title')}<br />
            <span className="text-gradient">{t('process.titleHighlight')}</span>
          </h2>
          <p className="text-body-lg text-[#536471] max-w-xl mx-auto">
            {t('process.subtitle')}
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line SVG */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px flex items-center justify-center">
            <svg
              className="absolute h-full w-px"
              viewBox="0 0 1 100"
              preserveAspectRatio="none"
              style={{ overflow: 'visible' }}
            >
              {/* Background line */}
              <line
                x1="0.5" y1="0" x2="0.5" y2="100"
                stroke="rgba(0,0,0,0.06)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              {/* Animated foreground line */}
              <line
                ref={lineRef}
                x1="0.5" y1="0" x2="0.5" y2="100"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0066FF" />
                  <stop offset="100%" stopColor="#00D9FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-24">
            {stepKeys.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <ScrollReveal
                  key={step.number}
                  direction={isEven ? 'left' : 'right'}
                  delay={0.1}
                  duration={0.7}
                >
                  <div className={`relative flex items-start gap-8 md:gap-16 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    {/* Content */}
                    <div className={`flex-1 pl-20 md:pl-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                      <span className="text-xs font-bold text-[#0066FF] tracking-wider uppercase mb-2 block">
                        {t(`process.steps.${step.key}.duration`)}
                      </span>
                      <h3 className="text-heading text-[#0F1419] mb-3">
                        {t(`process.steps.${step.key}.title`)}
                      </h3>
                      <p className="text-body text-[#536471] leading-relaxed">
                        {t(`process.steps.${step.key}.description`)}
                      </p>
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 process-dot">
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-[#0066FF] flex items-center justify-center shadow-md shadow-blue-500/10">
                        <Icon className="w-4 h-4 text-[#0066FF]" />
                      </div>
                    </div>

                    {/* Spacer for the other side */}
                    <div className="hidden md:block flex-1" />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
