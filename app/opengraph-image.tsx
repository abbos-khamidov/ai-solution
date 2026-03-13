import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AI Solution — ИИ автоматизация бизнеса в Узбекистане';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #05050A 0%, #0D0D1A 60%, #080818 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '72px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '520px',
            height: '520px',
            background: 'radial-gradient(circle, rgba(59,130,246,0.25), transparent 65%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '-120px',
            left: '200px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(6,182,212,0.15), transparent 65%)',
            borderRadius: '50%',
          }}
        />

        {/* Logo badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(59,130,246,0.12)',
            border: '1px solid rgba(59,130,246,0.3)',
            borderRadius: '24px',
            padding: '10px 24px',
            marginBottom: '36px',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
              borderRadius: '8px',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }}
          >
            ⚡
          </div>
          <span style={{ fontSize: '18px', color: '#60A5FA', fontWeight: 600 }}>
            AI Solution · Ташкент, Узбекистан
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            display: 'flex',
            fontSize: '68px',
            fontWeight: 900,
            color: '#F8FAFC',
            lineHeight: 1.05,
            marginBottom: '24px',
            maxWidth: '920px',
            letterSpacing: '-2px',
          }}
        >
          ИИ автоматизация{' '}
          <span style={{ color: '#3B82F6' }}>бизнеса</span>
        </div>

        {/* Tags */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '48px',
            flexWrap: 'wrap',
          }}
        >
          {['Telegram-боты', 'LLM', 'Аналитика', 'Бот-менеджер', '24/7'].map((tag) => (
            <div
              key={tag}
              style={{
                display: 'flex',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '8px',
                padding: '6px 16px',
                fontSize: '20px',
                color: '#94A3B8',
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          <span style={{ fontSize: '22px', color: '#3B82F6', fontWeight: 600 }}>
            aisolution.uz
          </span>
          <span style={{ fontSize: '18px', color: '#475569' }}>
            Ответ клиенту за 30 секунд · 24/7
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
