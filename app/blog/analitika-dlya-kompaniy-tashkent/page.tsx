import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { createAlternates } from '@/lib/seo';

const SITE_URL = 'https://aisolution.uz';
const SLUG = 'analitika-dlya-kompaniy-tashkent';
const TITLE = 'Аналитика для компаний на базе ИИ — Ташкент 2025';
const DESCRIPTION =
  'Как настроить аналитику для компании в Ташкенте с помощью ИИ: дашборды, KPI, отчёты в реальном времени. Интеграция с 1С, Bitrix24, CRM. AI-аналитика для бизнеса в Узбекистане.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'аналитика для компаний Ташкент',
    'бизнес аналитика Узбекистан',
    'AI аналитика бизнес',
    'дашборд KPI Ташкент',
    'отчёты в реальном времени',
    'аналитика продаж Узбекистан',
    'BI аналитика Ташкент',
    'умная аналитика для бизнеса',
    'аналитика данных компании',
    'Power BI Tableau Ташкент',
  ],
  alternates: createAlternates(`${SITE_URL}/blog/${SLUG}`),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/blog/${SLUG}`,
    type: 'article',
    locale: 'ru_RU',
    siteName: 'AI Solution',
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DESCRIPTION,
  author: { '@type': 'Organization', name: 'AI Solution', url: SITE_URL },
  publisher: {
    '@type': 'Organization',
    name: 'AI Solution',
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png` },
  },
  datePublished: '2026-03-15',
  dateModified: '2026-03-15',
  url: `${SITE_URL}/blog/${SLUG}`,
  inLanguage: 'ru',
  image: `${SITE_URL}/og-image.png`,
  about: [
    { '@type': 'Thing', name: 'Аналитика для бизнеса' },
    { '@type': 'Thing', name: 'Искусственный интеллект' },
    { '@type': 'Place', name: 'Ташкент' },
  ],
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Главная', url: '/' },
          { name: 'Блог', url: '/blog/' },
          { name: TITLE, url: `/blog/analitika-dlya-kompaniy-tashkent/` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-background">
        <div className="pt-28 pb-10 bg-background-secondary border-b border-border">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <nav className="flex items-center gap-2 text-sm text-[#64748B] mb-6">
              <Link href="/" className="hover:text-foreground transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-[#94A3B8]">Блог</span>
              <span>/</span>
              <span className="text-foreground">Аналитика для компаний</span>
            </nav>
            <div className="flex items-center gap-4 text-sm text-[#64748B] mb-4">
              <span>12 февраля 2025</span>
              <span>·</span>
              <span>10 мин чтения</span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: 'rgba(6,182,212,0.12)', color: '#06B6D4' }}>
                Аналитика
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight tracking-tight mb-4">
              {TITLE}
            </h1>
            <p className="text-lg text-[#94A3B8] leading-relaxed max-w-3xl">
              Большинство ташкентских компаний принимают решения вслепую: данные есть, но
              они разбросаны по таблицам, системам и головам сотрудников. AI-аналитика решает
              эту проблему раз и навсегда.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
          <article className="space-y-8 text-[#94A3B8] leading-relaxed text-base md:text-lg">

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Почему аналитика для компаний — это приоритет №1
              </h2>
              <p>
                В 2025 году компания без аналитики — это автомобиль без приборной панели.
                Вы едете, но не знаете скорость, уровень топлива и предупреждения о поломке.
                По данным опросов узбекских предпринимателей, 73% принимают ключевые решения
                на основе ощущений, а не данных. Это прямые потери выручки.
              </p>
              <p>
                Аналитика для компании на базе ИИ — это не просто красивые графики. Это
                инструмент, который отвечает на конкретные вопросы: почему в этом месяце
                упали продажи в Самарканде? Какой менеджер показывает лучшую конверсию?
                Когда нужно пополнить склад, чтобы не попасть в дефицит?
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Виды аналитики для бизнеса
              </h2>
              <p>
                <strong className="text-foreground">Аналитика продаж.</strong> Воронка продаж
                в реальном времени: сколько лидов на каждом этапе, где теряются, какие
                менеджеры эффективнее, средний чек по продуктам и каналам. Интегрируется
                с CRM (amoCRM, Bitrix24), Google Sheets и 1С.
              </p>
              <p>
                <strong className="text-foreground">Финансовая аналитика.</strong> Дашборд
                прихода и расхода, план-факт по бюджету, прогноз кассового разрыва.
                Руководитель видит финансовую картину компании в одном экране — без Excel
                и бухгалтерских отчётов в конце месяца.
              </p>
              <p>
                <strong className="text-foreground">Аналитика клиентского сервиса.</strong>
                Сколько обращений поступает в день, какой процент решается без эскалации,
                среднее время ответа, топ вопросов клиентов. Это помогает оптимизировать
                скрипты, обучение и распределение нагрузки.
              </p>
              <p>
                <strong className="text-foreground">Аналитика операционной эффективности.</strong>
                KPI по каждому отделу и сотруднику, выполнение задач, дедлайны, риски.
                Собственник получает управленческий отчёт в Telegram каждое воскресенье.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Технические решения для аналитики в Ташкенте
              </h2>
              <p>
                Для малого и среднего бизнеса в Ташкенте мы используем несколько подходов
                в зависимости от масштаба:
              </p>
              <p>
                <strong className="text-foreground">Telegram-дашборд.</strong> Самое быстрое
                решение — AI-бот в Telegram, который по запросу или по расписанию присылает
                ключевые метрики. Не нужны дополнительные приложения, данные приходят туда,
                где руководитель и так работает каждый день.
              </p>
              <p>
                <strong className="text-foreground">Веб-дашборд.</strong> Интерактивный
                дашборд с визуализацией данных на основе Chart.js или D3.js. Обновляется
                в реальном времени, работает на любом устройстве, не требует установки.
              </p>
              <p>
                <strong className="text-foreground">Power BI / Tableau интеграция.</strong>
                Для компаний с большими объёмами данных — интеграция с профессиональными
                BI-инструментами. Подключаем все источники данных: 1С, CRM, SQL, Google
                Sheets, API сторонних сервисов.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Как внедрить аналитику за 2 недели
              </h2>
              <p>
                Внедрение аналитики для компании не занимает месяцы. Стандартный процесс
                выглядит так: аудит текущих источников данных (1 день), определение
                ключевых метрик (1 день), настройка интеграций и дашборда (5-7 дней),
                тестирование и обучение команды (2-3 дня). Итого: 2 недели от старта
                до первого отчёта.
              </p>
              <p>
                После запуска система работает автономно: данные собираются сами,
                отчёты формируются по расписанию, а аномалии — резкий рост расходов
                или падение выручки — вызывают автоматическое уведомление на телефон
                руководителя.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Стоимость аналитики для компании
              </h2>
              <p>
                Базовый Telegram-дашборд с основными метриками: от $500 внедрение,
                от $300 в месяц сопровождение. Полноценная аналитическая платформа
                с интеграциями: от $3 000 внедрение, от $1 000 в месяц. Корпоративное
                BI-решение с on-premise размещением: от $8 000 внедрение. Точная стоимость
                считается после бесплатного аудита — за 60 минут мы оцениваем ваши
                источники данных и предлагаем оптимальное решение.
              </p>
            </section>

          </article>

          <section className="mt-16 pt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-2xl font-bold text-foreground mb-3">Аналитика и автоматизация от AI Solution</h2>
            <p className="text-[#64748B] mb-8">Выберите AI-продукт под задачи вашей компании</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/services/analytics" className="group block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)' }}>
                <div className="text-2xl mb-3">📊</div>
                <h3 className="font-bold text-foreground mb-2">Аналитика и дашборды</h3>
                <p className="text-sm text-[#64748B] mb-3">KPI в реальном времени, интеграция с 1С, Bitrix24, CRM.</p>
                <span className="text-sm font-semibold text-[#06B6D4]">Подробнее →</span>
              </Link>
              <Link href="/products/management-assistant" className="group block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)' }}>
                <div className="text-2xl mb-3">🧠</div>
                <h3 className="font-bold text-foreground mb-2">Management Assistant</h3>
                <p className="text-sm text-[#64748B] mb-3">Еженедельные отчёты, KPI, финансовый трекер в Telegram.</p>
                <span className="text-sm font-semibold text-[#3B82F6]">От $3 000 →</span>
              </Link>
              <Link href="/products/corporate-ai" className="group block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}>
                <div className="text-2xl mb-3">🏢</div>
                <h3 className="font-bold text-foreground mb-2">Corporate AI (RAG)</h3>
                <p className="text-sm text-[#64748B] mb-3">AI на ваших данных. Ответы по документам, регламентам, прайсам.</p>
                <span className="text-sm font-semibold text-[#7C3AED]">От $8 000 →</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
