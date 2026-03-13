export const SEO_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aisolution.uz';
export const SITE_URL = SEO_SITE_URL;

export const LANGUAGE_ALTERNATES = {
  'ru-UZ': `${SEO_SITE_URL}/`,
  'uz-UZ': `${SEO_SITE_URL}/`,
  'x-default': SEO_SITE_URL,
} as const;

export const DEFAULT_TWITTER_IMAGE = '/og-image.png';

/** Normalize canonical URL to always end with / (except bare origin). */
export function createAlternates(canonical: string) {
  const path = canonical === '/' ? '' : canonical.replace(/\/$/, '') + '/';
  const normalized = path ? `${SITE_URL.replace(/\/$/, '')}${path}` : `${SITE_URL.replace(/\/$/, '')}/`;
  return {
    canonical: normalized,
    languages: {
      ru: normalized,
      uz: normalized,
      en: normalized,
      'x-default': normalized,
    },
  };
}
