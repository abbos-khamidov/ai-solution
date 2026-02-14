'use client';

import { useLanguage } from '@/lib/i18n/useLanguage';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      <button
        onClick={() => setLanguage('ru')}
        className={`px-2 py-1 rounded transition-colors duration-200 ${
          language === 'ru'
            ? 'text-[#D4A853] bg-[#D4A853]/10'
            : 'text-gray-400 hover:text-gray-300'
        }`}
      >
        RU
      </button>
      <span className="text-gray-600">/</span>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded transition-colors duration-200 ${
          language === 'en'
            ? 'text-[#D4A853] bg-[#D4A853]/10'
            : 'text-gray-400 hover:text-gray-300'
        }`}
      >
        EN
      </button>
    </div>
  );
}
