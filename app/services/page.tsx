import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://aisolution.uz';
const SLUG = '/services';

const serviceLinks = [
  { href: '/services/telegram-bots', title: 'Telegram Bots' },
  { href: '/services/ai-managers', title: 'AI Managers' },
  { href: '/services/ai-assistant', title: 'AI Assistant' },
  { href: '/services/analytics', title: 'Analytics' },
  { href: '/services/software-development', title: 'Software Development' },
];

const productLinks = [
  { href: '/products/customer-service', title: 'Customer Service AI' },
  { href: '/products/management-assistant', title: 'Management Assistant' },
  { href: '/products/corporate-ai', title: 'Corporate AI' },
];

export const metadata: Metadata = {
  title: 'Services | AI Solution',
  description:
    'Service index page with links to active AI services and product pages.',
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  robots: { index: true, follow: true },
};

export default function ServicesIndexPage() {
  return (
    <main className="min-h-screen bg-[#05050A] pt-28 pb-16 text-white">
      <section className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Services</h1>
        <p className="mt-3 text-[#94A3B8] max-w-2xl">
          Choose one of our active service pages or go directly to product solutions.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Service Pages</h2>
            <ul className="mt-4 space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#93C5FD] hover:text-white transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Product Pages</h2>
            <ul className="mt-4 space-y-3">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#93C5FD] hover:text-white transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
