'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ArrowRight } from 'lucide-react';

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        gsap.set([titleRef.current, contentRef.current, ctaRef.current], { opacity: 1, y: 0 });
        return;
      }
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: 'power3.out',
      });
      gsap.from(contentRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none none' },
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.1,
        ease: 'power3.out',
      });
      gsap.from(ctaRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        opacity: 0,
        y: 16,
        duration: 0.5,
        delay: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[var(--background)]"
    >
      <div className="max-w-6xl mx-auto">
        <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-12">
          О компании
        </h2>
        
        <div ref={contentRef} className="max-w-4xl space-y-10">
          {/* Positioning statement */}
          <div className="space-y-4">
            <p className="text-xl text-[var(--foreground)] leading-relaxed">
              Разработка и внедрение AI-решений для бизнеса. Работаем с компаниями, которым нужна стабильность и долгосрочный результат.
            </p>
          </div>

          {/* Credibility signals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-[var(--primary)]">60+</div>
              <div className="text-[var(--muted-foreground)]">Внедренных проектов</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-4xl font-bold text-[var(--primary)]">4 года</div>
              <div className="text-[var(--muted-foreground)]">На рынке</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-4xl font-bold text-[var(--primary)]">85%</div>
              <div className="text-[var(--muted-foreground)]">Клиентов возвращаются</div>
            </div>
          </div>

          {/* Team reference */}
          <div className="space-y-4 pt-6 border-t border-[var(--border)]">
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              Команда из 8 специалистов: разработчики, ML-инженеры, аналитики. Все проекты ведет один из основателей — прямой контакт без посредников.
            </p>
          </div>
        </div>

        <div ref={ctaRef} className="mt-12">
          <Link
            href="/keisy"
            className="inline-flex items-center gap-2 text-[var(--primary)] font-medium hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded"
          >
            Смотреть проекты
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
