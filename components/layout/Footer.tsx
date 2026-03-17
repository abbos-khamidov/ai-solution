'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone, Send, MessageCircle, Instagram, Linkedin } from 'lucide-react';

const CONTACT_EMAIL = 'info@aisolution.uz';
const CONTACT_PHONE = '+998 77 061 22 00';
const CONTACT_PHONES = ['+998 77 061 22 00', '+998 95 000 00 65', '+998 93 949 20 00'];
const CONTACT_TG = '@aisolution_uz';
const CONTACT_ADDRESS = 'ул. Богибустан 186, Ташкент';

const productLinks = [
  { label: 'Customer Service Bot',  href: '/products/customer-service' },
  { label: 'Management Assistant',  href: '/products/management-assistant' },
  { label: 'Corporate AI (RAG)',     href: '/products/corporate-ai' },
  { label: 'AI-аналитика',          href: '/products/ai-analytics' },
];

const companyLinks = [
  { label: 'О нас',   href: '/about' },
  { label: 'Блог',    href: '/blog' },
  { label: 'Кейсы',   href: '/cases' },
];

const colHeadClass = 'text-xs font-semibold uppercase tracking-widest text-[#64748B] mb-4';
const linkClass = 'text-sm text-[#94A3B8] hover:text-white transition-colors duration-200';

export function Footer() {
  const [showContacts, setShowContacts] = useState(false);

  return (
    <>
      <footer className="relative" style={{ background: '#05050A' }}>
        <div className="h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">

            {/* Column 1: Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] flex items-center justify-center">
                  <span className="text-white font-bold text-xs tracking-tight">AI</span>
                </div>
                <span className="font-bold text-lg tracking-tight text-[#F8FAFC]">AI Solution</span>
              </div>
              <p className="text-sm text-[#64748B] leading-relaxed mb-5">
                Автоматизация продаж и клиентского сервиса через AI. Работаем с бизнесом в Узбекистане и СНГ.
              </p>
              <div className="flex items-center gap-2">
                <a
                  href="https://t.me/aisolution_uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.12] text-[#64748B] hover:text-white transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/aisolution_uz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.12] text-[#64748B] hover:text-white transition-all duration-200"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/company/aisolution-uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.12] text-[#64748B] hover:text-white transition-all duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Products */}
            <div>
              <h4 className={colHeadClass}>Продукты</h4>
              <ul className="space-y-2.5">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <h4 className={colHeadClass}>Компания</h4>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>{link.label}</Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => setShowContacts(true)}
                    className={`${linkClass} text-left`}
                  >
                    Контакты
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Contacts */}
            <div>
              <h4 className={colHeadClass}>Контакты</h4>
              <ul className="space-y-2.5 text-sm text-[#94A3B8]">
                <li>
                  <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                    {CONTACT_PHONE}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors">
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a href="https://t.me/aisolution_uz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    {CONTACT_TG}
                  </a>
                </li>
                <li>{CONTACT_ADDRESS}</li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-xs text-[#475569]">&copy; 2026 AI Solution</p>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="text-xs text-[#475569] hover:text-[#94A3B8] transition-colors">
                Политика конфиденциальности
              </a>
              <span className="text-[#334155]">·</span>
              <Link href="/security" className="text-xs text-[#475569] hover:text-[#94A3B8] transition-colors">
                Условия работы
              </Link>
              <span className="text-[#334155]">·</span>
              <a href="/offer" className="text-xs text-[#475569] hover:text-[#94A3B8] transition-colors">
                Договор оферты
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Contacts modal */}
      <AnimatePresence>
        {showContacts && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
              onClick={() => setShowContacts(false)}
            />
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
                <button
                  onClick={() => setShowContacts(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-[#64748B] hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <h3 className="text-xl font-bold text-[#F8FAFC] mb-1">Свяжитесь с нами</h3>
                <p className="text-sm text-[#64748B] mb-5">Позвоните, напишите в Telegram или на почту</p>

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
