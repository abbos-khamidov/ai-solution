'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ArrowRight, ArrowLeft, Check, Layout, Code } from 'lucide-react';
import type { CaseStudy } from '@/lib/data/cases';

interface CaseStudyContentProps {
  caseStudy: CaseStudy;
}

export function CaseStudyContent({ caseStudy }: CaseStudyContentProps) {
  const {
    title,
    tagline,
    industry,
    summary,
    challenge,
    solution,
    results,
    stack,
    imagePlaceholder,
  } = caseStudy;

  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const blockChallengeRef = useRef<HTMLDivElement>(null);
  const blockSolutionRef = useRef<HTMLDivElement>(null);
  const blockResultsRef = useRef<HTMLDivElement>(null);
  const blockStackRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const duration = prefersReducedMotion ? 0 : 0.6;
      const yFrom = prefersReducedMotion ? 0 : 24;

      const reveal = (el: HTMLElement | null, delay = 0) => {
        if (!el) return;
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: yFrom,
          duration: prefersReducedMotion ? 0 : 0.65,
          delay,
          ease: 'power3.out',
        });
      };

      if (!prefersReducedMotion && heroRef.current) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from(badgeRef.current, { opacity: 0, y: 12, duration: 0.4 })
          .from(titleRef.current, { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
          .from(taglineRef.current, { opacity: 0, y: 16, duration: 0.45 }, '-=0.3')
          .from(summaryRef.current, { opacity: 0, y: 16, duration: 0.45 }, '-=0.25');
      } else {
        gsap.set([badgeRef.current, titleRef.current, taglineRef.current, summaryRef.current], { opacity: 1, y: 0 });
      }

      reveal(blockChallengeRef.current);
      reveal(blockSolutionRef.current, 0.05);
      reveal(blockResultsRef.current, 0.05);
      reveal(blockStackRef.current, 0.05);
      reveal(ctaRef.current, 0.1);
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-[var(--background)] border-b border-[var(--border)]"
      >
        <div className="max-w-3xl mx-auto">
          <Link
            href="/keisy"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            Кейсам
          </Link>
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <span
            ref={badgeRef}
            className="inline-block text-xs font-medium text-[var(--primary)] uppercase tracking-wider mb-4"
          >
            {industry}
          </span>
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl font-bold text-[var(--foreground)]"
          >
            {title}
          </h1>
          <p
            ref={taglineRef}
            className="mt-3 text-xl text-[var(--muted-foreground)]"
          >
            {tagline}
          </p>
          <p
            ref={summaryRef}
            className="mt-6 text-[var(--card-foreground)] leading-relaxed"
          >
            {summary}
          </p>
          {imagePlaceholder && (
            <div
              className="mt-10 aspect-video max-w-2xl mx-auto rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center"
              aria-hidden
            >
              <span className="text-6xl font-bold text-[var(--primary)]/30">
                {imagePlaceholder}
              </span>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        <div ref={blockChallengeRef}>
          <h2 className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
            Задача
          </h2>
          <p className="text-[var(--foreground)] leading-relaxed">{challenge}</p>
        </div>

        <div ref={blockSolutionRef}>
          <h2 className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
            <Layout className="w-4 h-4" aria-hidden />
            Решение
          </h2>
          <p className="text-[var(--foreground)] leading-relaxed">{solution}</p>
        </div>

        <div ref={blockResultsRef}>
          <h2 className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-4">
            <Check className="w-4 h-4" aria-hidden />
            Результат
          </h2>
          <ul className="space-y-3">
            {results.map((result, i) => (
              <li
                key={i}
                className="flex gap-3 text-[var(--foreground)]"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)] shrink-0" />
                <span>{result}</span>
              </li>
            ))}
          </ul>
        </div>

        <div ref={blockStackRef}>
          <h2 className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
            <Code className="w-4 h-4" aria-hidden />
            Стек
          </h2>
          <p className="text-[var(--muted-foreground)]">{stack}</p>
        </div>

        <div
          ref={ctaRef}
          className="pt-8 border-t border-[var(--border)] text-center"
        >
          <p className="text-[var(--muted-foreground)] mb-6">
            Хотите похожий результат для своего бизнеса?
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-medium hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            Обсудить проект
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
