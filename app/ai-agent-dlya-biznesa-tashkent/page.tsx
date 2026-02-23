import type { Metadata } from 'next';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';
import { MoneyLandingPage, type MoneyLandingConfig } from '@/components/seo/MoneyLandingPage';

const SLUG = '/ai-agent-dlya-biznesa-tashkent';
const TITLE = 'AI агент для бизнеса в Ташкенте — внедрение и настройка | AI Solution';
const DESCRIPTION =
  'AI агент для бизнеса в Ташкенте: автоматизация продаж, консультаций и поддержки клиентов. Внедрение под ключ, интеграция с CRM и аналитикой.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'AI агент для бизнеса Ташкент',
    'ИИ агент Ташкент',
    'AI sales agent Ташкент',
    'внедрение AI agent Узбекистан',
    'автоматизация отдела продаж ИИ',
    'AI менеджер продаж',
  ],
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${SLUG}`,
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['uz_UZ'],
    siteName: 'AI Solution',
    images: [{ url: DEFAULT_TWITTER_IMAGE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: DEFAULT_TWITTER_IMAGE }],
  },
  robots: { index: true, follow: true },
};

const config: MoneyLandingConfig = {
  slug: SLUG,
  pageTitle: 'AI агент для бизнеса в Ташкенте',
  eyebrow: 'AI агент / AI Sales Agent',
  title: 'AI агент для бизнеса в Ташкенте',
  description:
    'AI-агент ведет первичные переговоры с клиентами, квалифицирует лидов и передает отделу продаж только целевые заявки. Подходит для B2B и B2C компаний.',
  bullets: ['Sales Agent', 'CRM', 'Лиды 24/7', 'Ташкент'],
  sections: [
    {
      title: 'Что делает AI-агент',
      text: 'Отвечает на входящие вопросы, уточняет потребность и бюджет, сегментирует лидов по приоритету и передает менеджеру готовые сделки.',
    },
    {
      title: 'Какой результат на практике',
      text: 'Сокращается время первого ответа, повышается конверсия в звонок/встречу и снижается операционная нагрузка на отдел продаж.',
    },
  ],
  faq: [
    {
      q: 'AI-агент заменит менеджеров?',
      a: 'Он усиливает менеджеров: берет первичную обработку и фильтрацию, а менеджеры фокусируются на закрытии сделок.',
    },
    {
      q: 'С какими CRM можно интегрировать?',
      a: 'Чаще всего подключаем Bitrix24, amoCRM и Google Sheets. При необходимости делаем кастомную интеграцию через API.',
    },
    {
      q: 'Подходит ли решение для малого бизнеса?',
      a: 'Да. Можно начать с ограниченного пилота на одном канале и масштабировать по мере роста заявок.',
    },
  ],
  relatedLinks: [
    { href: '/services/ai-managers', label: 'Услуга AI-менеджер для мессенджеров' },
    { href: '/products/customer-service', label: 'Продукт Customer Service AI' },
    { href: '/ii-avtomatizaciya', label: 'ИИ автоматизация бизнеса' },
    { href: '/blog/kvalifikaciya-lidov-ai', label: 'Как работает квалификация Cold/Warm/Hot' },
  ],
};

export default function AIAgentForBusinessTashkentPage() {
  return <MoneyLandingPage config={config} />;
}
