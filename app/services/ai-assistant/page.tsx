import type { Metadata } from 'next';
import AIAssistantContent from './content';
import { DEFAULT_TWITTER_IMAGE, createAlternates } from '@/lib/seo';

const SITE_URL = 'https://aisolution.uz';
const SLUG = '/services/ai-assistant';
const TITLE = 'Личный ассистент ИИ для бизнеса';
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

const faqItems = [
  { q: 'Чем личный ИИ-ассистент отличается от чат-бота?', a: 'Личный ассистент обучен на данных вашей компании и помогает с внутренними задачами: сводки, отчёты, поиск по документам. Чат-бот в первую очередь общается с клиентами.' },
  { q: 'Сколько стоит внедрение личного ИИ-ассистента?', a: 'Зависит от объёма данных и интеграций. Ориентир: от $3 000 за внедрение. Точная смета после аудита задач.' },
  { q: 'Какие данные нужны для обучения ассистента?', a: 'Документы, база знаний, FAQ, внутренние регламенты. Поддерживаем интеграцию с 1С, Bitrix24, Google Workspace и другими источниками.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function AIAssistantPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AIAssistantContent />
    </>
  );
}
