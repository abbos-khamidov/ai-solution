import type { Metadata } from 'next';
import AIAssistantContent from './content';

const SITE_URL = 'https://aisolution.uz';
const SLUG = '/services/ai-assistant';
const TITLE = 'Личный ассистент ИИ для бизнеса | AI Solution Ташкент';
const DESC = 'Личный ассистент ИИ для руководителей и команд в Ташкенте. ChatGPT обученный на данных вашей компании. Экономит 15 часов в неделю. LLM решения для бизнеса Узбекистана.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    'личный ассистент ИИ Ташкент',
    'персональный AI ассистент бизнес',
    'LLM для бизнеса Узбекистан',
    'ChatGPT для компании Ташкент',
    'корпоративный ИИ ассистент',
    'AI помощник руководителя',
    'автоматизация задач ИИ Ташкент',
    'умный ассистент для бизнеса',
    'AI на основе данных компании',
    'LLM Ташкент',
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

export default function AIAssistantPage() {
  return <AIAssistantContent />;
}
