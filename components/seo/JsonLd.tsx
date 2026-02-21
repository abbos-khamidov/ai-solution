const SITE_URL = 'https://aisolution.uz';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AI Solution',
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  description: 'AI-ассистенты для автоматизации продаж в Узбекистане. Отвечаем клиентам за 30 секунд в Telegram, Instagram, WhatsApp.',
  foundingDate: '2025',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ташкент',
    addressCountry: 'UZ',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+998939492000',
      contactType: 'sales',
      availableLanguage: ['Russian', 'Uzbek', 'English'],
    },
  ],
  sameAs: ['https://t.me/aisolution_uz'],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AI Solution',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI-ассистент для продаж',
  provider: { '@type': 'Organization', name: 'AI Solution' },
  description: 'AI-ассистенты отвечают клиентам за 30 секунд в Telegram, Instagram, WhatsApp. Квалификация лидов 24/7.',
  areaServed: { '@type': 'Country', name: 'Uzbekistan' },
  serviceType: 'AI Chatbot / Sales Automation',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '1000',
    highPrice: '20000',
    offerCount: '3',
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
        text: 'AI-ассистент отвечает клиенту за 30 секунд в любом канале: Telegram, Instagram, WhatsApp.',
      },
    },
    {
      '@type': 'Question',
      name: 'Какие каналы поддерживает AI Solution?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'На данный момент поддерживаются Telegram, Instagram Direct и WhatsApp. Подключение любого канала занимает 1 день.',
      },
    },
    {
      '@type': 'Question',
      name: 'Сколько стоит AI-ассистент?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Тариф Basic от $1 000 (запуск) + $500/мес поддержка. Тариф Pro от $3 000 + $1 200/мес. Точная стоимость определяется после бесплатного 60-минутного аудита.',
      },
    },
    {
      '@type': 'Question',
      name: 'Что такое квалификация лидов?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI автоматически определяет "температуру" лида: Cold (первый контакт), Warm (интересуется), Hot (готов купить). Горячие лиды мгновенно передаются менеджеру.',
      },
    },
    {
      '@type': 'Question',
      name: 'AI Solution ishlaydi Uzbekistonda?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ha, AI Solution Toshkentda joylashgan va butun O\'zbekiston bo\'ylab xizmat ko\'rsatadi. Biz o\'zbek, rus va ingliz tillarida xizmat ko\'rsatamiz.',
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
