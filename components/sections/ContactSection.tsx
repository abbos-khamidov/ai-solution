'use client';

import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export function ContactSection() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), contact: contact.trim() }),
      });
    } catch {
      // fail silently — user still sees success
    }
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#05050A]">
      <div className="max-w-2xl mx-auto px-4 md:px-6">
        <ScrollReveal duration={0.6}>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-[#64748B]">
              {t('contact.subtitle')}
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <div className="relative">
                <div className="absolute inset-0 w-16 h-16 rounded-full" style={{ background: 'rgba(34, 197, 94, 0.15)', filter: 'blur(16px)' }} />
                <CheckCircle className="relative w-16 h-16 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-[#F8FAFC]">{t('contact.successTitle')}</h3>
              <p className="text-[#94A3B8]">{t('contact.successMessage')}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 space-y-4"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div>
                <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                  {t('contact.nameLabel')}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('contact.namePlaceholder')}
                  required
                  className="w-full px-4 py-3 rounded-xl text-[#F8FAFC] placeholder-[#64748B] outline-none transition-all focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                  {t('contact.contactLabel')}
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={t('contact.contactPlaceholder')}
                  required
                  className="w-full px-4 py-3 rounded-xl text-[#F8FAFC] placeholder-[#64748B] outline-none transition-all focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !name.trim() || !contact.trim()}
                className="btn-shimmer w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span>{t('contact.sending')}</span>
                ) : (
                  <>
                    {t('contact.submit')}
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
              <p className="text-xs text-center text-[#64748B]">
                {t('contact.noSpam')}
              </p>
            </form>
          )}

          <div className="mt-8 text-center text-sm text-[#64748B]">
            {t('contact.telegramText')}{' '}
            <a href="https://t.me/aisolution_uz" className="text-[#3B82F6] font-medium hover:underline">
              @aisolution_uz
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
