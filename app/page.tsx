import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { ValuePropSection } from '@/components/sections/ValuePropSection';
import { ServicesGridSection } from '@/components/sections/ServicesGridSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ValuePropSection />
        <ServicesGridSection />
        <SocialProofSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
