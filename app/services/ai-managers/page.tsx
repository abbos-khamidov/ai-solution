import type { Metadata } from 'next';
import AIManagersContent from './content';

export const metadata: Metadata = {
  title: 'ИИ-менеджеры для Telegram WhatsApp Instagram | aisolution',
  description:
    'Автоматизируйте мессенджеры с ИИ-менеджерами. 24/7 ответы, интеграция CRM, от $1,500/месяц. Рост конверсии в 3 раза.',
  keywords:
    'telegram bot, whatsapp automation, instagram dm bot, ai manager, customer service automation, crm integration',
  openGraph: {
    title: 'ИИ-менеджеры для Telegram WhatsApp Instagram | aisolution',
    description:
      'Автоматизируйте мессенджеры с ИИ-менеджерами. 24/7 ответы, интеграция CRM, рост конверсии в 3 раза.',
    type: 'website',
  },
};

export default function AIManagersPage() {
  return <AIManagersContent />;
}
