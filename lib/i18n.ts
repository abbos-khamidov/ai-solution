import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ru from '@/locales/ru.json';
import uz from '@/locales/uz.json';

export const languages = [
  { code: 'ru', label: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439', flag: '\u{1F1F7}\u{1F1FA}' },
  { code: 'uz', label: "O'zbek", flag: '\u{1F1FA}\u{1F1FF}' },
] as const;

export type LanguageCode = (typeof languages)[number]['code'];
const DEFAULT_LANGUAGE: LanguageCode = 'ru';
const SUPPORTED_LANGS = new Set<LanguageCode>(languages.map((l) => l.code));

export function normalizeLanguage(input?: string | null): LanguageCode {
  if (!input) return DEFAULT_LANGUAGE;
  const candidate = input.toLowerCase().split('-')[0] as LanguageCode;
  return SUPPORTED_LANGS.has(candidate) ? candidate : DEFAULT_LANGUAGE;
}

// Initial language: always 'ru' for SSR and first client paint to avoid hydration mismatch.
// I18nProvider switches to saved/preferred language in useEffect after mount.
function getInitialLanguage(): LanguageCode {
  return DEFAULT_LANGUAGE;
}

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    uz: { translation: uz },
  },
  lng: getInitialLanguage(),
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
