import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>
        {children}
        <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16">
          <div className="rounded-2xl p-7 border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-white">
            <h2 className="text-2xl md:text-3xl font-bold">Нужно внедрение AI под ключ?</h2>
            <p className="mt-3 text-[#CFE2FF] max-w-3xl">
              Получите аудит процессов и готовый план внедрения под KPI вашей компании.
            </p>
            <Link
              href="/ai-dlya-biznesa"
              className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold"
            >
              Перейти на страницу AI для бизнеса
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
