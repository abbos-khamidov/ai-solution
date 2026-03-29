import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { SITE_URL, createAlternates } from '@/lib/seo';

const items = [
  {
    href: '/products/customer-service/',
    title: 'Customer Service Bot',
    desc: 'AI-бот для Telegram, Instagram и WhatsApp: ответ за секунды, квалификация лидов 24/7.',
  },
  {
    href: '/products/management-assistant/',
    title: 'Management Assistant',
    desc: 'AI-ассистент руководителя: KPI, задачи, отчёты и контроль в одном окне.',
  },
  {
    href: '/products/corporate-ai/',
    title: 'Corporate AI (RAG)',
    desc: 'Корпоративная база знаний и ответы по документам компании.',
  },
  {
    href: '/products/ai-analytics/',
    title: 'AI-аналитика',
    desc: 'Дашборды, алерты и рекомендации по данным из CRM, рекламы и каналов.',
  },
];

export const metadata: Metadata = {
  title: 'Продукты — AI-решения для бизнеса',
  description:
    'Customer Service Bot, Management Assistant, Corporate AI и AI-аналитика для компаний в Ташкенте и Узбекистане. Выберите продукт и запросите аудит.',
  alternates: createAlternates(`${SITE_URL}/products`),
};

export default function ProductsIndexPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Главная', url: '/' },
          { name: 'Продукты', url: '/products/' },
        ]}
      />
      <main className="min-h-screen bg-background text-foreground pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 pt-10">
          <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-8" aria-label="Хлебные крошки">
            <Link href="/" className="hover:text-foreground transition-colors">
              Главная
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden />
            <span className="text-foreground">Продукты</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Продукты AI Solution</h1>
          <p className="mt-4 text-[#94A3B8] text-lg max-w-2xl">
            Готовые AI-модули для продаж, управления, знаний и аналитики — внедрение под ваши процессы в Узбекистане.
          </p>
          <ul className="mt-10 space-y-4">
            {items.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="block rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-[#3B82F6]/40 transition-colors"
                >
                  <h2 className="text-xl font-semibold text-foreground">{p.title}</h2>
                  <p className="mt-2 text-[#94A3B8] text-sm leading-relaxed">{p.desc}</p>
                  <span className="mt-3 inline-block text-sm text-[#2563EB] font-medium">Подробнее →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
