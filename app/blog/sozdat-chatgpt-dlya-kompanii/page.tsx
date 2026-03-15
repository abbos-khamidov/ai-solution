import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { createAlternates } from '@/lib/seo';

const SITE_URL = 'https://aisolution.uz';
const SLUG = 'sozdat-chatgpt-dlya-kompanii';
const TITLE = 'Как создать свой ChatGPT для компании — корпоративный AI';
const DESCRIPTION =
  'Пошаговое руководство по созданию корпоративного AI-ассистента на базе RAG. Как сделать своего ChatGPT на данных компании, интегрировать с 1С и Bitrix24, защитить данные.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'создать ChatGPT для своей компании',
    'корпоративный AI ассистент Ташкент',
    'создать ИИ бот для компании',
    'RAG система Узбекистан',
    'корпоративная база знаний AI',
    'внедрение искусственного интеллекта Узбекистан',
    'on-premise AI система',
    'AI для бизнеса Центральная Азия',
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

      <main className="min-h-screen" style={{ background: '#05050A' }}>
        <div className="pt-28 pb-10" style={{ background: '#0D0D1A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <nav className="flex items-center gap-2 text-sm text-[#64748B] mb-6">
              <Link href="/" className="hover:text-white transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-[#94A3B8]">Блог</span>
              <span>/</span>
              <span className="text-[#F8FAFC]">ChatGPT для компании</span>
            </nav>
            <div className="flex items-center gap-4 text-sm text-[#64748B] mb-4">
              <span>1 февраля 2025</span>
              <span>·</span>
              <span>11 мин чтения</span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: 'rgba(124,58,237,0.12)', color: '#7C3AED' }}>
                Технологии
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] leading-tight tracking-tight mb-4">
              {TITLE}
            </h1>
            <p className="text-lg text-[#94A3B8] leading-relaxed max-w-3xl">
              Руководители часто спрашивают: "Можно ли сделать ChatGPT только для нашей компании,
              чтобы он знал наши продукты, регламенты и отвечал только по нашим данным?"
              Ответ — да. Это называется Corporate AI на базе RAG.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
          <article className="space-y-8 text-[#94A3B8] leading-relaxed text-base md:text-lg">

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">
                ChatGPT против корпоративного AI: в чём принципиальная разница
              </h2>
              <div className="relative w-full h-48 rounded-xl overflow-hidden my-6">
                <Image
                  src="https://images.unsplash.com/photo-1676277791608-ac54525aa94d?w=800&q=80"
                  alt="Создание корпоративного ChatGPT для компании"
                  title="Создание корпоративного ChatGPT для компании"
                  fill
                  className="object-cover opacity-70"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              <p>
                Публичный ChatGPT обучен на данных всего интернета — миллиардах страниц текста.
                Это его сила и одновременно главный недостаток для бизнеса. Он не знает ваш
                прайс, не знает условия вашей гарантии, не знает регламенты вашей компании.
                Хуже того — он может выдумывать ответы, которые выглядят правдоподобно, но
                не соответствуют реальности. В бизнесе это называется "галлюцинации AI".
              </p>
              <p>
                Корпоративный AI работает иначе. Он отвечает исключительно на основе ваших
                документов: загруженных PDF, таблиц, регламентов, договоров, прайсов. Если
                информации нет в вашей базе знаний — он честно скажет "я не нашёл ответа на
                этот вопрос" вместо того, чтобы выдумывать. Для бизнеса это критически важно.
              </p>
              <p>
                Ещё один ключевой аспект — конфиденциальность. При использовании публичного
                ChatGPT данные уходят на серверы OpenAI. Корпоративный AI может работать
                полностью на вашей инфраструктуре — ни один запрос не покидает контур
                вашей компании.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">
                Как работает технология RAG (простыми словами)
              </h2>
              <p>
                RAG расшифровывается как Retrieval-Augmented Generation — "генерация с дополнением
                из базы данных". Звучит сложно, но принцип прост: когда сотрудник задаёт вопрос,
                система сначала ищет релевантные фрагменты в ваших документах, а затем формулирует
                ответ на основе найденного.
              </p>
              <p>
                Представьте, что у вас есть самый опытный сотрудник, который прочитал все документы
                компании — все регламенты, все прайсы, все договоры, весь архив переписки. И он
                отвечает на любой вопрос мгновенно, никогда не ошибается в фактах и всегда
                ссылается на конкретный источник. Именно так работает RAG-система.
              </p>
              <p>
                Документы загружаются в систему, разбиваются на смысловые фрагменты, создаётся
                векторное пространство поиска. При поступлении вопроса система находит наиболее
                релевантные фрагменты и на их основе генерирует точный, контекстуальный ответ.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">
                Пошаговый процесс создания корпоративного AI
              </h2>
              <p>
                <strong className="text-[#F8FAFC]">Этап 1: Аудит документов и сценариев.</strong>{' '}
                Определяем, какие документы войдут в базу знаний, какие вопросы будут задаваться
                чаще всего и кто будет основным пользователем системы: сотрудники, менеджеры
                по продажам или клиенты.
              </p>
              <p>
                <strong className="text-[#F8FAFC]">Этап 2: Подготовка и структурирование документов.</strong>{' '}
                Документы нужно привести в порядок перед загрузкой. Устаревшие версии заменяются
                актуальными, дублирующиеся разделы объединяются, ключевые данные форматируются
                для лучшего поиска. Этот этап критически важен — от качества базы знаний напрямую
                зависит точность ответов AI.
              </p>
              <p>
                <strong className="text-[#F8FAFC]">Этап 3: Настройка инфраструктуры.</strong>{' '}
                Для облачного варианта разворачивается защищённое окружение с контролем доступа.
                Для on-premise — всё устанавливается на вашем сервере или в вашем частном облаке.
                Никаких данных за периметр компании.
              </p>
              <p>
                <strong className="text-[#F8FAFC]">Этап 4: Настройка интеграций.</strong>{' '}
                Система подключается к вашим рабочим инструментам: 1С, Bitrix24, amoCRM,
                Google Drive, корпоративный мессенджер. AI начинает работать с актуальными
                данными в реальном времени — не со статичными снимками.
              </p>
              <p>
                <strong className="text-[#F8FAFC]">Этап 5: Тестирование и дообучение.</strong>{' '}
                Система проходит тестирование на реальных вопросах сотрудников. Выявляются
                "слепые пятна" — темы, по которым не хватает документации. База знаний
                дополняется, точность ответов доводится до целевого уровня.
              </p>
              <p>
                <strong className="text-[#F8FAFC]">Этап 6: Обучение команды и запуск.</strong>{' '}
                Проводится короткое обучение для сотрудников — как формулировать запросы,
                как интерпретировать ответы, как сообщать об ошибках. После этого система
                переходит в рабочий режим.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">
                Безопасность и защита корпоративных данных
              </h2>
              <p>
                Вопрос безопасности данных — главный при внедрении корпоративного AI. Особенно
                это актуально для компаний, работающих с персональными данными клиентов,
                финансовой информацией или составляющими коммерческую тайну сведениями.
              </p>
              <p>
                On-premise вариант полностью решает эту проблему: система физически находится
                на ваших серверах, все вычисления происходят локально, данные никогда не
                передаются в интернет. Это не просто "приватный режим" — это изолированный
                контур без каких-либо внешних соединений.
              </p>
              <p>
                Дополнительный уровень защиты — ролевая модель доступа. Разные сотрудники
                видят разные части базы знаний: менеджер по продажам видит прайсы и условия,
                HR — документы по персоналу, финансист — отчёты и бюджеты. Разграничение
                прав настраивается гранулярно под структуру вашей организации.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">
                Интеграция с 1С, Bitrix24 и amoCRM
              </h2>
              <p>
                Статичная база знаний — хорошо. Система, которая обращается к актуальным данным
                в реальном времени, — значительно лучше. Интеграция с 1С позволяет AI отвечать
                на вопросы об актуальных остатках, ценах, задолженностях — не вчерашними
                данными из выгрузки, а текущими на момент запроса.
              </p>
              <p>
                Интеграция с Bitrix24 или amoCRM открывает ещё больше возможностей: AI видит
                историю взаимодействий с клиентом, текущий статус сделки, ответственного
                менеджера. Менеджер спрашивает "какой статус у сделки с компанией X?" — AI
                отвечает с данными из CRM за секунду.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">
                Сроки и стоимость проекта
              </h2>
              <p>
                Сроки внедрения корпоративного AI зависят от объёма документации и количества
                интеграций. Базовый вариант — от 4 недель: 1 неделя на аудит и подготовку
                документов, 2 недели на настройку и интеграции, 1 неделя на тестирование.
                Крупные проекты с on-premise инфраструктурой занимают 2-3 месяца.
              </p>
              <p>
                Стоимость стартует от $8 000 за внедрение в зависимости от масштаба и
                сложности интеграций, плюс ежемесячная поддержка от $3 000. Правильно
                посчитанный ROI показывает окупаемость за 4-8 месяцев: экономия на
                времени сотрудников, ускорение онбординга новых людей и снижение ошибок
                из-за незнания регламентов.
              </p>
            </section>
          </article>

          <section className="mt-16 pt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-2xl font-bold text-[#F8FAFC] mb-3">Решения AI Solution для вашего бизнеса</h2>
            <p className="text-[#64748B] mb-8">Выберите AI-продукт под задачи вашей компании</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/products/customer-service" className="group block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)' }}>
                <div className="text-2xl mb-3">🤖</div>
                <h3 className="font-bold text-[#F8FAFC] mb-2">Customer Service Bot</h3>
                <p className="text-sm text-[#64748B] mb-3">AI в Telegram, Instagram, WhatsApp. Ответ за 30 сек, квалификация лидов 24/7.</p>
                <span className="text-sm font-semibold text-[#3B82F6]">От $1 000 →</span>
              </Link>
              <Link href="/products/management-assistant" className="group block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)' }}>
                <div className="text-2xl mb-3">📊</div>
                <h3 className="font-bold text-[#F8FAFC] mb-2">Management Assistant</h3>
                <p className="text-sm text-[#64748B] mb-3">Контроль команды, финансовый трекер, еженедельные отчёты в Telegram.</p>
                <span className="text-sm font-semibold text-[#06B6D4]">От $3 000 →</span>
              </Link>
              <Link href="/products/corporate-ai" className="group block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}>
                <div className="text-2xl mb-3">🏢</div>
                <h3 className="font-bold text-[#F8FAFC] mb-2">Corporate AI (RAG)</h3>
                <p className="text-sm text-[#64748B] mb-3">База знаний компании с AI. Интеграция с 1С, Bitrix24, amoCRM. On-premise.</p>
                <span className="text-sm font-semibold text-[#7C3AED]">От $8 000 →</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
