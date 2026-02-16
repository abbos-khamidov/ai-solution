'use client';

import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Load saved language preference on mount
    const saved = localStorage.getItem('aisolution-lang');
    if (saved && saved !== i18n.language) {
      i18n.changeLanguage(saved);
    }
  }, []);

  // Update html lang attribute when language changes
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      document.documentElement.lang = lng;
      localStorage.setItem('aisolution-lang', lng);
      // Add font class for Chinese
      if (lng === 'zh') {
        document.documentElement.classList.add('lang-zh');
      } else {
        document.documentElement.classList.remove('lang-zh');
      }
    };

    i18n.on('languageChanged', handleLanguageChange);
    // Set initial state
    handleLanguageChange(i18n.language);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
