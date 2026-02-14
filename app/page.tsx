import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { Footer } from '@/components/layout/Footer';
import { Services } from '@/components/sections/Services';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CasesSection } from '@/components/domain/cases/CasesSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CasesSection />
        <Services />
        <ProcessSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
