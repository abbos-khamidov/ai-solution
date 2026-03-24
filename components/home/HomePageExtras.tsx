'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

type PopularLink = { href: string; label: string };

export function HomePageExtras() {
  const { t } = useTranslation();
  const popularLinks = t('homePage.popularLinks', { returnObjects: true }) as PopularLink[];

  return (
    <>
      <section className="bg-background px-4 md:px-6 py-10" aria-label={t('homePage.popularAria')}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            {t('homePage.popularTitle')}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {Array.isArray(popularLinks) &&
              popularLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2.5 rounded-xl border border-border bg-card text-[#475569] hover:text-foreground hover:border-[#3B82F6]/40 hover:bg-[#3B82F6]/10 transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
          </div>
        </div>
      </section>
      <section className="bg-background px-4 md:px-6 py-6">
        <div className="max-w-6xl mx-auto rounded-2xl p-5 md:p-6 border border-border bg-card flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <p className="text-lg font-semibold text-foreground text-center sm:text-left">{t('homePage.telegramBanner')}</p>
          <a
            href="https://t.me/aisolution_uz"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0088CC] hover:bg-[#0077B5] text-white font-semibold transition-colors"
          >
            {t('homePage.telegramCta')}
          </a>
        </div>
      </section>
    </>
  );
}
