import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LandingHeroImage } from '@/components/shared/LandingHeroImage';
import { SITE_URL } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';

type LinkItem = {
  href: string;
  label: string;
};

type FAQItem = {
  q: string;
  a: string;
};

export type MoneyLandingConfig = {
  slug: string;
  pageTitle: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  heroImage?: { src: string; alt: string; title: string };
  sections: { title: string; text: string }[];
  faq: FAQItem[];
  relatedLinks: LinkItem[];
};

function buildSchemas(config: MoneyLandingConfig) {
  const slugNorm = config.slug.replace(/^\//, '').replace(/\/?$/, '') + '/';
  const pageUrl = `${SITE_URL.replace(/\/$/, '')}/${slugNorm}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: config.pageTitle,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'Ташкент' },
      { '@type': 'Country', name: 'Узбекистан' },
    ],
    description: config.description,
    url: pageUrl,
    serviceType: 'AI / Автоматизация бизнеса',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return { serviceSchema, faqSchema, slugNorm, pageUrl };
}

export function MoneyLandingPage({ config }: { config: MoneyLandingConfig }) {
  const { serviceSchema, faqSchema, slugNorm } = buildSchemas(config);
  const pathForCrumb = `/${slugNorm}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Главная', url: '/' },
          { name: config.pageTitle, url: pathForCrumb },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Header />
      <main className="min-h-screen bg-background text-foreground pb-16">
        <section className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="rounded-2xl p-8 md:p-10 border border-border bg-card shadow-sm">
            <p className="text-sm text-[#2563EB] mb-3">{config.eyebrow}</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">{config.title}</h1>
            {config.heroImage && (
              <LandingHeroImage src={config.heroImage.src} alt={config.heroImage.alt} title={config.heroImage.title} />
            )}
            <p className="mt-4 text-[#94A3B8] max-w-3xl text-base md:text-lg">{config.description}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              {config.bullets.map((bullet) => (
                <span key={bullet} className="px-3 py-1 rounded-full border border-border text-foreground-secondary bg-muted/50">
                  {bullet}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {config.sections.map((section) => (
            <article key={section.title} className="rounded-2xl p-6 border border-border bg-card shadow-sm">
              <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
              <p className="mt-3 text-[#94A3B8] leading-relaxed">{section.text}</p>
            </article>
          ))}
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-10">
          <h2 className="text-2xl md:text-3xl font-bold">Частые вопросы</h2>
          <div className="mt-5 space-y-4">
            {config.faq.map((item) => (
              <details key={item.q} className="group rounded-xl border border-border bg-card open:bg-muted/40 transition-colors shadow-sm">
                <summary className="cursor-pointer p-5 text-foreground font-semibold list-none flex items-center justify-between gap-4">
                  {item.q}
                  <span className="shrink-0 text-[#64748B] group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="px-5 pb-5 text-[#94A3B8] leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-10">
          <h2 className="text-2xl md:text-3xl font-bold">Полезные страницы</h2>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {config.relatedLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block rounded-xl border border-border bg-card px-4 py-3 text-[#2563EB] hover:text-[#1D4ED8] transition-colors shadow-sm">
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-10">
          <div className="rounded-2xl p-7 border border-[#3B82F6]/30 bg-[#3B82F6]/10">
            <h2 className="text-2xl md:text-3xl font-bold">Нужен быстрый запуск?</h2>
            <p className="mt-3 text-[#CFE2FF] max-w-3xl">
              Начнем с бесплатного аудита и покажем, как внедрить ИИ и автоматизацию под вашу
              воронку продаж в Ташкенте и по Узбекистану.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/#contact" className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold">
                Обсудить проект
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-border text-foreground hover:bg-muted transition-colors">
                Все услуги
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
