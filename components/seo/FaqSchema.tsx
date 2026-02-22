const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'За какое время AI-ассистент отвечает клиенту?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI-ассистент отвечает клиенту за 30 секунд в любом канале: Telegram, Instagram Direct, WhatsApp. Работает 24/7 без выходных.',
      },
    },
    {
      '@type': 'Question',
      name: 'Какие каналы поддерживает AI Solution?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Поддерживаются Telegram, Instagram Direct и WhatsApp. Один AI-ассистент отвечает во всех трёх каналах одновременно.',
      },
    },
    {
      '@type': 'Question',
      name: 'Сколько стоит AI чат-бот для бизнеса?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Customer Service Bot — от $1 000 (запуск) + $500/мес. Management Assistant — от $3 000 + $1 200/мес. Corporate AI (RAG) — от $8 000. Точная стоимость определяется после бесплатного 60-минутного аудита.',
      },
    },
    {
      '@type': 'Question',
      name: 'Что такое квалификация лидов Cold/Warm/Hot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI автоматически определяет "температуру" каждого лида: Cold — первый контакт, не готов к покупке; Warm — интересуется, задаёт вопросы; Hot — готов купить прямо сейчас. Горячие лиды мгновенно передаются менеджеру с полным контекстом.',
      },
    },
    {
      '@type': 'Question',
      name: 'Работает ли AI Solution в Узбекистане?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Да, AI Solution базируется в Ташкенте и обслуживает компании по всему Узбекистану, а также в Казахстане, Кыргызстане и Таджикистане. Поддержка на русском, узбекском и английском языках.',
      },
    },
    {
      '@type': 'Question',
      name: 'AI Solution Toshkentda ishlaydi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Ha, AI Solution Toshkentda joylashgan va butun O'zbekiston bo'ylab, shuningdek Qozog'iston, Qirg'iziston va Tojikistonda xizmat ko'rsatadi. Biz o'zbek, rus va ingliz tillarida xizmat ko'rsatamiz.",
      },
    },
  ],
};

export function FaqSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
