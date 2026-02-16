'use client';

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Load saved language preference on mount (after hydration)
    const saved = localStorage.getItem('aisolution-lang');
    if (saved && saved !== i18n.language) {
      i18n.changeLanguage(saved);
    }
    setHydrated(true);
  }, []);

  // Update html lang attribute when language changes
  useEffect(() => {
    if (!hydrated) return;

    const handleLanguageChange = (lng: string) => {
      document.documentElement.lang = lng;
      localStorage.setItem('aisolution-lang', lng);
      if (lng === 'zh') {
        document.documentElement.classList.add('lang-zh');
      } else {
        document.documentElement.classList.remove('lang-zh');
      }
    };

    i18n.on('languageChanged', handleLanguageChange);
    handleLanguageChange(i18n.language);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [hydrated]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
