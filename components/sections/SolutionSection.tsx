'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTranslation } from 'react-i18next';

const STEP_KEYS = ['s1', 's2', 's3', 's4'] as const;
const FALLBACK_HEADER_PX = 116;
const STICKY_GAP_PX = 20;
const TRACK_VH_PER_STEP = 56;
const TRACK_VH_BASE = 44;

export function SolutionSection() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const totalSteps = STEP_KEYS.length;
  const activeKey = STEP_KEYS[activeStep];

  const stepTransition = useMemo(
    () => ({
      duration: reduceMotion ? 0.14 : 0.24,
      ease: [0.25, 0.1, 0.25, 1] as const,
    }),
    [reduceMotion]
  );

  useEffect(() => {
    const track = scrollTrackRef.current;
    if (!track) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      if (scrollable <= 1) {
        setActiveStep(0);
        setProgress(0);
        return;
      }
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--site-header-height').trim();
      const headerH = Math.max(72, parseFloat(raw) || FALLBACK_HEADER_PX);
      const startAnchor = headerH + STICKY_GAP_PX;
      const u = Math.max(0, Math.min(1, (startAnchor - rect.top) / scrollable));
      const index = Math.min(totalSteps - 1, Math.round(u * (totalSteps - 1)));
      const snapped = totalSteps <= 1 ? 0 : index / (totalSteps - 1);
      setActiveStep(index);
      setProgress(snapped);
    };

    const onScrollOrResize = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [totalSteps]);

  const desktopTrackMinHeight = `${totalSteps * TRACK_VH_PER_STEP + TRACK_VH_BASE}vh`;

  return (
    <section className="relative bg-background py-8 md:py-12" id="process">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground hyphens-none text-balance [overflow-wrap:anywhere]">
            {t('solutionMap.title')}
          </h2>
          <p className="mt-3 text-base md:text-lg text-[#64748B] max-w-3xl mx-auto">
            {t('solutionMap.subtitle')}
          </p>
        </div>

        <div
          ref={scrollTrackRef}
          className="relative hidden lg:block"
          style={{ minHeight: desktopTrackMinHeight }}
        >
          <div
            className="sticky z-10 flex items-center"
            style={{
              top: `calc(var(--site-header-height, 116px) + ${STICKY_GAP_PX}px)`,
              minHeight: `calc(100svh - var(--site-header-height, 116px) - ${STICKY_GAP_PX * 2}px)`,
            }}
          >
            <div className="w-full rounded-[28px] border border-border bg-card/92 backdrop-blur-xl overflow-hidden shadow-[0_20px_54px_rgba(15,23,42,0.12)]">
              <div className="relative p-5 xl:p-6 border-b border-border bg-[radial-gradient(circle_at_15%_15%,rgba(59,130,246,0.12),transparent_42%),radial-gradient(circle_at_85%_85%,rgba(6,182,212,0.1),transparent_45%)]">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#64748B]">{t('solutionMap.mapLabel')}</p>
                  <span className="text-sm tabular-nums font-bold text-[#1D4ED8]">
                    {String(activeStep + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-5">
                  {STEP_KEYS.map((key, idx) => {
                    const isActive = idx === activeStep;
                    const isPassed = idx < activeStep;
                    return (
                      <motion.div
                        key={key}
                        className="rounded-xl border px-2.5 py-2 text-center"
                        animate={{
                          borderColor: isActive ? 'rgba(59,130,246,0.34)' : isPassed ? 'rgba(6,182,212,0.32)' : 'rgba(148,163,184,0.3)',
                          backgroundColor: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(248,250,252,0.8)',
                          scale: isActive ? 1.02 : 1,
                        }}
                        transition={stepTransition}
                      >
                        <p className="text-[10px] tabular-nums font-bold text-[#2563EB] mb-1">{String(idx + 1).padStart(2, '0')}</p>
                        <p className={`text-[12px] leading-snug ${isActive ? 'font-semibold text-foreground' : 'text-[#64748B]'}`}>
                          {t(`solutionMap.steps.${key}.node`)}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="relative h-[110px] rounded-2xl border border-border/80 bg-white/75 overflow-hidden">
                  <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-[2px] bg-slate-300 rounded-full" />
                  <motion.div
                    className="absolute left-[10%] top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-full origin-left"
                    animate={{ scaleX: Math.max(0.08, progress) }}
                    transition={stepTransition}
                    style={{ width: '80%', transformOrigin: '0% 50%' }}
                  />

                  {STEP_KEYS.map((key, idx) => {
                    const pct = 10 + idx * (80 / (STEP_KEYS.length - 1));
                    const isActive = idx === activeStep;
                    const isPassed = idx < activeStep;
                    return (
                      <div key={key} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${pct}%` }}>
                        <motion.div
                          className="h-5 w-5 -ml-2.5 rounded-full border-2"
                          animate={{
                            backgroundColor: isActive ? '#FFFFFF' : isPassed ? 'rgba(6,182,212,0.22)' : '#F1F5F9',
                            borderColor: isActive ? '#2563EB' : isPassed ? '#06B6D4' : '#94A3B8',
                            scale: isActive ? 1.12 : 1,
                          }}
                          transition={stepTransition}
                        />
                        {isActive && !reduceMotion && (
                          <motion.div
                            className="absolute inset-0 -ml-2.5 h-5 w-5 rounded-full border border-[#3B82F6]/40"
                            animate={{ scale: [1, 1.8], opacity: [0.45, 0] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                          />
                        )}
                      </div>
                    );
                  })}

                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 -ml-2 h-4 w-4 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] shadow-[0_0_14px_rgba(59,130,246,0.45)]"
                    animate={{ left: `${10 + progress * 80}%` }}
                    transition={stepTransition}
                  />
                </div>
              </div>

              <div className="grid grid-cols-[0.86fr_1.14fr]">
                <div className="p-5 xl:p-6 border-r border-border bg-slate-50/70">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#64748B] mb-3">{t('solutionMap.cardLabel')}</p>
                  <div className="space-y-2.5">
                    {STEP_KEYS.map((key, idx) => {
                      const isActive = idx === activeStep;
                      return (
                        <motion.div
                          key={`feed-${key}`}
                          className="rounded-lg border px-3 py-2.5"
                          animate={{
                            borderColor: isActive ? 'rgba(59,130,246,0.28)' : 'rgba(148,163,184,0.2)',
                            backgroundColor: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.72)',
                            opacity: isActive ? 1 : 0.7,
                          }}
                          transition={stepTransition}
                        >
                          <p className="text-[11px] tabular-nums font-bold text-[#2563EB] mb-0.5">{String(idx + 1).padStart(2, '0')}</p>
                          <p className={`text-[13px] leading-snug ${isActive ? 'font-semibold text-foreground' : 'text-[#64748B]'}`}>
                            {t(`solutionMap.steps.${key}.label`)}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-[#e9f5ff] p-5 xl:p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeKey}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={stepTransition}
                      className="h-full flex flex-col"
                    >
                      <h3 className="text-xl xl:text-2xl leading-tight font-bold text-foreground max-w-[28ch] mb-4">
                        {t(`solutionMap.steps.${activeKey}.label`)}
                      </h3>

                      <div className="space-y-3">
                        <div className="rounded-xl border border-border bg-white p-3.5">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B] mb-0.5">{t('solutionMap.marketLabel')}</p>
                          <p className="text-sm text-[#475569] leading-snug">{t(`solutionMap.steps.${activeKey}.market`)}</p>
                        </div>
                        <div className="rounded-xl border border-[#3B82F6]/25 bg-[#3B82F6]/[0.08] p-3.5">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#1D4ED8] mb-0.5">{t('solutionMap.oursLabel')}</p>
                          <p className="text-sm text-[#1E40AF] font-semibold leading-snug">{t(`solutionMap.steps.${activeKey}.ours`)}</p>
                        </div>
                      </div>

                      <div className="mt-4 inline-flex w-fit items-center rounded-full border border-[#3B82F6]/30 bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#1D4ED8]">
                        {t(`solutionMap.steps.${activeKey}.kpi`)}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden grid gap-4 mt-6">
          {STEP_KEYS.map((key, idx) => (
            <div key={key} className="rounded-xl border border-border bg-card shadow-sm p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">{t(`solutionMap.steps.${key}.label`)}</p>
                <span className="text-xs font-bold text-[#2563EB] tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
              </div>
              <p className="mt-2 text-xs uppercase tracking-wider text-[#64748B]">{t('solutionMap.marketLabel')}</p>
              <p className="text-sm text-[#475569] mt-0.5">{t(`solutionMap.steps.${key}.market`)}</p>
              <p className="mt-2 text-xs uppercase tracking-wider text-[#1D4ED8]">{t('solutionMap.oursLabel')}</p>
              <p className="text-sm text-[#1E40AF] font-medium mt-0.5">{t(`solutionMap.steps.${key}.ours`)}</p>
              <p className="mt-3 text-xs font-semibold text-[#2563EB]">{t(`solutionMap.steps.${key}.kpi`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
