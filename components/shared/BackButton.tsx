'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function BackButton({
  href,
  label,
  className = '',
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-sm hover:underline transition-opacity ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </Link>
  );
}
