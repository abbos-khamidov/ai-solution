'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, Shield, Server, FileText, Clock, Phone, Mail, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

const CONTACT_EMAIL = 'info@aisolution.uz';
const CONTACT_PHONES = [
  '+998 77 061 22 00',
  '+998 95 000 00 65',
  '+998 93 949 20 00',
];
const CONTACT_TG = '@aisolution_uz';

const TRUST_ICONS = [Shield, Server, FileText, Clock] as const;
const TRUST_KEYS = ['contact.trust0', 'contact.trust1', 'contact.trust2', 'contact.trust3'] as const;

export function ContactSection() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showContacts, setShowContacts] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setError(null);
    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          contact: contact.trim(),
          business: business.trim() || undefined,
        }),
      });
      if (!response.ok) {
        throw new Error('CONTACT_REQUEST_FAILED');
      }
      setSubmitted(true);
    } catch {
      setError(t('contact.errorSubmit'));
    }
    setLoading(false);
  };

  return (
    <>
      <section id="contact" className="py-12 md:py-14 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <ScrollReveal duration={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Left column */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('contact.homeTitle')}</h2>
                <p className="text-lg text-[#94A3B8] mb-8">{t('contact.homeSubtitle')}</p>
                <div className="space-y-4">
                  {TRUST_ICONS.map((Icon, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.15)', color: '#3B82F6' }}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-sm text-[#94A3B8] pt-1.5">{t(TRUST_KEYS[idx])}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#475569] mt-4">{t('contact.parallelNote')}</p>
              </div>

              {/* Right column — form */}
              <div className="rounded-2xl p-8 bg-card border border-border shadow-sm">
                {submitted ? (
                  <div className="flex flex-col items-center gap-4 py-8 text-center">
                    <div className="relative">
                      <div className="absolute inset-0 w-16 h-16 rounded-full" style={{ background: 'rgba(34, 197, 94, 0.15)', filter: 'blur(16px)' }} />
                      <CheckCircle className="relative w-16 h-16 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{t('contact.successTitle')}</h3>
                    <p className="text-[#94A3B8]">{t('contact.successMessage')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t('contact.nameLabel')}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('contact.namePlaceholder')}
                        required
                        className="w-full px-4 py-3 rounded-xl text-foreground placeholder-[#64748B] bg-background border border-border outline-none transition-all focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">{t('contact.businessLabel')}</label>
                      <input
                        type="text"
                        value={business}
                        onChange={(e) => setBusiness(e.target.value)}
                        placeholder={t('contact.businessPlaceholder')}
                        className="w-full px-4 py-3 rounded-xl text-foreground placeholder-[#64748B] bg-background border border-border outline-none transition-all focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t('contact.contactLabel')}
                      </label>
                      <input
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder={t('contact.contactPlaceholder')}
                        required
                        className="w-full px-4 py-3 rounded-xl text-foreground placeholder-[#64748B] bg-background border border-border outline-none transition-all focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20"
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
                          {t('contact.submitAudit')}
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                    {error && (
                      <p className="text-xs text-red-500 text-center -mt-1">
                        {error}
                      </p>
                    )}
                    <p className="text-xs text-center text-[#64748B]">{t('contact.formDisclaimer')}</p>
                  </form>
                )}

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setShowContacts(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[#93C5FD] font-medium text-sm border border-[#3B82F6]/30 hover:bg-[#3B82F6]/10 transition-all duration-200"
                  >
                    <Phone className="w-4 h-4" />
                    {t('contact.contactsBtn')}
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <AnimatePresence>
        {showContacts && (
          <>
            <motion.div
              key="contact-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
              onClick={() => setShowContacts(false)}
            />
            <motion.div
              key="contact-modal"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[81] flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="relative w-full max-w-sm rounded-2xl p-8 pointer-events-auto"
                style={{
                  background: 'rgba(13, 13, 26, 0.97)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 40px rgba(59,130,246,0.08)',
                }}
              >
                <button
                  onClick={() => setShowContacts(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-[#64748B] hover:text-foreground hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <h3 className="text-xl font-bold text-foreground mb-1">{t('footer.contactUsTitle')}</h3>
                <p className="text-sm text-[#64748B] mb-5">{t('contact.modalSubtitle')}</p>

                <div
                  className="rounded-xl p-4 space-y-2.5 mb-3"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-xs text-[#64748B] font-medium uppercase tracking-wider">{t('contact.phonesHeading')}</span>
                  </div>
                  {CONTACT_PHONES.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="block text-foreground font-medium text-[15px] hover:text-[#2563EB] transition-colors pl-11"
                    >
                      {phone}
                    </a>
                  ))}
                </div>

                <div className="space-y-2.5">
                  <a
                    href="https://t.me/aisolution_uz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] flex items-center justify-center flex-shrink-0">
                      <Send className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-foreground font-medium text-[15px]">{CONTACT_TG}</span>
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex items-center gap-4 p-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-foreground font-medium text-[15px]">{CONTACT_EMAIL}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
