'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

export function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  const productLinks = useMemo(
    () => [
      { emoji: '\u{1F916}', label: t('productsSection.product1Title'), href: '/products/customer-service' },
      { emoji: '\u{1F4CA}', label: t('productsSection.product2Title'), href: '/products/management-assistant' },
      { emoji: '\u{1F3E2}', label: t('productsSection.product3Title'), href: '/products/corporate-ai' },
    ],
    [t]
  );

  const isHomePage = pathname === '/';
  const isProductPage = pathname?.startsWith('/products/');

  const otherNavLinks = [
    {
      label: t('nav.process'),
      href: isHomePage ? '#process' : '/#process',
    },
    {
      label: t('nav.about'),
      href: isHomePage ? '#about' : '/#about',
    },
    {
      label: t('nav.contact'),
      href: isHomePage ? '#contact' : '/#contact',
    },
  ];

  const ctaHref = isHomePage ? '#contact' : '/#contact';

  useEffect(() => {
    let rafId = 0;
    let last = false;

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        const next = window.scrollY > 100;
        if (next !== last) {
          last = next;
          setIsScrolled(next);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const scrollTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith('#')) return;
      e.preventDefault();
      setIsMobileOpen(false);
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    []
  );

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'bg-[rgba(5,5,10,0.8)] backdrop-blur-[20px] border-b border-white/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-[72px]">

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/"
                className="flex items-center gap-2 select-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#05050A] rounded-sm"
              >
                <Image src="/logo.png" alt="AI Solution" width={32} height={32} className="w-8 h-8 object-contain" priority />
                <span className="text-[20px] font-bold text-white tracking-tight">AI Solution</span>
              </Link>
            </motion.div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {/* Products dropdown */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  ref={productsRef}
                  className="relative"
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => setIsProductsOpen(false)}
                >
                  <button
                    className={`group relative flex items-center gap-1 text-[15px] font-medium transition-colors duration-300 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#05050A] rounded-sm ${
                      isProductPage ? 'text-white' : 'text-[#64748B] hover:text-white'
                    }`}
                    aria-haspopup="true"
                    aria-expanded={isProductsOpen}
                  >
                    {t('nav.solutions')}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isProductsOpen ? 'rotate-180' : ''
                      }`}
                    />
                    {/* Active indicator */}
                    {isProductPage && (
                      <span className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isProductsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-0 mt-3 w-64 rounded-xl p-2 z-[60]"
                        style={{
                          background: 'rgba(13, 13, 26, 0.97)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                        }}
                        role="menu"
                      >
                        {productLinks.map((product) => {
                          const isActive = pathname === product.href;
                          return (
                            <Link
                              key={product.href}
                              href={product.href}
                              onClick={() => setIsProductsOpen(false)}
                              role="menuitem"
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                                isActive
                                  ? 'text-[#3B82F6] bg-[#3B82F6]/10'
                                  : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
                              }`}
                            >
                              <span className="text-base">{product.emoji}</span>
                              <span>{product.label}</span>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Other nav links */}
              {otherNavLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.28 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="group relative text-[15px] font-medium text-[#64748B] hover:text-white transition-colors duration-300 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#05050A] rounded-sm"
                  >
                    {link.label}
                    <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Desktop right side */}
            <motion.div
              className="hidden md:flex items-center gap-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <LanguageSwitcher />
              <a
                href={ctaHref}
                onClick={(e) => scrollTo(e, ctaHref)}
                className="relative inline-flex items-center gap-1.5 px-6 py-2.5 text-[14px] font-semibold rounded-lg overflow-hidden transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#05050A]"
              >
                <span
                  className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]"
                  style={{
                    WebkitMask:
                      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative text-gradient group-hover:!text-white group-hover:bg-none group-hover:[-webkit-text-fill-color:white] transition-all duration-300">
                  {t('nav.startProject')}
                </span>
                <ArrowRight className="relative w-3.5 h-3.5 text-[#3B82F6] group-hover:text-white transition-colors duration-300" />
              </a>
            </motion.div>

            {/* Mobile hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <LanguageSwitcher />
              <button
                className="p-2 -mr-2 rounded-md text-white hover:bg-white/10 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#05050A]"
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
            className="fixed inset-0 z-50 bg-[#05050A] overflow-y-auto"
          >
            <div className="flex items-center justify-between h-16 px-6 border-b border-white/[0.06]">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setIsMobileOpen(false)}
              >
                <Image src="/logo.png" alt="AI Solution" width={32} height={32} className="w-8 h-8 object-contain" />
                <span className="text-[20px] font-bold text-white tracking-tight">AI Solution</span>
              </Link>
              <button
                className="p-2 -mr-2 rounded-md text-white hover:bg-white/10 transition-colors duration-150 focus:outline-none"
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col px-6 pt-6 gap-1">
              {/* Products expandable group */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                  className={`w-full flex items-center justify-between py-3 text-[18px] font-medium transition-colors focus:outline-none ${
                    isProductPage ? 'text-white' : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {t('nav.solutions')}
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isMobileProductsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isMobileProductsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div
                        className="mb-3 rounded-xl p-2"
                        style={{ background: 'rgba(255,255,255,0.04)' }}
                      >
                        {productLinks.map((product) => {
                          const isActive = pathname === product.href;
                          return (
                            <Link
                              key={product.href}
                              href={product.href}
                              onClick={() => setIsMobileOpen(false)}
                              className={`flex items-center gap-3 px-3 py-3 rounded-lg text-[16px] font-medium transition-colors ${
                                isActive
                                  ? 'text-[#3B82F6]'
                                  : 'text-[#94A3B8] hover:text-white'
                              }`}
                            >
                              <span>{product.emoji}</span>
                              <span>{product.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Other nav links */}
              {otherNavLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      scrollTo(e, link.href);
                      if (link.href.startsWith('#')) setIsMobileOpen(false);
                    }}
                    className="block py-3 text-[18px] font-medium text-[#94A3B8] hover:text-white transition-colors rounded-sm"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="pt-6"
              >
                <a
                  href={ctaHref}
                  onClick={(e) => {
                    scrollTo(e, ctaHref);
                    setIsMobileOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3.5 text-[16px] font-semibold text-white bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all focus:outline-none"
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
