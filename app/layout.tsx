import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { IntroProvider } from '@/components/intro/IntroProvider';
import { LanguageProvider } from '@/lib/i18n/useLanguage';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { CustomCursor } from '@/components/ui/CustomCursor';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AI Solution | Автоматизация бизнеса с ИИ',
  description: 'Telegram боты, CRM интеграции и AI-решения для вашего бизнеса. Увеличьте выручку на 3x с помощью AI-автоматизации.',
  keywords: 'AI, автоматизация, Telegram боты, CRM, чат-боты, бизнес, AmoCRM, Bitrix24, WhatsApp, Instagram',
  authors: [{ name: 'AI Solution' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'AI Solution | Автоматизация бизнеса с ИИ',
    description: 'Telegram боты, CRM интеграции и AI-решения для вашего бизнеса. Увеличьте выручку на 3x с помощью AI-автоматизации.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'AI Solution',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Solution | Автоматизация бизнеса с ИИ',
    description: 'Telegram боты, CRM интеграции и AI-решения для вашего бизнеса.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`scroll-smooth ${inter.variable}`}>
      <body className={inter.className}>
        <LanguageProvider>
          <IntroProvider>
            <CustomCursor />
            <ScrollProgress />
            {children}
          </IntroProvider>
          <Toaster richColors position="top-center" />
        </LanguageProvider>
      </body>
    </html>
  );
}
