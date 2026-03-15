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
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-MZ0CD3QZZ9';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'AI-боты для бизнеса в Ташкенте — Автоматизация продаж | AI Solution',
    template: '%s | AI Solution',
  },
  description: 'Внедряем AI-ботов для Telegram, Instagram и WhatsApp в Ташкенте. Бот отвечает за 30 секунд, квалифицирует лиды и передаёт горячих менеджеру. Внедрение за 10 дней. Бесплатный аудит.',
  keywords: 'AI боты Ташкент, автоматизация бизнеса Узбекистан, чат-бот CRM, AI Solution',
  authors: [{ name: 'AI Solution', url: SITE_URL }],
  creator: 'AI Solution',
  publisher: 'AI Solution',
  formatDetection: { telephone: true, email: true, address: false },
  alternates: {
    canonical: SITE_URL,
    languages: { ru: 'https://aisolution.uz/', uz: 'https://aisolution.uz/', 'x-default': 'https://aisolution.uz/' },
  },
  openGraph: {
    title: 'Автоматизация бизнеса в Ташкенте — внедрение ИИ',
    description: 'Внедряем AI-ботов для Telegram, Instagram и WhatsApp в Ташкенте. Бот отвечает за 30 секунд, квалифицирует лиды и передаёт горячих менеджеру. Внедрение за 10 дней. Бесплатный аудит.',
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['uz_UZ'],
    siteName: 'AI Solution',
    url: SITE_URL,
    images: [{ url: 'https://aisolution.uz/og-image.png', width: 1200, height: 630, alt: 'AI Solution' }],
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
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
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
