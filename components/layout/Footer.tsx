'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone } from 'lucide-react';

const phones = [
  { number: '+998 93 949 20 00', href: 'tel:+998939492000' },
  { number: '+998 77 061 22 00', href: 'tel:+998770612200' },
  { number: '+998 95 000 00 65', href: 'tel:+998950000065' },
];

const footerLinks = {
  'Продукт': [
    { label: 'Как работает', href: '#process', modal: false },
    { label: 'Продукты',     href: '#products', modal: false },
    { label: 'Тарифы',       href: '#pricing',  modal: false },
  ],
  'Компания': [
    { label: 'О нас',     href: '#solutions', modal: false },
    { label: 'Контакты',  href: '#contact',   modal: false, contacts: true },
  ],
};

export function Footer() {
  const [showContacts, setShowContacts] = useState(false);

  return (
    <>
      <footer className="relative" style={{ background: '#05050A' }}>
        {/* Gradient top edge */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
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
                AI-ассистенты для автоматизации продаж. Отвечаем клиентам за 30 секунд в Telegram, Instagram и WhatsApp.
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold text-[#F8FAFC] mb-4">{category}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) =>
                    'contacts' in link && link.contacts ? (
                      <li key={link.label}>
                        <button
                          onClick={() => setShowContacts(true)}
                          className="text-sm text-[#64748B] hover:text-[#F8FAFC] transition-colors duration-200 text-left"
                        >
                          {link.label}
                        </button>
                      </li>
                    ) : (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-[#64748B] hover:text-[#F8FAFC] transition-colors duration-200"
                        >
                          {link.label}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
          >
            <p className="text-xs text-[#64748B]">
              &copy; {new Date().getFullYear()} AI Solution. Все права защищены.
            </p>
            <p className="text-xs text-[#64748B]">
              hello@aisolution.ai
            </p>
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

                {/* Title */}
                <h3 className="text-xl font-bold text-[#F8FAFC] mb-1">Свяжитесь с нами</h3>
                <p className="text-sm text-[#64748B] mb-6">Позвоните на любой из номеров</p>

                {/* Phone numbers */}
                <div className="space-y-3">
                  {phones.map((p) => (
                    <a
                      key={p.href}
                      href={p.href}
                      className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.border = '1px solid rgba(59,130,246,0.4)';
                        (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.07)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.07)';
                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                      }}
                    >
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[#F8FAFC] font-medium text-[15px]">{p.number}</span>
                    </a>
                  ))}
                </div>

                {/* Telegram link */}
                <div className="mt-5 pt-5 text-center text-sm text-[#64748B]" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  Или в Telegram:{' '}
                  <a
                    href="https://t.me/aisolution_uz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3B82F6] font-medium hover:underline"
                  >
                    @aisolution_uz
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
