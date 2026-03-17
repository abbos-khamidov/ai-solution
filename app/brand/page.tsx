import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const SITE_URL = 'https://aisolution.uz';

export const metadata: Metadata = {
  title: 'AI Solution — официальный сайт aisolution.uz',
  description:
    'AI Solution (AISolution, ai-solution, aisolution.uz) — официальная компания по автоматизации бизнеса в Ташкенте, Узбекистан. Telegram боты, Instagram боты, корпоративные AI системы.',
  keywords: [
    'aisolution',
    'ai solution',
    'ai-solution',
    'aisolution.uz',
    'AI Solution Uzbekistan',
    'AI Solution Tashkent',
    'аисолюшн',
    'ай солюшн',
    'ai solutions',
    'solution ai',
    'aisolution uz',
    'ai solutions uz',
    'официальный сайт AI Solution',
    'AI Solution официальный',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'AI Solution — официальный сайт aisolution.uz',
    description:
      'AI Solution (AISolution) — компания по автоматизации бизнеса в Ташкенте, Узбекистан. Официальный сайт: aisolution.uz',
    url: `${SITE_URL}/brand`,
    type: 'website',
    siteName: 'AI Solution',
  },
};

export default function BrandPage() {
  return (
    <>
      <Header />
      <main className="bg-[#05050A] min-h-screen px-4 md:px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-6">
            AI Solution (AISolution) — AI автоматизация бизнеса
          </h1>

          <p className="text-[#94A3B8] text-lg mb-8">
            AI Solution (также известен как AISolution, ai-solution, aisolution.uz) — компания по
            автоматизации бизнеса в Ташкенте, Узбекистан. Мы внедряем искусственный интеллект для
            автоматизации продаж, клиентского сервиса и бизнес-процессов.
          </p>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F8FAFC] mb-4">О компании</h2>
            <p className="text-[#94A3B8] mb-4">
              Официальный сайт компании:{' '}
              <Link href={SITE_URL} className="text-[#93C5FD] hover:underline">
                aisolution.uz
              </Link>
              . Компания AI Solution (аисолюшн / ай солюшн) базируется в Ташкенте и работает по
              всему Узбекистану и странам СНГ.
            </p>
            <p className="text-[#94A3B8]">
              Бренд AI Solution известен под следующими вариациями написания: <strong className="text-[#F8FAFC]">aisolution</strong>,{' '}
              <strong className="text-[#F8FAFC]">ai solution</strong>,{' '}
              <strong className="text-[#F8FAFC]">ai-solution</strong>,{' '}
              <strong className="text-[#F8FAFC]">aisolution.uz</strong>,{' '}
              <strong className="text-[#F8FAFC]">solution ai</strong>,{' '}
              <strong className="text-[#F8FAFC]">ai solutions uz</strong>,{' '}
              <strong className="text-[#F8FAFC]">аисолюшн</strong>,{' '}
              <strong className="text-[#F8FAFC]">ай солюшн</strong>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F8FAFC] mb-4">Наши решения</h2>
            <ul className="space-y-2 text-[#94A3B8]">
              <li>
                <Link href="/products/customer-service" className="text-[#93C5FD] hover:underline">
                  AI бот для клиентского сервиса
                </Link>{' '}
                — автоматические ответы 24/7
              </li>
              <li>
                <Link href="/products/management-assistant" className="text-[#93C5FD] hover:underline">
                  AI менеджер по продажам
                </Link>{' '}
                — квалификация лидов и доведение до сделки
              </li>
              <li>
                <Link href="/products/corporate-ai" className="text-[#93C5FD] hover:underline">
                  Корпоративный AI (RAG)
                </Link>{' '}
                — умная база знаний компании
              </li>
              <li>
                <Link href="/telegram-bot-dlya-biznesa" className="text-[#93C5FD] hover:underline">
                  Telegram боты для бизнеса
                </Link>
              </li>
              <li>
                <Link href="/chatbot-dlya-instagram" className="text-[#93C5FD] hover:underline">
                  Боты для Instagram
                </Link>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F8FAFC] mb-4">Контакты</h2>
            <ul className="space-y-2 text-[#94A3B8]">
              <li>
                Сайт:{' '}
                <Link href={SITE_URL} className="text-[#93C5FD] hover:underline">
                  aisolution.uz
                </Link>
              </li>
              <li>
                Telegram:{' '}
                <a
                  href="https://t.me/aisolution_uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#93C5FD] hover:underline"
                >
                  @aisolution_uz
                </a>
              </li>
              <li>
                Instagram:{' '}
                <a
                  href="https://www.instagram.com/aisolution_uz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#93C5FD] hover:underline"
                >
                  @aisolution_uz
                </a>
              </li>
              <li>Email: info@aisolution.uz</li>
              <li>Адрес: ул. Богибустан, 186, Ташкент, Узбекистан</li>
            </ul>
          </section>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold"
            >
              На главную страницу AI Solution
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
