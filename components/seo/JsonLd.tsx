const SITE_URL = 'https://aisolution.uz';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'AI Solution',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/icon-512.png`,
    width: 512,
    height: 512,
  },
  description: 'AI-ассистенты для автоматизации продаж и клиентского сервиса в Узбекистане. Отвечают клиентам за 30 секунд в Telegram, Instagram, WhatsApp. Ташкент.',
  foundingDate: '2025',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ташкент',
    addressRegion: 'Ташкент',
    addressCountry: 'UZ',
  },
  areaServed: [
    { '@type': 'Country', name: 'Uzbekistan' },
    { '@type': 'Country', name: 'Kazakhstan' },
    { '@type': 'Country', name: 'Kyrgyzstan' },
    { '@type': 'Country', name: 'Tajikistan' },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: 'info@aisolution.uz',
      contactType: 'customer support',
      availableLanguage: ['Russian', 'Uzbek', 'English'],
    },
  ],
  sameAs: [],
  knowsAbout: [
    'AI Chatbot', 'Sales Automation', 'Lead Qualification',
    'Telegram Bot', 'WhatsApp Business', 'Instagram Automation',
    'CRM Integration', 'RAG Systems', 'Business Intelligence',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'AI Solution',
  url: SITE_URL,
  inLanguage: ['ru', 'uz', 'en'],
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/#service`,
  name: 'AI-ассистент для автоматизации продаж',
  provider: { '@id': `${SITE_URL}/#organization` },
  description: 'AI-ассистенты отвечают клиентам за 30 секунд в Telegram, Instagram, WhatsApp. Квалификация лидов Cold/Warm/Hot 24/7. Конверсия +34%. 500+ клиентов.',
  areaServed: [
    { '@type': 'Country', name: 'Uzbekistan' },
    { '@type': 'Country', name: 'Kazakhstan' },
    { '@type': 'Country', name: 'Kyrgyzstan' },
  ],
  serviceType: 'AI Chatbot / Sales Automation',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Solution Products',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Customer Service Bot',
        url: `${SITE_URL}/products/customer-service`,
      },
      {
        '@type': 'OfferCatalog',
        name: 'Management Assistant',
        url: `${SITE_URL}/products/management-assistant`,
      },
      {
        '@type': 'OfferCatalog',
        name: 'Corporate AI (RAG)',
        url: `${SITE_URL}/products/corporate-ai`,
      },
    ],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'За какое время AI-ассистент отвечает клиенту?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI-ассистент отвечает клиенту за 30 секунд в любом канале: Telegram, Instagram Direct, WhatsApp. Работает 24/7 без выходных.',
      },
    },
    {
      '@type': 'Question',
      name: 'Какие каналы поддерживает AI Solution?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Поддерживаются Telegram, Instagram Direct и WhatsApp. Один AI-ассистент отвечает во всех трёх каналах одновременно.',
      },
    },
    {
      '@type': 'Question',
      name: 'Сколько стоит AI чат-бот для бизнеса?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Customer Service Bot — от $1 000 (запуск) + $500/мес. Management Assistant — от $3 000 + $1 200/мес. Corporate AI (RAG) — от $8 000. Точная стоимость определяется после бесплатного 60-минутного аудита.',
      },
    },
    {
      '@type': 'Question',
      name: 'Что такое квалификация лидов Cold/Warm/Hot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI автоматически определяет "температуру" каждого лида: Cold — первый контакт, не готов к покупке; Warm — интересуется, задаёт вопросы; Hot — готов купить прямо сейчас. Горячие лиды мгновенно передаются менеджеру с полным контекстом.',
      },
    },
    {
      '@type': 'Question',
      name: 'Работает ли AI Solution в Узбекистане?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Да, AI Solution базируется в Ташкенте и обслуживает компании по всему Узбекистану, а также в Казахстане, Кыргызстане и Таджикистане. Поддержка на русском, узбекском и английском языках.',
      },
    },
    {
      '@type': 'Question',
      name: 'AI Solution Toshkentda ishlaydi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ha, AI Solution Toshkentda joylashgan va butun O\'zbekiston bo\'ylab, shuningdek Qozog\'iston, Qirg\'iziston va Tojikistonda xizmat ko\'rsatadi. Biz o\'zbek, rus va ingliz tillarida xizmat ko\'rsatamiz.',
      },
    },
  ],
};

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
