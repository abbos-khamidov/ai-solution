'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const marketRows = [
  { key: 'clarity' },
  { key: 'proof' },
  { key: 'speed' },
  { key: 'integration' },
];

/** Fallback if --site-header-height not yet published (see Header.tsx) */
const FALLBACK_HEADER_PX = 116;
/** Must match sticky band: gap under fixed header (scroll math) */
const START_ANCHOR_GAP_PX = 20;
/** Empty space above/below content inside viewport band (below site header) */
const STICKY_VIEWPORT_INSET_PX = 20;
/**
 * Scroll distance for full 0→1 progress (vh). Lower = shorter section, still ~1 band per criterion.
 * Tuned so the block doesn’t dominate the page height while scrollytelling stays readable.
 */
const TRACK_VH_PER_STEP = 36;
const TRACK_VH_BASE = 28;

export function MarketBenchmarkSection() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  /** Tall wrapper: page scroll drives progress while inner panel stays sticky */
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const totalSteps = marketRows.length;
  const active = useMemo(() => marketRows[activeStep], [activeStep]);

  /** Snappy tweens — avoid long springs (felt sluggish on scroll) */
  const reelTransition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0.12 }
        : { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] as const },
    [reduceMotion]
  );
  const softSpring = useMemo(
    () =>
      reduceMotion
        ? { duration: 0.18 }
        : { duration: 0.32, ease: [0.25, 0.1, 0.25, 1] as const },
    [reduceMotion]
  );
  const stepCrossfade = useMemo(
    () => ({
      duration: reduceMotion ? 0.12 : 0.22,
      ease: [0.25, 0.1, 0.25, 1] as const,
    }),
    [reduceMotion]
  );
  const progressTween = useMemo(
    () =>
      reduceMotion
        ? { duration: 0.15 }
        : { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] as const },
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
        setProgress(0);
        setActiveStep(0);
        return;
      }
      // 1) Anchor to real fixed header height (ticker + nav) so 01/04 matches “under header” layout.
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--site-header-height').trim();
      const headerH = Math.max(72, parseFloat(raw) || FALLBACK_HEADER_PX);
      const startAnchorPx = Math.round(headerH + START_ANCHOR_GAP_PX);
      const shifted = startAnchorPx - rect.top;
      const u = Math.max(0, Math.min(1, shifted / scrollable));
      // 2) Equal discrete steps — no half-states on cards / progress bar
      const stepIndex =
        totalSteps <= 1 ? 0 : Math.min(totalSteps - 1, Math.round(u * (totalSteps - 1)));
      const snapped = totalSteps <= 1 ? 0 : stepIndex / (totalSteps - 1);
      setActiveStep(stepIndex);
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

  const trackX = -(progress * (totalSteps - 1)) * (100 / totalSteps);
  // 3) Tall scroll track (vh ∝ N). 4) Do not add overflow clip/hidden on <section> — breaks sticky.
  const desktopTrackMinHeight = `${totalSteps * TRACK_VH_PER_STEP + TRACK_VH_BASE}vh`;

  return (
    <section className="relative bg-background py-8 md:py-12">
      {/* Static ambient (no infinite JS animation — lighter CPU / faster feel) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block overflow-hidden" aria-hidden>
        <div className="absolute -left-[20%] top-[10%] h-[55%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.14)_0%,transparent_68%)] blur-[72px] opacity-70" />
        <div className="absolute -right-[15%] bottom-[5%] h-[45%] w-[50%] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.1)_0%,transparent_65%)] blur-[80px] opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,var(--background)_88%)] opacity-90" />
      </div>

      {/* Desktop: scroll-linked scrollytelling (natural page scroll) */}
      <div
        ref={scrollTrackRef}
        className="relative hidden lg:block"
        style={{ minHeight: desktopTrackMinHeight }}
      >
        <div
          className="sticky z-10 flex items-center justify-center px-4 md:px-6"
          style={{
            /* 15px под fixed header + 15px над низом вьюпорта (полоса контента между ними) */
            top: `calc(var(--site-header-height, 116px) + ${STICKY_VIEWPORT_INSET_PX}px)`,
            minHeight: `calc(100svh - var(--site-header-height, 116px) - ${STICKY_VIEWPORT_INSET_PX * 2}px)`,
          }}
        >
          <div className="max-w-7xl mx-auto w-full min-h-0 max-h-full">
            <motion.div
              className="relative max-h-full min-h-0 rounded-[28px] border border-border bg-card/90 backdrop-blur-xl overflow-hidden shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
              initial={{ opacity: 0.96, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/22 to-transparent"
                aria-hidden
              />

              <div className="grid grid-cols-[0.95fr_1.05fr]">
                <div className="relative p-5 lg:p-6 border-r border-border">
                  <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.14),transparent_42%),radial-gradient(circle_at_80%_75%,rgba(6,182,212,0.1),transparent_44%)] pointer-events-none" />

                  <div className="relative z-10">
                    <motion.span
                      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border border-[#3B82F6]/25 bg-[#3B82F6]/10 text-[#2563EB]"
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ ...softSpring, delay: 0.02 }}
                    >
                      {t('benchmark.badge')}
                    </motion.span>
                    <motion.h2
                      className="mt-3 text-2xl xl:text-3xl font-bold text-foreground tracking-tight hyphens-none text-balance [overflow-wrap:anywhere] leading-tight"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ ...softSpring, delay: 0.05 }}
                    >
                      {t('benchmark.title')}
                    </motion.h2>
                    <motion.p
                      className="mt-2 text-sm text-[#64748B] max-w-lg leading-snug"
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ ...softSpring, delay: 0.08 }}
                    >
                      {t('benchmark.subtitle')}
                    </motion.p>

                    <nav
                      className="mt-4 rounded-xl border border-border bg-slate-50/80 p-1.5"
                      aria-label={t('benchmark.stepsNavAria')}
                    >
                      <ol className="space-y-1">
                        {marketRows.map((row, idx) => {
                          const on = idx === activeStep;
                          return (
                            <li key={row.key} aria-current={on ? 'step' : undefined}>
                              <div
                                className={`flex items-start gap-2 rounded-lg px-2 py-1.5 text-left text-[12px] leading-snug transition-colors duration-200 ${
                                  on
                                    ? 'bg-white text-[#0F172A] shadow-sm ring-1 ring-[#3B82F6]/25'
                                    : 'text-[#64748B]'
                                }`}
                              >
                                <span
                                  className={`mt-0.5 tabular-nums text-[11px] font-bold shrink-0 w-7 ${
                                    on ? 'text-[#2563EB]' : 'text-[#94A3B8]'
                                  }`}
                                >
                                  {String(idx + 1).padStart(2, '0')}
                                </span>
                                <span className={on ? 'font-semibold text-foreground' : ''}>
                                  {t(`benchmark.rows.${row.key}.label`)}
                                </span>
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    </nav>

                    <div className="mt-4">
                      <div className="relative h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <motion.div
                          className="h-full w-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] origin-left"
                          initial={false}
                          animate={{ scaleX: Math.max(0.08, progress) }}
                          transition={progressTween}
                          style={{ transformOrigin: '0% 50%' }}
                        />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-[#64748B]">
                        <motion.span
                          key={activeStep}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={softSpring}
                        >
                          {String(activeStep + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
                        </motion.span>
                        <motion.span
                          key={active.key}
                          className="text-right max-w-[55%] truncate"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={stepCrossfade}
                        >
                          {t(`benchmark.rows.${active.key}.label`)}
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-[#e8f5ff]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeStep}
                      className="pointer-events-none absolute right-4 top-16 select-none text-[5.5rem] xl:text-[6rem] font-extrabold leading-none text-[#3B82F6]/[0.06] tabular-nums"
                      aria-hidden
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={stepCrossfade}
                    >
                      {String(activeStep + 1).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                  <motion.div
                    className="absolute top-0 left-0 h-full flex will-change-transform"
                    style={{ width: `${totalSteps * 100}%` }}
                    animate={{ x: `${trackX}%` }}
                    transition={reelTransition}
                  >
                    {marketRows.map((row, idx) => {
                      const isActive = idx === activeStep;
                      return (
                        <div
                          key={row.key}
                          className="h-full shrink-0 flex items-center justify-center p-8"
                          style={{ width: `${100 / totalSteps}%` }}
                        >
                          <motion.div
                            className={`w-full max-w-xl rounded-3xl border ${
                              isActive
                                ? 'border-[#3B82F6]/30 bg-white shadow-[0_24px_54px_rgba(59,130,246,0.24)]'
                                : 'border-border bg-white/80 shadow-sm'
                            }`}
                            animate={{
                              scale: isActive ? 1 : 0.96,
                              opacity: isActive ? 1 : 0.58,
                            }}
                            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                          >
                            <div className="p-5 md:p-6">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-semibold tracking-widest uppercase text-[#64748B]">
                                  {t('benchmark.rows.' + row.key + '.label')}
                                </span>
                                <span className="text-sm font-bold text-[#1D4ED8] tabular-nums">
                                  {String(idx + 1).padStart(2, '0')}
                                </span>
                              </div>

                              <motion.div
                                className="space-y-2"
                                animate={{
                                  opacity: isActive ? 1 : 0.5,
                                  y: isActive ? 0 : 4,
                                }}
                                transition={softSpring}
                              >
                                <div className="rounded-xl border border-border bg-slate-50 p-3">
                                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B] mb-0.5">
                                    {t('benchmark.header.market')}
                                  </p>
                                  <p className="text-sm leading-snug text-[#475569]">
                                    {t(`benchmark.rows.${row.key}.market`)}
                                  </p>
                                </div>
                                <div className="rounded-xl border border-[#3B82F6]/25 bg-[#3B82F6]/[0.08] p-3">
                                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#1D4ED8] mb-0.5">
                                    {t('benchmark.header.aisolution')}
                                  </p>
                                  <p className="text-sm leading-snug text-[#1E40AF] font-semibold">
                                    {t(`benchmark.rows.${row.key}.ours`)}
                                  </p>
                                </div>
                              </motion.div>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-7">
            <motion.span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border border-[#3B82F6]/25 bg-[#3B82F6]/10 text-[#2563EB]"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={softSpring}
            >
              {t('benchmark.badge')}
            </motion.span>
            <motion.h2
              className="mt-4 text-3xl font-bold text-foreground hyphens-none text-balance [overflow-wrap:anywhere] px-1"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...softSpring, delay: 0.03 }}
            >
              {t('benchmark.title')}
            </motion.h2>
            <motion.p
              className="mt-3 text-[#64748B]"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...softSpring, delay: 0.06 }}
            >
              {t('benchmark.subtitle')}
            </motion.p>
          </div>

          <div className="space-y-4">
            {marketRows.map((row, idx) => (
              <motion.div
                key={row.key}
                className="rounded-2xl border border-border bg-card shadow-sm p-5"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ ...softSpring, delay: idx * 0.03 }}
              >
                <p className="text-xs font-semibold tracking-widest uppercase text-[#64748B] mb-2">
                  {String(idx + 1).padStart(2, '0')} · {t('benchmark.rows.' + row.key + '.label')}
                </p>
                <div className="space-y-3">
                  <div className="rounded-xl border border-border bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">{t('benchmark.header.market')}</p>
                    <p className="text-sm text-[#475569]">{t(`benchmark.rows.${row.key}.market`)}</p>
                  </div>
                  <div className="rounded-xl border border-[#3B82F6]/25 bg-[#3B82F6]/[0.06] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#1D4ED8] mb-1">{t('benchmark.header.aisolution')}</p>
                    <p className="text-sm text-[#1E3A8A] font-medium">{t(`benchmark.rows.${row.key}.ours`)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
      </div>
    </section>
  );
}
