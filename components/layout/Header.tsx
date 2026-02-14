'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Menu, X, ArrowRight } from 'lucide-react';
import { analytics } from '@/lib/analytics';
import { useLanguage } from '@/lib/i18n/useLanguage';
import { LanguageToggle } from '@/components/ui/LanguageToggle';

export function Header() {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const navLinks = [
    { name: t('header.services'), href: '/#services' },
    { name: t('header.cases'), href: '/keisy' },
    { name: t('header.contacts'), href: '/#contact' },
  ];

  useEffect(() => {
    // Subtle fade-in on load
    gsap.from(headerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    });

    // Scroll-based header transform with backdrop blur
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
        scrolled
          ? 'bg-[#030303]/90 backdrop-blur-md border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <nav className="flex items-center justify-between">
          <a
            href="/"
            className="text-xl font-semibold text-white tracking-tight"
          >
            aisolution
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-[#999] hover:text-white transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4A853] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />
            <a
              href="/#contact"
              onClick={() => analytics.ctaClick('header-consultation')}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#D4A853] hover:text-[#E8B86D] transition-colors duration-300 group"
            >
              {t('header.consultation')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-3 pb-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#999] hover:text-white py-2 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={() => {
                analytics.ctaClick('mobile-menu-consultation');
                setIsMobileMenuOpen(false);
              }}
              className="text-[#D4A853] font-medium py-2"
            >
              {t('header.consultation')}
            </a>
            <div className="pt-2">
              <LanguageToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
