import type { Metadata } from 'next';
import Link from 'next/link';
import { createAlternates } from '@/lib/seo';

const SITE_URL = 'https://aisolution.uz';
const SLUG = 'lichny-ii-bot-assistant';
const TITLE = 'Личный AI бот-ассистент для руководителя бизнеса';
const DESCRIPTION =
  'Как личный AI-ассистент помогает собственнику контролировать команду, финансы и задачи. Еженедельные отчёты в Telegram, финансовый трекер, аудит отклонений — без лишних совещаний.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'личный AI бот ассистент для бизнеса',
    'корпоративный AI ассистент Ташкент',
    'управление командой AI',
    'AI менеджер по продажам',
    'финансовый трекер AI',
    'KPI контроль AI',
    'автоматизация управления бизнесом',
    'AI для руководителя Узбекистан',
  ],
  alternates: createAlternates(`${SITE_URL}/blog/${SLUG}`),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/blog/${SLUG}`,
    type: 'article',
    locale: 'ru_RU',
    siteName: 'AI Solution',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: TITLE }],
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
  image: `${SITE_URL}/og-image.png`,
  inLanguage: 'ru',
};

export default function Page() {
  return (
    <>
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
              <span className="text-foreground">Личный AI-ассистент для руководителя</span>
            </nav>
            <div className="flex items-center gap-4 text-sm text-[#64748B] mb-4">
              <span>5 февраля 2025</span>
              <span>·</span>
              <span>9 мин чтения</span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: 'rgba(6,182,212,0.12)', color: '#06B6D4' }}>
                Управление
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight tracking-tight mb-4">
              {TITLE}
            </h1>
            <p className="text-lg text-[#94A3B8] leading-relaxed max-w-3xl">
              Современный собственник тонет в информации: отчёты, задачи, KPI, финансы, персонал.
              Личный AI-ассистент агрегирует всё это в понятную картину — и доставляет прямо
              в Telegram, без лишних совещаний.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
          <article className="space-y-8 text-[#94A3B8] leading-relaxed text-base md:text-lg">

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Проблема руководителя: данных много, времени мало
              </h2>
              <p>
                Предприниматель в Узбекистане сегодня управляет несколькими потоками информации
                одновременно. В одном мессенджере — вопросы от менеджеров, в другом — отчёты
                от бухгалтерии, в третьем — обращения клиентов, которые по какой-то причине
                дошли до него напрямую. Плюс совещания, которые не дают результата, но занимают
                всё утро.
              </p>
              <p>
                Результат — собственник занят, но не управляет. Он реагирует на входящий поток
                вместо того, чтобы принимать стратегические решения. Критические проблемы
                замечаются с опозданием: план не выполняется, но цифры приходят только в конце
                месяца; расходы вышли за рамки, но это видно только по итогам квартала.
              </p>
              <p>
                Личный AI-ассистент решает эту проблему структурно: агрегирует данные из всех
                источников, анализирует отклонения в режиме реального времени и доставляет
                руководителю готовые инсайты — не сырые данные, а выводы с рекомендациями.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Что умеет личный AI-ассистент
              </h2>
              <p>
                <strong className="text-foreground">Контроль задач и поручений.</strong> Руководитель
                поставил задачу — AI отслеживает статус и срок. Если дедлайн прошёл, а задача
                не отмечена выполненной, AI сигнализирует. Собственник видит реальную картину
                исполнительской дисциплины без необходимости лично проверять каждого.
              </p>
              <p>
                <strong className="text-foreground">Финансовый мониторинг.</strong> Движение денег
                в реальном времени: поступления, расходы, отклонения от бюджета. AI уведомляет,
                если расход по статье превысил плановые показатели, или если план по выручке
                не выполняется — не в конце месяца, а в момент, когда ещё можно что-то исправить.
              </p>
              <p>
                <strong className="text-foreground">Еженедельная сводка.</strong> Каждое воскресенье
                в Telegram приходит структурированный отчёт: что выполнено, что просрочено,
                какие финансовые показатели, какие риски на следующей неделе. Пять минут чтения
                вместо двух часов совещания.
              </p>
              <p>
                <strong className="text-foreground">Аудит аномалий.</strong> AI замечает нетипичные
                паттерны: резкое падение выручки в одном из отделов, подозрительный рост расходов,
                нехарактерное поведение сотрудника. Сигнализирует до того, как ситуация стала
                критической.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Контроль команды без микроменеджмента
              </h2>
              <p>
                Самая болезненная тема для собственника — контроль персонала. Слишком жёсткий
                контроль демотивирует, слишком слабый — приводит к расслаблению. AI решает эту
                дилемму элегантно: он контролирует результаты и показатели, а не процессы.
              </p>
              <p>
                Ежедневный срез по каждому сотруднику: какие задачи выполнены, какие отложены,
                где есть риск срыва. Не просто список — структурированная оценка с флагами на
                критические отклонения. Руководитель видит, кто работает эффективно, а кто
                систематически не укладывается в сроки — без ручного контроля каждого действия.
              </p>
              <p>
                Важный момент: Management Assistant работает эффективно только при наличии
                базовой культуры отчётности в компании. Если задачи не фиксируются и отчёты
                не сдаются — AI нечего анализировать. Это не создание дисциплины с нуля,
                а мощный инструмент для усиления уже существующих процессов.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Финансовый трекер: деньги под контролем 24/7
              </h2>
              <p>
                Финансовая часть — одна из наиболее востребованных функций среди клиентов
                AI Solution. Классическая боль: собственник узнаёт о перерасходе бюджета только
                из ежемесячного отчёта бухгалтера. К этому моменту деньги уже потрачены,
                ситуацию не исправить.
              </p>
              <p>
                AI-финансовый трекер работает иначе. Все транзакции фиксируются и автоматически
                категоризируются. Как только расход по любой статье приближается к лимиту —
                руководитель получает уведомление в Telegram. Не постфактум, а в режиме
                реального времени, когда ещё есть возможность принять решение.
              </p>
              <p>
                Дополнительно — план-факт анализ по выручке. Если продажи в середине месяца
                значительно ниже плана, AI сигнализирует и показывает, по каким направлениям
                или продуктам образовалось отставание. Собственник может скорректировать
                фокус команды до конца отчётного периода.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Для кого подходит Management Assistant
              </h2>
              <p>
                Продукт оптимален для собственников и топ-менеджеров компаний с командой
                от 5 до 200 человек. Именно в этом диапазоне руководитель уже не может
                лично контролировать каждый процесс, но компания ещё не выстроила
                полноценную корпоративную систему управления с дашбордами и аналитиками.
              </p>
              <p>
                Особенно актуален для компаний с распределёнными командами: когда часть
                сотрудников работает удалённо или в разных городах. AI снимает проблему
                информационного разрыва — руководитель получает одинаково полную картину
                независимо от географии команды.
              </p>
              <p>
                Также хорошо работает для серийных предпринимателей, управляющих несколькими
                бизнесами одновременно. AI агрегирует данные из всех направлений в единый
                дашборд, и собственник видит полную картину за пять минут — не переключаясь
                между десятками таблиц и отчётов.
              </p>
            </section>
          </article>

          <section className="mt-16 pt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-2xl font-bold text-foreground mb-3">Решения AI Solution для вашего бизнеса</h2>
            <p className="text-[#64748B] mb-8">Выберите AI-продукт под задачи вашей компании</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/products/customer-service" className="group block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)' }}>
                <div className="text-2xl mb-3">🤖</div>
                <h3 className="font-bold text-foreground mb-2">Customer Service Bot</h3>
                <p className="text-sm text-[#64748B] mb-3">AI в Telegram, Instagram, WhatsApp. Ответ за 30 сек, квалификация лидов 24/7.</p>
                <span className="text-sm font-semibold text-[#3B82F6]">От $1 000 →</span>
              </Link>
              <Link href="/products/management-assistant" className="group block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)' }}>
                <div className="text-2xl mb-3">📊</div>
                <h3 className="font-bold text-foreground mb-2">Management Assistant</h3>
                <p className="text-sm text-[#64748B] mb-3">Контроль команды, финансовый трекер, еженедельные отчёты в Telegram.</p>
                <span className="text-sm font-semibold text-[#06B6D4]">От $3 000 →</span>
              </Link>
              <Link href="/products/corporate-ai" className="group block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}>
                <div className="text-2xl mb-3">🏢</div>
                <h3 className="font-bold text-foreground mb-2">Corporate AI (RAG)</h3>
                <p className="text-sm text-[#64748B] mb-3">База знаний компании с AI. Интеграция с 1С, Bitrix24, amoCRM.</p>
                <span className="text-sm font-semibold text-[#7C3AED]">От $8 000 →</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
