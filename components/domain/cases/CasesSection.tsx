import React from 'react';
import { casesList } from '@/lib/data/cases';
import { CaseCard } from './CaseCard';

interface CasesSectionProps {
  showViewAll?: boolean;
  compact?: boolean;
}

export function CasesSection({ showViewAll = true, compact = false }: CasesSectionProps = {}) {
  return (
    <section id="cases" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Results That Matter
          </h2>
          <p className="text-xl text-gray-600">
            Measurable business impact from automation
          </p>
        </div>

        {/* Cases Grid */}
        <div className="space-y-12">
          {casesList.map((caseStudy) => (
            <CaseCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </div>
    </section>
  );
}
