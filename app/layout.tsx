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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'AI Solution — AI-ассистенты для автоматизации продаж в Узбекистане',
    template: '%s | AI Solution',
  },
  description: 'AI-ассистенты отвечают клиентам за 30 секунд в Telegram, Instagram, WhatsApp. Квалификация лидов 24/7. Возвращаем 30% потерянных клиентов. Ташкент, Узбекистан.',
  keywords: [
    'AI ассистент', 'автоматизация продаж', 'Telegram бот', 'чат-бот',
    'CRM интеграция', 'квалификация лидов', 'искусственный интеллект',
    'AI для бизнеса', 'Узбекистан', 'Ташкент', 'автоматизация мессенджеров',
    'suniy intellekt', 'savdo avtomatizatsiyasi', 'chat bot',
  ],
  authors: [{ name: 'AI Solution', url: SITE_URL }],
  creator: 'AI Solution',
  publisher: 'AI Solution',
  formatDetection: { telephone: true, email: true, address: false },
  alternates: {
    canonical: '/',
    languages: { 'ru': '/', 'uz': '/', 'en': '/', 'zh': '/' },
  },
  openGraph: {
    title: 'AI Solution — AI-ассистенты для автоматизации продаж',
    description: 'Отвечаем клиентам за 30 секунд в Telegram, Instagram, WhatsApp. Квалификация лидов 24/7. Возвращаем 30% потерянных клиентов.',
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['uz_UZ', 'en_US'],
    siteName: 'AI Solution',
    url: SITE_URL,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'AI Solution — AI-ассистенты для бизнеса' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Solution — AI-ассистенты для автоматизации продаж',
    description: 'Отвечаем клиентам за 30 секунд. Квалификация лидов 24/7.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {},
  icons: {
    icon: [
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
