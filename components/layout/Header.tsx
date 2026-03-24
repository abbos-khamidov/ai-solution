'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, ArrowRight, ChevronDown, Send,
  Bot, Building2, LineChart, BarChart3,
  Heart, GraduationCap, Utensils, ShoppingBag,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { track } from '@/lib/analytics/gtag';

const productLinks = [
  { icon: Bot, href: '/products/customer-service', labelKey: 'headerDropdown.productLabels.cs', descKey: 'headerDropdown.productDesc.cs' },
  { icon: LineChart, href: '/products/management-assistant', labelKey: 'headerDropdown.productLabels.ma', descKey: 'headerDropdown.productDesc.ma' },
  { icon: Building2, href: '/products/corporate-ai', labelKey: 'headerDropdown.productLabels.rag', descKey: 'headerDropdown.productDesc.rag' },
  { icon: BarChart3, href: '/products/ai-analytics', labelKey: 'headerDropdown.productLabels.analytics', descKey: 'headerDropdown.productDesc.analytics' },
] as const;

const industryLinks = [
  { icon: Heart, href: '/ii-dlya-klinik-tashkent', labelKey: 'headerDropdown.industryLabels.medicine', descKey: 'headerDropdown.industryDesc.medicine' },
  { icon: GraduationCap, href: '/ii-dlya-obrazovaniya-tashkent', labelKey: 'headerDropdown.industryLabels.edu', descKey: 'headerDropdown.industryDesc.edu' },
  { icon: Utensils, href: '/ii-dlya-restoranov-tashkent', labelKey: 'headerDropdown.industryLabels.horeca', descKey: 'headerDropdown.industryDesc.horeca' },
  { icon: ShoppingBag, href: '/ii-dlya-internet-magazina', labelKey: 'headerDropdown.industryLabels.retail', descKey: 'headerDropdown.industryDesc.retail' },
] as const;

