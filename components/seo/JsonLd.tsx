const SITE_URL = 'https://aisolution.uz';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#localbusiness`,
  name: 'AI Solution',
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  image: `${SITE_URL}/icon-512.png`,
  description: 'ИИ автоматизация бизнеса в Ташкенте: Telegram-боты, LLM-решения, бот-менеджер, аналитика для компаний. Работаем по всему Узбекистану.',
  telephone: ['+998939492000', '+998974071125', '+998950000065'],
  email: 'info@aisolution.uz',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Афросиёб, 35',
    addressLocality: 'Ташкент',
    addressRegion: 'Ташкентская область',
    postalCode: '100000',
    addressCountry: 'UZ',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.2995,
    longitude: 69.2401,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '11:00',
      closes: '16:00',
    },
  ],
  priceRange: '$$',
  currenciesAccepted: 'USD, UZS',
  paymentAccepted: 'Cash, Bank Transfer, Online',
  areaServed: [
    { '@type': 'City', name: 'Ташкент' },
    { '@type': 'City', name: 'Самарканд' },
    { '@type': 'City', name: 'Фергана' },
    { '@type': 'City', name: 'Андижан' },
    { '@type': 'City', name: 'Наманган' },
    { '@type': 'City', name: 'Бухара' },
    { '@type': 'Country', name: 'Узбекистан' },
  ],
  hasMap: 'https://maps.google.com/?q=41.2995,69.2401',
  sameAs: ['https://t.me/aisolution_uz'],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: 41.2995, longitude: 69.2401 },
    geoRadius: '500000',
  },
  knowsAbout: [
    'ИИ автоматизация бизнеса',
    'Telegram боты',
    'LLM решения',
    'Бот менеджер',
    'Аналитика для компаний',
    'Личный ассистент ИИ',
    'AI чат-бот',
    'Автоматизация продаж',
  ],
};

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

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
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
    </>
  );
}
