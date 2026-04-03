import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/schemas/BreadcrumbSchema';
import { FAQSchema } from '@/components/schemas/FAQSchema';

export const metadata: Metadata = {
  title: 'ИИ-ассистент для бизнеса в Узбекистане — Ответ за 30 сек, 24/7 | AI Solution',
  description:
    'ИИ-ассистент отвечает клиентам за 30 секунд, квалифицирует лиды и передаёт в CRM. Работает в Telegram, WhatsApp, Instagram. Запуск за 10 дней в Ташкенте.',
  alternates: { canonical: 'https://aisolution.uz/products/customer-service/' },
};

const faqItems = [
  {
    question: 'Что такое ИИ-ассистент для бизнеса?',
    answer:
      'ИИ-ассистент — это программа на основе искусственного интеллекта, которая автоматически отвечает клиентам, квалифицирует лиды и передаёт данные в CRM. Работает 24/7 в Telegram, WhatsApp и Instagram.',
  },
  {
    question: 'Сколько времени занимает запуск ИИ-ассистента?',
    answer:
      'Запуск ИИ-ассистента занимает от 10 рабочих дней. Включает настройку, обучение на данных вашей компании и интеграцию с вашими системами.',
  },
  {
    question: 'С какими системами интегрируется ИИ-ассистент?',
    answer:
      'ИИ-ассистент интегрируется с Bitrix24, amoCRM, 1С, Google Sheets и любыми системами через API. Поддерживает Telegram, WhatsApp, Instagram Direct.',
  },
  {
    question: 'Сколько стоит ИИ-ассистент для бизнеса?',
    answer:
      'Стоимость зависит от сложности задач и интеграций. Бесплатное тестирование доступно для всех новых клиентов. Свяжитесь с нами для расчёта стоимости.',
  },
  {
    question: 'Работает ли ИИ-ассистент на узбекском языке?',
    answer:
      'Да, ИИ-ассистент AI Solution работает на русском, узбекском и английском языках. Можно настроить автоопределение языка клиента.',
  },
  {
    question: 'Что происходит если ИИ не знает ответа?',
    answer:
      'Если ИИ-ассистент не может ответить на вопрос, он автоматически переводит клиента на живого менеджера или сохраняет запрос для последующей обработки.',
  },
];

const breadcrumbItems = [
  { name: 'Главная', url: 'https://aisolution.uz/' },
  { name: 'Продукты', url: 'https://aisolution.uz/products/' },
  { name: 'ИИ-ассистент для бизнеса', url: 'https://aisolution.uz/products/customer-service/' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FAQSchema items={faqItems} />
      <BreadcrumbSchema items={breadcrumbItems} />
      {children}
    </>
  );
}
