'use client';

/**
 * Срабатывает при ошибке в корневом layout (error.tsx её не перехватывает).
 * Обязательны собственные <html> и <body>.
 */
export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru">
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Ошибка | AI Solution</title>
      </head>
      <body style={{ margin: 0, minHeight: '100vh', background: '#0f172a', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ maxWidth: 400, textAlign: 'center' }}>
            <h1 style={{ fontSize: '1.25rem', marginBottom: 8 }}>Критическая ошибка</h1>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: 24 }}>
              Не удалось отобразить страницу. Попробуйте снова или откройте главную.
            </p>
            <button
              type="button"
              onClick={reset}
              style={{
                padding: '12px 20px',
                borderRadius: 12,
                border: 'none',
                background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
                marginRight: 12,
              }}
            >
              Повторить
            </button>
            <a href="/" style={{ color: '#60a5fa', fontSize: '0.875rem' }}>
              На главную
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
