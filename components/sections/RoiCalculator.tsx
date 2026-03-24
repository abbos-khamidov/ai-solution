'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

type Plan = {
  name: string;
  setupLabel: string;
  monthlyLabel: string;
  setupPrice: number;
  monthlyPrice: number;
  why: string;
  color: string;
  border: string;
  glow: string;
};

function getRecommendedPlan(leads: number, managers: number, plans: Record<'starter' | 'growth' | 'enterprise', Plan>): Plan {
  if (leads <= 50 && managers <= 2) return plans.starter;
  if (leads <= 150 && managers <= 5) return plans.growth;
  return plans.enterprise;
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-[#94A3B8] leading-snug pr-2">{label}</label>
        <span className="text-sm font-bold text-foreground shrink-0">{format(value)}</span>
      </div>
      <div className="relative h-2 rounded-full bg-slate-200/90">
        <div
          className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
          style={{ zIndex: 2 }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-md border-2 border-[#3B82F6] pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between text-xs text-[#475569] mt-1">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

function fmtUsd(n: number) {
  return '$' + n.toLocaleString('en-US');
}

function paybackLabel(days: number, t: (k: string, o?: Record<string, unknown>) => string) {
  if (days === 1) return t('roiCalculator.paybackOne');
  if (days >= 2 && days <= 4) return t('roiCalculator.paybackFew', { days });
  return t('roiCalculator.paybackMany', { days });
}

export function RoiCalculator() {
  const { t } = useTranslation();
  const [leads, setLeads] = useState(50);
  const [avgCheck, setAvgCheck] = useState(300);
  const [managers, setManagers] = useState(2);

  const PLANS = useMemo(
    (): Record<'starter' | 'growth' | 'enterprise', Plan> => ({
      starter: {
        name: 'Starter',
        setupLabel: t('roiCalculator.planSetup.starter'),
        monthlyLabel: t('roiCalculator.planMonthly.starter'),
        setupPrice: 390,
        monthlyPrice: 150,
        why: t('roiCalculator.planWhy.starter'),
        color: '#3B82F6',
        border: 'rgba(59,130,246,0.35)',
        glow: 'rgba(59,130,246,0.08)',
      },
      growth: {
        name: 'Growth',
        setupLabel: t('roiCalculator.planSetup.growth'),
        monthlyLabel: t('roiCalculator.planMonthly.growth'),
        setupPrice: 2900,
        monthlyPrice: 900,
        why: t('roiCalculator.planWhy.growth'),
        color: '#8B5CF6',
        border: 'rgba(139,92,246,0.35)',
        glow: 'rgba(139,92,246,0.08)',
      },
      enterprise: {
        name: 'Enterprise',
        setupLabel: t('roiCalculator.planSetup.enterprise'),
        monthlyLabel: t('roiCalculator.planMonthly.enterprise'),
        setupPrice: 7500,
        monthlyPrice: 2500,
        why: t('roiCalculator.planWhy.enterprise'),
        color: '#F59E0B',
        border: 'rgba(245,158,11,0.35)',
        glow: 'rgba(245,158,11,0.08)',
      },
    }),
    [t]
  );

  const { revenueLoss, managerCost, totalLoss, paybackDays, plan } = useMemo(() => {
    const revenueLoss = Math.round(leads * avgCheck * 0.3);
    const managerCost = managers * 400;
    const totalLoss = revenueLoss + managerCost;
    const plan = getRecommendedPlan(leads, managers, PLANS);
    const paybackDays =
      totalLoss > 0 ? Math.max(1, Math.round((plan.setupPrice / totalLoss) * 30)) : 30;
    return { revenueLoss, managerCost, totalLoss, paybackDays, plan };
  }, [leads, avgCheck, managers, PLANS]);

  return (
    <section className="py-12 md:py-14 bg-background">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">{t('roiCalculator.title')}</h2>
          <p className="mt-2 text-[#64748B] max-w-xl mx-auto">{t('roiCalculator.subtitle')}</p>
        </div>

        <div className="rounded-2xl p-6 md:p-8 bg-card border border-border shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-between gap-8">
              <Slider
                label={t('roiCalculator.sliderLeads')}
                value={leads}
                min={10}
                max={500}
                step={10}
                format={(v) => String(v)}
                onChange={setLeads}
              />
              <Slider
                label={t('roiCalculator.sliderCheck')}
                value={avgCheck}
                min={50}
                max={5000}
                step={50}
                format={(v) => fmtUsd(v)}
                onChange={setAvgCheck}
              />
              <Slider
                label={t('roiCalculator.sliderManagers')}
                value={managers}
                min={1}
                max={20}
                step={1}
                format={(v) => String(v)}
                onChange={setManagers}
              />
            </div>

            <div className="flex flex-col gap-3">
              <div
                className="rounded-xl p-4 flex-1"
                style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}
              >
                <p className="text-xs text-[#64748B] mb-1">{t('roiCalculator.lossRevenue')}</p>
                <p className="text-2xl font-bold text-[#F87171]">{fmtUsd(revenueLoss)}</p>
                <p className="text-xs text-[#64748B] mt-1">
                  {t('roiCalculator.lossFormula', { leads, check: fmtUsd(avgCheck) })}
                </p>
              </div>

              <div
                className="rounded-xl p-4 flex-1"
                style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}
              >
                <p className="text-xs text-[#64748B] mb-1">{t('roiCalculator.lossManagers')}</p>
                <p className="text-2xl font-bold text-[#FBBF24]">{fmtUsd(managerCost)}</p>
                <p className="text-xs text-[#64748B] mt-1">{t('roiCalculator.managersFormula', { managers })}</p>
              </div>

              <div className="rounded-xl p-4 flex-1 bg-slate-50 border border-slate-200/90">
                <p className="text-xs text-[#64748B] mb-1">{t('roiCalculator.totalLoss')}</p>
                <p className="text-3xl font-bold text-foreground">{fmtUsd(totalLoss)}</p>
              </div>

              <div
                className="rounded-xl p-4"
                style={{
                  background: plan.glow,
                  border: `1px solid ${plan.border}`,
                  transition: 'border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: `0 0 20px ${plan.glow}`,
                }}
              >
                <p className="text-xs text-[#64748B] mb-1.5">{t('roiCalculator.recommended')}</p>
                <p className="text-xl font-extrabold mb-0.5" style={{ color: plan.color, transition: 'color 0.3s ease' }}>
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-2 mb-1.5 flex-wrap">
                  <span className="text-sm font-bold text-foreground">{plan.setupLabel}</span>
                  <span className="text-xs text-[#64748B]">{t('roiCalculator.launch')}</span>
                  <span className="text-sm font-bold text-foreground">{plan.monthlyLabel}</span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{plan.why}</p>
              </div>
            </div>
          </div>

          <div
            className="mt-6 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(6,182,212,0.08))',
              border: '1px solid rgba(59,130,246,0.25)',
            }}
          >
            <div>
              <p className="text-xs text-[#1D4ED8] uppercase tracking-wide mb-1 font-semibold">{t('roiCalculator.paybackTitle')}</p>
              <p className="text-4xl font-extrabold text-foreground leading-none">{paybackLabel(paybackDays, t)}</p>
            </div>
            <Link
              href="/#contact"
              className="shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold hover:opacity-90 transition-opacity"
            >
              {t('roiCalculator.ctaAudit')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
