export const SEO_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aisolution.uz';
export const SITE_URL = SEO_SITE_URL;

export const LANGUAGE_ALTERNATES = {
  'ru-UZ': `${SEO_SITE_URL}/`,
  'uz-UZ': `${SEO_SITE_URL}/`,
  'x-default': SEO_SITE_URL,
} as const;

export const DEFAULT_TWITTER_IMAGE = '/og-image.png';

export function createAlternates(canonical: string) {
  return {
    canonical,
    languages: LANGUAGE_ALTERNATES,
  };
}
