import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CasesSection } from '@/components/domain/cases/CasesSection';

export const metadata = {
  title: 'Кейсы | AI Solution',
  description:
    'Реальные проекты по автоматизации бизнеса: Studify, Hub, Mars. Чат-боты, CRM, интеграции.',
};

export default function KeisyPage() {
  return (
    <>
      <Header />
      <main>
        <CasesSection showViewAll={false} compact />
      </main>
      <Footer />
    </>
  );
}
