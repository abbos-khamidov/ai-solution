import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
import uz from '@/locales/uz.json';
import zh from '@/locales/zh.json';

export const languages = [
  { code: 'en', label: 'English', flag: '\u{1F1FA}\u{1F1F8}' },
  { code: 'ru', label: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439', flag: '\u{1F1F7}\u{1F1FA}' },
  { code: 'uz', label: "O'zbek", flag: '\u{1F1FA}\u{1F1FF}' },
  { code: 'zh', label: '\u4E2D\u6587', flag: '\u{1F1E8}\u{1F1F3}' },
] as const;

export type LanguageCode = (typeof languages)[number]['code'];
const DEFAULT_LANGUAGE: LanguageCode = 'ru';
const SUPPORTED_LANGS = new Set<LanguageCode>(languages.map((l) => l.code));

export function normalizeLanguage(input?: string | null): LanguageCode {
  if (!input) return DEFAULT_LANGUAGE;
  const candidate = input.toLowerCase().split('-')[0] as LanguageCode;
  return SUPPORTED_LANGS.has(candidate) ? candidate : DEFAULT_LANGUAGE;
}

// Get saved language or default to 'ru' (target: Uzbekistan/Russia B2B)
function getSavedLanguage(): LanguageCode {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('aisolution-lang');
    if (saved) {
      return normalizeLanguage(saved);
    }
    return normalizeLanguage(window.navigator.language);
  }
  return DEFAULT_LANGUAGE;
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    uz: { translation: uz },
    zh: { translation: zh },
  },
  lng: getSavedLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: Array.from(SUPPORTED_LANGS),
  load: 'languageOnly',
  nonExplicitSupportedLngs: true,
  interpolation: {
    escapeValue: false, // React already escapes
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
