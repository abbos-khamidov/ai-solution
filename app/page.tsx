import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';

const WeAreSection = dynamic(() =>
  import('@/components/sections/WeAreSection').then((m) => m.WeAreSection)
);
const ProblemSection = dynamic(() =>
  import('@/components/sections/ProblemSection').then((m) => m.ProblemSection)
);
const SolutionSection = dynamic(() =>
  import('@/components/sections/SolutionSection').then((m) => m.SolutionSection)
);
const ProductsSection = dynamic(() =>
  import('@/components/sections/ProductsSection').then((m) => m.ProductsSection)
);
const SimplePricingSection = dynamic(() =>
  import('@/components/sections/SimplePricingSection').then((m) => m.SimplePricingSection)
);
const ContactSection = dynamic(() =>
  import('@/components/sections/ContactSection').then((m) => m.ContactSection)
);
const Footer = dynamic(() =>
  import('@/components/layout/Footer').then((m) => m.Footer)
);

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
