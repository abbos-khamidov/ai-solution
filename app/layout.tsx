import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { I18nProvider } from '@/components/providers/I18nProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import { createAlternates, SITE_URL } from '@/lib/seo';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});


const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || process.env.GOOGLE_SITE_VERIFICATION;
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-MZ0CD3QZZ9';

const alternates = createAlternates(SITE_URL);

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL.replace(/\/$/, '')}/#organization`,
  name: 'AI Solution',
  alternateName: ['AISolution', 'aisolution.uz', 'Ай Солюшн'],
  url: 'https://aisolution.uz',
  logo: 'https://aisolution.uz/logo.png',
  description:
    'Компания по автоматизации бизнеса с помощью искусственного интеллекта в Ташкенте, Узбекистан',
  telephone: '+998939492000',
  email: 'info@aisolution.uz',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Богибустон, 186',
    addressLocality: 'Ташкент',
    addressRegion: 'Ташкентская область',
    addressCountry: 'UZ',
  },
  areaServed: ['UZ', 'KZ', 'KG', 'TJ'],
  sameAs: [
    'https://t.me/aisolution_uz',
    'https://instagram.com/aisolution_uz',
    'https://linkedin.com/company/aisolution-uz',
  ],
  foundingDate: '2024',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: '10' },
};

export const metadata: Metadata = {
  metadataBase: new URL('https://aisolution.uz'),
  title: {
    default: 'ИИ-автоматизация для бизнеса в Узбекистане | AI Solution',
    template: '%s | AI Solution — ИИ-автоматизация бизнеса',
  },
  description:
    'AI Solution — внедряем искусственный интеллект для автоматизации продаж, клиентского сервиса и бизнес-процессов в Ташкенте и Узбекистане. Ответ за 30 сек, запуск от 10 дней.',
  keywords: [
    'ии автоматизация',
    'автоматизация бизнеса ташкент',
    'ии ассистент для бизнеса',
    'ai боты узбекистан',
    'внедрение ии',
  ],
  authors: [{ name: 'AI Solution', url: SITE_URL }],
  creator: 'AI Solution',
  publisher: 'AI Solution',
  formatDetection: { telephone: false, email: false, address: false },
  alternates: {
    canonical: 'https://aisolution.uz',
    languages: alternates.languages,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_UZ',
    url: 'https://aisolution.uz',
    siteName: 'AI Solution',
    title: 'ИИ-автоматизация для бизнеса в Узбекистане | AI Solution',
    description: 'Внедряем ИИ-ботов для продаж и поддержки 24/7. 120+ B2B компаний. Ташкент, Узбекистан.',
    alternateLocale: ['uz_UZ'],
    images: [{ url: 'https://aisolution.uz/og-image.png', width: 1200, height: 630, alt: 'AI Solution' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ИИ-автоматизация для бизнеса в Узбекистане | AI Solution',
    description:
      'Внедряем ИИ-ботов для продаж и поддержки 24/7. 120+ B2B компаний. Ташкент, Узбекистан.',
  },
  robots: { index: true, follow: true },
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning className={`scroll-smooth ${inter.variable}`}>
      <head>
        <meta name="format-detection" content="telephone=no" />
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
      <body suppressHydrationWarning className={`${inter.className} bg-background text-foreground antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <I18nProvider>
          {children}
          <Toaster richColors position="top-center" />
        </I18nProvider>
      </body>
    </html>
  );
}
