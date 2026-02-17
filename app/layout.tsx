import type { Metadata } from 'next';
import { Inter, Noto_Sans_SC } from 'next/font/google';
import { Toaster } from 'sonner';
import { I18nProvider } from '@/components/providers/I18nProvider';
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

export const metadata: Metadata = {
  title: 'AI Solution | AI-ассистенты для автоматизации продаж',
  description: 'AI-ассистенты отвечают клиентам за 30 секунд в Telegram, Instagram, WhatsApp. Квалификация лидов 24/7. Возвращаем 30% потерянных клиентов.',
  keywords: 'AI ассистент, автоматизация продаж, Telegram бот, CRM интеграция, квалификация лидов, 24/7 продажи',
  authors: [{ name: 'aisolution' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'AI Solution | AI-ассистенты для автоматизации продаж',
    description: 'AI-ассистенты отвечают за 30 секунд в Telegram, Instagram, WhatsApp. Квалификация лидов 24/7.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'AI Solution',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Solution | AI-ассистенты для автоматизации продаж',
    description: 'AI-ассистенты отвечают за 30 секунд в Telegram, Instagram, WhatsApp.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning className={`scroll-smooth ${inter.variable} ${notoSansSC.variable}`}>
      <body suppressHydrationWarning className={`${inter.className} bg-[#FAFBFC] text-[#0F1419]`}>
        <I18nProvider>
          {children}
          <Toaster richColors position="top-center" />
        </I18nProvider>
      </body>
    </html>
  );
}
