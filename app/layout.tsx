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
  title: 'AI Solution | Intelligent AI Solutions',
  description: 'We design and deploy AI systems that transform how businesses operate. From intelligent automation to predictive analytics — built for scale.',
  keywords: 'AI, artificial intelligence, machine learning, automation, enterprise AI, predictive analytics',
  authors: [{ name: 'aisolution' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'AI Solution | Intelligent AI Solutions',
    description: 'We design and deploy AI systems that transform how businesses operate.',
    type: 'website',
    locale: 'en_US',
    siteName: 'AI Solution',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Solution | Intelligent AI Solutions',
    description: 'We design and deploy AI systems that transform how businesses operate.',
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
    <html lang="en" className={`scroll-smooth ${inter.variable} ${notoSansSC.variable}`}>
      <body className={`${inter.className} bg-[#FAFBFC] text-[#0F1419]`}>
        <I18nProvider>
          {children}
        </I18nProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
