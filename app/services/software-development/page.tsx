import type { Metadata } from 'next';
import SoftwareDevContent from './content';
import { DEFAULT_TWITTER_IMAGE, createAlternates } from '@/lib/seo';

const SITE_URL = 'https://aisolution.uz';
const SLUG = '/services/software-development';
const TITLE = 'Разработка ПО и веб-приложений под ключ';
const DESC = 'Разработка программного обеспечения, сайтов и мобильных приложений в Ташкенте. React, Next.js, Flutter, iOS, Android. AI-интеграции, от $5 000. Сроки 4-8 недель.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    'разработка программного обеспечения Ташкент',
    'разработка сайта Узбекистан',
    'веб разработка Ташкент',
    'мобильное приложение Ташкент',
    'разработка приложений Узбекистан',
    'React Next.js разработка',
    'Flutter iOS Android Ташкент',
    'IT компания Ташкент',
    'программисты Узбекистан',
    'MVP разработка Ташкент',
    'разработка ПО Ташкент',
    'AI разработка Узбекистан',
    'автоматизация бизнеса Узбекистан',
  ],
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${SITE_URL}${SLUG}`,
    type: 'website',
    locale: 'ru_RU',
    siteName: 'AI Solution',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: [{ url: DEFAULT_TWITTER_IMAGE }],
  },
  robots: { index: true, follow: true },
};

const faqItems = [
  { q: 'Какие технологии используете в разработке?', a: 'React, Next.js, Flutter, iOS, Android, бэкенд на Node.js и других стеках. Интеграции с ИИ, CRM, платёжными системами.' },
  { q: 'Сколько стоит разработка под ключ?', a: 'От $5 000 за MVP веб- или мобильного приложения. Точная смета после брифа и оценки объёма.' },
  { q: 'Какие сроки разработки?', a: 'MVP — обычно 4–8 недель. Крупные проекты — по этапам с фиксированными спринтами.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function SoftwareDevPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SoftwareDevContent />
    </>
  );
}
