'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.error('Application error:', error);
    }
  }, [error]);

  const message = error?.message || '';

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl border border-border bg-card shadow-sm p-8 text-center">
        <h1 className="text-xl font-bold text-foreground mb-2">Что-то пошло не так</h1>
        <p className={`text-[#94A3B8] text-sm ${message ? 'mb-2' : 'mb-6'}`}>
          Произошла ошибка при загрузке страницы. Попробуйте обновить страницу или вернуться на главную.
        </p>
        {message && (
          <p className="text-[#64748B] text-xs font-mono mb-6 break-all" title={message}>
            {message}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Попробовать снова
          </button>
          <Link
            href="/"
            className="px-5 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-muted transition-colors"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
