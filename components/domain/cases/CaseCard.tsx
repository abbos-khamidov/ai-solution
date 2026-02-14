import React from 'react';
import type { CaseStudy } from '@/lib/data/cases';

interface CaseCardProps {
  caseStudy: CaseStudy;
}

export function CaseCard({ caseStudy }: CaseCardProps) {
  const { title, industry, challenge, solution, results } = caseStudy;

  return (
    <article className="border border-gray-200 rounded-lg p-8">
      {/* Header: Company Type */}
      <div className="mb-6">
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {industry}
        </span>
        <h3 className="text-2xl font-bold mt-2">{title}</h3>
      </div>

      {/* Results First - The Numbers */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
          Results
        </h4>
        <ul className="space-y-3">
          {results.map((result, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-600 mr-3 mt-1">✓</span>
              <span className="text-lg font-medium">{result}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Context: Problem & Solution */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
            Problem
          </h4>
          <p className="text-gray-600 leading-relaxed">{challenge}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
            Solution
          </h4>
          <p className="text-gray-600 leading-relaxed">{solution}</p>
        </div>
      </div>
    </article>
  );
}
