'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CONTACT_EMAIL = 'info@aisolution.uz';
const CONTACT_PHONES = [
  '+998 77 061 22 00',
  '+998 95 000 00 65',
  '+998 93 949 20 00',
];
const CONTACT_TG = '@aisolution_uz';
const CONTACT_ADDRESS = 'ул. Афросиёб 35, Ташкент, Узбекистан';

export function Footer() {
  const { t } = useTranslation();
  const [showContacts, setShowContacts] = useState(false);

  const footerLinks: {
    categoryKey: string;
    links: { labelKey?: string; label?: string; href: string; contacts?: boolean }[];
  }[] = [
    {
      categoryKey: 'nav.solutions',
      links: [
        { label: 'AI для бизнеса', href: '/ai-dlya-biznesa' },
        { labelKey: 'footer.howItWorks', href: '#process' },
        { labelKey: 'footer.products', href: '#products' },
        { labelKey: 'footer.services', href: '/services' },
      ],
    },
    {
      categoryKey: 'footer.company',
      links: [
        { labelKey: 'footer.about', href: '/about' },
        { labelKey: 'footer.blog', href: '/blog' },
        { labelKey: 'footer.contacts', href: '#contact', contacts: true },
        { labelKey: 'footer.tashkent', href: '/tashkent' },
      ],
    },
  ];

  return (
    <>
      <footer className="relative" style={{ background: '#05050A' }}>
        <div className="h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] flex items-center justify-center">
                  <span className="text-white font-bold text-xs tracking-tight">AI</span>
                </div>
                <span className="font-bold text-lg tracking-tight text-[#F8FAFC]">
                  AI Solution
                </span>
              </div>
              <p className="text-sm text-[#64748B] leading-relaxed">
                {t('footer.tagline')}
              </p>
            </div>

            {footerLinks.map(({ categoryKey, links }) => (
              <div key={categoryKey}>
                <h4 className="text-sm font-semibold text-[#F8FAFC] mb-4">{t(categoryKey)}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) =>
                    link.contacts ? (
                      <li key={link.labelKey ?? link.label}>
                        <button
                          onClick={() => setShowContacts(true)}
                          className="text-sm text-[#64748B] hover:text-[#F8FAFC] transition-colors duration-200 text-left"
                        >
                          {link.label ?? (link.labelKey ? t(link.labelKey) : '')}
                        </button>
                      </li>
                    ) : link.href.startsWith('/') ? (
                      <li key={link.labelKey ?? link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-[#64748B] hover:text-[#F8FAFC] transition-colors duration-200"
                        >
                          {link.label ?? (link.labelKey ? t(link.labelKey) : '')}
                        </Link>
                      </li>
                    ) : (
                      <li key={link.labelKey ?? link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-[#64748B] hover:text-[#F8FAFC] transition-colors duration-200"
                        >
                          {link.label ?? (link.labelKey ? t(link.labelKey) : '')}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}

            {/* NAP column */}
            <div>
              <h4 className="text-sm font-semibold text-[#F8FAFC] mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-[#64748B]">
                {CONTACT_PHONES.map((phone) => (
                  <li key={phone}>
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-[#F8FAFC] transition-colors">
                      {phone}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="https://t.me/aisolution_uz" target="_blank" rel="noopener noreferrer" className="hover:text-[#F8FAFC] transition-colors">
                    {CONTACT_TG}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[#F8FAFC] transition-colors">
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>{CONTACT_ADDRESS}</li>
              </ul>
            </div>
          </div>

          <div
            className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
          >
            <p className="text-xs text-[#64748B]">
              &copy; {new Date().getFullYear()} AI Solution. {t('footer.rights')}
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-xs text-[#64748B] hover:text-[#F8FAFC] transition-colors">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </footer>

      {/* Contacts modal */}
      <AnimatePresence>
        {showContacts && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
              onClick={() => setShowContacts(false)}
            />

            {/* Modal */}
            <motion.div
              key="modal"
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
                {/* Close button */}
                <button
                  onClick={() => setShowContacts(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-[#64748B] hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <h3 className="text-xl font-bold text-[#F8FAFC] mb-1">{t('footer.contactUsTitle')}</h3>
                <p className="text-sm text-[#64748B] mb-5">Позвоните, напишите в Telegram или на почту</p>

                {/* Phones group */}
                <div
                  className="rounded-xl p-4 space-y-2.5 mb-3"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Телефоны</span>
                  </div>
                  {CONTACT_PHONES.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="block text-[#F8FAFC] font-medium text-[15px] hover:text-[#93C5FD] transition-colors pl-11"
                    >
                      {phone}
                    </a>
                  ))}
                </div>

                {/* TG + Email group */}
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
                    <span className="text-[#F8FAFC] font-medium text-[15px]">{CONTACT_TG}</span>
                  </a>

                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex items-center gap-4 p-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[#F8FAFC] font-medium text-[15px]">{CONTACT_EMAIL}</span>
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
