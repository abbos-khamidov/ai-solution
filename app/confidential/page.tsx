import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | AI Solution',
  description: 'Политика конфиденциальности и обработки персональных данных AI Solution.',
};

export default function ConfidentialPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--background)]">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-8">
            Политика конфиденциальности
          </h1>
          <div className="prose prose-invert max-w-none space-y-6 text-[var(--muted-foreground)]">
            <p className="leading-relaxed">
              AI Solution («мы») соблюдает конфиденциальность посетителей сайта и обрабатывает персональные данные в соответствии с действующим законодательством.
            </p>

            <h2 className="text-xl font-semibold text-[var(--foreground)] mt-8 mb-3">1. Какие данные мы собираем</h2>
            <p className="leading-relaxed">
              При заполнении форм обратной связи мы можем получать: имя, контактный email, телефон или Telegram, название компании и текст сообщения. Эти данные передаются добровольно и используются только для связи с вами и ответа на запрос.
            </p>

            <h2 className="text-xl font-semibold text-[var(--foreground)] mt-8 mb-3">2. Как мы используем данные</h2>
            <p className="leading-relaxed">
              Указанные данные используются для обработки заявок, консультаций и выполнения договорных обязательств. Мы не передаём персональные данные третьим лицам для маркетинговых целей без вашего согласия.
            </p>

            <h2 className="text-xl font-semibold text-[var(--foreground)] mt-8 mb-3">3. Хранение и защита</h2>
            <p className="leading-relaxed">
              Данные хранятся в защищённых каналах и системах, доступ к которым ограничен. Мы применяем организационные и технические меры для снижения рисков несанкционированного доступа.
            </p>

            <h2 className="text-xl font-semibold text-[var(--foreground)] mt-8 mb-3">4. Ваши права</h2>
            <p className="leading-relaxed">
              Вы вправе запросить доступ к своим данным, их исправление или удаление. Для этого достаточно направить запрос на контактный email или Telegram, указанные на сайте.
            </p>

            <h2 className="text-xl font-semibold text-[var(--foreground)] mt-8 mb-3">5. Контакты</h2>
            <p className="leading-relaxed">
              По вопросам обработки персональных данных: info@aisolution.uz, Telegram @aisolution_uz.
            </p>

            <p className="text-sm text-[var(--muted-foreground)] mt-12">
              Дата последнего обновления: 2025 год. Мы можем обновлять политику; актуальная версия всегда доступна на этой странице.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
