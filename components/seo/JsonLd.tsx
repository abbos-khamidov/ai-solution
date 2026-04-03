import { SITE_URL } from '@/lib/seo';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#localbusiness`,
  name: 'AI Solution',
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  image: `${SITE_URL}/icon-512.png`,
  description: 'Автоматизация бизнеса в Ташкенте и Узбекистане. Внедрение искусственного интеллекта: Telegram-боты, LLM-решения, бот-менеджер, AI-аналитика для компаний.',
  telephone: ['+998770612200', '+998950000065', '+998939492000'],
  email: 'info@aisolution.uz',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Богибустон, 186',
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
  sameAs: [
    'https://t.me/aisolution_uz',
    'https://www.instagram.com/aisolution_uz/',
    'https://www.linkedin.com/company/aisolution-uz',
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: 41.2995, longitude: 69.2401 },
    geoRadius: '500000',
  },
  knowsAbout: [
    'Автоматизация бизнеса в Ташкенте',
    'Внедрение искусственного интеллекта в Узбекистане',
    'ИИ в Ташкенте',
    'Внедрение ИИ в бизнес',
    'Telegram боты для бизнеса',
    'LLM решения',
    'Бот менеджер по продажам',
    'AI аналитика для компаний',
    'Личный ассистент ИИ',
    'Автоматизация продаж Ташкент',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'AI Solution',
  alternateName: 'AISolution Uzbekistan',
  url: SITE_URL,
  inLanguage: ['ru', 'uz'],
  publisher: { '@id': `${SITE_URL.replace(/\/$/, '')}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
