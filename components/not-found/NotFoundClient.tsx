'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export function NotFoundClient() {
  const [count, setCount] = useState(1);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = setInterval(() => setCount((p) => p + 1), 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.load();
      v.play().catch(() => {});
    }
  }, []);

  const toggleSound = () => {
    const v = videoRef.current;
    if (v) {
      v.muted = !v.muted;
      setMuted(v.muted);
      if (!v.muted) v.play().catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="relative mb-8">
        <div className="absolute inset-[-20px] rounded-full animate-ping opacity-20 border-2 border-blue-500" />
        <div
          className="absolute inset-[-35px] rounded-full animate-ping opacity-10 border-2 border-blue-400"
          style={{ animationDelay: '0.7s' }}
        />
        <div
          className="absolute inset-[-50px] rounded-full animate-ping opacity-5 border-2 border-blue-300"
          style={{ animationDelay: '1.4s' }}
        />

        <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-[#3B82F6] shadow-[0_0_80px_rgba(59,130,246,0.4)]">
          <video
            ref={videoRef}
            src="/video/404.mp4"
            autoPlay
            loop
            muted={muted}
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
          <button
            onClick={toggleSound}
            className="absolute bottom-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white text-base hover:bg-black/80 transition border border-white/20"
          >
            {muted ? '🔇' : '🔊'}
          </button>
        </div>

        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#3B82F6] text-white text-xs px-4 py-1.5 rounded-full whitespace-nowrap font-medium animate-pulse">
          📞 Ваш клиент звонит...
        </div>
      </div>

      <h1 className="text-foreground text-3xl font-bold mt-6 text-center">Вы недоступны</h1>
      <p className="text-[#64748B] text-sm mt-2 text-center max-w-sm">
        Страница не найдена — но ваши клиенты уже нашли конкурентов
      </p>

      <p className="text-[#3B82F6] text-sm mt-4 font-medium">
        ⚡ Пока вы здесь — AI уже ответил {count} клиент
        {count === 1 ? 'у' : 'ам'}
      </p>

      <div className="flex gap-4 mt-8 flex-wrap justify-center">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold text-sm hover:opacity-90 transition"
        >
          ← На главную
        </Link>
        <a
          href="https://t.me/aisolution_uz"
          className="px-6 py-3 rounded-xl border border-[#3B82F6] text-[#3B82F6] font-semibold text-sm hover:bg-[#3B82F6]/10 transition"
        >
          Попробовать AI →
        </a>
      </div>
    </div>
  );
}
