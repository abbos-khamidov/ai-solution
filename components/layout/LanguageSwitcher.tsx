'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Globe } from 'lucide-react';
import { languages, normalizeLanguage, type LanguageCode } from '@/lib/i18n';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentCode = normalizeLanguage(i18n.resolvedLanguage || i18n.language);
  const currentLang = languages.find((l) => l.code === currentCode) || languages[0];

  const switchLanguage = useCallback(
    (code: LanguageCode) => {
      void i18n.changeLanguage(code);
      localStorage.setItem('aisolution-lang', code);
      setIsOpen(false);
    },
    [i18n]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium text-[#64748B] hover:text-foreground rounded-lg hover:bg-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase tracking-wide">{currentLang.code}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-2 w-44 rounded-lg p-2 z-[60]"
            style={{
              background: 'rgba(255, 255, 255, 0.97)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(15, 23, 42, 0.1)',
              boxShadow: '0 8px 32px rgba(15, 23, 42, 0.1)',
            }}
            role="listbox"
            aria-label="Select language"
          >
            {languages.map((lang) => {
              const isSelected = lang.code === currentCode;
              return (
                <button
                  key={lang.code}
                  onClick={() => switchLanguage(lang.code)}
                  role="option"
                  aria-selected={isSelected}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-colors duration-150 ${
                    isSelected
                      ? 'text-[#3B82F6] bg-[#3B82F6]/10'
                      : 'text-[#94A3B8] hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span className="flex-1 text-left">{lang.label}</span>
                  <span className={`uppercase text-[11px] tracking-wider ${
                    isSelected ? 'text-[#3B82F6]' : 'text-[#64748B]'
                  }`}>
                    {lang.code}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
