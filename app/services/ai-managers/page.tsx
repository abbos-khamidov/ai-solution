import type { Metadata } from 'next';
import AIManagersContent from './content';

const SITE_URL = 'https://aisolution.uz';
const SLUG = '/services/ai-managers';
const TITLE = 'Бот-менеджер для Telegram, WhatsApp, Instagram | AI Solution Ташкент';
const DESC = 'Бот-менеджер — ИИ который отвечает клиентам в Telegram, WhatsApp и Instagram за 30 секунд 24/7. Квалификация лидов, интеграция CRM, рост конверсии ×3. Ташкент, Узбекистан.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    'бот менеджер Telegram Ташкент',
    'ИИ менеджер для бизнеса Узбекистан',
    'автоматический менеджер WhatsApp',
    'AI менеджер по продажам Ташкент',
    'автоматизация мессенджеров Узбекистан',
    'менеджер бот Instagram',
    'ответы клиентам автоматически',
    'квалификация лидов AI',
    'CRM интеграция Ташкент',
    'бот для продаж Узбекистан',
  ],
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${SITE_URL}${SLUG}`,
    type: 'website',
    locale: 'ru_RU',
    siteName: 'AI Solution',
  },
  robots: { index: true, follow: true },
};

export default function AIManagersPage() {
  return <AIManagersContent />;
}
