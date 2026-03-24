'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
  Flower2,
  GraduationCap,
  Megaphone,
  HeartPulse,
  ShoppingBag,
  Users,
  Building,
  Shirt,
  Wrench,
  BriefcaseBusiness,
  BarChart3,
  Headphones,
  Factory,
  BookOpen,
  Network,
} from 'lucide-react';

type TestimonialRow = {
  role: string;
  company: string;
  initial: string;
  text: string;
  impact: string;
  period: string;
  gradient: string;
};

function TestimonialsBlock() {
  const { t } = useTranslation();
  const raw = t('socialProof.testimonialsBlock.items', { returnObjects: true }) as TestimonialRow[] | unknown;
  const testimonials = Array.isArray(raw) ? raw : [];
  const [active, setActive] = useState(0);
  const item = testimonials[active];

  if (!item) return null;

  return (
    <div className="mb-20">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-10">
        {t('socialProof.testimonialsBlock.title')}
      </h2>

      <div className="rounded-3xl border border-border bg-card shadow-[0_16px_40px_rgba(15,23,42,0.08)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.company}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shrink-0`}
                  >
                    <span className="text-white font-bold text-sm">{item.initial}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.company}</p>
                    <p className="text-xs text-[#64748B]">{item.role}</p>
                  </div>
                </div>

                <p className="text-lg md:text-xl text-[#334155] leading-relaxed">&quot;{item.text}&quot;</p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#1D4ED8]">
                    {item.impact}
                  </span>
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border border-[#10B981]/25 bg-[#10B981]/10 text-[#0F766E]">
                    {item.period}
                  </span>
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#B45309]">
                    ★★★★★
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="border-t lg:border-t-0 lg:border-l border-border bg-slate-50/70 p-5 md:p-6">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#64748B] mb-3">
              {t('socialProof.testimonialsBlock.casesLabel')}
            </p>
            <div className="space-y-2">
              {testimonials.map((row, i) => {
                const on = i === active;
                return (
                  <button
                    key={`${row.company}-${i}`}
                    onClick={() => setActive(i)}
                    className={`w-full text-left rounded-xl border px-3.5 py-3 transition-all duration-200 ${
                      on
                        ? 'bg-white border-[#3B82F6]/30 shadow-sm'
                        : 'bg-white/75 border-slate-200 hover:border-[#3B82F6]/20'
                    }`}
                    aria-pressed={on}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className={`text-sm ${on ? 'font-semibold text-foreground' : 'text-[#475569]'}`}>
                        {row.company}
                      </span>
                      <span className="text-xs tabular-nums text-[#64748B]">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-1">{row.role}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Нижняя левая точка графика (0 по осям) в координатах 0–100 (как left/top у кружков) */
const ORIGIN = { x: 8, y: 88 } as const;

type Case = {
  icon: LucideIcon;
  title: string;
  problem: string;
  effect: string;
  color: string;
  plotX: number;
  plotY: number;
  impactPercent: string;
  mvpWeeks: string;
};

type SegmentKey = 'small' | 'mid' | 'large';

const SEGMENT_ORDER: SegmentKey[] = ['small', 'mid', 'large'];
const SEGMENT_LABEL_KEYS = ['segmentSmall', 'segmentMid', 'segmentLarge'] as const;

const ICONS_BY_SEGMENT: Record<SegmentKey, LucideIcon[]> = {
  small: [Flower2, GraduationCap, HeartPulse, Megaphone, ShoppingBag],
  mid: [Users, Building, Shirt, Wrench, BriefcaseBusiness],
  large: [BarChart3, Headphones, Factory, BookOpen, Network],
};

export function SocialProofSection() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const lineGradId = useId().replace(/:/g, '');
  const [active, setActive] = useState(0);
  const [activeCase, setActiveCase] = useState(0);

  const segments = useMemo(() => {
    return SEGMENT_ORDER.map((segKey, i) => {
      const raw = t(`socialProof.segmentData.${segKey}`, { returnObjects: true }) as Record<string, unknown>[] | unknown;
      const rows = Array.isArray(raw) ? raw : [];
      const icons = ICONS_BY_SEGMENT[segKey];
      const cases: Case[] = rows.map((row, idx) => {
        const r = row as Record<string, unknown>;
        return {
          icon: icons[idx] ?? Flower2,
          title: String(r.title ?? ''),
          problem: String(r.problem ?? ''),
          effect: String(r.effect ?? ''),
          color: String(r.color ?? '#64748B'),
          plotX: Number(r.plotX ?? 0),
          plotY: Number(r.plotY ?? 0),
          impactPercent: String(r.impactPercent ?? ''),
          mvpWeeks: String(r.mvpWeeks ?? ''),
        };
      });
      return { labelKey: SEGMENT_LABEL_KEYS[i], cases };
    });
  }, [t]);

  const current = segments[active];
  const activeItem = current.cases[activeCase];
  const lineKey = `${active}-${activeCase}-${activeItem.plotX}-${activeItem.plotY}`;

  useEffect(() => {
    setActiveCase(0);
  }, [active]);

  function scrollToContact() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  function scrollToPricing() {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <TestimonialsBlock />

        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            {t('socialProof.homeMap.title')}
          </h2>
          <p className="mt-2 text-[#64748B] max-w-2xl mx-auto">{t('socialProof.homeMap.subtitle')}</p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 md:p-6 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
            {segments.map((seg, idx) => (
              <button
                key={seg.labelKey}
                type="button"
                onClick={() => setActive(idx)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === idx
                    ? 'bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white shadow-[0_6px_16px_rgba(59,130,246,0.25)]'
                    : 'bg-slate-100 text-[#64748B] hover:text-foreground'
                }`}
              >
                {t(`socialProof.homeMap.${seg.labelKey}`)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-4">
            <div className="rounded-2xl border border-border bg-white p-4 md:p-5 flex flex-col">
              <div className="flex flex-col sm:flex-row gap-4 min-h-0">
                <aside className="sm:w-28 shrink-0 flex flex-row sm:flex-col items-center justify-center sm:justify-center gap-2 sm:gap-1 rounded-xl border border-slate-200/90 bg-slate-50/80 px-3 py-3 sm:py-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#64748B] text-center">
                    {t('socialProof.homeMap.impactLabel')}
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={lineKey}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent text-center tabular-nums leading-tight"
                    >
                      {activeItem.impactPercent}
                    </motion.p>
                  </AnimatePresence>
                </aside>

                <div className="relative flex-1 min-h-[300px] sm:min-h-[320px] rounded-xl bg-[linear-gradient(180deg,#F8FAFC_0%,#F1F5F9_100%)] border border-slate-200/80 overflow-hidden">
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-0"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient id={lineGradId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#94A3B8" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                    <motion.line
                      key={lineKey}
                      x1={ORIGIN.x}
                      y1={ORIGIN.y}
                      x2={activeItem.plotX}
                      y2={activeItem.plotY}
                      stroke={`url(#${lineGradId})`}
                      strokeWidth={0.65}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 1 : 0.35 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  </svg>

                  <div className="absolute inset-x-3 top-3 flex justify-between text-[10px] text-[#64748B] uppercase tracking-wider z-[1] pointer-events-none">
                    <span>{t('socialProof.homeMap.axisTopLeft')}</span>
                    <span>{t('socialProof.homeMap.axisTopRight')}</span>
                  </div>
                  <div className="absolute inset-x-10 bottom-8 h-px bg-slate-300 z-[1] pointer-events-none" />
                  <div className="absolute left-8 top-10 bottom-10 w-px bg-slate-300 z-[1] pointer-events-none" />
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[11px] text-[#64748B] z-[1] pointer-events-none whitespace-nowrap">
                    {t('socialProof.homeMap.axisLeft')}
                  </span>
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] text-[#64748B] z-[1] pointer-events-none">
                    {t('socialProof.homeMap.axisBottom')}
                  </span>

                  <div
                    className="absolute z-[2] w-2.5 h-2.5 rounded-full bg-white border-2 border-slate-400 shadow-sm"
                    style={{
                      left: `${ORIGIN.x}%`,
                      top: `${ORIGIN.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    aria-label={t('socialProof.homeMap.originLabel')}
                  />

                  {current.cases.map((item, idx) => {
                    const isActive = idx === activeCase;
                    return (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => setActiveCase(idx)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                          isActive
                            ? 'z-[5] w-9 h-9 sm:w-10 sm:h-10 shadow-[0_0_0_4px_rgba(59,130,246,0.14)]'
                            : 'z-[3] w-6 h-6 sm:w-7 sm:h-7'
                        }`}
                        style={{
                          left: `${item.plotX}%`,
                          top: `${item.plotY}%`,
                          borderColor: isActive ? item.color : 'rgba(148,163,184,0.8)',
                          background: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.95)',
                        }}
                        aria-label={item.title}
                        aria-pressed={isActive}
                      >
                        <item.icon style={{ color: item.color, width: 16, height: 16 }} className="shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200/90 text-center">
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#64748B] mb-1">
                  {t('socialProof.homeMap.mvpLabel')}
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={lineKey}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm md:text-base font-semibold text-foreground"
                  >
                    {activeItem.mvpWeeks}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${active}-${activeCase}`}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                className="rounded-2xl border border-border bg-white p-5 flex flex-col"
              >
                <p className="text-[11px] uppercase tracking-[0.15em] text-[#64748B] mb-2">
                  {t('socialProof.homeMap.activeCase')}
                </p>
                <h3 className="text-lg font-bold text-foreground mb-3">{activeItem.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{activeItem.problem}</p>
                <p className="mt-3 text-sm font-semibold text-[#0F766E]">{activeItem.effect}</p>
                <div className="mt-auto pt-5">
                  <button
                    type="button"
                    onClick={scrollToContact}
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    {t('socialProof.homeMap.ctaPanel')}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={scrollToContact}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold text-sm transition-opacity hover:opacity-90"
          >
            {t('socialProof.homeMap.ctaPrimary')}
          </button>
          <button
            type="button"
            onClick={scrollToPricing}
            className="ml-3 inline-flex items-center justify-center px-6 py-3 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:bg-muted transition-colors"
          >
            {t('socialProof.homeMap.ctaSecondary')}
          </button>
          <p className="mt-2 text-xs text-[#64748B] max-w-sm mx-auto">{t('socialProof.homeMap.ctaFooter')}</p>
          <p className="mt-4 text-xs text-[#475569]">{t('socialProof.homeMap.footerNote')}</p>
        </div>
      </div>
    </section>
  );
}
