import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { WeAreSection } from '@/components/sections/WeAreSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
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
        <ProductsSection />
        <SimplePricingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
