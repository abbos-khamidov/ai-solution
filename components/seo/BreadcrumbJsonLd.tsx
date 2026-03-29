'use client';

import { buildCanonical } from '@/lib/seo';

export type BreadcrumbJsonLdItem = {
  /** Текст крошки для поля `name` в ListItem */
  name: string;
  /**
   * Абсолютный URL или путь (например `/services/ai-assistant/` или `/services/ai-assistant`).
   * Нормализуется через `buildCanonical` — в разметке всегда абсолютный URL со слэшем.
   */
  url: string;
};

function toAbsoluteItemUrl(url: string): string {
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return buildCanonical(trimmed);
  }
  return buildCanonical(trimmed);
}

/**
 * Schema.org BreadcrumbList (JSON-LD). Каждый элемент: position, name, item (абсолютный URL со / в конце).
 */
export function BreadcrumbJsonLd({ items }: { items: BreadcrumbJsonLdItem[] }) {
  if (!items.length) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: toAbsoluteItemUrl(entry.url),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
