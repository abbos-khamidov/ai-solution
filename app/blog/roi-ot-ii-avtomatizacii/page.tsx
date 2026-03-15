import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { createAlternates } from '@/lib/seo';

const SITE_URL = 'https://aisolution.uz';
const SLUG = 'roi-ot-ii-avtomatizacii';
const TITLE = 'ROI от внедрения ИИ: реальные цифры узбекского бизнеса';
const DESCRIPTION =
  'Окупаемость внедрения ИИ в Узбекистане: сколько экономят компании на ответах за 30 сек, квалификации лидов и разгрузке менеджеров. Цифры и кейсы 2025.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'ROI внедрения ИИ',
    'окупаемость ИИ бизнес',
    'результаты ИИ Узбекистан',
    'эффективность чатбота',
    'экономия на менеджерах ИИ',
  ],
  alternates: createAlternates(`${SITE_URL}/blog/${SLUG}`),
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/blog/${SLUG}`, type: 'article', locale: 'ru_RU', siteName: 'AI Solution', images: [{ url: '/og-image.png', width: 1200, height: 630, alt: TITLE }] },
  robots: { index: true, follow: true },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DESCRIPTION,
  author: { '@type': 'Organization', name: 'AI Solution', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'AI Solution', logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png` } },
  datePublished: '2026-03-15',
  dateModified: '2026-03-15',
  url: `${SITE_URL}/blog/${SLUG}`,
  image: `${SITE_URL}/og-image.png`,
  inLanguage: 'ru',
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <main className="min-h-screen" style={{ background: '#05050A' }}>
        <div className="pt-28 pb-10" style={{ background: '#0D0D1A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <nav className="flex items-center gap-2 text-sm text-[#64748B] mb-6">
              <Link href="/" className="hover:text-white transition-colors">Главная</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white transition-colors">Блог</Link>
              <span>/</span>
              <span className="text-[#F8FAFC]">ROI от ИИ</span>
            </nav>
            <div className="flex items-center gap-4 text-sm text-[#64748B] mb-4">
              <span>5 марта 2025</span>
              <span>·</span>
              <span>9 мин чтения</span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: 'rgba(59,130,246,0.12)', color: '#3B82F6' }}>Кейсы</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] leading-tight tracking-tight mb-4">{TITLE}</h1>
            <p className="text-lg text-[#94A3B8] leading-relaxed max-w-3xl">
              Внедрение ИИ-чатбота или бота-менеджера — это инвестиция. Вопрос, который задают владельцы бизнеса в Узбекистане: когда она окупится и какие цифры реалистичны. В этой статье — как считают ROI от внедрения ИИ и какие результаты показывают компании в Ташкенте и по региону.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
          <article className="space-y-8 text-[#94A3B8] leading-relaxed text-base md:text-lg">
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">Из чего складывается ROI</h2>
              <div className="relative w-full h-48 rounded-xl overflow-hidden my-6">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                  alt="ROI от внедрения AI автоматизации в бизнес"
                  title="ROI от внедрения AI автоматизации в бизнес"
                  fill
                  className="object-cover opacity-70"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              <p>
                Окупаемость внедрения ИИ складывается из нескольких факторов. Первый — сохранённые лиды: заявки, которые раньше терялись ночью и в выходные, теперь обрабатываются ботом и часть из них конвертируется в сделки. Второй — время менеджеров: они тратят меньше часов на первичный отбор и типовые ответы и больше — на закрытие сделок. Третий — скорость ответа: клиент получает реакцию за 30 секунд вместо часов; это повышает конверсию из обращения в диалог и в сделку. Четвёртый — масштаб без линейного роста штата: один бот обрабатывает десятки обращений параллельно.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">Типовые цифры по отраслям</h2>
              <p>
                В образовании и услугах (кейс Studify.uz) ключевой метрикой стало время первого ответа — с часов до секунд. Доля «горячих» лидов в воронке выросла за счёт квалификации; руководитель получил прозрачные сводки по KPI. В IT и B2B (кейс Marsit.uz) стабильный приём заявок 24/7 и рост доли качественных обращений снизили потери из нерабочего времени и разгрузили отдел продаж. Конкретные проценты роста зависят от ниши и исходной загрузки каналов, но типичный диапазон окупаемости внедрения — 2–4 месяца при условии стабильного потока заявок.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">Как посчитать ROI под свой бизнес</h2>
              <p>
                Оцените: сколько заявок в месяц приходит в нерабочее время и какая доля из них теряется или «остывает». Посчитайте средний чек и конверсию из заявки в сделку — сколько дополнительных сделок дала бы обработка этих заявок. С другой стороны: сколько часов в неделю менеджеры тратят на первичные ответы и отбор лидов; сколько стоит этот час в пересчёте на зарплату и сколько сделок можно было бы закрыть за освободившееся время. Сравните с затратами на внедрение (разовый платёж + абонент) — получите ориентир по срокам окупаемости.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">Что не входит в расчёт</h2>
              <p>
                ROI не стоит переоценивать в первый месяц: бот нужно обучить на ваших данных, отладить сценарии, менеджеры должны привыкнуть к новому формату. Реальные цифры обычно видны через 2–3 месяца после запуска. Также не стоит ждать «автоматических» сделок без участия менеджеров: ИИ квалифицирует и передаёт горячих, но закрытие сделки по-прежнему за людьми. Итог: ROI от внедрения ИИ в узбекском бизнесе реален, но его нужно считать по своим метрикам и с горизонтом в несколько месяцев.
              </p>
            </section>
          </article>

          <section className="mt-16 pt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4">Читайте также</h2>
            <ul className="space-y-2 text-[#94A3B8]">
              <li><Link href="/cases/studify-ai-automation" className="text-[#93C5FD] hover:underline">Кейс Studify.uz: AI-автоматизация лидов</Link></li>
              <li><Link href="/cases/marsit-lead-automation" className="text-[#93C5FD] hover:underline">Кейс Marsit.uz: AI-автоматизация продаж</Link></li>
              <li><Link href="/blog/kak-vybrat-chatbot-dlya-biznesa" className="text-[#93C5FD] hover:underline">Как выбрать чатбот для бизнеса: полное руководство 2025</Link></li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
