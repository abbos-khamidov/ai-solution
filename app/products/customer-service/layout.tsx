import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Service Bot — AI-ассистент для продаж в мессенджерах',
  description: 'AI-бот для Telegram, Instagram, WhatsApp. Отвечает за 30 секунд, квалифицирует лиды Cold/Warm/Hot, работает 24/7. От $1 000.',
  openGraph: {
    title: 'Customer Service Bot — AI Solution',
    description: 'AI-бот для мессенджеров. Ответ за 30 секунд, квалификация лидов, антифрод. 24/7.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: { canonical: '/products/customer-service' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
