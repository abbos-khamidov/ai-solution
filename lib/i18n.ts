import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
import uz from '@/locales/uz.json';
import zh from '@/locales/zh.json';

export const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
] as const;

export type LanguageCode = (typeof languages)[number]['code'];

// Get saved language or default to 'en'
function getSavedLanguage(): LanguageCode {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('aisolution-lang') as LanguageCode;
    if (saved && languages.some((l) => l.code === saved)) {
      return saved;
    }
  }
  return 'en';
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    uz: { translation: uz },
    zh: { translation: zh },
  },
  lng: 'en', // Always init with 'en' for SSR/hydration consistency; I18nProvider switches to saved on mount
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
