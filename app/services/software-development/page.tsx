import type { Metadata } from 'next';
import SoftwareDevContent from './content';

const SITE_URL = 'https://aisolution.uz';
const SLUG = '/services/software-development';
const TITLE = 'Разработка ПО и веб-приложений под ключ | AI Solution Ташкент';
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
  ],
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${SITE_URL}${SLUG}`,
    type: 'website',
    locale: 'ru_RU',
    siteName: 'AI Solution',
  },
  robots: { index: true, follow: true },
};

export default function SoftwareDevPage() {
  return <SoftwareDevContent />;
}
