import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corporate AI (RAG) — Корпоративная база знаний с AI',
  description: 'Корпоративный AI на базе RAG: база знаний компании, интеграция с 1С/Bitrix24/amoCRM, on-premise вариант. От $8 000.',
  openGraph: {
    title: 'Corporate AI (RAG) — AI Solution',
    description: 'Корпоративная база знаний с AI. Интеграция с 1С, CRM, on-premise.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: { canonical: '/products/corporate-ai' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
