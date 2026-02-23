'use client';

import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n, { normalizeLanguage } from '@/lib/i18n';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const sync = (lng: string) => {
      const normalized = normalizeLanguage(lng);
      document.documentElement.lang = normalized;
      localStorage.setItem('aisolution-lang', normalized);
      document.documentElement.classList.remove('lang-zh');
    };

    const saved = localStorage.getItem('aisolution-lang');
    const preferred = normalizeLanguage(saved || i18n.resolvedLanguage || window.navigator.language);

    if (preferred !== normalizeLanguage(i18n.resolvedLanguage || i18n.language)) {
      void i18n.changeLanguage(preferred);
    }

    sync(i18n.resolvedLanguage || i18n.language);
    i18n.on('languageChanged', sync);

    const onStorage = (event: StorageEvent) => {
      if (event.key !== 'aisolution-lang' || !event.newValue) return;
      const nextLang = normalizeLanguage(event.newValue);
      if (nextLang !== normalizeLanguage(i18n.resolvedLanguage || i18n.language)) {
        void i18n.changeLanguage(nextLang);
      }
    };

    window.addEventListener('storage', onStorage);

    return () => {
      i18n.off('languageChanged', sync);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
