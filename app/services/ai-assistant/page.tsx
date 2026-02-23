import type { Metadata } from 'next';
import AIAssistantContent from './content';
import { DEFAULT_TWITTER_IMAGE, createAlternates } from '@/lib/seo';

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
    'ИИ ассистент Ташкент',
    'искусственный интеллект для бизнеса Ташкент',
    'автоматизация в Ташкенте',
  ],
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${SITE_URL}${SLUG}`,
    type: 'website',
    locale: 'ru_RU',
    siteName: 'AI Solution',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: [{ url: DEFAULT_TWITTER_IMAGE }],
  },
  robots: { index: true, follow: true },
};

export default function AIAssistantPage() {
  return <AIAssistantContent />;
}
