'use client';

/**
 * FloatingCTA - Bottom-right floating action button (i18n enabled)
 * Appears after scrolling past hero section
 */

import React, { useRef, useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useGSAPContext } from '@/components/animations/useGSAPContext';

export function FloatingCTA() {
  const { t } = useTranslation();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Show after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entrance animation
  useGSAPContext(
    (gsap) => {
      const el = buttonRef.current;
      if (!el) return;

      if (isVisible) {
        gsap.fromTo(
          el,
          { scale: 0, opacity: 0, rotation: -30 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)' }
        );
      } else {
        gsap.to(el, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        });
      }
    },
    { scope: buttonRef as React.RefObject<HTMLElement>, deps: [isVisible] }
  );

  return (
    <div
      ref={buttonRef}
      className="fixed bottom-6 right-6 opacity-0 scale-0"
      style={{ zIndex: 'var(--z-floating-cta)' }}
    >
      {/* Expanded content */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 w-72 glass-card bg-white/95 rounded-2xl p-5 shadow-lg mb-2">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-[#0F1419]">{t('floatingCta.title')}</h4>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-md hover:bg-black/[0.04] transition-colors"
            >
              <X className="w-3.5 h-3.5 text-[#8899A6]" />
            </button>
          </div>
          <p className="text-xs text-[#536471] mb-3">
            {t('floatingCta.description')}
          </p>
          <a
            href="#contact"
            className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-[#0066FF] to-[#00D9FF] hover:shadow-lg transition-shadow"
            onClick={() => setIsExpanded(false)}
          >
            {t('floatingCta.button')}
          </a>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00D9FF] text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-offset-2"
        aria-label="Chat with us"
      >
        {isExpanded ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
