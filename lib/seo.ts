export const SEO_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aisolution.uz';
export const SITE_URL = SEO_SITE_URL;

export const LANGUAGE_ALTERNATES = {
  'ru-UZ': `${SEO_SITE_URL}/`,
  'uz-UZ': `${SEO_SITE_URL}/`,
  'x-default': SEO_SITE_URL,
} as const;

export const DEFAULT_TWITTER_IMAGE = '/og-image.png';

const BASE_ORIGIN = 'https://aisolution.uz';

/**
 * Build canonical URL. Accepts full URL or pathname — never double-prepends origin.
 */
export function buildCanonical(pathOrUrl: string): string {
  const base = BASE_ORIGIN.replace(/\/$/, '');
  const cleanPath = pathOrUrl.replace(/^https?:\/\/[^/]+/i, '').trim();
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  const withTrailing = normalizedPath === '/' ? '/' : normalizedPath.replace(/\/$/, '') + '/';
  return `${base}${withTrailing}`;
}

/** Normalize canonical URL to always end with / (except bare origin). Use buildCanonical internally to avoid double baseUrl. */
export function createAlternates(canonicalInput: string) {
  const normalized = buildCanonical(canonicalInput);
  return {
    canonical: normalized,
    languages: {
      ru: normalized,
      'x-default': normalized,
    },
  };
}
