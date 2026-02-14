import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CaseStudyContent } from '@/components/domain/cases/CaseStudyContent';
import { getCaseBySlug, getCaseSlugs } from '@/lib/data/cases';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseBySlug(slug);
  if (!caseStudy) return { title: 'Кейс | AI Solution' };
  return {
    title: `${caseStudy.title} — кейс | AI Solution`,
    description: caseStudy.tagline + '. ' + caseStudy.summary.slice(0, 120) + '…',
  };
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCaseBySlug(slug);
  if (!caseStudy) notFound();

  return (
    <>
      <Header />
      <main>
        <CaseStudyContent caseStudy={caseStudy} />
      </main>
      <Footer />
    </>
  );
}
