'use client';

/**
 * Features Section - Horizontal scroll carousel with pinning (i18n enabled)
 * Uses GSAP ScrollTrigger for horizontal scroll-jacking
 */

import React, { useRef } from 'react';
import { Brain, Workflow, BarChart3, Shield, Zap, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useGSAPContext } from '@/components/animations/useGSAPContext';
import { GlassCard } from '@/components/ui/GlassCard';

const featureKeys = [
  { key: 'neural', icon: Brain, color: '#0066FF', bgColor: 'rgba(0,102,255,0.06)' },
  { key: 'workflow', icon: Workflow, color: '#00D9FF', bgColor: 'rgba(0,217,255,0.06)' },
  { key: 'analytics', icon: BarChart3, color: '#0066FF', bgColor: 'rgba(0,102,255,0.06)' },
  { key: 'security', icon: Shield, color: '#00D9FF', bgColor: 'rgba(0,217,255,0.06)' },
  { key: 'realtime', icon: Zap, color: '#0066FF', bgColor: 'rgba(0,102,255,0.06)' },
  { key: 'global', icon: Globe, color: '#00D9FF', bgColor: 'rgba(0,217,255,0.06)' },
];

export function FeaturesSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAPContext(
    (gsap) => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      // Calculate total scroll width
      const cards = track.querySelectorAll('.feature-card');
      const cardWidth = 420; // card width + gap
      const totalWidth = cards.length * cardWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalWidth - viewportWidth + 200; // 200px padding

      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Horizontal scroll
      gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Stagger card reveals
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0.3, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getById?.('featuresScroll') || undefined,
              start: 'left 80%',
              end: 'left 20%',
              scrub: 1,
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
      className="relative section-container bg-[#F0F2F5]"
      id="features"
      style={{ minHeight: '100vh' }}
    >
      <div className="py-20 px-6">
        {/* Section heading */}
        <div ref={headingRef} className="max-w-7xl mx-auto mb-16">
          <p className="text-sm font-semibold text-[#0066FF] tracking-wider uppercase mb-3 opacity-0">
            {t('features.label')}
          </p>
          <h2 className="text-display text-[#0F1419] mb-4 opacity-0">
            {t('features.title')}<br />
            <span className="text-gradient">{t('features.titleHighlight')}</span>
          </h2>
          <p className="text-body-lg text-[#536471] max-w-xl opacity-0">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Horizontal scroll track */}
        <div
          ref={trackRef}
          className="flex gap-6 pl-6"
          style={{ width: 'max-content' }}
        >
          {featureKeys.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.key}
                className="feature-card flex-shrink-0"
                style={{ width: '396px' }}
              >
                <GlassCard className="h-full bg-white/80 p-8" tiltMax={6} hoverScale={1.01}>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: feature.bgColor }}
                  >
                    <Icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-heading text-[#0F1419] mb-3">
                    {t(`features.items.${feature.key}.title`)}
                  </h3>
                  <p className="text-body text-[#536471] leading-relaxed">
                    {t(`features.items.${feature.key}.description`)}
                  </p>
                  <div className="mt-6 pt-4 border-t border-black/[0.06]">
                    <span className="text-sm font-medium text-[#0066FF] hover:text-[#0052CC] cursor-pointer transition-colors">
                      {t('features.learnMore')} &rarr;
                    </span>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
