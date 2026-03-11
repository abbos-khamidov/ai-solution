import type { Metadata } from 'next';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';
import { MoneyLandingPage, type MoneyLandingConfig } from '@/components/seo/MoneyLandingPage';

const SLUG = '/ai-bot-tashkent';
const TITLE = 'ИИ бот в Ташкенте для бизнеса — внедрение и запуск';
const DESCRIPTION =
  'ИИ бот в Ташкенте для автоматизации продаж и поддержки: Telegram, Instagram, WhatsApp. Внедрение под бизнес в Узбекистане, квалификация лидов Cold/Warm/Hot.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'ИИ бот Ташкент',
    'AI бот Ташкент',
    'чат бот для бизнеса Ташкент',
    'Telegram бот Ташкент',
    'внедрение ИИ бота Ташкент',
    'автоматизация заявок Узбекистан',
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
  pageTitle: 'ИИ бот в Ташкенте',
  eyebrow: 'ИИ бот для бизнеса в Ташкенте',
  title: 'ИИ бот в Ташкенте для продаж и поддержки 24/7',
  description:
    'Запускаем AI-бота для вашего бизнеса в Ташкенте: быстрые ответы клиентам, квалификация лидов, передача горячих заявок менеджеру и контроль конверсии.',
  bullets: ['Ташкент', 'Узбекистан', 'Ответ за 30 секунд', 'Cold/Warm/Hot'],
  sections: [
    {
      title: 'Где работает ИИ бот',
      text: 'Подключаем Telegram, Instagram Direct и WhatsApp. Один AI-бот ведет диалоги во всех каналах и не теряет лидов в нерабочее время.',
    },
    {
      title: 'Что получает бизнес',
      text: 'Больше обработанных заявок, меньше нагрузки на менеджеров, прозрачная воронка продаж и рост конверсии за счет моментальных ответов.',
    },
  ],
  faq: [
    {
      q: 'Сколько стоит ИИ бот в Ташкенте?',
      a: 'Базовый запуск обычно начинается от $1 000, далее поддержка от $500/мес. Точная стоимость зависит от каналов и сценариев.',
    },
    {
      q: 'За сколько дней можно запустить AI-бота?',
      a: 'Базовый запуск занимает 5-7 рабочих дней. Полная интеграция с CRM и расширенной логикой — около 2-3 недель.',
    },
    {
      q: 'Можно начать только с Telegram?',
      a: 'Да. Чаще всего стартуем с Telegram, а потом добавляем Instagram и WhatsApp без потери истории и логики.',
    },
  ],
  relatedLinks: [
    { href: '/services/telegram-bots', label: 'Telegram-боты для бизнеса' },
    { href: '/services/ai-managers', label: 'AI-менеджеры для мессенджеров' },
    { href: '/tashkent', label: 'Кейсы внедрения AI в Ташкенте' },
    { href: '/blog/avtomatizaciya-prodazh-telegram', label: 'Как автоматизировать продажи через Telegram' },
  ],
};

export default function AIBotTashkentPage() {
  return <MoneyLandingPage config={config} />;
}
