import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Management Assistant — AI-помощник для управления бизнесом',
  description: 'AI-ассистент для контроля команды: дашборд метрик, KPI отчёты, финансовый трекер, контроль задач и дедлайнов. От $3 000.',
  openGraph: {
    title: 'Management Assistant — AI Solution',
    description: 'AI-помощник для управления: дашборды, KPI, автоматические отчёты собственнику.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: { canonical: '/products/management-assistant' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
