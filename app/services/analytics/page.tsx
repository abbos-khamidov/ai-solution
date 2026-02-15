import type { Metadata } from 'next';
import AnalyticsContent from './content';

export const metadata: Metadata = {
  title: 'Бизнес-аналитика и интерактивный дашборд | aisolution',
  description: 'Отслеживайте KPI, производительность в реальном времени. Chart.js, D3, Power BI интеграции, от $3,000/месяц.',
  keywords: 'business analytics, dashboard, kpi, real-time data visualization, power bi, chart.js',
  openGraph: {
    title: 'Бизнес-аналитика и интерактивный дашборд | aisolution',
    description: 'Отслеживайте KPI, производительность в реальном времени.',
    type: 'website',
  },
};

export default function AnalyticsPage() {
  return <AnalyticsContent />;
}
