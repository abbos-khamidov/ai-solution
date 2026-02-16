'use client';

/**
 * Hero Section - Premium AI Company Landing (i18n enabled)
 * Two-column layout: Left = title/subtitle/CTA, Right = lead capture card
 *
 * Animation Timeline:
 * 0.0s - Gradient background fades in
 * 0.2s - Background morphing shapes float up
 * 0.4s - Title words stagger reveal with Y-rotation
 * 0.8s - Subtitle fades up
 * 1.0s - CTA buttons scale in
 * 1.2s - Form card slides in from right
 * 1.4s - Floating elements appear
 */

import React, { useRef, useState } from 'react';
import { ArrowRight, Sparkles, Phone, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';
import PhoneInput from 'react-phone-number-input';
import { toast } from 'sonner';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { AnimatedText } from '@/components/animations/AnimatedText';
import { useGSAPContext } from '@/components/animations/useGSAPContext';

import 'react-phone-number-input/style.css';

// ─── Form Schema ─────────────────────────────────────────────
function createLeadSchema(t: (key: string) => string) {
  return z.object({
    phone: z
      .string({ required_error: t('hero.callback.phoneRequired') })
      .min(1, t('hero.callback.phoneRequired'))
      .refine((val) => isValidPhoneNumber(val), {
        message: t('hero.callback.phoneInvalid'),
      }),
    consent: z.literal(true, {
      errorMap: () => ({ message: t('hero.callback.consentRequired') }),
    }),
  });
}

type LeadFormData = z.infer<ReturnType<typeof createLeadSchema>>;

// ─── Hero Component ──────────────────────────────────────────
export function Hero() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgShapesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  const [submitted, setSubmitted] = useState(false);

  const schema = createLeadSchema(t);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(schema),
    defaultValues: { phone: '', consent: false as unknown as true },
  });

  const onSubmit = async (data: LeadFormData) => {
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: data.phone,
          language: i18n.language,
        }),
      });

      if (!res.ok) throw new Error('Request failed');

      setSubmitted(true);
      toast.success(t('hero.callback.successTitle'), {
        description: t('hero.callback.successMessage'),
      });
      reset();
    } catch {
      toast.error(t('hero.callback.errorMessage'));
    }
  };

  // Main entrance timeline
  useGSAPContext(
    (gsap, container) => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      // 0.0s - Background shapes fade in and float
      if (bgShapesRef.current) {
        const shapes = bgShapesRef.current.children;
        tl.fromTo(
          shapes,
          { opacity: 0, scale: 0.8, y: 60 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, stagger: 0.15 },
          0
        );
      }

      // Grid lines fade in
      if (gridRef.current) {
        tl.fromTo(
          gridRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.5 },
          0
        );
      }

      // 0.3s - Badge slides down
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: -20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          0.3
        );
      }

      // 0.8s - Subtitle fades up
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.8
        );
      }

      // 1.0s - CTA buttons scale in
      if (ctaRef.current) {
        const buttons = ctaRef.current.children;
        tl.fromTo(
          buttons,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
          1.0
        );
      }

      // 1.2s - Form card slides in
      if (formCardRef.current) {
        tl.fromTo(
          formCardRef.current,
          { opacity: 0, x: 40, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
          1.2
        );
      }

      // Parallax on background shapes during scroll
      if (bgShapesRef.current) {
        const shapes = Array.from(bgShapesRef.current.children);
        shapes.forEach((shape, i) => {
          gsap.to(shape, {
            y: (i + 1) * -50,
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        });
      }
    },
    { scope: sectionRef as React.RefObject<HTMLElement> }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ zIndex: 'var(--z-content)' }}
    >
      {/* === BACKGROUND LAYER (z-0) === */}

      {/* Gradient base */}
      <div
        className="absolute inset-0 bg-gradient-hero"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />

      {/* Subtle grid pattern */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-0"
        style={{
          zIndex: 1,
          backgroundImage: `
            linear-gradient(rgba(0,102,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,102,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Morphing gradient shapes */}
      <div
        ref={bgShapesRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      >
        {/* Shape 1 - Large blue blob top-right */}
        <div
          className="absolute -top-20 -right-20 w-[600px] h-[600px] animate-morph opacity-0"
          style={{
            background:
              'radial-gradient(circle, rgba(0,102,255,0.08) 0%, rgba(0,102,255,0.02) 50%, transparent 70%)',
            filter: 'blur(40px)',
            transform: 'translate3d(0,0,0)',
          }}
        />
        {/* Shape 2 - Cyan blob bottom-left */}
        <div
          className="absolute -bottom-32 -left-20 w-[500px] h-[500px] animate-morph animation-delay-2000 opacity-0"
          style={{
            background:
              'radial-gradient(circle, rgba(0,217,255,0.06) 0%, rgba(0,217,255,0.02) 50%, transparent 70%)',
            filter: 'blur(50px)',
            transform: 'translate3d(0,0,0)',
          }}
        />
        {/* Shape 3 - Small accent mid */}
        <div
          className="absolute top-1/3 left-1/4 w-[300px] h-[300px] animate-morph animation-delay-4000 opacity-0"
          style={{
            background:
              'radial-gradient(circle, rgba(0,102,255,0.05) 0%, transparent 70%)',
            filter: 'blur(60px)',
            transform: 'translate3d(0,0,0)',
          }}
        />
        {/* Rotating gradient ring */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] animate-spin-slow opacity-0"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0%, rgba(0,102,255,0.04) 25%, transparent 50%, rgba(0,217,255,0.03) 75%, transparent 100%)',
            borderRadius: '50%',
            filter: 'blur(30px)',
            transform: 'translate3d(-50%,-50%,0)',
          }}
        />
      </div>

      {/* === CONTENT LAYER (z-10) === */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ── LEFT SIDE: Title, Subtitle, CTAs ── */}
          <div className="flex-1 text-center lg:text-left">
            {/* Status badge */}
            <div ref={badgeRef} className="mb-8 opacity-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-black/[0.06] shadow-subtle">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#0066FF] opacity-20" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066FF]" />
                </span>
                <span className="text-sm font-medium text-[#536471]">
                  {t('hero.badge')}
                </span>
              </div>
            </div>

            {/* Main Title - 3D word reveal */}
            <AnimatedText
              text={t('hero.title')}
              as="h1"
              splitBy="words"
              reveal="rotate-y"
              duration={0.8}
              stagger={0.06}
              delay={0.4}
              ease="power3.out"
              className="text-display-xl md:text-[5.5rem] leading-[1.08] tracking-tight font-bold text-[#0F1419] mb-6 max-w-3xl"
            />

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-body-lg md:text-xl text-[#536471] max-w-2xl mb-10 opacity-0 leading-relaxed"
            >
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
            >
              <MagneticButton strength={0.25} radius={120} className="opacity-0">
                <a
                  href="#contact"
                  className="relative inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00D9FF] shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-offset-2"
                >
                  {t('hero.cta')}
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </a>
              </MagneticButton>

              <MagneticButton strength={0.2} radius={100} className="opacity-0">
                <a
                  href="#solutions"
                  className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-[#0F1419] rounded-xl bg-white border border-black/[0.08] shadow-card hover:shadow-card-hover transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-offset-2"
                >
                  {t('hero.ctaSecondary')}
                  <Sparkles className="w-5 h-5 shrink-0 text-[#0066FF]" />
                </a>
              </MagneticButton>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm text-[#8899A6]">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <span>{t('hero.trust.soc2')}</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-black/10" />
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
                <span>{t('hero.trust.enterprise')}</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-black/10" />
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                </div>
                <span>{t('hero.trust.uptime')}</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDE: Lead Capture Card ── */}
          <div
            ref={formCardRef}
            className="w-full lg:w-auto opacity-0"
            style={{ maxWidth: 450 }}
          >
            <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">
              {!submitted ? (
                <>
                  {/* Card header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00D9FF] flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0F1419]">
                      {t('hero.callback.heading')}
                    </h3>
                  </div>

                  {/* Timer badge */}
                  <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-lg bg-blue-50 border border-blue-100">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </div>
                    <span className="text-sm font-medium text-[#0066FF]">
                      {t('hero.trust.enterprise')}
                    </span>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-5">
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <PhoneInput
                            {...field}
                            international
                            defaultCountry="UZ"
                            placeholder={t('hero.callback.phonePlaceholder')}
                            className="hero-phone-input"
                          />
                        )}
                      />
                      {errors.phone && (
                        <p className="mt-2 text-sm text-red-500 font-medium">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Consent checkbox */}
                    <div className="mb-5">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <Controller
                          name="consent"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="checkbox"
                              checked={field.value === true}
                              onChange={(e) => field.onChange(e.target.checked ? true : false)}
                              className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#0066FF] focus:ring-[#0066FF] accent-[#0066FF]"
                            />
                          )}
                        />
                        <span className="text-xs text-[#536471] leading-relaxed">
                          {t('hero.callback.consent')}{' '}
                          <a href="/privacy" className="text-[#0066FF] hover:underline">
                            {t('hero.callback.privacyLink')}
                          </a>
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="mt-1 text-sm text-red-500 font-medium">
                          {errors.consent.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00D9FF] shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-offset-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          {t('hero.callback.submitting')}
                        </>
                      ) : (
                        <>
                          <Phone className="w-5 h-5" />
                          {t('hero.callback.submit')}
                        </>
                      )}
                    </button>
                  </form>

                  {/* Trust micro-text */}
                  <p className="mt-4 text-xs text-center text-[#8899A6]">
                    {t('hero.trust.soc2')} &middot; {t('hero.trust.uptime')}
                  </p>
                </>
              ) : (
                /* ── Success State ── */
                <div className="text-center py-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F1419] mb-2">
                    {t('hero.callback.successTitle')}
                  </h3>
                  <p className="text-[#536471] mb-6">
                    {t('hero.callback.successMessage')}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-sm font-medium text-[#0066FF] hover:underline"
                  >
                    {t('hero.callback.submit')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-[#8899A6] animate-pulse-glow">
          <span className="text-xs font-medium tracking-wider uppercase">
            {t('scroll')}
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-black/10 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-[#0066FF]/40 animate-float" />
          </div>
        </div>
      </div>
    </section>
  );
}