export function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const isHomePage = pathname === '/';
  const isProductPage = pathname?.startsWith('/products/');
  const isCasesPage = pathname?.startsWith('/cases');
  const isSoftwareDevPage = pathname?.startsWith('/services/software-development');

  const otherNavLinks = [
    { label: t('nav.process'), href: isHomePage ? '#process' : '/#process' },
    { label: t('nav.pricing'), href: isHomePage ? '#pricing' : '/#pricing' },
    { label: t('nav.softwareDev'), href: '/services/software-development', active: isSoftwareDevPage },
    { label: t('nav.cases'),   href: '/cases',  active: isCasesPage },
    { label: t('nav.contact'), href: isHomePage ? '#contact' : '/#contact' },
  ];

  const ctaHref = isHomePage ? '#contact' : '/#contact';
  const tickerItems = [
    t('headerTicker.trust'),
    t('headerTicker.offer1'),
    t('headerTicker.offer2'),
    t('headerTicker.offer3'),
    t('headerTicker.offer4'),
  ];

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

  /** Expose real header height for sticky sections + scroll math (ticker + nav + padding). */
  useEffect(() => {
    const el = headerRef.current;
    if (!el || typeof document === 'undefined') return;

    const publish = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--site-header-height', `${h}px`);
    };

    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    window.addEventListener('resize', publish, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', publish);
    };
  }, []);

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
      <style>{`
        @keyframes trustTicker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .trust-ticker-track {
          animation: trustTicker 24s linear infinite;
        }
      `}</style>
      <motion.header
        ref={headerRef}
        data-site-header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-3 md:px-4 pt-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`rounded-2xl border transition-all duration-500 ${
              isScrolled
                ? 'bg-background/95 backdrop-blur-[24px] border-border shadow-[0_10px_34px_rgba(15,23,42,0.12)]'
                : 'bg-background/78 backdrop-blur-[18px] border-border/70 shadow-[0_6px_24px_rgba(15,23,42,0.08)]'
            }`}
          >
            <div className="h-8 rounded-t-2xl border-b border-[#3B82F6]/30 bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#0EA5E9] overflow-hidden">
              <div className="trust-ticker-track flex w-max h-full items-center">
                {[...tickerItems, ...tickerItems].map((item, i) => (
                  <span
                    key={`${item}-${i}`}
                    className="h-full inline-flex items-center px-6 text-[11px] font-semibold tracking-wide text-white/95 whitespace-nowrap"
                  >
                    ✦ {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="px-4 md:px-6">
              <div className="flex items-center justify-between h-[68px]">

            {/* Logo */}
                <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/"
                className="flex items-center gap-2.5 select-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background rounded-md"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] flex items-center justify-center flex-shrink-0 shadow-[0_6px_18px_rgba(59,130,246,0.35)]">
                  <span className="text-white font-bold text-sm">⚡</span>
                </div>
                <div className="leading-tight">
                  <span className="block text-[19px] font-extrabold text-foreground tracking-tight whitespace-nowrap">AI Solution</span>
                </div>
              </Link>
                </motion.div>

            {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-5">
              {/* Solutions dropdown (mega-menu) */}
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
                    className={`group relative flex items-center gap-1 text-[13px] font-semibold transition-colors duration-300 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background rounded-md ${
                      isProductPage ? 'text-foreground' : 'text-[#64748B] hover:text-foreground'
                    }`}
                    aria-haspopup="true"
                    aria-expanded={isProductsOpen}
                  >
                    {t('nav.solutions')}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`}
                    />
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
                        className="absolute top-full left-0 mt-2 w-[480px] rounded-2xl p-4 z-[60]"
                        style={{
                          background: 'rgba(255, 255, 255, 0.97)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(15, 23, 42, 0.1)',
                          boxShadow: '0 8px 32px rgba(15, 23, 42, 0.1)',
                        }}
                        role="menu"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          {/* Products column */}
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-[#64748B] mb-2 px-2">{t('headerDropdown.productsTitle')}</p>
                            {productLinks.map((product) => {
                              const isActive = pathname === product.href;
                              return (
                                <Link
                                  key={product.href}
                                  href={product.href}
                                  onClick={() => {
                                    track('nav_click_product', { product: product.href, location: 'header_dropdown' });
                                    setIsProductsOpen(false);
                                  }}
                                  role="menuitem"
                                  className={`flex items-start gap-3 px-2 py-2.5 rounded-xl transition-all duration-150 group ${
                                    isActive ? 'bg-[#3B82F6]/10' : 'hover:bg-muted'
                                  }`}
                                >
                                  <product.icon className={`w-4 h-4 mt-0.5 shrink-0 transition-colors ${isActive ? 'text-[#3B82F6]' : 'text-[#64748B] group-hover:text-[#3B82F6]'}`} />
                                  <div>
                                    <p className={`text-sm font-medium transition-colors ${isActive ? 'text-[#3B82F6]' : 'text-foreground-secondary group-hover:text-foreground'}`}>
                                      {t(product.labelKey)}
                                    </p>
                                    <p className="text-xs text-[#475569]">{t(product.descKey)}</p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>

                          {/* Industries column */}
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-[#64748B] mb-2 px-2">{t('headerDropdown.industriesTitle')}</p>
                            {industryLinks.map((industry) => (
                              <Link
                                key={industry.href}
                                href={industry.href}
                                onClick={() => setIsProductsOpen(false)}
                                role="menuitem"
                                className="flex items-start gap-3 px-2 py-2.5 rounded-xl hover:bg-muted transition-all duration-150 group"
                              >
                                <industry.icon className="w-4 h-4 mt-0.5 shrink-0 text-[#64748B] group-hover:text-[#3B82F6] transition-colors" />
                                <div>
                                  <p className="text-sm font-medium text-foreground-secondary group-hover:text-foreground transition-colors">
                                    {t(industry.labelKey)}
                                  </p>
                                  <p className="text-xs text-[#475569]">{t(industry.descKey)}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {isProductsOpen && (
                    <div className="absolute top-full left-0 h-3 w-[480px]" aria-hidden="true" />
                  )}
                  </div>
                </motion.div>

              {/* Other nav links */}
                {otherNavLinks.map((link, i) => {
                const isInternal = link.href.startsWith('/');
                const isActive = 'active' in link && link.active;
                const cls = `group relative text-[13px] font-semibold transition-colors duration-300 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background rounded-md ${
                  isActive ? 'text-foreground' : 'text-[#64748B] hover:text-foreground'
                }`;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.28 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {isInternal ? (
                      <Link href={link.href} className={cls}>
                        {link.label}
                        {isActive && (
                          <span className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]" />
                        )}
                        {!isActive && (
                          <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                        )}
                      </Link>
                    ) : (
                      <a href={link.href} onClick={(e) => scrollTo(e, link.href)} className={cls}>
                        {link.label}
                        <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                      </a>
                    )}
                  </motion.div>
                );
                })}
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
                href="https://t.me/aisolution_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-semibold rounded-xl border border-[#3B82F6]/70 text-[#2563EB] hover:bg-[#3B82F6] hover:text-white transition-all duration-200 whitespace-nowrap"
              >
                <Send className="w-3.5 h-3.5" />
                {t('nav.telegram')}
              </a>
                  <a
                href={ctaHref}
                onClick={(e) => scrollTo(e, ctaHref)}
                className="relative inline-flex items-center gap-1.5 px-6 py-2.5 text-[13px] font-semibold rounded-xl overflow-hidden transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background"
              >
                <span
                  className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]"
                  style={{
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative text-gradient group-hover:!text-white group-hover:bg-none group-hover:[-webkit-text-fill-color:white] transition-all duration-300">
                  {t('nav.startProject')}
                </span>
                <ArrowRight className="relative w-3.5 h-3.5 text-[#3B82F6] group-hover:text-foreground transition-colors duration-300" />
              </a>
                </motion.div>

            {/* Mobile hamburger */}
                <div className="flex items-center gap-2 md:hidden">
              <LanguageSwitcher />
              <button
                className="p-2 -mr-2 rounded-md text-foreground hover:bg-muted transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label={isMobileOpen ? 'Close navigation' : 'Open navigation'}
                aria-expanded={isMobileOpen}
              >
                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
                </div>
              </div>
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
            className="fixed inset-0 z-50 bg-background overflow-y-auto"
          >
            <div className="flex items-center justify-between h-16 px-6 border-b border-border">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileOpen(false)}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">⚡</span>
                </div>
                <span className="text-[20px] font-bold text-foreground tracking-tight whitespace-nowrap">AI Solution</span>
              </Link>
              <button
                className="p-2 -mr-2 rounded-md text-foreground hover:bg-muted transition-colors duration-150 focus:outline-none"
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
                    isProductPage ? 'text-foreground' : 'text-[#94A3B8] hover:text-foreground'
                  }`}
                >
                  {t('nav.solutions')}
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${isMobileProductsOpen ? 'rotate-180' : ''}`}
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
                      <div className="mb-3 rounded-xl p-2 bg-muted">
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#64748B] px-2 py-1.5">{t('headerDropdown.productsTitle')}</p>
                        {productLinks.map((product) => {
                          const isActive = pathname === product.href;
                          return (
                            <Link
                              key={product.href}
                              href={product.href}
                              onClick={() => setIsMobileOpen(false)}
                              className={`flex items-start gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                                isActive ? 'text-[#3B82F6]' : 'text-[#94A3B8] hover:text-foreground'
                              }`}
                            >
                              <product.icon className="w-4 h-4 shrink-0 mt-0.5" />
                              <div>
                                <p className="text-[15px] font-medium">{t(product.labelKey)}</p>
                                <p className="text-xs text-[#475569]">{t(product.descKey)}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Other nav links */}
              {otherNavLinks.map((link, i) => {
                const isInternal = link.href.startsWith('/');
                const isActive = 'active' in link && link.active;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {isInternal ? (
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={`block py-3 text-[18px] font-medium transition-colors rounded-sm ${
                          isActive ? 'text-foreground' : 'text-[#94A3B8] hover:text-foreground'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => {
                          scrollTo(e, link.href);
                          if (link.href.startsWith('#')) setIsMobileOpen(false);
                        }}
                        className="block py-3 text-[18px] font-medium text-[#94A3B8] hover:text-foreground transition-colors rounded-sm"
                      >
                        {link.label}
                      </a>
                    )}
                  </motion.div>
                );
              })}

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
