'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Brain,
  Database,
  MessageSquare,
  ArrowUpRight,
  Link2,
  BarChart3,
  LayoutGrid,
  Shield,
  Check,
  Users,
  ShieldCheck,
  Phone,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { BackButton } from '@/components/shared/BackButton';
import { FAQAccordion } from '@/components/shared/FAQAccordion';
import { PricingToggle } from '@/components/shared/PricingToggle';
import { CounterAnimation } from '@/components/shared/CounterAnimation';

// ─── Scroll-reveal hook ──────────────────────────────────────
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// ─── Constants ───────────────────────────────────────────────
const featureIcons = [
  Brain,
  Database,
  MessageSquare,
  ArrowUpRight,
  Link2,
  BarChart3,
  LayoutGrid,
  Shield,
];

const T = 'services.aiManagers.detail';

// ─── Form schema ─────────────────────────────────────────────
const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(5),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

// ─── Component ───────────────────────────────────────────────
export default function AIManagersContent() {
  const { t, i18n } = useTranslation();
  const [isAnnual, setIsAnnual] = useState(false);

  // i18n data
  const features = t(`${T}.features.items`, { returnObjects: true }) as {
    title: string;
    description: string;
    benefits: string[];
  }[];
  const steps = t(`${T}.howItWorks.steps`, { returnObjects: true }) as {
    title: string;
    description: string;
    duration: string;
  }[];
  const case1 = t(`${T}.caseStudies.case1`, { returnObjects: true }) as Record<string, unknown>;
  const case2 = t(`${T}.caseStudies.case2`, { returnObjects: true }) as Record<string, unknown>;
  const faqItems = t(`${T}.faq.items`, { returnObjects: true }) as {
    question: string;
    answer: string;
  }[];
  const pBasic = t(`${T}.pricing.basic`, { returnObjects: true }) as Record<string, unknown>;
  const pAdv = t(`${T}.pricing.advanced`, { returnObjects: true }) as Record<string, unknown>;
  const pEnt = t(`${T}.pricing.enterprise`, { returnObjects: true }) as Record<string, unknown>;

  // Form
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, service: 'ai-managers', language: i18n.language }),
      });
      if (!res.ok) throw new Error();
      toast.success(t(`${T}.cta.form.submit`));
      reset();
    } catch {
      toast.error('Error');
    }
  };

  // Scroll reveals
  const featuresReveal = useScrollReveal(0.1);
  const timelineReveal = useScrollReveal(0.1);
  const pricingReveal = useScrollReveal(0.1);
  const casesReveal = useScrollReveal(0.1);

  return (
    <div className="min-h-screen bg-white">
      {/* ════════════════════════════════════════════════════════
          SECTION 1 — HERO
          ════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white min-h-[60vh] flex items-center overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 py-24 w-full">
          {/* Back button */}
          <BackButton
            href="/#solutions"
            label={t(`${T}.hero.back`)}
            className="text-white/90 hover:text-white mb-8"
          />

          {/* Breadcrumb */}
          <Breadcrumb
            className="text-white/80 mb-8"
            items={[
              { label: t(`${T}.hero.breadcrumbHome`), href: '/' },
              { label: t(`${T}.hero.breadcrumbServices`) },
              { label: t(`${T}.hero.breadcrumbCurrent`) },
            ]}
          />

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl leading-tight">
            {t(`${T}.hero.title`)}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed">
            {t(`${T}.hero.subtitle`)}
          </p>

          {/* CTA */}
          <Link
            href="#cta-form"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            {t(`${T}.hero.cta`)}
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 mt-10 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{t(`${T}.hero.trustClients`)}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>{t(`${T}.hero.trustUptime`)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{t(`${T}.hero.trustSupport`)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 2 — FEATURES DEEP DIVE
          ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            {t(`${T}.features.title`)}
          </h2>

          <div
            ref={featuresReveal.ref}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12"
          >
            {Array.isArray(features) &&
              features.map((feature, idx) => {
                const Icon = featureIcons[idx] ?? Brain;
                return (
                  <div
                    key={idx}
                    className="flex gap-5 transition-all duration-500"
                    style={{
                      opacity: featuresReveal.isVisible ? 1 : 0,
                      transform: featuresReveal.isVisible
                        ? 'translateY(0)'
                        : 'translateY(40px)',
                      transitionDelay: `${idx * 100}ms`,
                    }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {Array.isArray(feature.benefits) &&
                          feature.benefits.map((b, bIdx) => (
                            <li
                              key={bIdx}
                              className="flex items-center gap-2 text-gray-600 text-sm"
                            >
                              <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                              {b}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 3 — HOW IT WORKS TIMELINE
          ════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-[900px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-20 text-gray-900">
            {t(`${T}.howItWorks.title`)}
          </h2>

          <div ref={timelineReveal.ref} className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-10 top-0 bottom-0 w-1 bg-blue-200 origin-top transition-transform duration-[1500ms] ease-out"
              style={{
                transform: timelineReveal.isVisible ? 'scaleY(1)' : 'scaleY(0)',
              }}
            />

            <div className="space-y-12">
              {Array.isArray(steps) &&
                steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="relative flex items-start gap-8 pl-0"
                    style={{
                      opacity: timelineReveal.isVisible ? 1 : 0,
                      transform: timelineReveal.isVisible
                        ? 'translateY(0) scale(1)'
                        : 'translateY(20px) scale(0.95)',
                      transition: `all 500ms ease-out`,
                      transitionDelay: `${300 + idx * 200}ms`,
                    }}
                  >
                    {/* Step circle */}
                    <div className="flex-shrink-0 w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/20 z-10">
                      {idx + 1}
                    </div>

                    {/* Content */}
                    <div className="pt-3">
                      <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 mb-3 leading-relaxed">
                        {step.description}
                      </p>
                      <span className="inline-block text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                        {step.duration}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 4 — PRICING
          ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            {t(`${T}.pricing.title`)}
          </h2>
          <p className="text-xl text-gray-600 text-center mb-8">
            {t(`${T}.pricing.subtitle`)}
          </p>

          <PricingToggle
            isAnnual={isAnnual}
            onToggle={() => setIsAnnual(!isAnnual)}
            monthlyLabel={t(`${T}.pricing.monthly`)}
            annualLabel={t(`${T}.pricing.annual`)}
            discountText={t(`${T}.pricing.annualDiscount`)}
          />

          <div
            ref={pricingReveal.ref}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {/* Basic */}
            {pBasic && typeof pBasic === 'object' && (
              <div
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 transition-all duration-500"
                style={{
                  opacity: pricingReveal.isVisible ? 1 : 0,
                  transform: pricingReveal.isVisible ? 'scale(1)' : 'scale(0.95)',
                  transitionDelay: '0ms',
                }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {pBasic.name as string}
                </h3>
                <p className="text-5xl font-bold text-blue-600 mb-1">
                  {isAnnual ? (pBasic.priceAnnual as string) : (pBasic.price as string)}
                </p>
                <p className="text-gray-600 mb-6">{t(`${T}.pricing.perMonth`)}</p>
                <ul className="space-y-3 mb-8">
                  {Array.isArray(pBasic.features) &&
                    (pBasic.features as string[]).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                </ul>
                <Link
                  href="#cta-form"
                  className="block text-center w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  {t(`${T}.pricing.choosePlan`)} Basic
                </Link>
              </div>
            )}

            {/* Advanced (highlighted) */}
            {pAdv && typeof pAdv === 'object' && (
              <div
                className="relative bg-white border-4 border-blue-600 rounded-2xl p-8 shadow-xl transition-all duration-500"
                style={{
                  opacity: pricingReveal.isVisible ? 1 : 0,
                  transform: pricingReveal.isVisible ? 'scale(1)' : 'scale(0.95)',
                  transitionDelay: '150ms',
                }}
              >
                <span className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {t(`${T}.pricing.popular`)}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {pAdv.name as string}
                </h3>
                <p className="text-5xl md:text-6xl font-bold text-blue-600 mb-1">
                  {isAnnual ? (pAdv.priceAnnual as string) : (pAdv.price as string)}
                </p>
                <p className="text-gray-600 mb-6">{t(`${T}.pricing.perMonth`)}</p>
                <ul className="space-y-3 mb-8">
                  {Array.isArray(pAdv.features) &&
                    (pAdv.features as string[]).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                </ul>
                <Link
                  href="#cta-form"
                  className="block text-center w-full py-3 bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white rounded-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {t(`${T}.pricing.choosePlan`)} Advanced
                </Link>
              </div>
            )}

            {/* Enterprise */}
            {pEnt && typeof pEnt === 'object' && (
              <div
                className="bg-white border-2 border-gray-300 rounded-2xl p-8 transition-all duration-500"
                style={{
                  opacity: pricingReveal.isVisible ? 1 : 0,
                  transform: pricingReveal.isVisible ? 'scale(1)' : 'scale(0.95)',
                  transitionDelay: '300ms',
                }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {pEnt.name as string}
                </h3>
                <p className="text-5xl font-bold text-blue-600 mb-1">
                  {pEnt.price as string}
                </p>
                <p className="text-gray-600 mb-6">{pEnt.priceNote as string}</p>
                <ul className="space-y-3 mb-8">
                  {Array.isArray(pEnt.features) &&
                    (pEnt.features as string[]).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                </ul>
                <Link
                  href="#cta-form"
                  className="block text-center w-full py-3 border-2 border-gray-400 text-gray-700 rounded-lg font-semibold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300"
                >
                  {t(`${T}.pricing.contactUs`)}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 5 — CASE STUDIES
          ════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            {t(`${T}.caseStudies.title`)}
          </h2>

          <div ref={casesReveal.ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {[case1, case2].map((cs, cIdx) => {
              if (!cs || typeof cs !== 'object') return null;
              const metrics = cs.metrics as {
                value: number;
                suffix: string;
                label: string;
                change: string;
              }[];
              return (
                <div
                  key={cIdx}
                  className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg transition-all duration-500"
                  style={{
                    opacity: casesReveal.isVisible ? 1 : 0,
                    transform: casesReveal.isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: `${cIdx * 200}ms`,
                  }}
                >
                  {/* Client */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-[120px] h-10 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500 font-medium">
                      {cs.client as string}
                    </div>
                    <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded font-medium">
                      {cs.industry as string}
                    </span>
                  </div>

                  {/* Challenge */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {cs.challengeTitle as string}
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {cs.challenge as string}
                  </p>

                  {/* Solution */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {cs.solutionTitle as string}
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {cs.solution as string}
                  </p>

                  {/* Results */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {cs.resultsTitle as string}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Array.isArray(metrics) &&
                      metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="bg-gray-50 rounded-xl p-4 text-center"
                        >
                          <CounterAnimation
                            target={m.value}
                            suffix={m.suffix}
                            className="text-3xl md:text-4xl font-bold text-blue-600"
                          />
                          <p className="text-sm text-gray-600 mt-1">{m.label}</p>
                          <p className="text-xs text-green-600 font-medium mt-1 flex items-center justify-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {m.change}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 6 — FAQ
          ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[900px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            {t(`${T}.faq.title`)}
          </h2>
          {Array.isArray(faqItems) && <FAQAccordion items={faqItems} />}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 7 — FINAL CTA
          ════════════════════════════════════════════════════════ */}
      <section
        id="cta-form"
        className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16 md:py-20"
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t(`${T}.cta.title`)}
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-[800px] mx-auto mb-12">
            {t(`${T}.cta.subtitle`)}
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="max-w-[600px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <input
              {...register('name')}
              placeholder={t(`${T}.cta.form.name`)}
              className="bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              {...register('email')}
              type="email"
              placeholder={t(`${T}.cta.form.email`)}
              className="bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              {...register('phone')}
              type="tel"
              placeholder={t(`${T}.cta.form.phone`)}
              className="bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <textarea
              {...register('message')}
              placeholder={t(`${T}.cta.form.message`)}
              rows={4}
              className="sm:col-span-2 bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white resize-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="sm:col-span-2 bg-white text-blue-600 w-full py-4 rounded-lg font-semibold hover:shadow-2xl transition-all duration-300 disabled:opacity-60"
            >
              {isSubmitting
                ? t(`${T}.cta.form.submitting`)
                : t(`${T}.cta.form.submit`)}
            </button>
          </form>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-10 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{t(`${T}.cta.trustClients`)}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>{t(`${T}.cta.trustQuality`)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{t(`${T}.cta.trustFree`)}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
