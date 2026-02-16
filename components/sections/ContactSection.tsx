'use client';

/**
 * Contact Section - CTA with gradient background and glass form (i18n enabled)
 */

import React, { useState } from 'react';
import { ArrowRight, Mail, MessageSquare, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { MagneticButton } from '@/components/animations/MagneticButton';

export function ContactSection() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          consent: true,
          service: 'contact',
          source: 'contact-section',
          website: '',
        }),
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }
      setFormData({ name: '', email: '', company: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative section-container py-section bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - CTA content */}
          <ScrollReveal direction="left" duration={0.8}>
            <div>
              <p className="text-sm font-semibold text-[#0066FF] tracking-wider uppercase mb-3">
                {t('contact.label')}
              </p>
              <h2 className="text-display text-[#0F1419] mb-6">
                {t('contact.title')}<br />
                {t('contact.titleLine2')} <span className="text-gradient">{t('contact.titleHighlight')}</span>?
              </h2>
              <p className="text-body-lg text-[#536471] mb-8 leading-relaxed">
                {t('contact.subtitle')}
              </p>

              {/* Contact methods */}
              <div className="space-y-4">
                <a
                  href={`mailto:${t('contact.email')}`}
                  className="flex items-center gap-3 text-[#536471] hover:text-[#0066FF] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[rgba(0,102,255,0.06)] flex items-center justify-center group-hover:bg-[rgba(0,102,255,0.1)] transition-colors">
                    <Mail className="w-4 h-4 text-[#0066FF]" />
                  </div>
                  <span className="text-body">{t('contact.email')}</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-[#536471] hover:text-[#0066FF] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[rgba(0,102,255,0.06)] flex items-center justify-center group-hover:bg-[rgba(0,102,255,0.1)] transition-colors">
                    <MessageSquare className="w-4 h-4 text-[#0066FF]" />
                  </div>
                  <span className="text-body">{t('contact.schedule')}</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Contact form */}
          <ScrollReveal direction="right" duration={0.8} delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="glass-card bg-white/80 rounded-2xl p-8 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#0F1419] mb-1.5">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('contact.form.namePlaceholder')}
                    className="w-full px-4 py-3 rounded-xl bg-[#F0F2F5] border border-transparent text-[#0F1419] placeholder:text-[#8899A6] focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 outline-none transition-all text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0F1419] mb-1.5">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('contact.form.emailPlaceholder')}
                    className="w-full px-4 py-3 rounded-xl bg-[#F0F2F5] border border-transparent text-[#0F1419] placeholder:text-[#8899A6] focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 outline-none transition-all text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0F1419] mb-1.5">
                  {t('contact.form.company')}
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder={t('contact.form.companyPlaceholder')}
                  className="w-full px-4 py-3 rounded-xl bg-[#F0F2F5] border border-transparent text-[#0F1419] placeholder:text-[#8899A6] focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0F1419] mb-1.5">
                  {t('contact.form.message')}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t('contact.form.messagePlaceholder')}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-[#F0F2F5] border border-transparent text-[#0F1419] placeholder:text-[#8899A6] focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 outline-none transition-all text-sm resize-none"
                  required
                />
              </div>
              <MagneticButton strength={0.15} radius={80} className="w-full">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00D9FF] shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-offset-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('contact.form.submitting')}
                    </span>
                  ) : (
                    <>
                      {t('contact.form.submit')}
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </MagneticButton>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
