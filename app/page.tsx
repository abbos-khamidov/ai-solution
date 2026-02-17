import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { WeAreSection } from '@/components/sections/WeAreSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { SimplePricingSection } from '@/components/sections/SimplePricingSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WeAreSection />
        <ProblemSection />
        <SolutionSection />
        <SimplePricingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
