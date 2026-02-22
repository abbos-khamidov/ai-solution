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
    </>
  );
}
