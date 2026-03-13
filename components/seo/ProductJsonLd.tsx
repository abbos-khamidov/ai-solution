import { SITE_URL } from '@/lib/seo';

interface ProductJsonLdProps {
  product: 'customer-service' | 'management-assistant' | 'corporate-ai';
}

const products = {
  'customer-service': {
    name: 'Customer Service Bot',
    description: 'AI чат-бот для Telegram, Instagram, WhatsApp. Отвечает клиентам за 30 секунд, квалифицирует лидов Cold/Warm/Hot, фильтрует спам и мошенников, работает 24/7 без выходных.',
    url: `${SITE_URL}/products/customer-service`,
    image: `${SITE_URL}/og-image.png`,
    lowPrice: '1000',
    highPrice: '6000',
    breadcrumbs: [
      { name: 'Главная', url: SITE_URL },
      { name: 'Продукты', url: `${SITE_URL}/#products` },
      { name: 'Customer Service Bot', url: `${SITE_URL}/products/customer-service` },
    ],
    faq: [
      {
        q: 'Какие мессенджеры поддерживает Customer Service Bot?',
        a: 'Customer Service Bot работает в Telegram, Instagram Direct и WhatsApp одновременно. Один ассистент отвечает во всех трёх каналах.',
      },
      {
        q: 'Как происходит квалификация лидов?',
        a: 'AI автоматически задаёт уточняющие вопросы и присваивает статус: Cold (не готов), Warm (интересуется), Hot (готов купить). Горячие лиды мгновенно передаются менеджеру.',
      },
      {
        q: 'Сколько стоит Customer Service Bot?',
        a: 'Стоимость запуска от $1 000, ежемесячное обслуживание от $500. Точная цена определяется после бесплатного аудита.',
      },
    ],
  },
  'management-assistant': {
    name: 'Management Assistant',
    description: 'AI-ассистент для управления бизнесом: контроль команды, KPI и дедлайны, финансовый трекер приход/расход, еженедельные отчёты собственнику в Telegram.',
    url: `${SITE_URL}/products/management-assistant`,
    image: `${SITE_URL}/og-image.png`,
    lowPrice: '3000',
    highPrice: '20000',
    breadcrumbs: [
      { name: 'Главная', url: SITE_URL },
      { name: 'Продукты', url: `${SITE_URL}/#products` },
      { name: 'Management Assistant', url: `${SITE_URL}/products/management-assistant` },
    ],
    faq: [
      {
        q: 'Что контролирует Management Assistant?',
        a: 'Management Assistant контролирует выполнение задач командой, отслеживает KPI и дедлайны, ведёт финансовый трекер и каждую неделю отправляет отчёт собственнику в Telegram.',
      },
      {
        q: 'С какими системами интегрируется Management Assistant?',
        a: 'Management Assistant интегрируется с Google Sheets, Notion, Bitrix24, amoCRM и 1С. В плане Max — полная интеграция с корпоративными системами.',
      },
      {
        q: 'Сколько стоит Management Assistant?',
        a: 'Стоимость запуска от $3 000, ежемесячное обслуживание от $1 200. Точная цена определяется после бесплатного аудита.',
      },
    ],
  },
  'corporate-ai': {
    name: 'Corporate AI (RAG)',
    description: 'Корпоративная база знаний с AI: загружаете документы компании — регламенты, прайсы, инструкции. AI отвечает точно по вашим данным. Интеграция с 1С, Bitrix24, amoCRM. On-premise вариант.',
    url: `${SITE_URL}/products/corporate-ai`,
    image: `${SITE_URL}/og-image.png`,
    lowPrice: '8000',
    highPrice: '20000',
    breadcrumbs: [
      { name: 'Главная', url: SITE_URL },
      { name: 'Продукты', url: `${SITE_URL}/#products` },
      { name: 'Corporate AI (RAG)', url: `${SITE_URL}/products/corporate-ai` },
    ],
    faq: [
      {
        q: 'Что такое Corporate AI (RAG)?',
        a: 'Корпоративная база знаний с ИИ: документы компании индексируются, сотрудники получают ответы из своей базы за секунды. По сути — свой ChatGPT на данных компании.',
      },
      {
        q: 'Что такое RAG-система?',
        a: 'RAG (Retrieval-Augmented Generation) — это AI, который ищет ответы только в ваших корпоративных документах. В отличие от обычного ChatGPT не выдумывает ответы. Если информации нет в документах — честно скажет об этом.',
      },
      {
        q: 'Данные компании безопасны?',
        a: 'В on-premise варианте система разворачивается на вашем собственном сервере или в вашем облаке. Ни один запрос не уходит к OpenAI или другим внешним сервисам. Полная конфиденциальность.',
      },
      {
        q: 'Сколько стоит внедрение RAG/Corporate AI?',
        a: 'Starter от $1 200 за запуск + $400/мес. Growth от $4 500 + $1 500/мес. Enterprise — по запросу. Смета после аудита объёма документов.',
      },
      {
        q: 'Можно ли подключить 1С и Bitrix24?',
        a: 'Да. RAG интегрируется с внутренними системами, документами и CRM. Данные остаются под вашим контролем (в т.ч. on-premise).',
      },
    ],
  },
};

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const p = products[product];

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${p.url}/#product`,
    name: p.name,
    description: p.description,
    url: p.url,
    image: p.image,
    brand: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'AI Solution',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: p.lowPrice,
      highPrice: p.highPrice,
      offerCount: 3,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'AI Solution',
        url: SITE_URL,
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: p.breadcrumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: p.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
