import type { Metadata } from 'next';
import TelegramBotsContent from './content';

export const metadata: Metadata = {
  title: 'Разработка Telegram ботов для бизнеса | aisolution',
  description: 'Автоматизация продаж, поддержки, маркетинга. Платежи, CRM интеграция, от $1,500.',
  keywords: 'telegram bot development, payments, crm automation, marketing bot, customer support bot',
  openGraph: {
    title: 'Разработка Telegram ботов для бизнеса | aisolution',
    description: 'Автоматизация продаж, поддержки, маркетинга.',
    type: 'website',
  },
};

export default function TelegramBotsPage() {
  return <TelegramBotsContent />;
}
