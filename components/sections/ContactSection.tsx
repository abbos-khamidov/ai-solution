'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Send, Check, Loader2, MessageCircle } from 'lucide-react';
import { contactSchema } from '@/lib/schema/contact';
import { analytics } from '@/lib/analytics';

const formSchema = contactSchema;
type FormValues = z.infer<typeof formSchema>;

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', message: '', website: '' },
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        gsap.set([headingRef.current, formRef.current], { opacity: 1, y: 0 });
        return;
      }
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        opacity: 0,
        y: 28,
        duration: 0.6,
        ease: 'power3.out',
      });
      gsap.from(formRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        opacity: 0,
        y: 24,
        duration: 0.6,
        delay: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: FormValues) => {
    setSubmitStatus('idle');
    analytics.formSubmit('contact');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message || undefined,
          website: data.website || '',
        }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || 'Ошибка отправки');
      }
      setSubmitStatus('success');
      analytics.formSuccess('contact');
      reset();
    } catch (error) {
      setSubmitStatus('error');
      analytics.formError('contact', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[var(--background-secondary)] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--primary)] rounded-full blur-[250px] opacity-[0.04]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4">
        <div ref={headingRef} className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            <span className="text-[var(--foreground)]">Let's talk about your project</span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)] max-w-xl mx-auto px-4">
            Share a bit about what you're working on. We'll get back to you within a few hours.
          </p>
        </div>

        <div ref={formRef}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl p-4 sm:p-6 md:p-8 border border-[var(--border)] bg-[var(--card)] relative overflow-hidden"
          >
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute left-[9999px] w-0 h-0 opacity-0"
              {...register('website')}
            />

            {submitStatus === 'success' && (
              <div className="absolute inset-0 bg-[var(--background)]/95 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
                <div className="text-center px-6">
                  <div className="w-16 h-16 rounded-full bg-[var(--primary)] flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-[var(--primary-foreground)]" aria-hidden />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Message sent</h3>
                  <p className="text-[var(--muted-foreground)]">We'll review and respond within a few hours</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <p className="text-[var(--destructive)] text-sm mb-4" role="alert">
                Something went wrong. Try our Telegram below.
              </p>
            )}

              <div className="space-y-4 sm:space-y-5">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--card-foreground)] mb-2">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-[var(--border)] bg-[var(--input-background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] text-sm sm:text-base"
                  placeholder="Your name"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-[var(--destructive)]">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--card-foreground)] mb-2">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-[var(--border)] bg-[var(--input-background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] text-sm sm:text-base"
                  placeholder="your@email.com"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-[var(--destructive)]">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--card-foreground)] mb-2">
                  Quick note <span className="text-[var(--muted-foreground)] font-normal text-xs sm:text-sm">(optional, max 200 chars)</span>
                </label>
                <input
                  id="contact-message"
                  type="text"
                  maxLength={200}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-[var(--border)] bg-[var(--input-background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] text-sm sm:text-base"
                  placeholder="What would you like to discuss?"
                  {...register('message')}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-[var(--destructive)]">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 sm:py-4 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin" aria-hidden />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 sm:w-5 h-4 sm:h-5" aria-hidden />
                    <span>Send message</span>
                  </>
                )}
              </button>

              <div className="pt-3 sm:pt-4 border-t border-[var(--border)]">
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)] text-center mb-3">
                  Prefer instant messaging?
                </p>
                <a
                  href="https://t.me/adams_ai_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.ctaClick('telegram-contact')}
                  className="w-full py-2.5 sm:py-3 rounded-full border border-[var(--border)] bg-[var(--background)]/50 text-[var(--foreground)] font-medium hover:border-[var(--primary)]/40 hover:bg-[var(--background)]/70 transition-all flex items-center justify-center gap-2 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] text-sm sm:text-base"
                >
                  <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5" aria-hidden />
                  <span>Message us on Telegram</span>
                </a>
              </div>

              <p className="text-xs text-[var(--muted-foreground)] text-center pt-2">
                We typically respond within 2-3 hours during business hours. Your information is kept private —{' '}
                <a href="/confidential" className="text-[var(--primary)] hover:underline">
                  privacy policy
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
