'use client';

import { useEffect, useRef } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

const VALID_LANGS = ['en', 'ru', 'uz', 'zh'];

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const applied = useRef(false);

  useEffect(() => {
    if (applied.current) return;
    applied.current = true;

    // Detect saved language (client-only)
    const saved = localStorage.getItem('aisolution-lang');
    const lang = saved && VALID_LANGS.includes(saved) ? saved : 'ru';

    // Apply immediately if different from current
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }

    // Sync html[lang] and class
    const sync = (lng: string) => {
      document.documentElement.lang = lng;
      localStorage.setItem('aisolution-lang', lng);
      document.documentElement.classList.toggle('lang-zh', lng === 'zh');
    };

    sync(i18n.language);
    i18n.on('languageChanged', sync);
    return () => { i18n.off('languageChanged', sync); };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
