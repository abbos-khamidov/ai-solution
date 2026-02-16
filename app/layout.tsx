import type { Metadata } from 'next';
import { Inter, Noto_Sans_SC } from 'next/font/google';
import { Toaster } from 'sonner';
import { I18nProvider } from '@/components/providers/I18nProvider';
import { ChatAssistant } from '@/components/assistant/ChatAssistant';
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
  title: 'AI Solution | ИИ-решения для автоматизации бизнеса',
  description: 'ИИ-помощники для Telegram, автоматизация продаж и поддержки. Квалификация лидов 24/7, интеграция с CRM. От 490,000 сум/мес.',
  keywords: 'ИИ, автоматизация, Telegram боты, CRM, продажи, лиды, Узбекистан',
  authors: [{ name: 'aisolution' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'AI Solution | ИИ-решения для автоматизации бизнеса',
    description: 'ИИ-помощники для Telegram, автоматизация продаж и поддержки. Квалификация лидов 24/7.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'AI Solution',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Solution | ИИ-решения для автоматизации бизнеса',
    description: 'ИИ-помощники для Telegram, автоматизация продаж и поддержки.',
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
    <html lang="ru" className={`scroll-smooth ${inter.variable} ${notoSansSC.variable}`}>
      <body className={`${inter.className} bg-[#FAFBFC] text-[#0F1419]`}>
        <I18nProvider>
          {children}
        </I18nProvider>
        <Toaster richColors position="top-center" />
        <ChatAssistant />
      </body>
    </html>
  );
}
