'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { HeroChatDemo } from '@/components/sections/HeroChatDemo';
import { track } from '@/lib/analytics/gtag';

export function Hero() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const title = t('heroAww.title');
  const growthPhraseRu = 'для роста продаж';
  const titleHasGrowthRu = title.includes(growthPhraseRu);
  const titleBeforeGrowthRu = titleHasGrowthRu ? title.slice(0, title.indexOf(growthPhraseRu)).trimEnd() : title;
  const sellingPhrases = useMemo(
    () => [
      t('heroAww.sellPhrases.p1'),
      t('heroAww.sellPhrases.p2'),
      t('heroAww.sellPhrases.p3'),
    ],
    [t]
  );
  const stats = [
    { value: t('heroAww.stats.speedValue'), label: t('heroAww.stats.speedLabel') },
    { value: t('heroAww.stats.replyValue'), label: t('heroAww.stats.replyLabel') },
    { value: t('heroAww.stats.roiValue'), label: t('heroAww.stats.roiLabel') },
    { value: t('heroAww.stats.launchValue'), label: t('heroAww.stats.launchLabel') },
  ];

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % sellingPhrases.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [reduceMotion, sellingPhrases.length]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/8 via-transparent to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_16%_16%,rgba(59,130,246,0.18),transparent_42%),radial-gradient(circle_at_84%_72%,rgba(6,182,212,0.12),transparent_40%)]" />

      <div className="relative z-10 pt-[var(--site-header-height,116px)]">
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8 min-h-[calc(100svh-var(--site-header-height,116px))] flex items-center py-4">
        <div className="grid lg:grid-cols-[1fr_480px] gap-8 lg:gap-12 items-center w-full">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#1D4ED8] shadow-[0_4px_16px_rgba(59,130,246,0.18)]">
              {t('heroAww.badge')}
            </span>

            <div className="mt-3 h-8 flex justify-center lg:justify-start items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={phraseIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: reduceMotion ? 0.12 : 0.26, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-sm sm:text-base font-semibold text-[#1D4ED8]"
                >
                  {sellingPhrases[phraseIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <h1 className="mt-4 text-[clamp(2rem,4.2vw,3.7rem)] leading-[1.04] tracking-[-0.03em] font-extrabold text-foreground hyphens-none break-normal [text-wrap:balance] max-w-[18ch] mx-auto lg:mx-0">
              {titleHasGrowthRu ? (
                <>
                  {titleBeforeGrowthRu}{' '}
                  <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
                    {growthPhraseRu}
                  </span>
                </>
              ) : (
                title
              )}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#475569] max-w-2xl mx-auto lg:mx-0 leading-relaxed whitespace-pre-line">
              {t('heroAww.subtitle')}
            </p>

            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-3">
              <MagneticButton strength={0.25} radius={130}>
                <Link
                  href="/#contact"
                  onClick={() => track('cta_click_hero', { location: 'hero', target: '/#contact' })}
                  className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 text-base md:text-lg font-semibold text-white rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] shadow-[0_12px_34px_rgba(59,130,246,0.35)] hover:shadow-[0_16px_40px_rgba(59,130,246,0.42)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-background"
                >
                  {t('heroAww.primaryCta')}
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </Link>
              </MagneticButton>
              <Link
                href="/#process"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold rounded-xl border border-border text-foreground hover:bg-muted transition-colors"
              >
                {t('heroAww.secondaryCta')}
              </Link>
            </div>

            <p className="mt-3 text-xs text-[#64748B]">
              {t('heroAww.microline')}
            </p>

            <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 rounded-2xl border border-border bg-card/85 backdrop-blur-sm px-2 py-2 shadow-[0_8px_28px_rgba(15,23,42,0.06)]">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`text-center px-4 py-3 ${
                    idx < stats.length - 1 ? 'sm:border-r sm:border-border' : ''
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

          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-[1.4rem] p-[1px] bg-gradient-to-br from-[#3B82F6]/35 via-[#06B6D4]/25 to-[#7C3AED]/20 shadow-[0_18px_44px_rgba(15,23,42,0.16)]">
              <div className="rounded-[1.3rem] bg-white/85 backdrop-blur-sm p-2">
                <HeroChatDemo />
              </div>
              <p className="mt-3 text-center text-sm text-[#64748B]">{t('heroAww.chatCaption')}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
