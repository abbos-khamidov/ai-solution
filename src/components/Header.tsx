import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: 'Услуги', href: '#services' },
  { name: 'Кейсы', href: '#cases' },
  { name: 'Контакты', href: '#contact' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(logoRef.current, { opacity: 0, x: -20, duration: 0.6, delay: 0.2 })
      .from(
        linksRef.current?.querySelectorAll('a') || [],
        { opacity: 0, y: -10, stagger: 0.08, duration: 0.4 },
        '-=0.3'
      )
      .from(ctaRef.current, { opacity: 0, x: 20, duration: 0.4 }, '-=0.2');

    // Scroll-based header transform
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
        scrolled
          ? 'bg-[#030303]/95 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <nav className="flex items-center justify-between">
          <a
            ref={logoRef}
            href="#"
            className="text-xl font-semibold text-white tracking-tight"
          >
            aisolution
          </a>

          <div ref={linksRef} className="hidden md:flex items-center gap-10">
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

          <a
            ref={ctaRef}
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-[#D4A853] hover:text-[#E8B86D] transition-colors duration-300 group"
          >
            Консультация
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>

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
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#D4A853] font-medium py-2"
            >
              Консультация
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
