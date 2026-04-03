import type { Metadata } from 'next';
import { DEFAULT_TWITTER_IMAGE, SITE_URL } from '@/lib/seo';
import { MoneyLandingPage, type MoneyLandingConfig } from '@/components/seo/MoneyLandingPage';

const SLUG = '/ii-avtomatizaciya-uzbekistan';
const TITLE = 'ИИ-автоматизация в Узбекистане — Внедрение искусственного интеллекта | AI Solution';
const DESCRIPTION =
  'Внедряем ИИ в бизнес-процессы: автоматизация продаж, найма, аналитики и клиентского сервиса. Кейсы из Узбекистана, Казахстана. Консультация бесплатно.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'ИИ автоматизация Узбекистан',
    'автоматизация бизнеса Узбекистан',
    'внедрение ИИ в Узбекистане',
    'AI Uzbekistan',
    'автоматизация продаж Ташкент',
    'искусственный интеллект для компаний Узбекистан',
  ],
  alternates: { canonical: 'https://aisolution.uz/ii-avtomatizaciya-uzbekistan/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL.replace(/\/$/, '')}${SLUG}/`,
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
  pageTitle: 'ИИ автоматизация в Узбекистане',
  eyebrow: 'AI для компаний Узбекистана',
  title: 'Автоматизация бизнеса через ИИ в Узбекистане — внедрение за 10 дней',
  description:
    'Внедряем искусственный интеллект для компаний в Узбекистане: автоматизация заявок, клиентского сервиса, продаж и управленческой аналитики.',
  bullets: ['Ташкент', 'Самарканд', 'Фергана', 'Удаленный запуск'],
  sections: [
    {
      title: 'Для каких ниш подходит',
      text: 'Образование, медицина, ритейл, e-commerce, недвижимость, сервисные компании и B2B. Настраиваем под специфику и язык коммуникации.',
    },
    {
      title: 'Почему компании выбирают AI',
      text: 'ИИ позволяет отвечать клиентам быстрее, экономить ресурсы команды, повышать качество обработки заявок и принимать решения на основе данных.',
    },
    {
      title: 'Для каких задач подходит автоматизация',
      text: 'Приём заявок 24/7, квалификация лидов Cold/Warm/Hot, ответы на типовые вопросы, интеграция с CRM (Bitrix24, amoCRM), уведомления менеджерам с контекстом. Один AI-движок для Telegram, Instagram и WhatsApp.',
    },
    {
      title: 'Реальный результат: кейс MarsIT',
      text: 'IT-компания в Ташкенте получала заявки с задержкой 3–4 часа. После внедрения AI-бота с квалификацией: первый ответ за 30 секунд, конверсия +35% за 6 недель, пропущенных заявок ночью — 0. Подробнее в кейсе MarsIT на сайте.',
    },
    {
      title: 'Стоимость и сроки',
      text: 'Базовый бот — от $1 500, 1–2 недели. AI с квалификацией — от $2 500, 2–4 недели. Поддержка от $300/мес. Бесплатный аудит 60 минут для оценки.',
    },
    {
      title: 'Как проходит внедрение',
      text: 'Аудит и техзадание (день 1–2). Разработка сценариев (день 3–7). Интеграция и тесты (день 8–12). Запуск, мониторинг 2 недели, далее ежемесячная поддержка.',
    },
  ],
  faq: [
    {
      q: 'Работаете только в Ташкенте?',
      a: 'Нет. Мы работаем по всему Узбекистану: Ташкент, Самарканд, Фергана, Андижан, Наманган, Бухара и другие города.',
    },
    {
      q: 'Можно внедрить AI без сложной инфраструктуры?',
      a: 'Да. Начать можно с одного канала и базовых сценариев, а затем поэтапно добавлять CRM, аналитику и новые процессы.',
    },
    {
      q: 'Есть ли поддержка после запуска?',
      a: 'Да, мы сопровождаем проект после релиза: оптимизируем сценарии, обновляем базу знаний и улучшаем конверсию.',
    },
    {
      q: 'Работает ли бот на узбекском языке?',
      a: 'Да. Настраиваем на русском, узбекском и английском. Один бот может вести диалог на нескольких языках автоматически.',
    },
    {
      q: 'Можно ли подключить к Instagram и WhatsApp?',
      a: 'Да. Один AI-движок работает в Telegram, Instagram Direct и WhatsApp с сохранением контекста.',
    },
    {
      q: 'Что если клиент задаст нестандартный вопрос?',
      a: 'AI отвечает из базы знаний. Если вопроса нет в базе — бот переключает на менеджера с полным контекстом разговора.',
    },
  ],
  relatedLinks: [
    { href: '/biznes-avtomatizaciya-uzbekistan', label: 'Полное руководство по автоматизации бизнеса в Узбекистане' },
    { href: '/cases/marsit-lead-automation', label: 'Кейс MarsIT' },
    { href: '/tashkent', label: 'Локальная страница AI в Ташкенте' },
    { href: '/services/ai-managers', label: 'AI-менеджеры для продаж' },
    { href: '/services/ai-assistant', label: 'AI-ассистент для команды' },
    { href: '/blog/vnedrenie-ii-centralnaya-aziya', label: 'Рынок ИИ в Центральной Азии' },
  ],
};

export default function IIAvtomatizaciyaUzbekistanPage() {
  return <MoneyLandingPage config={config} />;
}
