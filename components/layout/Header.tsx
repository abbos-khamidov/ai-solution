'use client';

/**
 * Header — Enterprise-grade fixed navigation with i18n
 * 
 * Design: Apple/Salesforce sophistication. Clean, minimal, professional.
 * Height: 72px desktop, 64px mobile
 * Behavior: Transparent → white/blur on scroll past 100px
 * Animations: Framer Motion entrance (subtle, professional)
 * Z-Index: z-50 (topmost layer)
 * i18n: LanguageSwitcher before CTA button on right side
 */

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

export function Header() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { label: t('nav.solutions'), href: '#services' },
    { label: t('nav.process'), href: '#process' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'bg-white/[0.95] backdrop-blur-[12px] border-b border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-[72px]">

            {/* Logo — simple wordmark */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/"
                className="text-[20px] font-semibold text-gray-900 tracking-tight select-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-sm"
              >
                aisolution
              </Link>
            </motion.div>

            {/* Desktop nav — center-aligned */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="group relative text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-sm"
                  >
                    {link.label}
                    {/* Underline — slides in from left on hover */}
                    <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-blue-600 transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Desktop right side: Language Switcher + CTA */}
            <motion.div
              className="hidden md:flex items-center gap-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <LanguageSwitcher />
              <a
                href="#contact"
                onClick={(e) => scrollTo(e, '#contact')}
                className="inline-flex items-center gap-1.5 px-6 py-3 text-[14px] font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                {t('nav.startProject')}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Mobile hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <LanguageSwitcher />
              <button
                className="p-2 -mr-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label={isMobileOpen ? 'Close navigation' : 'Open navigation'}
                aria-expanded={isMobileOpen}
              >
                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-white"
          >
            {/* Close row */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
              <Link
                href="/"
                className="text-[20px] font-semibold text-gray-900 tracking-tight"
                onClick={() => setIsMobileOpen(false)}
              >
                aisolution
              </Link>
              <button
                className="p-2 -mr-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile nav links */}
            <nav className="flex flex-col px-6 pt-8 gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.05 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="block py-3 text-[18px] font-medium text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-sm"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="pt-6"
              >
                <a
                  href="#contact"
                  onClick={(e) => scrollTo(e, '#contact')}
                  className="flex items-center justify-center gap-2 w-full py-3.5 text-[16px] font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  {t('nav.startProject')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
