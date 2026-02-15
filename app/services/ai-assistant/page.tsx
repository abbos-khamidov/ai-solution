import type { Metadata } from 'next';
import AIAssistantContent from './content';

export const metadata: Metadata = {
  title: 'Персональный ИИ-ассистент на базе знаний компании | aisolution',
  description: 'ChatGPT обученный на ваших данных. Экономьте 15 часов в неделю, автоматизация задач, от $2,000/месяц.',
  keywords: 'ai assistant, chatgpt custom, knowledge base automation, enterprise ai, personal assistant',
  openGraph: {
    title: 'Персональный ИИ-ассистент на базе знаний компании | aisolution',
    description: 'ChatGPT обученный на ваших данных. Экономьте 15 часов в неделю.',
    type: 'website',
  },
};

export default function AIAssistantPage() {
  return <AIAssistantContent />;
}
