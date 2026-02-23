'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { track } from '@/lib/analytics/gtag';

type CasePreviewCardProps = {
  title: string;
  sector: string;
  goal: string;
  solution: string;
  result: string;
  href: string;
};

function detectCaseName(href: string): 'studify' | 'marsit' | 'unknown' {
  if (href.includes('studify')) return 'studify';
  if (href.includes('marsit')) return 'marsit';
  return 'unknown';
}

export function CasePreviewCard({ title, sector, goal, solution, result, href }: CasePreviewCardProps) {
  const caseName = detectCaseName(href);

  return (
    <article className="rounded-2xl p-6 md:p-7 border border-white/10 bg-white/[0.02] h-full flex flex-col">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-[#F8FAFC]">{title}</h3>
        <span className="text-xs px-2 py-1 rounded-full border border-white/15 text-[#94A3B8]">
          {sector}
        </span>
      </div>

      <div className="mt-5 space-y-3 text-sm leading-relaxed">
        <p className="text-[#CBD5E1]">
          <span className="text-[#93C5FD] font-semibold">Цель: </span>
          {goal}
        </p>
        <p className="text-[#CBD5E1]">
          <span className="text-[#93C5FD] font-semibold">Решение: </span>
          {solution}
        </p>
        <p className="text-[#CBD5E1]">
          <span className="text-[#93C5FD] font-semibold">Результат: </span>
          {result}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-white/10">
        <Link
          href={href}
          onClick={() =>
            track('case_open_click', {
              case: caseName,
              location: 'preview',
            })
          }
          className="inline-flex items-center gap-2 text-[#93C5FD] font-semibold hover:text-[#BFDBFE] transition-colors"
        >
          Открыть кейс
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
