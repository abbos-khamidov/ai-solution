import type { Metadata } from 'next';
import { Inter, Noto_Sans_SC } from 'next/font/google';
import { Toaster } from 'sonner';
import { I18nProvider } from '@/components/providers/I18nProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sc',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aisolution.uz';
const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'AI Solution — AI чат-бот для бизнеса Узбекистан | Отвечает за 30 секунд',
    template: '%s | AI Solution',
  },
  description: 'AI-ассистент для бизнеса в Узбекистане: отвечает клиентам за 30 секунд в Telegram, Instagram, WhatsApp. Квалификация лидов Cold/Warm/Hot 24/7. Конверсия +34%. Ташкент, Узбекистан, Центральная Азия.',
  keywords: [
    // Русский
    'AI чат-бот для бизнеса Узбекистан',
    'внедрение ИИ в бизнес Ташкент',
    'внедрение искусственного интеллекта Узбекистан',
    'автоматизация продаж Telegram бот',
    'AI ассистент для Instagram WhatsApp',
    'квалификация лидов автоматически',
    'чат-бот для интернет-магазина Узбекистан',
    'личный AI бот ассистент для бизнеса',
    'создать ChatGPT для своей компании',
    'корпоративный AI ассистент Ташкент',
    'AI для бизнеса Центральная Азия',
    'чат-бот для бизнеса Ташкент',
    'автоответчик в Telegram Instagram WhatsApp',
    'AI менеджер по продажам',
    'автоматизация клиентского сервиса СНГ',
    'создать ИИ бот для компании',
    'умный чат-бот для сайта',
    // Узбекский
    'biznes uchun AI chatbot Toshkent',
    'sun\'iy intellekt biznesga joriy etish',
    'AI yordamchi Telegram Instagram',
    'mijozlarga avtomatik javob berish',
    'Toshkentda AI joriy etish',
  ],
  authors: [{ name: 'AI Solution', url: SITE_URL }],
  creator: 'AI Solution',
  publisher: 'AI Solution',
  formatDetection: { telephone: true, email: true, address: false },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'ru': `${SITE_URL}/`,
      'uz': `${SITE_URL}/`,
      'en': `${SITE_URL}/`,
      'x-default': `${SITE_URL}/`,
    },
  },
  openGraph: {
    title: 'AI Solution — ИИ автоматизация бизнеса | Ташкент, Узбекистан',
    description: 'Telegram-боты, LLM, бот-менеджер, аналитика для компаний. Ответ за 30 секунд 24/7. Офис в Ташкенте, работаем по всему Узбекистану.',
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['uz_UZ', 'en_US'],
    siteName: 'AI Solution',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Solution — ИИ автоматизация бизнеса | Ташкент',
    description: 'Telegram-боты, LLM, бот-менеджер, аналитика для компаний. Ответ за 30 сек 24/7.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning className={`scroll-smooth ${inter.variable} ${notoSansSC.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body suppressHydrationWarning className={`${inter.className} bg-[#05050A] text-[#F8FAFC]`}>
        <I18nProvider>
          {children}
          <Toaster richColors position="top-center" />
        </I18nProvider>
      </body>
    </html>
  );
}
