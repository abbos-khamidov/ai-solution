'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.error('Global application error:', error);
    }
  }, [error]);

  return (
    <html lang="ru">
      <body style={{ margin: 0, background: '#F8FAFC', color: '#0F172A', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ maxWidth: 400, width: '100%', padding: 32, textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, background: 'rgba(255,255,255,0.02)' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 8 }}>Что-то пошло не так</h1>
            <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 24 }}>
              Произошла ошибка. Обновите страницу или вернитесь на главную.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
              <button
                onClick={reset}
                style={{
                  padding: '12px 20px',
                  borderRadius: 12,
                  background: 'linear-gradient(to right, #3B82F6, #06B6D4)',
                  color: 'white',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Попробовать снова
              </button>
              <a
                href="/"
                style={{
                  padding: '12px 20px',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#0F172A',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                На главную
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
