'use client';

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load saved language preference on mount
    const saved = localStorage.getItem('aisolution-lang');
    if (saved && saved !== i18n.language) {
      i18n.changeLanguage(saved);
    }
    setMounted(true);
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

  if (!mounted) {
    return <>{children}</>;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
