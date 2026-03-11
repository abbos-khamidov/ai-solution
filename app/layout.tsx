import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { I18nProvider } from '@/components/providers/I18nProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aisolution.uz';
const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'AI Solution — автоматизация бизнеса в Ташкенте | Внедрение ИИ в Узбекистане',
    template: '%s | AI Solution',
  },
  description: 'Автоматизация бизнеса в Ташкенте и Узбекистане с помощью искусственного интеллекта. Внедрение ИИ: Telegram-боты, бот-менеджер, аналитика. Ответ клиентам за 30 секунд 24/7. Офис в Ташкенте.',
  keywords: [
    'автоматизация бизнеса Ташкент',
    'автоматизация бизнеса в Ташкенте',
    'ИИ в Ташкенте',
    'ИИ Ташкент',
    'внедрение искусственного интеллекта Ташкент',
    'внедрение искусственного интеллекта в Ташкенте',
    'внедрение ИИ в Узбекистане',
    'внедрение искусственного интеллекта Узбекистан',
    'автоматизация бизнеса Узбекистан',
    'автоматизация бизнеса в Узбекистане',
    'AI автоматизация Ташкент',
    'искусственный интеллект для бизнеса Ташкент',
    'внедрение ИИ в бизнес Ташкент',
    'AI чат-бот для бизнеса Узбекистан',
    'автоматизация продаж Ташкент',
    'чат-бот для бизнеса Ташкент',
    'корпоративный AI ассистент Ташкент',
    'AI менеджер по продажам Ташкент',
    'Telegram бот для бизнеса Ташкент',
    'автоматизация клиентского сервиса Узбекистан',
    // Узбекский
    'Toshkentda biznes avtomatlashtirish',
    "sun'iy intellekt Toshkent",
    "sun'iy intellekt joriy etish Toshkent",
    'biznes avtomatlashtirish O\'zbekiston',
    'AI chatbot Toshkent',
    'Toshkentda AI joriy etish',
  ],
  authors: [{ name: 'AI Solution', url: SITE_URL }],
  creator: 'AI Solution',
  publisher: 'AI Solution',
  formatDetection: { telephone: true, email: true, address: false },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Автоматизация бизнеса в Ташкенте — внедрение ИИ',
    description: 'Автоматизация бизнеса в Ташкенте и Узбекистане: внедрение искусственного интеллекта, Telegram-боты, бот-менеджер, аналитика. Ответ за 30 секунд 24/7.',
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['uz_UZ'],
    siteName: 'AI Solution',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Автоматизация бизнеса в Ташкенте — внедрение ИИ в Узбекистане',
    description: 'Внедрение искусственного интеллекта в Ташкенте. Автоматизация бизнеса, Telegram-боты, аналитика. Ответ за 30 сек 24/7.',
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
    <html lang="ru" suppressHydrationWarning className={`scroll-smooth ${inter.variable}`}>
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
